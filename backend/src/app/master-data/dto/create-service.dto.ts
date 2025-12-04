// apps/backend/src/app/master-data/dto/create-service.dto.ts
import { IsString, IsNumber, IsInt, IsBoolean, IsOptional, Min } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsInt()
  @Min(1)
  duration_minutes: number;

  @IsBoolean()
  @IsOptional()
  requires_shampoo_bed?: boolean;

  @IsBoolean()
  @IsOptional()
  is_combo?: boolean; // New field as requested
}
