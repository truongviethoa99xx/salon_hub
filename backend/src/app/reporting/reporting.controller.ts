// apps/backend/src/app/reporting/reporting.controller.ts
import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReportingService } from './reporting.service';
import { ReportQueryDto } from './dto/report-query.dto';

@Controller('reports')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class ReportingController {
  constructor(private readonly reportingService: ReportingService) {}

  @Get('revenue')
  async getRevenueReport(@Query() query: ReportQueryDto) {
    const { startDate, endDate, branchId } = query;
    return this.reportingService.getRevenueReport(new Date(startDate), new Date(endDate), branchId);
  }

  @Get('staff-performance')
  async getStaffPerformanceReport(@Query() query: ReportQueryDto) {
    const { startDate, endDate, branchId } = query;
    return this.reportingService.getStaffPerformanceReport(new Date(startDate), new Date(endDate), branchId);
  }
}
