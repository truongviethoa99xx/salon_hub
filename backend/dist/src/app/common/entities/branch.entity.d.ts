import { SalonResource } from './salon-resource.entity';
import { User } from './user.entity';
import { Booking } from './booking.entity';
export declare class Branch {
    id: string;
    name: string;
    address: string;
    phone_number: string;
    staff: User[];
    resources: SalonResource[];
    bookings: Booking[];
    created_at: Date;
    updated_at: Date;
}
