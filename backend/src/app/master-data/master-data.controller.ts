// apps/backend/src/app/master-data/master-data.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { MasterDataService } from './master-data.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('master-data')
export class MasterDataController {
  constructor(private readonly masterDataService: MasterDataService) {}

  @Get('branches')
  getBranches() {
    return this.masterDataService.findAllBranches();
  }

  // --- Services CRUD ---
  @Post('services')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  createService(@Body() createServiceDto: CreateServiceDto) {
    return this.masterDataService.createService(createServiceDto);
  }

  @Get('services')
  getServices() {
    return this.masterDataService.findAllServices();
  }

  @Get('services/:id')
  findOneService(@Param('id', ParseUUIDPipe) id: string) {
    return this.masterDataService.findOneService(id);
  }

  @Patch('services/:id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  updateService(@Param('id', ParseUUIDPipe) id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.masterDataService.updateService(id, updateServiceDto);
  }

  @Delete('services/:id')
  removeService(@Param('id', ParseUUIDPipe) id: string) {
    return this.masterDataService.removeService(id);
  }


  @Get('stylists')
  getStylists() {
    return this.masterDataService.findAllStylists();
  }
}
