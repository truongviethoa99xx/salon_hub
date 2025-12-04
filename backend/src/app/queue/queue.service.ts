// apps/backend/src/app/queue/queue.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingQueue, User } from '../common/entities';
import { QueueGateway } from './queue.gateway';
import { BookingStatus, QueueStatus } from '../common/enums';

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(BookingQueue)
    private readonly queueRepository: Repository<BookingQueue>,
    private readonly queueGateway: QueueGateway,
  ) {}

  async joinQueue(bookingId: string): Promise<BookingQueue> {
    const booking = await this.bookingRepository.findOne({ where: { id: bookingId } });
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${bookingId} not found.`);
    }

    const existingEntry = await this.queueRepository.findOne({ where: { booking: { id: bookingId } } });
    if (existingEntry) {
      throw new ConflictException(`Booking ${bookingId} is already in the queue.`);
    }

    // Optionally update booking status
    booking.status = BookingStatus.IN_PROGRESS; // Or a new status e.g., 'WAITING_FOR_WASH'
    await this.bookingRepository.save(booking);

    const newQueueEntry = this.queueRepository.create({
      booking,
      status: QueueStatus.WAITING,
      // You can add priority logic here based on the service type
      // priority_score: booking.service.requires_priority ? 10 : 0
    });
    
    const savedEntry = await this.queueRepository.save(newQueueEntry);

    await this.broadcastCurrentQueueState(booking.branch.id);

    return savedEntry;
  }
  
  async getNextCustomer(branchId: string): Promise<BookingQueue | null> {
    return this.queueRepository.findOne({
      where: { 
        booking: { branch: { id: branchId } },
        status: QueueStatus.WAITING 
      },
      order: {
        priority_score: 'DESC',
        entered_at: 'ASC',
      },
      relations: ['booking', 'booking.customer'],
    });
  }

  async updateQueueItemStatus(queueItemId: string, status: QueueStatus, staffId: string): Promise<BookingQueue> {
    const queueItem = await this.queueRepository.findOne({ 
        where: { id: queueItemId },
        relations: ['booking', 'booking.branch'] 
    });

    if (!queueItem) {
      throw new NotFoundException(`Queue item with ID ${queueItemId} not found.`);
    }
    
    const staff = new User();
    staff.id = staffId;

    queueItem.status = status;
    
    if (status === QueueStatus.WASHING) {
        queueItem.started_at = new Date();
        queueItem.serviced_by = staff;
    } else if (status === QueueStatus.DONE) {
        queueItem.finished_at = new Date();
        // Optionally update final booking status
        queueItem.booking.status = BookingStatus.COMPLETED;
        await this.bookingRepository.save(queueItem.booking);
    }
    
    const updatedItem = await this.queueRepository.save(queueItem);

    await this.broadcastCurrentQueueState(queueItem.booking.branch.id);
    
    return updatedItem;
  }

  async getQueueState(branchId: string): Promise<{ waiting: BookingQueue[], washing: BookingQueue[] }> {
    const waiting = await this.queueRepository.find({
      where: { status: QueueStatus.WAITING, booking: { branch: { id: branchId } } },
      relations: ['booking', 'booking.customer', 'booking.service'],
      order: { priority_score: 'DESC', entered_at: 'ASC' },
    });

    const washing = await this.queueRepository.find({
      where: { status: QueueStatus.WASHING, booking: { branch: { id: branchId } } },
      relations: ['booking', 'booking.customer', 'booking.service', 'serviced_by'],
      order: { started_at: 'ASC' },
    });

    return { waiting, washing };
  }
  
  private async broadcastCurrentQueueState(branchId: string): Promise<void> {
    const state = await this.getQueueState(branchId);
    // You can target rooms later, for now broadcasting to everyone
    this.queueGateway.broadcastQueueUpdate(state);
  }
}
