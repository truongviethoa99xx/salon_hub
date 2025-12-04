import { QueueService } from './queue.service';
import { UpdateQueueStatusDto } from './dto';
export declare class QueueController {
    private readonly queueService;
    constructor(queueService: QueueService);
    joinQueue(bookingId: string): Promise<import("../common/entities").BookingQueue>;
    getNextCustomer(branchId: string): Promise<import("../common/entities").BookingQueue>;
    getQueueState(branchId: string): Promise<{
        waiting: import("../common/entities").BookingQueue[];
        washing: import("../common/entities").BookingQueue[];
    }>;
    updateQueueItemStatus(id: string, updateQueueStatusDto: UpdateQueueStatusDto): Promise<import("../common/entities").BookingQueue>;
}
