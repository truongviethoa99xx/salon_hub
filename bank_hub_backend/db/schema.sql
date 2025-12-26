-- =============================================
-- 1. ENUMS (Định nghĩa các trạng thái chuẩn)
-- =============================================

CREATE TYPE user_role AS ENUM ('ADMIN', 'STYLIST', 'RECEPTIONIST', 'CUSTOMER');
CREATE TYPE booking_status AS ENUM ('PENDING', 'CONFIRMED', 'CHECK_IN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NOSHOW');
CREATE TYPE busy_level AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'FULL');
CREATE TYPE queue_state AS ENUM ('WAITING', 'WASHING', 'DONE'); -- Cho hàng chờ gội

-- =============================================
-- 2. AUTH & USERS (Xác thực)
-- =============================================

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE, -- Dùng cho Admin đăng nhập
    password_hash VARCHAR(255),  -- Null nếu là khách vãng lai login bằng OTP/Social
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE,    -- Định danh chính cho khách hàng
    email VARCHAR(100),
    role user_role DEFAULT 'CUSTOMER',
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 3. MASTER DATA & SETTINGS (Cấu hình hệ thống)
-- =============================================

-- Bảng này chỉ có 1 dòng duy nhất để lưu cấu hình Landing Page
-- Map với API GET /settings
CREATE TABLE site_settings (
    id SERIAL PRIMARY KEY,
    brand_name VARCHAR(100) DEFAULT 'Smart Salon',
    theme_color VARCHAR(20) DEFAULT '#f59e0b',
    logo_url TEXT,
    
    -- Hero Section Content
    hero_title VARCHAR(200) DEFAULT 'Đẹp Trai Tức Thì',
    hero_subtitle TEXT,
    hero_video_url TEXT,
    
    contact_hotline VARCHAR(20),
    social_facebook VARCHAR(255),
    social_tiktok VARCHAR(255),
    social_zalo VARCHAR(255),
    
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chi nhánh & Trạng thái Live (Real-time)
-- Map với API GET /branches và PUT /admin/branches/{id}/queue
CREATE TABLE branches (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    phone_hotline VARCHAR(20),
    map_url TEXT,
    
    -- Live Status Fields (Dữ liệu thời gian thực hiển thị lên Web)
    live_busy_level busy_level DEFAULT 'LOW',
    live_chairs_available INT DEFAULT 0, -- Số ghế cắt trống
    live_beds_waiting INT DEFAULT 0,     -- Số người đang chờ gội
    
    is_active BOOLEAN DEFAULT TRUE
);

-- =============================================
-- 4. STAFF & SERVICES (Nhân sự & Dịch vụ)
-- =============================================

CREATE TABLE stylists (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE, -- Link tới bảng user để login
    branch_id INT REFERENCES branches(id),              -- Thợ thuộc chi nhánh nào
    
    bio TEXT, -- Giới thiệu (Spotlight)
    skills TEXT[], -- VD: ['CUT', 'PERM']
    
    -- Trạng thái Real-time (Map với API PUT availability)
    is_busy BOOLEAN DEFAULT FALSE, 
    
    rating DECIMAL(2,1) DEFAULT 5.0,
    review_count INT DEFAULT 0
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL, -- Cắt, Gội, Hóa chất
    display_order INT DEFAULT 0
);

CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    category_id INT REFERENCES categories(id),
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    duration_minutes INT NOT NULL,
    
    -- Hỗ trợ AI sắp xếp
    processing_gap_minutes INT DEFAULT 0, -- Thời gian chờ thuốc ngấm
    
    image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

-- =============================================
-- 5. PRODUCTS (Bán lẻ)
-- =============================================

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    sku VARCHAR(50) UNIQUE,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    image_url TEXT
);

-- Tồn kho theo chi nhánh
CREATE TABLE branch_inventory (
    branch_id INT REFERENCES branches(id),
    product_id INT REFERENCES products(id),
    quantity INT DEFAULT 0,
    PRIMARY KEY (branch_id, product_id)
);

-- =============================================
-- 6. BOOKING CORE (Đặt lịch)
-- =============================================

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    booking_code VARCHAR(20) UNIQUE, -- Mã đơn #BK...
    
    -- Thông tin khách (Hỗ trợ cả khách vãng lai chưa có tài khoản)
    customer_id INT REFERENCES users(id), -- Có thể NULL nếu khách vãng lai
    customer_name VARCHAR(100) NOT NULL,  -- Lưu cứng tên lúc đặt
    customer_phone VARCHAR(20) NOT NULL,  -- Lưu cứng SĐT lúc đặt
    
    branch_id INT REFERENCES branches(id),
    stylist_id INT REFERENCES stylists(id), -- Có thể NULL nếu chọn ngẫu nhiên
    
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    
    status booking_status DEFAULT 'PENDING',
    note TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chi tiết dịch vụ trong 1 đơn đặt
CREATE TABLE booking_services (
    id SERIAL PRIMARY KEY,
    booking_id INT REFERENCES bookings(id) ON DELETE CASCADE,
    service_id INT REFERENCES services(id),
    price_at_booking DECIMAL(10,2) -- Lưu giá tại thời điểm đặt
);

-- Chi tiết sản phẩm mua kèm (Upsell)
CREATE TABLE booking_products (
    id SERIAL PRIMARY KEY,
    booking_id INT REFERENCES bookings(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id),
    quantity INT DEFAULT 1,
    price_at_sale DECIMAL(10,2)
);

-- =============================================
-- 7. DIGITAL QUEUE (Hàng chờ Gội đầu)
-- =============================================
-- Bảng này hỗ trợ tính năng "Ưu tiên Cắt - Xếp hàng Gội"
CREATE TABLE shampoo_queue (
    id SERIAL PRIMARY KEY,
    branch_id INT REFERENCES branches(id),
    booking_id INT REFERENCES bookings(id),
    
    status queue_state DEFAULT 'WAITING',
    joined_at TIMESTAMPTZ DEFAULT NOW(), -- Thời điểm bắt đầu chờ
    started_at TIMESTAMPTZ,              -- Thời điểm lên giường gội
    completed_at TIMESTAMPTZ             -- Thời điểm gội xong
);

-- =============================================
-- 8. AI & CONVERSATIONS (Hỗ trợ Chatbot)
-- =============================================

CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id), -- Null nếu khách vãng lai
    customer_name VARCHAR(100),       -- Tên khách chat
    platform VARCHAR(50),             -- 'WEB', 'ZALO', 'FACEBOOK'
    platform_id VARCHAR(100),         -- ID user bên Zalo/FB
    
    last_message_at TIMESTAMPTZ DEFAULT NOW(),
    is_read_by_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    conversation_id INT REFERENCES conversations(id) ON DELETE CASCADE,
    sender_type VARCHAR(20), -- 'USER', 'ADMIN', 'BOT'
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 9. SEED DATA (Dữ liệu mẫu khởi tạo)
-- =============================================

-- Tạo Settings mặc định
INSERT INTO site_settings (brand_name, theme_color) VALUES ('Smart Salon', '#f59e0b');

-- Tạo Admin mặc định
INSERT INTO users (username, password_hash, full_name, role) 
VALUES ('admin', 'hashed_password_here', 'Super Admin', 'ADMIN');
