# PHÂN TÍCH KIẾN TRÚC KỸ THUẬT & MODULE HỆ THỐNG

> **Dự án:** Smart Salon Ecosystem  
> Tài liệu này phân rã các yêu cầu nghiệp vụ (BRD) thành các module kỹ thuật cụ thể cho 3 nền tảng: **Backend (NestJS)**, **Web Admin (ReactJS)**, và **Mobile App (Flutter)**.

---

## 1. BACKEND – API SERVER (NESTJS)

NestJS được chọn vì:
- Cấu trúc module rõ ràng.
- Hỗ trợ TypeScript tốt.
- Dễ dàng mở rộng và scale.

### 1.1. Core Modules (Lõi hệ thống)

Các module nền tảng dùng chung cho toàn bộ hệ thống:

- **AuthModule**
  - Xử lý đăng ký, đăng nhập (JWT, Refresh Token).
  - Tích hợp Social Login (Google, Facebook).
  - Hỗ trợ xác thực OTP.

- **UsersModule**
  - Quản lý thông tin người dùng (Admin, Staff, Customer).
  - Xử lý hồ sơ người dùng, Avatar.

- **RolesGuardModule (RBAC)**
  - Phân quyền động theo vai trò.
  - Kiểm soát quyền truy cập API (VD: Staff không được xoá Dịch vụ).

- **UploadModule**
  - Xử lý upload ảnh (Avatar, ảnh trước/sau khi làm tóc).
  - Tích hợp lưu trữ Cloud: AWS S3, MinIO hoặc Cloudinary.

- **ConfigModule**
  - Quản lý biến môi trường (Database host, API Keys, JWT Secret...).

### 1.2. Business Modules (Nghiệp vụ chính)

- **BranchesModule**
  - CRUD thông tin chi nhánh.
  - Cấu hình riêng cho từng chi nhánh.

- **ServicesModule**
  - Quản lý danh mục dịch vụ, bảng giá.
  - Thiết lập thời gian thực hiện (Duration) cho từng dịch vụ.

- **CombosModule**
  - Logic gộp nhiều dịch vụ thành combo.
  - Tính giá combo, ưu đãi.

- **StaffModule**
  - Quản lý thợ/kỹ thuật viên.
  - Gán kỹ năng thợ (thợ nào làm được dịch vụ nào).
  - KPI, xếp hạng thợ.

- **SchedulesModule**
  - Quản lý ca làm việc, ngày nghỉ của nhân viên.

- **BookingsModule** *(module trọng tâm)*
  - Kiểm tra slot trống (Availability Check).
  - Tạo, huỷ, dời lịch hẹn.
  - Xử lý logic chồng chéo lịch (Conflict Handling).

- **ProductsModule**
  - Quản lý sản phẩm bán lẻ.
  - Quản lý nguyên vật liệu tiêu hao (Backbar).

- **InventoryModule**
  - Quản lý nhập/xuất/tồn kho.
  - Cảnh báo tồn kho thấp.
  - Hỗ trợ chuyển kho giữa các chi nhánh.

### 1.3. Sales & Finance Modules (Bán hàng & Tài chính)

- **OrdersModule**
  - Xử lý đơn hàng tại quầy (POS).
  - Xử lý đơn hàng Online (E-commerce).

- **InvoicesModule**
  - Xuất hoá đơn.
  - Lưu lịch sử thanh toán.

- **PaymentsModule**
  - Tích hợp cổng thanh toán (VNPay, Momo, Stripe...).
  - Xử lý Webhook từ cổng thanh toán.

- **PayrollModule**
  - Tính lương nhân viên:
    - Lương cơ bản.
    - % hoa hồng dịch vụ.
    - % bán sản phẩm.
    - Trừ phạt (nếu có).

### 1.4. Marketing & CRM Modules

- **CustomersModule**
  - Quản lý hồ sơ khách hàng.
  - Lịch sử làm đẹp, hạng thành viên.

- **LoyaltyModule**
  - Logic tích điểm, đổi quà.
  - Thăng hạng thành viên.

- **PromotionsModule**
  - Quản lý Voucher, mã giảm giá.
  - Thiết lập chương trình khuyến mãi tự động.

- **NotificationsModule**
  - Gửi thông báo đa kênh:
    - FCM Push Notification.
    - Email.
    - Zalo ZNS.
    - SMS.

### 1.5. Advanced Modules

- **ReportsModule**
  - Tổng hợp dữ liệu báo cáo doanh thu, hiệu suất.
  - Tận dụng các Aggregation Query nặng.

- **AiIntegrationModule**
  - Cầu nối gọi API sang các service AI:
    - Phân tích da.
    - Gợi ý kiểu tóc.

---

## 2. WEB ADMIN & LANDING PAGE (REACTJS)

Sử dụng **ReactJS** với các thư viện UI như **Ant Design** hoặc **Material UI** để tăng tốc phát triển trang Admin.

### 2.1. Landing Page (Khách hàng)

Có thể:
- Tách thành một project riêng (Next.js để SEO tốt hơn), hoặc
- Đặt chung trong monorepo hiện tại.

Các module chính:

