import { Repository } from 'typeorm';
import { StylistShift } from '../common/entities';
import { CreateShiftDto } from './create-shift.dto';
export declare class ShiftService {
    private readonly shiftRepository;
    constructor(shiftRepository: Repository<StylistShift>);
    create(createShiftDto: CreateShiftDto): Promise<StylistShift>;
    findByDate(date: string): Promise<StylistShift[]>;
}
