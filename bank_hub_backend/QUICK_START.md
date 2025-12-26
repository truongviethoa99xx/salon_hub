# 🚀 Quick Start Guide

## Bước 1: Tạo file .env

Tạo file `.env` trong thư mục `bank_hub_backend/` với nội dung sau:

```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=salon_hub

# Application
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**Lưu ý:** Đổi `JWT_SECRET` thành một giá trị bí mật mạnh trong production!

## Bước 2: Tạo Database

```bash
# Tạo database
createdb salon_hub

# Hoặc dùng psql
psql -U postgres -c "CREATE DATABASE salon_hub;"
```

## Bước 3: Chạy Schema SQL

```bash
psql -U postgres -d salon_hub -f db/schema.sql
```

## Bước 4: Cài đặt Dependencies (nếu chưa có)

```bash
npm install
```

## Bước 5: Chạy Server

```bash
npm run start:dev
```

## ✅ Kiểm tra

1. **Server**: `http://localhost:3000`
2. **Swagger UI**: `http://localhost:3000/api`
3. **Health Check**: `http://localhost:3000/settings`

## 🔐 Test Authentication

1. Mở Swagger UI: `http://localhost:3000/api`
2. Tìm endpoint `POST /auth/login`
3. Click "Try it out"
4. Nhập:
   ```json
   {
     "username": "admin",
     "password": "password_from_database"
   }
   ```
5. Copy `access_token` từ response
6. Click nút "Authorize" ở đầu trang Swagger
7. Nhập: `Bearer <access_token>`
8. Bây giờ bạn có thể test các protected endpoints!

## 📚 Tài liệu thêm

- [README.md](./README.md) - Tài liệu đầy đủ
- [ENV_SETUP.md](./ENV_SETUP.md) - Chi tiết về .env
- [SWAGGER_SETUP.md](./SWAGGER_SETUP.md) - Hướng dẫn Swagger
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Chi tiết API endpoints

## 🐛 Troubleshooting

### Lỗi: "Cannot connect to database"

```bash
# Kiểm tra PostgreSQL đang chạy
pg_isready

# Test kết nối
psql -U postgres -d salon_hub -c "SELECT 1;"
```

### Lỗi: "Database does not exist"

```bash
createdb salon_hub
```

### Lỗi: "Port 3000 already in use"

Đổi PORT trong file `.env`:
```env
PORT=3001
```

