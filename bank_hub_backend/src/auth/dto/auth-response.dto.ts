import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../entities/enums';

export class AuthResponseDto {
  @ApiProperty({ description: 'JWT access token' })
  access_token: string;

  @ApiProperty({
    description: 'User information',
    type: 'object',
    properties: {
      id: { type: 'number' },
      username: { type: 'string' },
      full_name: { type: 'string' },
      role: { enum: UserRole },
    },
  })
  user: {
    id: number;
    username: string;
    full_name: string;
    role: UserRole;
  };
}

