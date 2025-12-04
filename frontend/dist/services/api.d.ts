export declare const getBranches: () => Promise<any>;
export declare const getServices: () => Promise<any>;
export declare const getStylists: () => Promise<any>;
export declare const createService: (serviceData: any) => Promise<any>;
export declare const updateService: (id: string, serviceData: any) => Promise<any>;
export declare const removeService: (id: string) => Promise<undefined>;
export declare const checkAvailability: (params: {
    branchId: string;
    date: string;
    serviceId: string;
}) => Promise<any>;
export declare const createBooking: (bookingData: any) => Promise<any>;
export declare const getSchedulerEvents: (date: string, branchId?: string) => Promise<any>;
export declare const getQueueState: (branchId: string) => Promise<any>;
export declare const updateQueueItemStatus: (itemId: string, status: string, staffId: string) => Promise<any>;
export declare const joinQueue: (bookingId: string) => Promise<any>;
export declare const createShift: (shiftData: any) => Promise<any>;
