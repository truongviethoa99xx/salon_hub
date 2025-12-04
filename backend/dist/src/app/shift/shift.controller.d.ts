import { ShiftService } from './shift.service';
import { CreateShiftDto } from './create-shift.dto';
export declare class ShiftController {
    private readonly shiftService;
    constructor(shiftService: ShiftService);
    create(createShiftDto: CreateShiftDto): Promise<import("../common/entities").StylistShift>;
    findByDate(date: string): Promise<import("../common/entities").StylistShift[]>;
}
