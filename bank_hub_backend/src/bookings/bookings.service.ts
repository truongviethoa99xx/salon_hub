import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Booking } from '../entities/booking.entity';
import { BookingService } from '../entities/booking-service.entity';
import { BookingProduct } from '../entities/booking-product.entity';
import { Service } from '../entities/service.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Generate booking code
      const bookingCode = `#BK${Date.now()}`;

      // Create booking
      const booking = new Booking();
      booking.booking_code = bookingCode;
      booking.customer_id = createBookingDto.customer_id || null;
      booking.customer_name = createBookingDto.customer_name;
      booking.customer_phone = createBookingDto.customer_phone;
      booking.branch_id = createBookingDto.branch_id;
      booking.stylist_id = createBookingDto.stylist_id || null;
      booking.appointment_date = new Date(createBookingDto.appointment_date);
      booking.appointment_time = createBookingDto.appointment_time;
      booking.note = createBookingDto.note || null;

      const savedBooking = await queryRunner.manager.save(Booking, booking);

      // Create booking services
      const bookingServices = createBookingDto.services.map((serviceDto) => {
        const bs = new BookingService();
        bs.booking_id = savedBooking.id;
        bs.service_id = serviceDto.service_id;
        bs.price_at_booking = serviceDto.price_at_booking;
        return bs;
      });

      await queryRunner.manager.save(BookingService, bookingServices);

      // Create booking products if any
      if (createBookingDto.products && createBookingDto.products.length > 0) {
        const bookingProducts = createBookingDto.products.map((productDto) => {
          const bp = new BookingProduct();
          bp.booking_id = savedBooking.id;
          bp.product_id = productDto.product_id;
          bp.quantity = productDto.quantity;
          bp.price_at_sale = productDto.price_at_sale;
          return bp;
        });

        await queryRunner.manager.save(BookingProduct, bookingProducts);
      }

      await queryRunner.commitTransaction();

      // Return booking with relations
      const result = await queryRunner.manager.findOne(Booking, {
        where: { id: savedBooking.id },
        relations: ['booking_services', 'booking_products', 'branch', 'stylist'],
      });

      if (!result) {
        throw new NotFoundException('Booking not found after creation');
      }

      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

