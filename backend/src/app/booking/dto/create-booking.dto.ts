// apps/backend/src/app/booking/dto/create-booking.dto.ts
import { IsUUID, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  customerId: string;

  @IsUUID()
  branchId: string;

  @IsUUID()
  serviceId: string;

  @IsUUID()
  @IsOptional()
  stylistId?: string;

  @IsDateString()
  startTime: string;
  
  @IsString()
  @IsOptional()
  notes?: string;
}
