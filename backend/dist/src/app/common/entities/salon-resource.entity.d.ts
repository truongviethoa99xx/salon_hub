import { Branch } from './branch.entity';
import { ResourceType } from '../enums';
export declare class SalonResource {
    id: string;
    branch: Branch;
    type: ResourceType;
    name: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}
