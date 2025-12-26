# Environment Variables Setup

## 📝 Tạo file .env

Tạo file `.env` trong thư mục `bank_hub_backend/` với nội dung sau:

```env
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

## 🔒 Security Notes

1. **Không commit file `.env` vào Git** - File này đã được thêm vào `.gitignore`
2. **Đổi JWT_SECRET** - Sử dụng một secret key mạnh trong production
3. **File `.env.example`** - Đã có sẵn để tham khảo

## ✅ Kiểm tra kết nối Database

Sau khi tạo file `.env`, kiểm tra kết nối:

```bash
# Test PostgreSQL connection
psql -U postgres -d salon_hub -c "SELECT 1;"
```

Nếu thành công, bạn sẽ thấy:
```
 ?column? 
----------
        1
```

## 🚀 Chạy ứng dụng

```bash
npm run start:dev
```

Server sẽ đọc config từ file `.env` và kết nối database tự động.

## 🔧 Troubleshooting

### Lỗi: "Cannot connect to database"

1. Kiểm tra PostgreSQL đang chạy:
```bash
pg_isready
```

2. Kiểm tra thông tin trong `.env`:
```bash
cat .env
```

3. Test kết nối thủ công:
```bash
psql -U postgres -d salon_hub
```

### Lỗi: "Database does not exist"

Tạo database:
```bash
createdb salon_hub
# hoặc
psql -U postgres -c "CREATE DATABASE salon_hub;"
```

### Lỗi: "Permission denied"

Kiểm tra quyền user postgres:
```bash
psql -U postgres -c "\du"
```

