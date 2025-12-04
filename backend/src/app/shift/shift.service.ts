// apps/backend/src/app/shift/shift.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StylistShift } from '../common/entities';
import { CreateShiftDto } from './create-shift.dto';

@Injectable()
export class ShiftService {
  constructor(
    @InjectRepository(StylistShift)
    private readonly shiftRepository: Repository<StylistShift>,
  ) {}

  async create(createShiftDto: CreateShiftDto): Promise<StylistShift> {
    const { stylistId, branchId, shiftDate, startTime, endTime } = createShiftDto;

    const newShift = this.shiftRepository.create({
      stylist: { id: stylistId },
      branch: { id: branchId },
      shift_date: shiftDate,
      start_time: startTime,
      end_time: endTime,
    });

    return this.shiftRepository.save(newShift);
  }

  async findByDate(date: string): Promise<StylistShift[]> {
    return this.shiftRepository.find({
      where: { shift_date: date },
      relations: ['stylist', 'branch'],
    });
  }
}
