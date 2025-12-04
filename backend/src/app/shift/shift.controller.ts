// apps/backend/src/app/shift/shift.controller.ts
import { Controller, Post, Body, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ShiftService } from './shift.service';
import { CreateShiftDto } from './create-shift.dto';

@Controller('shifts')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(@Body() createShiftDto: CreateShiftDto) {
    return this.shiftService.create(createShiftDto);
  }

  @Get()
  findByDate(@Query('date') date: string) {
    if (!date) {
        throw new Error('Date query parameter is required.');
    }
    return this.shiftService.findByDate(date);
  }
}
