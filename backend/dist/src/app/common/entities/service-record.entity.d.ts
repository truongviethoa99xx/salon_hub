import { Booking } from './booking.entity';
import { User } from './user.entity';
export declare class ServiceRecord {
    id: string;
    booking: Booking;
    customer: User;
    service_date: string;
    recommended_return_date: string;
    notes: string;
    created_at: Date;
}
