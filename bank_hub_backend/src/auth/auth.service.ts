import { Injectable, UnauthorizedException, ConflictException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { UserRole } from '../entities/enums';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { RegisterCustomerDto, RegisterResponseDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // Validate user by username, phone or email
  async validateUser(identifier: string, password: string): Promise<User | null> {
    // Try to find by username, phone, or email
    const user = await this.userRepository.findOne({
      where: [
        { username: identifier },
        { phone: identifier },
        { email: identifier },
      ],
    });

    if (!user || !user.password_hash) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  // Generate JWT token
  private generateToken(user: User): string {
    const payload = {
      sub: user.id,
      username: user.username || user.phone,
      phone: user.phone,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }

  // Build auth response
  private buildAuthResponse(user: User): AuthResponseDto {
    return {
      access_token: this.generateToken(user),
      user: {
        id: user.id,
        username: user.username || user.phone,
        full_name: user.full_name,
        phone: user.phone,
        email: user.email,
        role: user.role,
      },
    };
  }

  // ==================== CUSTOMER ====================

  async registerCustomer(dto: RegisterCustomerDto): Promise<RegisterResponseDto> {
    // Check if phone already exists
    const existingPhone = await this.userRepository.findOne({
      where: { phone: dto.phone },
    });
    if (existingPhone) {
      throw new ConflictException('Số điện thoại đã được sử dụng');
    }

    // Check if email already exists (if provided)
    if (dto.email) {
      const existingEmail = await this.userRepository.findOne({
        where: { email: dto.email },
      });
      if (existingEmail) {
        throw new ConflictException('Email đã được sử dụng');
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    // Create user with CUSTOMER role
    const user = this.userRepository.create({
      full_name: dto.full_name,
      phone: dto.phone,
      email: dto.email || null,
      password_hash: hashedPassword,
      role: UserRole.CUSTOMER,
    });

    const savedUser = await this.userRepository.save(user);

    return {
      message: 'Đăng ký thành công',
      user: {
        id: savedUser.id,
        full_name: savedUser.full_name,
        phone: savedUser.phone,
        email: savedUser.email,
        role: savedUser.role,
      },
    };
  }

  async loginCustomer(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.validateUser(loginDto.username, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Số điện thoại/email hoặc mật khẩu không đúng');
    }

    if (user.role !== UserRole.CUSTOMER) {
      throw new ForbiddenException('Tài khoản không phải là khách hàng');
    }

    return this.buildAuthResponse(user);
  }

  // ==================== BARBER ====================

  async loginBarber(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.validateUser(loginDto.username, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Thông tin đăng nhập không đúng');
    }

    if (user.role !== UserRole.BARBER) {
      throw new ForbiddenException('Tài khoản không phải là Barber');
    }

    return this.buildAuthResponse(user);
  }

  // ==================== ADMIN & SUPER_ADMIN ====================

  async loginAdmin(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.validateUser(loginDto.username, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Thông tin đăng nhập không đúng');
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.SUPER_ADMIN) {
      throw new ForbiddenException('Tài khoản không có quyền truy cập');
    }

    return this.buildAuthResponse(user);
  }

  // ==================== LEGACY (keep for backwards compatibility) ====================

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.validateUser(loginDto.username, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.buildAuthResponse(user);
  }
}

