"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../common/entities");
const enums_1 = require("../common/enums");
let ReportingService = class ReportingService {
    constructor(bookingRepository, serviceRepository, userRepository, branchRepository) {
        this.bookingRepository = bookingRepository;
        this.serviceRepository = serviceRepository;
        this.userRepository = userRepository;
        this.branchRepository = branchRepository;
    }
    async getRevenueReport(startDate, endDate, branchId) {
        const queryBuilder = this.bookingRepository.createQueryBuilder('booking')
            .leftJoinAndSelect('booking.service', 'service')
            .select("TO_CHAR(booking.start_time, 'YYYY-MM-DD')", 'date')
            .addSelect('SUM(service.price)', 'totalRevenue')
            .where('booking.status = :status', { status: enums_1.BookingStatus.COMPLETED })
            .andWhere('booking.start_time BETWEEN :startDate AND :endDate', { startDate, endDate });
        if (branchId) {
            queryBuilder.andWhere('booking.branch.id = :branchId', { branchId });
        }
        queryBuilder.groupBy("TO_CHAR(booking.start_time, 'YYYY-MM-DD')")
            .orderBy('date', 'ASC');
        return queryBuilder.getRawMany();
    }
    async getStaffPerformanceReport(startDate, endDate, branchId) {
        const queryBuilder = this.bookingRepository.createQueryBuilder('booking')
            .leftJoinAndSelect('booking.stylist', 'stylist')
            .leftJoinAndSelect('booking.service', 'service')
            .select('stylist.id', 'stylistId')
            .addSelect('stylist.full_name', 'stylistName')
            .addSelect('COUNT(booking.id)', 'totalServices')
            .addSelect('SUM(service.price)', 'totalRevenue')
            .where('booking.status = :status', { status: enums_1.BookingStatus.COMPLETED })
            .andWhere('booking.start_time BETWEEN :startDate AND :endDate', { startDate, endDate })
            .andWhere('stylist.role = :role', { role: enums_1.UserRole.STAFF });
        if (branchId) {
            queryBuilder.andWhere('booking.branch.id = :branchId', { branchId });
        }
        queryBuilder.groupBy('stylist.id')
            .addGroupBy('stylist.full_name')
            .orderBy('stylistName', 'ASC');
        return queryBuilder.getRawMany();
    }
};
exports.ReportingService = ReportingService;
exports.ReportingService = ReportingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Booking)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Service)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.Branch)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReportingService);
//# sourceMappingURL=reporting.service.js.map