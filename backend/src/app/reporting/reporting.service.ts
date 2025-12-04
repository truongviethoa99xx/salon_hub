// apps/backend/src/app/reporting/reporting.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, SelectQueryBuilder } from 'typeorm';
import { Booking, Service, User, Branch } from '../common/entities';
import { BookingStatus, UserRole } from '../common/enums';

@Injectable()
export class ReportingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
  ) {}

  async getRevenueReport(startDate: Date, endDate: Date, branchId?: string): Promise<{ date: string; totalRevenue: number }[]> {
    const queryBuilder = this.bookingRepository.createQueryBuilder('booking')
      .leftJoinAndSelect('booking.service', 'service')
      .select("TO_CHAR(booking.start_time, 'YYYY-MM-DD')", 'date')
      .addSelect('SUM(service.price)', 'totalRevenue')
      .where('booking.status = :status', { status: BookingStatus.COMPLETED })
      .andWhere('booking.start_time BETWEEN :startDate AND :endDate', { startDate, endDate });

    if (branchId) {
      queryBuilder.andWhere('booking.branch.id = :branchId', { branchId });
    }

    queryBuilder.groupBy("TO_CHAR(booking.start_time, 'YYYY-MM-DD')")
      .orderBy('date', 'ASC');

    return queryBuilder.getRawMany();
  }

  async getStaffPerformanceReport(
    startDate: Date,
    endDate: Date,
    branchId?: string,
  ): Promise<{ stylistId: string; stylistName: string; totalServices: number; totalRevenue: number }[]> {
    const queryBuilder = this.bookingRepository.createQueryBuilder('booking')
      .leftJoinAndSelect('booking.stylist', 'stylist')
      .leftJoinAndSelect('booking.service', 'service')
      .select('stylist.id', 'stylistId')
      .addSelect('stylist.full_name', 'stylistName')
      .addSelect('COUNT(booking.id)', 'totalServices')
      .addSelect('SUM(service.price)', 'totalRevenue')
      .where('booking.status = :status', { status: BookingStatus.COMPLETED })
      .andWhere('booking.start_time BETWEEN :startDate AND :endDate', { startDate, endDate })
      .andWhere('stylist.role = :role', { role: UserRole.STAFF }); // Ensure it's a staff member

    if (branchId) {
      queryBuilder.andWhere('booking.branch.id = :branchId', { branchId });
    }

    queryBuilder.groupBy('stylist.id')
      .addGroupBy('stylist.full_name')
      .orderBy('stylistName', 'ASC');

    return queryBuilder.getRawMany();
  }
}
