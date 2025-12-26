# Swagger Setup - Tự động Generate từ DTOs

## ✅ Đã cấu hình

Hệ thống đã được setup với **@nestjs/swagger + DTO + class-validator + Nest Swagger Plugin** để tự động generate Swagger documentation mà không cần viết `@ApiProperty()` cho từng field.

## 🔧 Cấu hình

### 1. Nest CLI Plugin (`nest-cli.json`)

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "@nestjs/swagger",
        "options": {
          "classValidatorShim": true,
          "introspectComments": true
        }
      }
    ]
  }
}
```

**Tính năng:**
- `classValidatorShim: true` - Tự động convert class-validator decorators thành Swagger schema
- `introspectComments: true` - Sử dụng JSDoc comments để generate descriptions

### 2. Swagger Module (`main.ts`)

- Swagger UI tại: `http://localhost:3000/api`
- JWT Bearer Auth đã được cấu hình
- Tags được tổ chức theo modules

## 📝 Cách sử dụng

### DTO với class-validator (Tự động generate)

```typescript
import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  customer_name: string;  // ✅ Tự động thành string, required

  @IsInt()
  @Min(1)
  branch_id: number;  // ✅ Tự động thành integer, minimum: 1
}
```

**Không cần viết:**
```typescript
// ❌ KHÔNG CẦN
@ApiProperty({ description: 'Tên khách hàng', type: String, required: true })
customer_name: string;
```

### Controllers với Swagger Decorators

```typescript
@ApiTags('bookings')  // ✅ Nhóm endpoints
@Controller('booking')
export class BookingsController {
  @Post()
  @ApiOperation({ summary: 'Tạo đơn đặt lịch mới' })  // ✅ Mô tả endpoint
  @ApiResponse({ status: 201, type: Booking })  // ✅ Response schema
  async create(@Body() createBookingDto: CreateBookingDto) {
    // ...
  }
}
```

### Protected Routes với JWT

```typescript
@ApiBearerAuth('JWT-auth')  // ✅ Thêm nút Authorize trong Swagger UI
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
  // ...
}
```

## 🎯 Lợi ích

1. **Tự động generate** - Không cần viết `@ApiProperty()` cho từng field
2. **Validation rules** - class-validator decorators tự động thành Swagger constraints
3. **Type safety** - TypeScript types được tự động convert
4. **JSDoc support** - Comments trong code thành descriptions trong Swagger

## 📖 Ví dụ

### DTO với validation

```typescript
export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;  // → Swagger: string, required

  @IsString()
  @IsNotEmpty()
  password: string;  // → Swagger: string, required, format: password
}
```

### Entity với relations

```typescript
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;  // → Swagger: integer, read-only

  @Column({ type: 'varchar', length: 100 })
  customer_name: string;  // → Swagger: string, maxLength: 100
}
```

## 🔍 Truy cập Swagger UI

1. Chạy server: `npm run start:dev`
2. Mở browser: `http://localhost:3000/api`
3. Test API trực tiếp trong Swagger UI
4. Authorize với JWT token từ `/auth/login`

## 📚 Tài liệu tham khảo

- [NestJS Swagger](https://docs.nestjs.com/openapi/introduction)
- [Swagger Plugin](https://docs.nestjs.com/openapi/cli-plugin)
- [class-validator](https://github.com/typestack/class-validator)

