import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Repository } from 'typeorm';
import { Booking, Service, SalonResource, BookingQueue, ServiceRecord } from '../common/entities'; // Import ServiceRecord
import { ResourceType, BookingStatus } from '../common/enums';
import { CreateBookingDto } from './dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(SalonResource)
    private readonly resourceRepository: Repository<SalonResource>,
    @InjectRepository(BookingQueue)
    private readonly queueRepository: Repository<BookingQueue>,
    @InjectRepository(ServiceRecord) // Inject ServiceRecordRepository
    private readonly serviceRecordRepository: Repository<ServiceRecord>,
  ) {}

  async checkAvailability(
    branchId: string,
    date: Date,
    serviceId: string,
  ): Promise<{ availableSlots: Date[] }> {
    const service = await this.serviceRepository.findOne({ where: { id: serviceId } });
    if (!service) {
      throw new NotFoundException(`Service with ID ${serviceId} not found.`);
    }

    const totalCuttingChairs = await this.resourceRepository.count({
      where: { branch: { id: branchId }, type: ResourceType.CUT_CHAIR, is_active: true },
    });

    if (totalCuttingChairs === 0) {
      return { availableSlots: [] };
    }

    const { startOfDay, endOfDay } = this.getStartAndEndOfDay(date);

    const existingBookings = await this.bookingRepository.find({
      where: {
        branch: { id: branchId },
        start_time: Between(startOfDay, endOfDay),
        status: In([BookingStatus.SCHEDULED, BookingStatus.CONFIRMED, BookingStatus.IN_PROGRESS]),
      },
    });

    const availableSlots: Date[] = [];
    const slotInterval = 15; // 15-minute intervals

    const openingTime = new Date(startOfDay.getTime());
    openingTime.setHours(9, 0, 0, 0);

    const closingTime = new Date(startOfDay.getTime());
    closingTime.setHours(20, 0, 0, 0);

    let currentSlot = new Date(openingTime.getTime());

    while (currentSlot < closingTime) {
      const slotEndTime = new Date(currentSlot.getTime() + service.duration_minutes * 60 * 1000);

      if (slotEndTime > closingTime) {
        break;
      }

      const concurrentBookings = existingBookings.filter(
        (booking) =>
          (currentSlot >= booking.start_time && currentSlot < booking.end_time) ||
          (slotEndTime > booking.start_time && slotEndTime <= booking.end_time),
      ).length;

      if (concurrentBookings < totalCuttingChairs) {
        availableSlots.push(new Date(currentSlot.getTime()));
      }

      currentSlot = new Date(currentSlot.getTime() + slotInterval * 60 * 1000);
    }

    return { availableSlots };
  }

  async createBooking(
    dto: CreateBookingDto,
  ): Promise<{ booking: Booking; warning: boolean }> {
    const { customerId, branchId, serviceId, stylistId, startTime, notes } = dto;
    const bookingStartTime = new Date(startTime);

    const service = await this.serviceRepository.findOne({ where: { id: serviceId } });
    if (!service) {
      throw new NotFoundException(`Service with ID ${serviceId} not found.`);
    }

    const bookingEndTime = new Date(
      bookingStartTime.getTime() + service.duration_minutes * 60 * 1000,
    );

    // More robust check for availability right before creation
    const { availableSlots } = await this.checkAvailability(branchId, bookingStartTime, serviceId);
    const isSlotStillAvailable = availableSlots.some(slot => new Date(slot).getTime() === bookingStartTime.getTime());
    if(!isSlotStillAvailable) {
        throw new ConflictException('This time slot is no longer available. Please choose another time.');
    }

    const newBooking = this.bookingRepository.create({
      customer: { id: customerId },
      branch: { id: branchId },
      service: { id: serviceId },
      stylist: stylistId ? { id: stylistId } : null,
      start_time: bookingStartTime,
      end_time: bookingEndTime,
      status: BookingStatus.SCHEDULED,
      notes,
    });

    const savedBooking = await this.bookingRepository.save(newBooking);

    const congestionWarning = await this.predictQueueCongestion(
      bookingEndTime,
      branchId,
    );

    return { booking: savedBooking, warning: congestionWarning };
  }
  
  // This method will be called when a booking is completed (e.g., after shampooing is done)
  async completeBooking(bookingId: string): Promise<Booking> {
      const booking = await this.bookingRepository.findOne({ 
          where: { id: bookingId },
          relations: ['customer', 'service']
      });

      if (!booking) {
          throw new NotFoundException(`Booking with ID ${bookingId} not found.`);
      }

      if (booking.status === BookingStatus.COMPLETED) {
          return booking; // Already completed
      }

      booking.status = BookingStatus.COMPLETED;
      const completedBooking = await this.bookingRepository.save(booking);

      // Create a service record for CRM
      const recommendedReturnDate = new Date(completedBooking.end_time);
      recommendedReturnDate.setDate(recommendedReturnDate.getDate() + 30); // 30 days from completion

      const serviceRecord = this.serviceRecordRepository.create({
          booking: completedBooking,
          customer: completedBooking.customer,
          service_date: completedBooking.end_time.toISOString().split('T')[0],
          recommended_return_date: recommendedReturnDate.toISOString().split('T')[0],
          notes: `Dịch vụ ${completedBooking.service.name} đã hoàn thành.`,
      });
      await this.serviceRecordRepository.save(serviceRecord);

      return completedBooking;
  }
  

  private async predictQueueCongestion(
    time: Date,
    branchId: string,
  ): Promise<boolean> {
    const totalShampooBeds = await this.resourceRepository.count({
      where: { branch: { id: branchId }, type: ResourceType.SHAMPOO_BED, is_active: true },
    });

    if (totalShampooBeds === 0) {
      return true; // If no beds, congestion is guaranteed if service needs it
    }

    const predictionWindowMinutes = 30;
    const windowStart = new Date(time.getTime() - (predictionWindowMinutes / 2) * 60 * 1000);
    const windowEnd = new Date(time.getTime() + (predictionWindowMinutes / 2) * 60 * 1000);

    const servicesRequiringWash = await this.serviceRepository.find({
        where: { requires_shampoo_bed: true },
        select: ['id'],
    });
    const serviceIds = servicesRequiringWash.map(s => s.id);

    if (serviceIds.length === 0) {
        return false; // No services require washing, so no congestion.
    }

    const potentiallyQueuedBookings = await this.bookingRepository.count({
      where: {
        branch: { id: branchId },
        service: { id: In(serviceIds) },
        status: In([BookingStatus.SCHEDULED, BookingStatus.CONFIRMED, BookingStatus.IN_PROGRESS]),
        end_time: Between(windowStart, windowEnd),
      },
    });

    return potentiallyQueuedBookings >= totalShampooBeds;
  }
  
  private getStartAndEndOfDay(date: Date): { startOfDay: Date, endOfDay: Date } {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    return { startOfDay, endOfDay };
  }

  async findAllForScheduler(date: Date, branchId?: string) {
    const { startOfDay, endOfDay } = this.getStartAndEndOfDay(date);

    const whereClause: any = {
        start_time: Between(startOfDay, endOfDay),
        status: In([BookingStatus.SCHEDULED, BookingStatus.CONFIRMED, BookingStatus.IN_PROGRESS]),
    };

    if (branchId) {
        whereClause.branch = { id: branchId };
    }

    const bookings = await this.bookingRepository.find({
        where: whereClause,
        relations: ['stylist', 'customer', 'service', 'branch'],
    });

    return bookings.map(booking => ({
        id: booking.id,
        resourceId: booking.stylist?.id || 'unassigned',
        title: `${booking.customer.full_name} - ${booking.service.name}`,
        start: booking.start_time,
        end: booking.end_time,
        extendedProps: {
            branchName: booking.branch.name,
            customerPhone: booking.customer.phone_number,
        }
    }));
  }
}
