import { Booking } from './booking.entity';
import { User } from './user.entity';
import { QueueStatus } from '../enums';
export declare class BookingQueue {
    id: string;
    booking: Booking;
    status: QueueStatus;
    priority_score: number;
    entered_at: Date;
    started_at: Date;
    finished_at: Date;
    serviced_by: User;
    created_at: Date;
    updated_at: Date;
}
