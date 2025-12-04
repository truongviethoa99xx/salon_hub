import { User } from './user.entity';
import { SocialPlatform } from '../enums';
export declare class SocialAccount {
    id: string;
    user: User;
    platform: SocialPlatform;
    social_user_id: string;
    created_at: Date;
    updated_at: Date;
}
