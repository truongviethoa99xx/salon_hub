// apps/backend/src/app/webhook/webhook.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialAccount, Conversation, User } from '../common/entities';
import { SocialPlatform, UserRole } from '../common/enums';
import { ChatGateway } from './chat.gateway';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);
  private FACEBOOK_VERIFY_TOKEN: string;
  private ZALO_VERIFY_TOKEN: string;

  constructor(
    @InjectRepository(SocialAccount)
    private readonly socialAccountRepository: Repository<SocialAccount>,
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly chatGateway: ChatGateway,
  ) {
    this.FACEBOOK_VERIFY_TOKEN = this.configService.get<string>('FACEBOOK_VERIFY_TOKEN', 'YOUR_FACEBOOK_VERIFY_TOKEN');
    this.ZALO_VERIFY_TOKEN = this.configService.get<string>('ZALO_VERIFY_TOKEN', 'YOUR_ZALO_VERIFY_TOKEN');
  }

  // --- Verification Logic ---
  verifyFacebookWebhook(mode: string, token: string, challenge: string): string | null {
    if (mode === 'subscribe' && token === this.FACEBOOK_VERIFY_TOKEN) {
      this.logger.log('Facebook webhook verified!');
      return challenge;
    }
    return null;
  }

  verifyZaloWebhook(token: string, challenge: string): string | null {
    // Zalo verification logic might differ slightly, this is a placeholder
    if (token === this.ZALO_VERIFY_TOKEN) {
      this.logger.log('Zalo webhook verified!');
      return challenge;
    }
    return null;
  }

  // --- Message Processing Logic ---
  async processFacebookMessage(payload: any): Promise<void> {
    this.logger.log(`Received Facebook message: ${JSON.stringify(payload)}`);
    // Example: extract sender_id and message_text from a typical Messenger payload
    const entry = payload.entry?.[0];
    const messaging = entry?.messaging?.[0];
    const senderId = messaging?.sender?.id;
    const messageText = messaging?.message?.text;
    const messageTimestamp = new Date(messaging?.timestamp);

    if (!senderId || !messageText) {
      this.logger.warn('Invalid Facebook message payload received.');
      return;
    }

    await this.handleIncomingMessage(
      SocialPlatform.FACEBOOK,
      senderId,
      messageText,
      messageTimestamp,
    );
  }

  async processZaloMessage(payload: any): Promise<void> {
    this.logger.log(`Received Zalo message: ${JSON.stringify(payload)}`);
    // Example: extract sender_id and message_text from a typical Zalo webhook payload
    const senderId = payload?.sender?.id;
    const messageText = payload?.message?.text;
    const messageTimestamp = new Date(payload?.timestamp); // Zalo timestamp is typically in milliseconds

    if (!senderId || !messageText) {
      this.logger.warn('Invalid Zalo message payload received.');
      return;
    }

    await this.handleIncomingMessage(
      SocialPlatform.ZALO,
      senderId,
      messageText,
      messageTimestamp,
    );
  }

  private async handleIncomingMessage(
    platform: SocialPlatform,
    socialUserId: string,
    messageText: string,
    messageTimestamp: Date,
  ): Promise<void> {
    let user: User | null = null;
    let socialAccount = await this.socialAccountRepository.findOne({
      where: { platform, social_user_id: socialUserId },
      relations: ['user'],
    });

    if (socialAccount) {
      user = socialAccount.user;
    } else {
      // If no social account, create a new User and SocialAccount for this new customer
      // For now, create a placeholder user. In real app, might prompt for phone number
      this.logger.log(`New social user detected for ${platform}: ${socialUserId}. Creating placeholder user.`);
      user = this.userRepository.create({
        full_name: `Guest (${platform} ${socialUserId.slice(-4)})`,
        phone_number: `${platform}-${socialUserId}`, // Placeholder unique phone number
        role: UserRole.CUSTOMER,
      });
      user = await this.userRepository.save(user);

      socialAccount = this.socialAccountRepository.create({
        user: user,
        platform: platform,
        social_user_id: socialUserId,
      });
      await this.socialAccountRepository.save(socialAccount);
    }

    const conversation = this.conversationRepository.create({
      customer: user,
      platform: platform,
      social_user_id: socialUserId,
      message_text: messageText,
      message_timestamp: messageTimestamp,
      is_read: false,
    });
    const savedConversation = await this.conversationRepository.save(conversation);

    // Broadcast new message to admin frontend
    this.chatGateway.broadcastNewMessage(savedConversation);
    this.logger.log(`Message saved and broadcasted: ${savedConversation.id}`);
  }
}
