import { ReportingService } from './reporting.service';
import { ReportQueryDto } from './dto/report-query.dto';
export declare class ReportingController {
    private readonly reportingService;
    constructor(reportingService: ReportingService);
    getRevenueReport(query: ReportQueryDto): Promise<{
        date: string;
        totalRevenue: number;
    }[]>;
    getStaffPerformanceReport(query: ReportQueryDto): Promise<{
        stylistId: string;
        stylistName: string;
        totalServices: number;
        totalRevenue: number;
    }[]>;
}
