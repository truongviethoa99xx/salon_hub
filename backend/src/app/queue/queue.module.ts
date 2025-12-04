// apps/backend/src/app/queue/queue.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueGateway } from './queue.gateway';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { Booking, BookingQueue } from '../common/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, BookingQueue])],
  providers: [QueueGateway, QueueService],
  controllers: [QueueController],
})
export class QueueModule {}
