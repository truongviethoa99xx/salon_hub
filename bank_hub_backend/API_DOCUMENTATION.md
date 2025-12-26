# API Documentation - Salon Hub Backend

## Tổng quan

Backend API được xây dựng bằng NestJS, kết nối với PostgreSQL database `salon_hub`.

## Database Connection

- **Host**: localhost:5432
- **Database**: salon_hub
- **Username**: postgres
- **Password**: postgres

## API Endpoints

### 1. Authentication

#### POST /auth/login
Đăng nhập và nhận JWT token.

**Request Body:**
```json
{
  "username": "admin",
  "password": "password"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "full_name": "Super Admin",
    "role": "ADMIN"
  }
}
```

---

### 2. Settings (Public)

#### GET /settings
Lấy cấu hình branding và hero section cho Landing Page.

**Response:**
```json
{
  "id": 1,
  "brand_name": "Smart Salon",
  "theme_color": "#f59e0b",
  "logo_url": "...",
  "hero_title": "Đẹp Trai Tức Thì",
  "hero_subtitle": "...",
  "hero_video_url": "...",
  "contact_hotline": "...",
  "social_facebook": "...",
  "social_tiktok": "...",
  "social_zalo": "...",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

---

### 3. Branches (Public)

#### GET /branches
Lấy danh sách tất cả chi nhánh đang hoạt động, bao gồm trạng thái live (busy_level, chairs_available, beds_waiting).

**Response:**
```json
[
  {
    "id": 1,
    "name": "Chi nhánh Quận 1",
    "address": "123 Nguyễn Huệ, Q1, HCM",
    "phone_hotline": "0901234567",
    "map_url": "...",
    "live_busy_level": "MEDIUM",
    "live_chairs_available": 3,
    "live_beds_waiting": 2,
    "is_active": true
  }
]
```

---

### 4. Admin - Branches Queue (Protected)

#### PUT /admin/branches/:id/queue
Cập nhật trạng thái live của chi nhánh (chỉ Admin/Receptionist).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "live_busy_level": "HIGH",
  "live_chairs_available": 2,
  "live_beds_waiting": 5
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Chi nhánh Quận 1",
  "live_busy_level": "HIGH",
  "live_chairs_available": 2,
  "live_beds_waiting": 5,
  ...
}
```

---

### 5. Booking (Public)

#### POST /booking
Tạo đơn đặt lịch mới (hỗ trợ khách vãng lai).

**Request Body:**
```json
{
  "customer_id": 1,  // Optional - null nếu khách vãng lai
  "customer_name": "Nguyễn Văn A",
  "customer_phone": "0901234567",
  "branch_id": 1,
  "stylist_id": 2,  // Optional - null nếu chọn ngẫu nhiên
  "appointment_date": "2024-01-15",
  "appointment_time": "14:30",
  "note": "Khách muốn cắt ngắn",
  "services": [
    {
      "service_id": 1,
      "price_at_booking": 150000
    }
  ],
  "products": [  // Optional
    {
      "product_id": 1,
      "quantity": 2,
      "price_at_sale": 50000
    }
  ]
}
```

**Response:**
```json
{
  "id": 1,
  "booking_code": "#BK1705123456",
  "customer_id": 1,
  "customer_name": "Nguyễn Văn A",
  "customer_phone": "0901234567",
  "branch_id": 1,
  "stylist_id": 2,
  "appointment_date": "2024-01-15",
  "appointment_time": "14:30",
  "status": "PENDING",
  "note": "Khách muốn cắt ngắn",
  "booking_services": [...],
  "booking_products": [...],
  "created_at": "2024-01-10T10:00:00Z"
}
```

**Lưu ý:** API này sử dụng Transaction để đảm bảo tính toàn vẹn dữ liệu.

---

### 6. Admin - Users Management (Protected)

#### GET /admin/users
Lấy danh sách tất cả users (chỉ Admin).

**Headers:**
```
Authorization: Bearer <access_token>
```

#### GET /admin/users/:id
Lấy thông tin chi tiết user.

#### POST /admin/users
Tạo user mới.

**Request Body:**
```json
{
  "username": "staff1",
  "password_hash": "hashed_password",
  "full_name": "Nhân viên 1",
  "phone": "0901234567",
  "email": "staff1@example.com",
  "role": "RECEPTIONIST",
  "avatar_url": "..."
}
```

#### PATCH /admin/users/:id
Cập nhật thông tin user.

#### DELETE /admin/users/:id
Xóa user.

---

### 7. Conversations & Messages (AI/Chat)

#### POST /conversations
Tạo conversation mới.

**Request Body:**
```json
{
  "user_id": 1,  // Optional
  "customer_name": "Khách hàng",
  "platform": "WEB",
  "platform_id": "user_123"
}
```

#### GET /conversations
Lấy danh sách conversations (chỉ Admin/Receptionist).

**Headers:**
```
Authorization: Bearer <access_token>
```

#### GET /conversations/:id
Lấy chi tiết conversation kèm messages (chỉ Admin/Receptionist).

#### POST /conversations/messages
Tạo message mới trong conversation.

**Request Body:**
```json
{
  "conversation_id": 1,
  "sender_type": "USER",
  "content": "Xin chào, tôi muốn đặt lịch"
}
```

#### GET /conversations/:id/messages
Lấy danh sách messages trong conversation.

---

## Authentication & Authorization

### JWT Token
Sau khi đăng nhập thành công, client cần gửi token trong header:
```
Authorization: Bearer <access_token>
```

### Roles
- **ADMIN**: Toàn quyền truy cập
- **STYLIST**: Thợ cắt tóc
- **RECEPTIONIST**: Lễ tân (có thể cập nhật queue)
- **CUSTOMER**: Khách hàng

### Protected Routes
Các route có prefix `/admin` yêu cầu:
1. JWT token hợp lệ
2. Role phù hợp (thường là ADMIN hoặc RECEPTIONIST)

---

## Database Schema

Xem file `db/schema.sql` để biết chi tiết cấu trúc database.

### Các bảng chính:
- `users` - Người dùng (Admin, Staff, Customer)
- `site_settings` - Cấu hình branding
- `branches` - Chi nhánh & trạng thái live
- `bookings` - Đơn đặt lịch
- `booking_services` - Chi tiết dịch vụ trong đơn
- `booking_products` - Sản phẩm mua kèm
- `conversations` - Cuộc hội thoại
- `messages` - Tin nhắn
- `shampoo_queue` - Hàng chờ gội đầu (tính năng ẩn)

---

## Setup & Run

1. **Tạo database:**
```bash
createdb salon_hub
```

2. **Chạy schema SQL:**
```bash
psql -U postgres -d salon_hub -f db/schema.sql
```

3. **Cài đặt dependencies:**
```bash
npm install
```

4. **Chạy development server:**
```bash
npm run start:dev
```

Server sẽ chạy tại: `http://localhost:3000`

---

## Environment Variables

Tạo file `.env` (optional):
```
PORT=3000
JWT_SECRET=your-secret-key-here
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=salon_hub
```

