import { Branch } from './branch.entity';
import { SocialAccount } from './social-account.entity';
import { Conversation } from './conversation.entity';
import { NotificationHistory } from './notification-history.entity';
import { UserRole } from '../enums';
export declare class User {
    id: string;
    full_name: string;
    phone_number: string;
    password_hash: string;
    role: UserRole;
    branch: Branch;
    socialAccounts: SocialAccount[];
    conversations: Conversation[];
    notificationHistory: NotificationHistory[];
    created_at: Date;
    updated_at: Date;
}
