import { Repository } from 'typeorm';
import { NotificationHistory } from '../common/entities';
export declare class CrmService {
    private readonly notificationHistoryRepository;
    constructor(notificationHistoryRepository: Repository<NotificationHistory>);
    getNotificationHistory(): Promise<NotificationHistory[]>;
}
