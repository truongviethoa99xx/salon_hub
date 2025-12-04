import { MasterDataService } from './master-data.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
export declare class MasterDataController {
    private readonly masterDataService;
    constructor(masterDataService: MasterDataService);
    getBranches(): Promise<import("../common/entities").Branch[]>;
    createService(createServiceDto: CreateServiceDto): Promise<import("../common/entities").Service>;
    getServices(): Promise<import("../common/entities").Service[]>;
    findOneService(id: string): Promise<import("../common/entities").Service>;
    updateService(id: string, updateServiceDto: UpdateServiceDto): Promise<import("../common/entities").Service>;
    removeService(id: string): Promise<void>;
    getStylists(): Promise<import("../common/entities").User[]>;
}
