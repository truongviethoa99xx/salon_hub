import { Repository } from 'typeorm';
import { Branch, Service, User } from '../common/entities';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
export declare class MasterDataService {
    private readonly branchRepository;
    private readonly serviceRepository;
    private readonly userRepository;
    constructor(branchRepository: Repository<Branch>, serviceRepository: Repository<Service>, userRepository: Repository<User>);
    findAllBranches(): Promise<Branch[]>;
    createService(createServiceDto: CreateServiceDto): Promise<Service>;
    findAllServices(): Promise<Service[]>;
    findOneService(id: string): Promise<Service>;
    updateService(id: string, updateServiceDto: UpdateServiceDto): Promise<Service>;
    removeService(id: string): Promise<void>;
    findAllStylists(): Promise<User[]>;
}
