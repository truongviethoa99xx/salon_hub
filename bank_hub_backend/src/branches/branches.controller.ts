import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BranchesService } from './branches.service';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { Branch } from '../entities/branch.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/enums';

@ApiTags('branches')
@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả chi nhánh đang hoạt động' })
  @ApiResponse({ status: 200, description: 'Danh sách chi nhánh', type: [Branch] })
  async findAll(): Promise<Branch[]> {
    return this.branchesService.findAll();
  }
}

@ApiTags('admin')
@ApiBearerAuth('JWT-auth')
@Controller('admin/branches')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.RECEPTIONIST)
export class AdminBranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Put(':id/queue')
  @ApiOperation({ summary: 'Cập nhật trạng thái live của chi nhánh' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công', type: Branch })
  @ApiResponse({ status: 404, description: 'Không tìm thấy chi nhánh' })
  async updateQueue(
    @Param('id') id: string,
    @Body() updateQueueDto: UpdateQueueDto,
  ): Promise<Branch> {
    return this.branchesService.updateQueue(+id, updateQueueDto);
  }
}

