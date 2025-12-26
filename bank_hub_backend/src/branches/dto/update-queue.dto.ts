import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { BusyLevel } from '../../entities/enums';

export class UpdateQueueDto {
  @IsEnum(BusyLevel)
  @IsOptional()
  live_busy_level?: BusyLevel;

  @IsInt()
  @Min(0)
  @IsOptional()
  live_chairs_available?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  live_beds_waiting?: number;
}

