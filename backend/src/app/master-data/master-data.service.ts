// apps/backend/src/app/master-data/master-data.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch, Service, User } from '../common/entities';
import { UserRole } from '../common/enums';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class MasterDataService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // --- Branch ---
  async findAllBranches(): Promise<Branch[]> {
    return this.branchRepository.find();
  }

  // --- Service ---
  async createService(createServiceDto: CreateServiceDto): Promise<Service> {
    const newService = this.serviceRepository.create(createServiceDto);
    return this.serviceRepository.save(newService);
  }

  async findAllServices(): Promise<Service[]> {
    return this.serviceRepository.find();
  }

  async findOneService(id: string): Promise<Service> {
    const service = await this.serviceRepository.findOne({ where: { id } });
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found.`);
    }
    return service;
  }

  async updateService(id: string, updateServiceDto: UpdateServiceDto): Promise<Service> {
    const service = await this.serviceRepository.preload({
      id,
      ...updateServiceDto,
    });
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found.`);
    }
    return this.serviceRepository.save(service);
  }

  async removeService(id: string): Promise<void> {
    const service = await this.findOneService(id);
    await this.serviceRepository.remove(service);
  }


  // --- Stylist ---
  async findAllStylists(): Promise<User[]> {
    return this.userRepository.find({
      where: { role: UserRole.STAFF },
      select: ['id', 'full_name', 'branch'], // Only return public info
    });
  }
}
