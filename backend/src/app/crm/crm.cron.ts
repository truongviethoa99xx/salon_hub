// apps/backend/src/app/crm/crm.cron.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class CrmCronService {
  private readonly logger = new Logger(CrmCronService.name);

  constructor(@InjectQueue('reminders') private readonly remindersQueue: Queue) {}

  @Cron('0 9 * * *') // Run every day at 9:00 AM
  async handleCron() {
    this.logger.debug('Running daily CRM reminder cron job...');
    await this.remindersQueue.add('send-daily-reminders', {
      timestamp: new Date().toISOString(),
    });
    this.logger.debug('Added "send-daily-reminders" job to queue.');
  }
}
