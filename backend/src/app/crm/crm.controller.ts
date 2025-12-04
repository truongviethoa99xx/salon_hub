// apps/backend/src/app/crm/crm.controller.ts
import { Controller, Get } from '@nestjs/common';
import { CrmService } from './crm.service';

@Controller('crm')
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  @Get('history')
  getNotificationHistory() {
    return this.crmService.getNotificationHistory();
  }
}
