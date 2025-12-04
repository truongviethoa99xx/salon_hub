import { User } from './user.entity';
import { Branch } from './branch.entity';
export declare class StylistShift {
    id: string;
    stylist: User;
    branch: Branch;
    shift_date: string;
    start_time: string;
    end_time: string;
    created_at: Date;
    updated_at: Date;
}
