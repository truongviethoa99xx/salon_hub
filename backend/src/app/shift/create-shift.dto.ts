// apps/backend/src/app/shift/create-shift.dto.ts
import { IsString, IsUUID, IsDateString } from 'class-validator';

export class CreateShiftDto {
  @IsUUID()
  stylistId: string;

  @IsUUID()
  branchId: string;

  @IsDateString()
  shiftDate: string;

  @IsString() // Expecting 'HH:mm:ss' or 'HH:mm'
  startTime: string;

  @IsString()
  endTime: string;
}
