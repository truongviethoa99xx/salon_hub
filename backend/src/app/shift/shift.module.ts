// apps/backend/src/app/shift/shift.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShiftController } from './shift.controller';
import { ShiftService } from './shift.service';
import { StylistShift } from '../common/entities';

@Module({
  imports: [TypeOrmModule.forFeature([StylistShift])],
  controllers: [ShiftController],
  providers: [ShiftService],
})
export class ShiftModule {}