- **HomeModule**
  - Banner, giới thiệu thương hiệu.
  - Feedback khách hàng (testimonials).

- **BookingWidget**
  - Form đặt lịch nhanh:
    - Chọn chi nhánh → Dịch vụ → Thợ → Giờ.

- **ServiceShowcase**
  - Hiển thị bảng giá.
  - Hình ảnh mẫu tóc/mẫu dịch vụ đẹp.

### 2.2. Admin Portal (Quản trị viên & Nhân viên)

- **AuthManager**
  - Trang Login, Forgot Password.
  - Lưu token vào LocalStorage/Cookies.

- **Dashboard**
  - Các widget biểu đồ (Chart.js/Recharts).
  - Hiển thị doanh thu, lịch hôm nay, KPI tổng quan.

- **CalendarManager** *(trái tim của vận hành)*
  - Giao diện lịch (giống Google Calendar).
  - Xem lịch theo Ngày/Tuần/Thợ.
  - Drag & Drop để xếp lịch cho khách.

- **PosTerminal (Thu ngân)**
  - Giao diện bán hàng tối ưu cho thao tác nhanh.
  - Flow:
    - Chọn khách hàng → Chọn dịch vụ/sản phẩm → Áp voucher → Thanh toán.

- **InventoryManager**
  - Data Grid quản lý nhập/xuất/tồn.
  - Hỗ trợ in mã vạch (nếu cần).

- **ServiceManager**
  - CRUD dịch vụ.
  - Upload ảnh minh hoạ, cài đặt giá.

- **StaffManager**
  - Quản lý nhân viên.
  - Chấm công, bảng tính lương.

- **CustomerCare**
  - Danh sách khách hàng.
  - Bộ lọc khách lâu không đến.
  - Gửi tin nhắn CSKH/khuyến mãi.

- **Settings**
  - Cấu hình hệ thống.
  - Đổi màu giao diện (Theme Provider).
  - Đa ngôn ngữ (i18n).

---

## 3. MOBILE APP (FLUTTER)

Mobile app dành cho **Khách hàng (Customer App)**.  
Sử dụng **Bloc** hoặc **Riverpod** để quản lý state.

### 3.1. Authentication & Onboarding

- **AuthFeature**
  - Login, Register.
  - Verify OTP.
  - Social Login.
  - Biometric Auth (FaceID/TouchID).

- **OnboardingFeature**
  - Màn hình giới thiệu tính năng khi mở app lần đầu.

### 3.2. Home & Discovery

- **HomeFeature**
  - Banner slider.
  - Shortcut đặt lịch nhanh.
  - Nhắc hẹn sắp tới.

- **ServiceFeature**
  - Danh sách dịch vụ.
  - Chi tiết dịch vụ.
  - Thư viện ảnh (Gallery).

- **BranchFeature**
  - Bản đồ tìm chi nhánh gần nhất.
  - Tích hợp Google Maps.

### 3.3. Booking Flow (Luồng đặt lịch)

- **BookingFeature** – Luồng chuẩn:
  1. Chọn chi nhánh.
  2. Chọn dịch vụ/combo.
  3. Chọn thợ (xem profile, rating).
  4. Chọn ngày & giờ (Time slot picker).
  5. Review & Confirm.

### 3.4. E-commerce & Loyalty

- **ShopFeature**
  - Danh sách sản phẩm.
  - Giỏ hàng.
  - Thanh toán online.

- **LoyaltyFeature**
  - Hiển thị thẻ thành viên (QR code để quét tại quầy).
  - Lịch sử điểm, đổi quà.

- **WalletFeature** *(nếu có ví trả trước)*
  - Nạp tiền.
  - Xem số dư.
  - Lịch sử giao dịch.

### 3.5. Personalization (Cá nhân hoá)

- **ProfileFeature**
  - Cập nhật thông tin cá nhân.
  - Thay đổi mật khẩu.

- **HistoryFeature**
  - Lịch sử đặt lịch: Sắp tới, Hoàn thành, Đã huỷ.
  - Xem lại ảnh tóc/ liệu trình cũ.

- **AiConsultantFeature**
  - Module Camera: chụp ảnh selfie.
  - Hiển thị kết quả phân tích từ AI Backend (gợi ý kiểu tóc/liệu trình).

---

## 4. CÔNG NGHỆ BỔ TRỢ & DATABASE

- **Database**
  - PostgreSQL: cho dữ liệu quan hệ chặt chẽ (booking, staff, payroll...).
  - MongoDB: linh hoạt cho log, lịch sử, tracking sự kiện (nếu cần).

- **Caching**
  - Redis:
    - Cache thông tin phiên đăng nhập.
    - Cache danh sách dịch vụ để giảm tải DB.

- **Real-time**
  - Socket.io (NestJS Gateway):
    - Cập nhật trạng thái lịch hẹn theo thời gian thực.
    - Đồng bộ màn hình Admin khi khách đặt từ App.

- **Map**
  - Google Maps API: tìm đường, hiển thị chi nhánh.

- **SMS/Zalo**
  - Esms.vn hoặc Zalo OA API:
    - Gửi OTP.
    - Gửi thông báo marketing/CSKH.
