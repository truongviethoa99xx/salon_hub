import { CrmService } from './crm.service';
export declare class CrmController {
    private readonly crmService;
    constructor(crmService: CrmService);
    getNotificationHistory(): Promise<import("../common/entities").NotificationHistory[]>;
}
