// apps/backend/src/app/booking/booking.controller.ts
import { Controller, Get, Post, Body, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('scheduler')
  getSchedulerEvents(@Query('date') date: string, @Query('branchId') branchId?: string) {
    if (!date) {
        throw new Error('A date query parameter is required.');
    }
    return this.bookingService.findAllForScheduler(new Date(date), branchId);
  }

  @Get('availability')
  checkAvailability(
    @Query('branchId') branchId: string,
    @Query('date') date: string,
    @Query('serviceId') serviceId: string,
  ) {
    // Basic validation, a custom pipe would be better for production
    if (!branchId || !date || !serviceId) {
        throw new Error('branchId, date, and serviceId are required query parameters.');
    }
    return this.bookingService.checkAvailability(branchId, new Date(date), serviceId);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  createBooking(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.createBooking(createBookingDto);
  }
}
