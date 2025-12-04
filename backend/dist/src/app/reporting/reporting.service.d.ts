import { Repository } from 'typeorm';
import { Booking, Service, User, Branch } from '../common/entities';
export declare class ReportingService {
    private readonly bookingRepository;
    private readonly serviceRepository;
    private readonly userRepository;
    private readonly branchRepository;
    constructor(bookingRepository: Repository<Booking>, serviceRepository: Repository<Service>, userRepository: Repository<User>, branchRepository: Repository<Branch>);
    getRevenueReport(startDate: Date, endDate: Date, branchId?: string): Promise<{
        date: string;
        totalRevenue: number;
    }[]>;
    getStaffPerformanceReport(startDate: Date, endDate: Date, branchId?: string): Promise<{
        stylistId: string;
        stylistName: string;
        totalServices: number;
        totalRevenue: number;
    }[]>;
}
