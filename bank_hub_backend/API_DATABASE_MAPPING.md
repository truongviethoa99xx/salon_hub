# Sơ đồ ánh xạ API ↔ Database

## 1. API /settings → Bảng site_settings

**Endpoint:** `GET /settings`

**Database Table:** `site_settings`

**Mapping:**
- API trả về toàn bộ cấu hình từ bảng `site_settings`
- Bảng này chỉ có 1 dòng duy nhất (id = 1)
- Lưu cấu hình Branding và Hero section

**SQL Query:**
```sql
SELECT * FROM site_settings LIMIT 1;
```

---

## 2. API /branches → Bảng branches

**Endpoints:**
- `GET /branches` - Lấy danh sách chi nhánh (Public)
- `PUT /admin/branches/:id/queue` - Cập nhật trạng thái live (Protected)

**Database Table:** `branches`

**Mapping:**
- `GET /branches` → `SELECT * FROM branches WHERE is_active = true`
- `PUT /admin/branches/:id/queue` → `UPDATE branches SET live_busy_level = ?, live_chairs_available = ?, live_beds_waiting = ? WHERE id = ?`

**Các trường Live Status:**
- `live_busy_level` (ENUM: LOW, MEDIUM, HIGH, FULL)
- `live_chairs_available` (INT) - Số ghế cắt trống
- `live_beds_waiting` (INT) - Số người đang chờ gội

---

## 3. API /booking → Bảng bookings

**Endpoint:** `POST /booking`

**Database Tables:**
- `bookings` (bảng chính)
- `booking_services` (chi tiết dịch vụ)
- `booking_products` (sản phẩm mua kèm - optional)

**Mapping:**
- Tạo đơn đặt lịch với Transaction để đảm bảo tính toàn vẹn
- Liên kết: Khách (users) - Thợ (stylists) - Dịch vụ (services)

**SQL Flow:**
```sql
BEGIN TRANSACTION;

-- 1. Insert vào bookings
INSERT INTO bookings (booking_code, customer_id, customer_name, customer_phone, branch_id, stylist_id, appointment_date, appointment_time, status, note)
VALUES ('#BK...', ?, ?, ?, ?, ?, ?, ?, 'PENDING', ?);

-- 2. Insert vào booking_services (cho mỗi dịch vụ)
INSERT INTO booking_services (booking_id, service_id, price_at_booking)
VALUES (?, ?, ?);

-- 3. Insert vào booking_products (nếu có)
INSERT INTO booking_products (booking_id, product_id, quantity, price_at_sale)
VALUES (?, ?, ?, ?);

COMMIT;
```

---

## 4. API /admin → Bảng users

**Endpoints:**
- `GET /admin/users` - Danh sách users
- `GET /admin/users/:id` - Chi tiết user
- `POST /admin/users` - Tạo user mới
- `PATCH /admin/users/:id` - Cập nhật user
- `DELETE /admin/users/:id` - Xóa user

**Database Table:** `users`

**Mapping:**
- Quản lý người dùng với phân quyền (role: ADMIN, STYLIST, RECEPTIONIST, CUSTOMER)
- Chỉ Admin mới có quyền truy cập các endpoint này

**SQL Examples:**
```sql
-- GET /admin/users
SELECT * FROM users ORDER BY created_at DESC;

-- POST /admin/users
INSERT INTO users (username, password_hash, full_name, phone, email, role, avatar_url)
VALUES (?, ?, ?, ?, ?, ?, ?);

-- PATCH /admin/users/:id
UPDATE users SET ... WHERE id = ?;

-- DELETE /admin/users/:id
DELETE FROM users WHERE id = ?;
```

---

## 5. AI/Chat → Bảng conversations & messages

**Endpoints:**
- `POST /conversations` - Tạo conversation
- `GET /conversations` - Danh sách conversations (Admin/Receptionist)
- `GET /conversations/:id` - Chi tiết conversation
- `POST /conversations/messages` - Tạo message
- `GET /conversations/:id/messages` - Lấy messages

**Database Tables:**
- `conversations` (cuộc hội thoại)
- `messages` (tin nhắn)

**Mapping:**
- Hỗ trợ chatbot và chat với admin
- Hỗ trợ nhiều platform: WEB, ZALO, FACEBOOK

**SQL Examples:**
```sql
-- POST /conversations
INSERT INTO conversations (user_id, customer_name, platform, platform_id)
VALUES (?, ?, ?, ?);

-- POST /conversations/messages
INSERT INTO messages (conversation_id, sender_type, content)
VALUES (?, ?, ?);

-- Cập nhật last_message_at
UPDATE conversations SET last_message_at = NOW() WHERE id = ?;

-- GET /conversations/:id/messages
SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC;
```

---

## 6. Authentication: API /auth/login → Bảng users

**Endpoint:** `POST /auth/login`

**Database Table:** `users`

**Mapping:**
- Kiểm tra `username` và `password_hash`
- Trả về JWT Token + thông tin user (bao gồm role)

**SQL Query:**
```sql
SELECT * FROM users WHERE username = ?;
-- Sau đó verify password_hash bằng bcrypt.compare()
```

---

## 7. Digital Queue (Tính năng ẩn) → Bảng shampoo_queue

**Database Table:** `shampoo_queue`

**Mapping:**
- Bảng này dùng để quản lý hàng chờ gội đầu
- Khi thợ cắt xong, API nội bộ sẽ Insert vào bảng này
- Thợ gội nhìn thấy danh sách chờ qua internal API

**SQL Example:**
```sql
-- Khi thợ cắt xong, thêm vào queue
INSERT INTO shampoo_queue (branch_id, booking_id, status, joined_at)
VALUES (?, ?, 'WAITING', NOW());

-- Thợ gội bắt đầu
UPDATE shampoo_queue SET status = 'WASHING', started_at = NOW() WHERE id = ?;

-- Gội xong
UPDATE shampoo_queue SET status = 'DONE', completed_at = NOW() WHERE id = ?;
```

---

## Tổng kết ánh xạ

| API Endpoint | Database Table(s) | Mô tả |
|-------------|-------------------|-------|
| `GET /settings` | `site_settings` | Cấu hình Branding |
| `GET /branches` | `branches` | Danh sách chi nhánh + Live status |
| `PUT /admin/branches/:id/queue` | `branches` | Cập nhật Live status |
| `POST /booking` | `bookings`, `booking_services`, `booking_products` | Tạo đơn đặt lịch (Transaction) |
| `POST /auth/login` | `users` | Xác thực và trả về JWT |
| `GET /admin/users` | `users` | Quản lý users (Admin only) |
| `POST /conversations` | `conversations` | Tạo conversation |
| `POST /conversations/messages` | `messages`, `conversations` | Tạo message và cập nhật last_message_at |
| Internal API | `shampoo_queue` | Quản lý hàng chờ gội (tính năng ẩn) |

---

## Quan hệ giữa các bảng

```
users (1) ──→ (N) bookings
users (1) ──→ (1) stylists
branches (1) ──→ (N) stylists
branches (1) ──→ (N) bookings
bookings (1) ──→ (N) booking_services ──→ (N) services
bookings (1) ──→ (N) booking_products ──→ (N) products
users (1) ──→ (N) conversations ──→ (N) messages
branches (1) ──→ (N) shampoo_queue ──→ (1) bookings
```

