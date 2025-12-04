export interface QueueState {
    waiting: any[];
    washing: any[];
}
export declare const useQueueSocket: (branchId: string) => {
    queueState: QueueState;
    isConnected: boolean;
};
