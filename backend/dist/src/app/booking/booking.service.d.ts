import { Repository } from 'typeorm';
import { Booking, Service, SalonResource, BookingQueue, ServiceRecord } from '../common/entities';
import { CreateBookingDto } from './dto';
export declare class BookingService {
    private readonly bookingRepository;
    private readonly serviceRepository;
    private readonly resourceRepository;
    private readonly queueRepository;
    private readonly serviceRecordRepository;
    constructor(bookingRepository: Repository<Booking>, serviceRepository: Repository<Service>, resourceRepository: Repository<SalonResource>, queueRepository: Repository<BookingQueue>, serviceRecordRepository: Repository<ServiceRecord>);
    checkAvailability(branchId: string, date: Date, serviceId: string): Promise<{
        availableSlots: Date[];
    }>;
    createBooking(dto: CreateBookingDto): Promise<{
        booking: Booking;
        warning: boolean;
    }>;
    completeBooking(bookingId: string): Promise<Booking>;
    private predictQueueCongestion;
    private getStartAndEndOfDay;
    findAllForScheduler(date: Date, branchId?: string): Promise<{
        id: string;
        resourceId: string;
        title: string;
        start: Date;
        end: Date;
        extendedProps: {
            branchName: string;
            customerPhone: string;
        };
    }[]>;
}
