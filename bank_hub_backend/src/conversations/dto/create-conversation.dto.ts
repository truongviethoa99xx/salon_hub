import {
  IsString,
  IsOptional,
  IsInt,
} from 'class-validator';

export class CreateConversationDto {
  @IsInt()
  @IsOptional()
  user_id?: number;

  @IsString()
  @IsOptional()
  customer_name?: string;

  @IsString()
  @IsOptional()
  platform?: string;

  @IsString()
  @IsOptional()
  platform_id?: string;
}

