// apps/backend/src/app/master-data/master-data.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterDataController } from './master-data.controller';
import { MasterDataService } from './master-data.service';
import { Branch, Service, User } from '../common/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, Service, User])],
  controllers: [MasterDataController],
  providers: [MasterDataService],
})
export class MasterDataModule {}
