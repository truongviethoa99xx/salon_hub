// apps/backend/src/app/queue/queue.controller.ts
import { Controller, Post, Body, Get, Patch, Param, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { QueueService } from './queue.service';
import { UpdateQueueStatusDto } from './dto';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post('join')
  joinQueue(@Body('bookingId') bookingId: string) {
    // Basic validation
    if (!bookingId) {
        throw new Error('bookingId is required.');
    }
    return this.queueService.joinQueue(bookingId);
  }
  
  @Get('next')
  getNextCustomer(@Query('branchId') branchId: string) {
    if (!branchId) {
        throw new Error('branchId is required.');
    }
    return this.queueService.getNextCustomer(branchId);
  }
  
  @Get()
  getQueueState(@Query('branchId') branchId: string) {
    if (!branchId) {
        throw new Error('branchId is required.');
    }
    return this.queueService.getQueueState(branchId);
  }

  @Patch(':id/status')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  updateQueueItemStatus(
    @Param('id') id: string,
    @Body() updateQueueStatusDto: UpdateQueueStatusDto,
  ) {
    return this.queueService.updateQueueItemStatus(id, updateQueueStatusDto.status, updateQueueStatusDto.staffId);
  }
}
