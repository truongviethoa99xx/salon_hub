import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Repository } from 'typeorm';
import { ServiceRecord, NotificationHistory, User } from '../common/entities';
export declare class CrmProcessor extends WorkerHost {
    private readonly serviceRecordRepository;
    private readonly notificationHistoryRepository;
    private readonly userRepository;
    private readonly logger;
    constructor(serviceRecordRepository: Repository<ServiceRecord>, notificationHistoryRepository: Repository<NotificationHistory>, userRepository: Repository<User>);
    process(job: Job): Promise<void>;
}
