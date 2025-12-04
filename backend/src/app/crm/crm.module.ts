// apps/backend/src/app/crm/crm.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';

import { ServiceRecord, NotificationHistory, User } from '../common/entities';
import { CrmCronService } from './crm.cron';
import { CrmProcessor } from './crm.processor';
import { CrmService } from './crm.service';
import { CrmController } from './crm.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceRecord, NotificationHistory, User]),
    BullModule.registerQueue({
      name: 'reminders',
      // Connection details can be added here if not default
      // connection: {
      //   host: 'localhost',
      //   port: 6379,
      // },
    }),
  ],
  providers: [
    CrmCronService,
    CrmProcessor,
    CrmService,
  ],
  controllers: [
    CrmController,
  ],
})
export class CrmModule {}
