# TÀI LIỆU YÊU CẦU NGHIỆP VỤ (BRD)

> **Dự án:** Hệ Sinh Thái Salon Tóc & Spa Thông Minh (Smart Salon Ecosystem)

---

## 1. TỔNG QUAN DỰ ÁN

Smart Salon Ecosystem là giải pháp phần mềm toàn diện giúp quản lý vận hành, chăm sóc khách hàng và tối ưu hóa doanh thu cho các chuỗi Salon Tóc, Spa, Nail hoặc Clinic. Hệ thống tập trung vào trải nghiệm liền mạch từ online (App/Web) đến offline (tại cửa hàng).

### Đối tượng sử dụng

Hệ thống phục vụ ba nhóm người dùng chính:

- **Admin (Quản trị viên/Chủ chuỗi):** Quyền cao nhất, quản lý toàn bộ hệ thống.
- **User (Nhân viên/Thợ/Lễ tân/Quản lý chi nhánh):** Quyền hạn được cấp theo chức năng nhiệm vụ.
- **Customer (Khách hàng):** Người sử dụng dịch vụ.

---

## 2. PHÂN HỆ KHÁCH HÀNG (CUSTOMER PLATFORM)

### 2.1 Mobile App (dành cho khách hàng thân thiết)

- **Mục tiêu:** Tăng tỷ lệ quay lại và cá nhân hóa trải nghiệm.

#### Đăng ký & Đăng nhập
- Đăng ký nhanh qua số điện thoại (OTP).
- Đăng nhập Social: Google, Facebook, Apple ID.
- Bổ sung sinh trắc học (FaceID/Vân tay) để thao tác nhanh hơn.

#### Trang chủ & Đặt lịch
- Banner khuyến mãi, dịch vụ nổi bật (Best seller).
- Đặt lịch thông minh: Chọn Chi nhánh → Dịch vụ/Combo → Thợ (Stylist/Kỹ thuật viên) yêu thích → Giờ → Xác nhận.
- Hiển thị slot trống theo thời gian thực.

#### Hồ sơ cá nhân & Lịch sử
- Nhật ký làm đẹp: Xem lại lịch sử kiểu tóc/liệu trình (kèm ảnh trước/sau).
- Lịch sử chi tiêu, hoá đơn điện tử.
- Nhắc hẹn tự động (Push Notification) trước 1 giờ hoặc 1 ngày.

#### Thương mại điện tử (E-commerce)
- Mua sản phẩm chăm sóc (dầu gội, sáp, mỹ phẩm...) giao tận nhà hoặc lấy tại tiệm.

#### Chương trình thành viên (Membership)
- Tích điểm đổi quà.
- Hạng thành viên (Silver, Gold, Diamond) với quyền lợi riêng.

### 2.2 Landing Page (kênh thu hút khách mới)

- Giao diện chuẩn SEO, giới thiệu thương hiệu, bảng giá, portfolio (bộ sưu tập mẫu tóc/mẫu nail).
- Widget đặt lịch nhanh: Không cần đăng nhập, chỉ cần Tên + SĐT để đặt chỗ sơ bộ.
- Tích hợp nút chat (Zalo/Messenger) để tư vấn trực tiếp.

---

## 3. PHÂN HỆ QUẢN TRỊ & VẬN HÀNH (ADMIN DASHBOARD)

### 3.1 Tổng quan (Dashboard)
- Biểu đồ doanh thu theo Ngày/Tuần/Tháng/Năm.
- Tỷ lệ lấp đầy lịch hẹn.
- Top dịch vụ/sản phẩm bán chạy.
- Top nhân viên xuất sắc.
- Cảnh báo tồn kho thấp.

### 3.2 Quản lý hệ thống chuỗi (Multi-Branch)
- Quản lý danh sách chi nhánh.
- Phân quyền dữ liệu: Admin thấy tất cả, quản lý chi nhánh chỉ thấy dữ liệu của chi nhánh mình.
- Luân chuyển hàng hóa giữa các kho chi nhánh.

### 3.3 Quản lý nhân sự & thợ (HRM)
- Hồ sơ nhân viên, hợp đồng, mức lương cơ bản.
- **Cơ chế hoa hồng linh hoạt:**
  - % theo dịch vụ (VD: Cắt tóc 10%, Uốn 15%).
  - % theo doanh số bán sản phẩm.
  - % theo cấp bậc thợ (Thợ chính, Thợ phụ, Master).
- **Chấm công & Tính lương:**
  - Chấm công qua Wifi IP hoặc GPS khi đến tiệm.
  - Bảng tính lương tự động cuối tháng (Lương cứng + Hoa hồng + Phụ cấp - Phạt).

### 3.4 Quản lý dịch vụ & combo
- Tạo nhóm dịch vụ (Cắt, Gội, Hóa chất, Spa body...).
- Thiết lập giá, thời gian thực hiện (phục vụ tính slot đặt lịch).
- Quản lý Combo: Gom nhiều dịch vụ thành 1 gói giá ưu đãi.
- Thiết lập liệu trình (Spa: gói triệt lông 10 buổi – hệ thống tự trừ dần số buổi).

