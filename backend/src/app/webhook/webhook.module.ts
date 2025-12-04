// apps/backend/src/app/webhook/webhook.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { ChatGateway } from './chat.gateway';
import { SocialAccount, Conversation, User } from '../common/entities';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([SocialAccount, Conversation, User]),
    ConfigModule,
  ],
  controllers: [WebhookController],
  providers: [WebhookService, ChatGateway],
})
export class WebhookModule {}
