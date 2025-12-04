// apps/backend/src/app/queue/dto/update-queue-status.dto.ts
import { IsEnum, IsUUID } from 'class-validator';
import { QueueStatus } from '../../common/enums';

export class UpdateQueueStatusDto {
  @IsEnum(QueueStatus)
  status: QueueStatus;

  @IsUUID()
  staffId: string;
}
