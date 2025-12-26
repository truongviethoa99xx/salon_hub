import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsArray,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class BookingServiceDto {
  @IsInt()
  @IsNotEmpty()
  service_id: number;

  @IsInt()
  @Min(0)
  price_at_booking: number;
}

export class BookingProductDto {
  @IsInt()
  @IsNotEmpty()
  product_id: number;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsInt()
  @Min(0)
  price_at_sale: number;
}

export class CreateBookingDto {
  @IsInt()
  @IsOptional()
  customer_id?: number;

  @IsString()
  @IsNotEmpty()
  customer_name: string;

  @IsString()
  @IsNotEmpty()
  customer_phone: string;

  @IsInt()
  @IsNotEmpty()
  branch_id: number;

  @IsInt()
  @IsOptional()
  stylist_id?: number;

  @IsDateString()
  @IsNotEmpty()
  appointment_date: string;

  @IsString()
  @IsNotEmpty()
  appointment_time: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookingServiceDto)
  services: BookingServiceDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookingProductDto)
  @IsOptional()
  products?: BookingProductDto[];
}

