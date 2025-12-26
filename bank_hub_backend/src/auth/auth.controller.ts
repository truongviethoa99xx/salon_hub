import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { RegisterCustomerDto, RegisterResponseDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ==================== CUSTOMER ====================

  @Post('customer/register')
  @ApiOperation({ summary: 'Đăng ký tài khoản khách hàng' })
  @ApiResponse({ status: 201, description: 'Đăng ký thành công', type: RegisterResponseDto })
  @ApiResponse({ status: 409, description: 'Số điện thoại hoặc email đã tồn tại' })
  async registerCustomer(@Body() dto: RegisterCustomerDto): Promise<RegisterResponseDto> {
    return this.authService.registerCustomer(dto);
  }

  @Post('customer/login')
  @ApiOperation({ summary: 'Đăng nhập cho khách hàng (Customer)' })
  @ApiResponse({ status: 200, description: 'Đăng nhập thành công', type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Thông tin đăng nhập không đúng' })
  @ApiResponse({ status: 403, description: 'Tài khoản không phải là khách hàng' })
  async loginCustomer(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.loginCustomer(loginDto);
  }

  // ==================== BARBER ====================

  @Post('barber/login')
  @ApiOperation({ summary: 'Đăng nhập cho thợ cắt tóc (Barber)' })
  @ApiResponse({ status: 200, description: 'Đăng nhập thành công', type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Thông tin đăng nhập không đúng' })
  @ApiResponse({ status: 403, description: 'Tài khoản không phải là Barber' })
  async loginBarber(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.loginBarber(loginDto);
  }

  // ==================== ADMIN & SUPER_ADMIN ====================

  @Post('admin/login')
  @ApiOperation({ summary: 'Đăng nhập cho Admin và Super Admin' })
  @ApiResponse({ status: 200, description: 'Đăng nhập thành công', type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Thông tin đăng nhập không đúng' })
  @ApiResponse({ status: 403, description: 'Tài khoản không có quyền truy cập' })
  async loginAdmin(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.loginAdmin(loginDto);
  }

  // ==================== LEGACY (backwards compatibility) ====================

  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập chung (legacy)' })
  @ApiResponse({
    status: 200,
    description: 'Đăng nhập thành công',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Thông tin đăng nhập không hợp lệ' })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }
}

