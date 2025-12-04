// apps/backend/src/app/booking/booking.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Booking, Service, SalonResource, BookingQueue, ServiceRecord } from '../common/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Service, SalonResource, BookingQueue, ServiceRecord])],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}