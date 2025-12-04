import { User } from './user.entity';
import { SocialPlatform } from '../enums';
export declare class Conversation {
    id: string;
    customer: User;
    platform: SocialPlatform;
    social_user_id: string;
    message_text: string;
    message_timestamp: Date;
    is_read: boolean;
    created_at: Date;
}
