import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    getSchedulerEvents(date: string, branchId?: string): Promise<{
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
    checkAvailability(branchId: string, date: string, serviceId: string): Promise<{
        availableSlots: Date[];
    }>;
    createBooking(createBookingDto: CreateBookingDto): Promise<{
        booking: import("../common/entities").Booking;
        warning: boolean;
    }>;
}
