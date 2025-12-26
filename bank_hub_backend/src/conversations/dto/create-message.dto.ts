import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreateMessageDto {
  @IsInt()
  @IsNotEmpty()
  conversation_id: number;

  @IsString()
  @IsNotEmpty()
  sender_type: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

