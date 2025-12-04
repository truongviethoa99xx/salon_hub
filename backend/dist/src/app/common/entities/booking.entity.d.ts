import { User } from './user.entity';
import { Branch } from './branch.entity';
import { Service } from './service.entity';
import { BookingStatus } from '../enums';
import { BookingQueue } from './booking-queue.entity';
export declare class Booking {
    id: string;
    customer: User;
    stylist: User;
    branch: Branch;
    service: Service;
    queue_entry: BookingQueue;
    start_time: Date;
    end_time: Date;
    status: BookingStatus;
    notes: string;
    created_at: Date;
    updated_at: Date;
}
