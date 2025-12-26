# Salon Hub Backend

Backend API cho hệ thống quản lý salon được xây dựng bằng NestJS và PostgreSQL.

## 🚀 Cài đặt và Chạy

### 1. Cài đặt Dependencies

```bash
npm install
```

### 2. Tạo Database

```bash
# Tạo database
createdb salon_hub

# Hoặc sử dụng psql
psql -U postgres
CREATE DATABASE salon_hub;
```

### 3. Chạy Schema SQL

```bash
psql -U postgres -d salon_hub -f db/schema.sql
```

### 4. Tạo file .env

Tạo file `.env` trong thư mục `bank_hub_backend/`:

```bash
cp .env.example .env
# Hoặc tạo thủ công với nội dung từ ENV_SETUP.md
```

Xem chi tiết tại [ENV_SETUP.md](./ENV_SETUP.md)

### 5. Chạy Development Server

```bash
npm run start:dev
```

Server sẽ chạy tại: `http://localhost:3000`
Swagger UI: `http://localhost:3000/api`

## 📁 Cấu trúc Project

```
src/
├── entities/          # TypeORM entities (tương ứng với database tables)
├── auth/              # Authentication module (JWT)
├── settings/          # Site settings module
├── branches/          # Branches module
├── bookings/          # Bookings module
├── admin/             # Admin module (quản lý users)
├── conversations/     # Conversations & Messages module (AI/Chat)
└── main.ts            # Entry point
```

## 🔌 API Endpoints

### Public APIs
- `GET /settings` - Lấy cấu hình branding
- `GET /branches` - Danh sách chi nhánh
- `POST /booking` - Tạo đơn đặt lịch
- `POST /auth/login` - Đăng nhập
- `POST /conversations` - Tạo conversation
- `POST /conversations/messages` - Tạo message

### Protected APIs (Yêu cầu JWT Token)
- `PUT /admin/branches/:id/queue` - Cập nhật trạng thái live (Admin/Receptionist)
- `GET /admin/users` - Danh sách users (Admin)
- `POST /admin/users` - Tạo user (Admin)
- `PATCH /admin/users/:id` - Cập nhật user (Admin)
- `DELETE /admin/users/:id` - Xóa user (Admin)
- `GET /conversations` - Danh sách conversations (Admin/Receptionist)

Xem chi tiết tại [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## 🗄️ Database

- **Database**: `salon_hub`
- **Host**: `localhost:5432`
- **Username**: `postgres`
- **Password**: `postgres`

Xem sơ đồ ánh xạ API ↔ Database tại [API_DATABASE_MAPPING.md](./API_DATABASE_MAPPING.md)

## 🔐 Authentication

Sử dụng JWT (JSON Web Token) cho authentication.

1. Đăng nhập qua `POST /auth/login` để nhận `access_token`
2. Gửi token trong header: `Authorization: Bearer <access_token>`

## 👥 Roles

- **ADMIN**: Toàn quyền truy cập
- **STYLIST**: Thợ cắt tóc
- **RECEPTIONIST**: Lễ tân (có thể cập nhật queue)
- **CUSTOMER**: Khách hàng

## 📝 Scripts

```bash
# Development
npm run start:dev

# Production build
npm run build
npm run start:prod

# Linting
npm run lint

# Testing
npm run test
npm run test:e2e
```

## 🔧 Environment Variables

**Bắt buộc:** Tạo file `.env` trước khi chạy ứng dụng.

Xem hướng dẫn chi tiết tại [ENV_SETUP.md](./ENV_SETUP.md)

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=salon_hub
PORT=3000
JWT_SECRET=your-secret-key-here
```

## 📖 Swagger Documentation

Swagger UI tự động generate từ DTOs và class-validator decorators.

- **Swagger UI**: `http://localhost:3000/api`
- **Tự động generate** - Không cần viết `@ApiProperty()` cho từng field
- **JWT Bearer Auth** - Đã được cấu hình sẵn

Xem chi tiết tại [SWAGGER_SETUP.md](./SWAGGER_SETUP.md)

## 📚 Tài liệu

- [API Documentation](./API_DOCUMENTATION.md) - Chi tiết các API endpoints
- [API Database Mapping](./API_DATABASE_MAPPING.md) - Sơ đồ ánh xạ API ↔ Database
- [Database Schema](./db/schema.sql) - SQL schema cho database
- [Swagger Setup](./SWAGGER_SETUP.md) - Hướng dẫn Swagger tự động generate
- [Environment Setup](./ENV_SETUP.md) - Hướng dẫn cấu hình .env

## 🛠️ Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT (Passport)
- **Validation**: class-validator, class-transformer
- **API Documentation**: Swagger/OpenAPI (tự động generate)
- **Configuration**: @nestjs/config

## 📄 License

UNLICENSED
