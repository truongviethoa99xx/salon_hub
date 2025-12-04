import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { SocialAccount, Conversation, User } from '../common/entities';
import { ChatGateway } from './chat.gateway';
export declare class WebhookService {
    private readonly socialAccountRepository;
    private readonly conversationRepository;
    private readonly userRepository;
    private readonly configService;
    private readonly chatGateway;
    private readonly logger;
    private FACEBOOK_VERIFY_TOKEN;
    private ZALO_VERIFY_TOKEN;
    constructor(socialAccountRepository: Repository<SocialAccount>, conversationRepository: Repository<Conversation>, userRepository: Repository<User>, configService: ConfigService, chatGateway: ChatGateway);
    verifyFacebookWebhook(mode: string, token: string, challenge: string): string | null;
    verifyZaloWebhook(token: string, challenge: string): string | null;
    processFacebookMessage(payload: any): Promise<void>;
    processZaloMessage(payload: any): Promise<void>;
    private handleIncomingMessage;
}
