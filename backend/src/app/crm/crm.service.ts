// apps/backend/src/app/crm/crm.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationHistory } from '../common/entities';

@Injectable()
export class CrmService {
  constructor(
    @InjectRepository(NotificationHistory)
    private readonly notificationHistoryRepository: Repository<NotificationHistory>,
  ) {}

  async getNotificationHistory(): Promise<NotificationHistory[]> {
    return this.notificationHistoryRepository.find({
      relations: ['customer'],
      order: { created_at: 'DESC' },
    });
  }
}