### 3.5 Quản lý kho & sản phẩm (Inventory)
- Nhập kho, Xuất kho, Kiểm kho.
- Quản lý tiêu hao (Backbar) – chức năng quan trọng cho Spa/Salon.
- Định mức tiêu hao: 1 lần uốn tiêu tốn bao nhiêu ml thuốc số 1, số 2.
- Khi bill được thanh toán → kho tự động trừ lượng thuốc tương ứng.

### 3.6 Lịch làm việc & Đặt lịch (Booking Management)
- Lịch làm việc của từng thợ (Ca sáng/chiều, ngày nghỉ).
- Màn hình điều phối Drag & Drop: kéo thả khách hàng vào khung giờ và thợ trống.
- Check-in cho khách khi đến cửa hàng.

### 3.7 Thu ngân (POS) & Hoá đơn
- Giao diện bán hàng tối ưu cho thao tác chạm/click nhanh.
- Áp dụng khuyến mãi/Voucher tự động.
- Thanh toán đa phương thức: Tiền mặt, Chuyển khoản (VietQR), Quẹt thẻ.
- Gửi hóa đơn điện tử tự động qua Email/Zalo/App sau thanh toán.

### 3.8 Marketing & Chăm sóc khách hàng (CRM)
- Lưu trữ thông tin chi tiết: Ngày sinh, sở thích, loại tóc/da, ghi chú kỹ thuật (VD: Khách dị ứng thuốc nhuộm A).
- **Marketing tự động (Automation):**
  - Gửi tin nhắn chúc mừng sinh nhật kèm Voucher.
  - Nhắc khách quay lại sau 3 tháng (chu kỳ cắt tóc/nhuộm chân).
  - Tạo chiến dịch Flash Sale, Happy Hour (giảm giá khung giờ vắng khách).

### 3.9 Thiết lập & Cấu hình (Settings)
- **Giao diện (Branding):**
  - Tùy chỉnh Logo, Favicon.
  - Bộ chọn màu chủ đạo (Primary Color) và màu phụ trợ.
  - Tùy chỉnh background trang đăng nhập/Dashboard.
- **Kết nối đa kênh:**
  - Zalo OA (gửi tin nhắn ZNS).
  - Facebook Pixel / TikTok Pixel (phục vụ quảng cáo).
  - Cổng thanh toán (VNPay, Momo...).
- Đa ngôn ngữ (Tiếng Việt, Tiếng Anh).

---

## 4. TÍNH NĂNG ĐỀ XUẤT THÊM (VALUE ADDED FEATURES)

Nhằm xây dựng hệ sinh thái thật sự “thông minh” và khác biệt:

- **AI tư vấn kiểu tóc/da (Smart Consultant):**
  - Khách hàng upload ảnh khuôn mặt lên App.
  - AI phân tích khuôn mặt (tròn, dài, vuông) và gợi ý kiểu tóc phù hợp.
  - Đối với Spa: AI soi da qua camera để gợi ý liệu trình.
- **Đánh giá & Tip cho thợ (Rating & Tipping):**
  - Sau khi thanh toán, App hiển thị popup đánh giá sao và cho phép tip qua ví điện tử.
- **Hệ thống giới thiệu (Referral System):**
  - Mỗi khách hàng có 1 mã giới thiệu.
  - Giới thiệu bạn bè đăng ký → cả hai nhận được Voucher.
- **Màn hình hiển thị tại Salon (Digital Signage):**
  - Kết nối với Tivi tại cửa hàng để hiển thị danh sách khách đang chờ, lượt tiếp theo (giống ngân hàng).
- **Quản lý thẻ liệu trình/Thẻ trả trước (Prepaid Card):**
  - Khách nạp trước 5 triệu, tặng thêm 1 triệu vào tài khoản để trừ dần.
  - Giúp salon huy động vốn trước và giữ chân khách hàng.

---

## 5. YÊU CẦU PHI CHỨC NĂNG

- **Bảo mật:** Mã hóa mật khẩu, bảo mật thông tin khách hàng, backup dữ liệu hàng ngày.
- **Hiệu năng:** Tải trang < 2 giây, chịu tải tốt khi chạy Flash Sale.
- **Nền tảng:** Web App (ReactJS/VueJS), Mobile App (Flutter/React Native), Backend (NodeJS/GoLang/Java).

---

## 6. LỘ TRÌNH PHÁT TRIỂN DỰ KIẾN (ROADMAP)

1. **Giai đoạn 1 (MVP):** Web Admin (POS, Lịch, Kho, Nhân viên) + Landing Page.
2. **Giai đoạn 2:** Mobile App cho khách hàng + tích hợp Zalo/SMS.
3. **Giai đoạn 3:** Tính năng AI, Thương mại điện tử, Mở rộng chuỗi.