import { Queue } from 'bullmq';
export declare class CrmCronService {
    private readonly remindersQueue;
    private readonly logger;
    constructor(remindersQueue: Queue);
    handleCron(): Promise<void>;
}
