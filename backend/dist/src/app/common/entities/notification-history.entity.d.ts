import { User } from './user.entity';
import { NotificationStatus } from '../enums';
export declare class NotificationHistory {
    id: string;
    customer: User;
    message: string;
    status: NotificationStatus;
    sent_at: Date;
    created_at: Date;
}
