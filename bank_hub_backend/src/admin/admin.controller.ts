import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/enums';

@ApiTags('admin')
@ApiBearerAuth('JWT-auth')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  @ApiOperation({ summary: 'Lấy danh sách tất cả users' })
  @ApiResponse({ status: 200, description: 'Danh sách users', type: [User] })
  async findAll(): Promise<User[]> {
    return this.adminService.findAll();
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Lấy thông tin chi tiết user' })
  @ApiResponse({ status: 200, description: 'Thông tin user', type: User })
  @ApiResponse({ status: 404, description: 'Không tìm thấy user' })
  async findOne(@Param('id') id: string): Promise<User> {
    return this.adminService.findOne(+id);
  }

  @Post('users')
  @ApiOperation({ summary: 'Tạo user mới' })
  @ApiResponse({ status: 201, description: 'User được tạo thành công', type: User })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.adminService.create(createUserDto);
  }

  @Patch('users/:id')
  @ApiOperation({ summary: 'Cập nhật thông tin user' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công', type: User })
  @ApiResponse({ status: 404, description: 'Không tìm thấy user' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.adminService.update(+id, updateUserDto);
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Xóa user' })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy user' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.adminService.remove(+id);
  }
}

