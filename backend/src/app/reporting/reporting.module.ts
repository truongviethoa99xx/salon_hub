// apps/backend/src/app/reporting/reporting.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportingController } from './reporting.controller';
import { ReportingService } from './reporting.service';
import { Booking, Service, User, Branch } from '../common/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, Service, User, Branch]),
  ],
  controllers: [ReportingController],
  providers: [ReportingService],
})
export class ReportingModule {}
