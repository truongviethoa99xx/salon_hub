import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from '../entities/branch.entity';
import { UpdateQueueDto } from './dto/update-queue.dto';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
  ) {}

  async findAll(): Promise<Branch[]> {
    return this.branchRepository.find({
      where: { is_active: true },
    });
  }

  async findOne(id: number): Promise<Branch> {
    const branch = await this.branchRepository.findOne({
      where: { id },
    });

    if (!branch) {
      throw new NotFoundException(`Branch with ID ${id} not found`);
    }

    return branch;
  }

  async updateQueue(id: number, updateQueueDto: UpdateQueueDto): Promise<Branch> {
    const branch = await this.findOne(id);

    if (updateQueueDto.live_busy_level !== undefined) {
      branch.live_busy_level = updateQueueDto.live_busy_level;
    }
    if (updateQueueDto.live_chairs_available !== undefined) {
      branch.live_chairs_available = updateQueueDto.live_chairs_available;
    }
    if (updateQueueDto.live_beds_waiting !== undefined) {
      branch.live_beds_waiting = updateQueueDto.live_beds_waiting;
    }

    return this.branchRepository.save(branch);
  }
}

