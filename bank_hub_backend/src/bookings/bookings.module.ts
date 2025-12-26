import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from '../entities/booking.entity';
import { BookingService } from '../entities/booking-service.entity';
import { BookingProduct } from '../entities/booking-product.entity';
import { Service } from '../entities/service.entity';
import { Category } from '../entities/category.entity';
import { Product } from '../entities/product.entity';
import { BranchInventory } from '../entities/branch-inventory.entity';
import { User } from '../entities/user.entity';
import { Branch } from '../entities/branch.entity';
import { Stylist } from '../entities/stylist.entity';
import { ShampooQueue } from '../entities/shampoo-queue.entity';
import { Conversation } from '../entities/conversation.entity';
import { Message } from '../entities/message.entity';
import { SiteSettings } from '../entities/site-settings.entity';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Booking,
      BookingService,
      BookingProduct,
      Service,
      Category,
      Product,
      BranchInventory,
      User,
      Branch,
      Stylist,
      ShampooQueue,
      Conversation,
      Message,
      SiteSettings,
    ]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}

