// apps/backend/src/app/crm/crm.processor.ts
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual } from 'typeorm';
import { ServiceRecord, NotificationHistory, User } from '../common/entities';
import { NotificationStatus } from '../common/enums';

@Processor('reminders')
export class CrmProcessor extends WorkerHost {
  private readonly logger = new Logger(CrmProcessor.name);

  constructor(
    @InjectRepository(ServiceRecord)
    private readonly serviceRecordRepository: Repository<ServiceRecord>,
    @InjectRepository(NotificationHistory)
    private readonly notificationHistoryRepository: Repository<NotificationHistory>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Needed to get customer details
  ) {
    super();
  }

  // This method is invoked for every job in the "reminders" queue.
  // We only handle the "send-daily-reminders" job type here.
  async process(job: Job): Promise<void> {
    if (job.name !== 'send-daily-reminders') {
      return;
    }
    this.logger.debug(`Processing job ${job.id} of type ${job.name} with data: ${JSON.stringify(job.data)}`);

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day

    const serviceRecords = await this.serviceRecordRepository.find({
      where: {
        recommended_return_date: LessThanOrEqual(today.toISOString().split('T')[0]),
      },
      relations: ['customer', 'booking'],
    });

    for (const record of serviceRecords) {
      if (!record.customer) {
        this.logger.warn(`Service record ${record.id} has no associated customer.`);
        continue;
      }
      
      const message = `Chào ${record.customer.full_name}, 30 ngày rồi bạn chưa cắt tóc, ghé tiệm nhận ưu đãi nhé!`;
      this.logger.log(`[Zalo Mock API] Sending reminder to ${record.customer.phone_number}: "${message}"`);

      // Simulate sending
      const notificationStatus = Math.random() > 0.1 ? NotificationStatus.SUCCESS : NotificationStatus.FAILED; // 10% chance of failure

      const newNotification = this.notificationHistoryRepository.create({
        customer: record.customer,
        message: message,
        status: notificationStatus,
        sent_at: new Date(),
      });
      await this.notificationHistoryRepository.save(newNotification);

      if (notificationStatus === NotificationStatus.SUCCESS) {
        this.logger.log(`Reminder sent successfully to ${record.customer.full_name}`);
      } else {
        this.logger.error(`Failed to send reminder to ${record.customer.full_name}`);
      }
    }

    this.logger.debug(`Finished processing job ${job.id}. ${serviceRecords.length} reminders processed.`);
  }
}
