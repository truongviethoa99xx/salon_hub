import { Repository } from 'typeorm';
import { Booking, BookingQueue } from '../common/entities';
import { QueueGateway } from './queue.gateway';
import { QueueStatus } from '../common/enums';
export declare class QueueService {
    private readonly bookingRepository;
    private readonly queueRepository;
    private readonly queueGateway;
    constructor(bookingRepository: Repository<Booking>, queueRepository: Repository<BookingQueue>, queueGateway: QueueGateway);
    joinQueue(bookingId: string): Promise<BookingQueue>;
    getNextCustomer(branchId: string): Promise<BookingQueue | null>;
    updateQueueItemStatus(queueItemId: string, status: QueueStatus, staffId: string): Promise<BookingQueue>;
    getQueueState(branchId: string): Promise<{
        waiting: BookingQueue[];
        washing: BookingQueue[];
    }>;
    private broadcastCurrentQueueState;
}
