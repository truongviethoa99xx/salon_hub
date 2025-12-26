# Smart Salon O2O - API Documentation

Base URL: `https://api.smartsalon.com/v1`
Content-Type: `application/json`

## 1. Authentication (Admin)

### Login
**POST** `/auth/login`
Authenticate admin user to access the dashboard.
- **Body**:
  ```json
  {
    "username": "admin",
    "password": "..."
  }
  ```
- **Response**:
  ```json
  {
    "token": "eyJhbGciOiJIUz...",
    "user": { "id": 1, "role": "admin" }
  }
  ```

---

## 2. Public Configuration (Landing Page)

### Get Site Settings
**GET** `/settings`
Retrieve branding, hero section content, contact info, and social links.
- **Response**: `SiteSettings` object
  ```json
  {
    "brandName": "Smart Salon",
    "themeColor": "#f59e0b",
    "heroTitle": "Đẹp Trai Tức Thì",
    "logoUrl": "...",
    "contactHotline": "1900 6868",
    ...
  }
  ```

### Get Branches & Live Status
**GET** `/branches`
Retrieve list of branches and their current queue status (Busy Level, Chairs Empty).
- **Response**: Array of `Branch`
  ```json
  [
    {
      "id": "b1",
      "name": "Smart Salon Quận 1",
      "address": "...",
      "queueStatus": {
        "busyLevel": "Medium",
        "chairsAvailable": 2,
        "bedsWaiting": 1
      }
    }
  ]
  ```

### Get Services (Menu)
**GET** `/services`
Retrieve list of services categorized (Cut, Spa, Chemical).
- **Response**: Array of `Service`

### Get Stylists (Spotlight)
**GET** `/stylists`
Retrieve top stylists.
- **Response**: Array of `Stylist`

### Get Products (Shop)
**GET** `/products`
Retrieve retail products.
- **Response**: Array of `Product`

---

## 3. Booking System

### Get Available Time Slots
**GET** `/booking/slots`
Get available time slots for a specific date and branch.
- **Query Params**: `?branchId=b1&date=2024-05-20`
- **Response**:
  ```json
  ["09:00", "09:30", "10:00", ...]
  ```

### Get Available Stylists for Slot
**GET** `/booking/stylists-availability`
Get list of stylists who are free at a specific time.
- **Query Params**: `?branchId=b1&date=2024-05-20&time=10:00`
- **Response**: Array of `Stylist` (with `isBusy` computed for that slot)

### Create Booking
**POST** `/booking`
Submit a new appointment.
- **Body**:
  ```json
  {
    "customerName": "Nguyen Van A",
    "customerPhone": "0901234567",
    "branchId": "b1",
    "serviceId": "s1",
    "stylistId": "st1",
    "date": "2024-05-20",
    "time": "10:00"
  }
  ```
- **Response**: `BookingItem` (Status: pending)

---

## 4. AI & Integration

### AI Consultant
**POST** `/ai/consult`
Send user query to Gemini API via backend (to hide API Key).
- **Body**: `{ "query": "Mặt tròn cắt kiểu gì đẹp?" }`
- **Response**: `{ "answer": "Với mặt tròn, bạn nên chọn kiểu Side Part..." }`

### Send Contact Message
**POST** `/contact`
Submit form from "Contact Us" section.
- **Body**: `{ "name": "...", "phone": "...", "message": "..." }`

---

## 5. Admin Dashboard (Protected)

*Requires Header: `Authorization: Bearer <token>`*

### Dashboard Overview
**GET** `/admin/stats`
Get summary data (Revenue, Total Bookings, Waiting Count).

### Manage Bookings
**GET** `/admin/bookings`
- **Query Params**: `?status=pending|confirmed|cancelled&date=today`

**PUT** `/admin/bookings/{id}/status`
Update booking status (e.g., Approve, Cancel, Complete).
- **Body**: `{ "status": "confirmed" }`

### Manage Services
**POST** `/admin/services` (Create)
**PUT** `/admin/services/{id}` (Update Price/Name)
**DELETE** `/admin/services/{id}` (Remove)

### Manage Stylists
**POST** `/admin/stylists` (Add new staff)
**PUT** `/admin/stylists/{id}` (Update info)
**PUT** `/admin/stylists/{id}/availability` (Real-time toggle: Busy/Free)

### Manage Branch Queue (Live Status)
**PUT** `/admin/branches/{id}/queue`
Manually update the "Live Status" displayed on the landing page.
- **Body**:
  ```json
  {
    "busyLevel": "High",
    "chairsAvailable": 0,
    "bedsWaiting": 5
  }
  ```

### Manage Site Settings
**PUT** `/admin/settings`
Update global website configuration (Theme color, Titles, Images).
- **Body**: `SiteSettings` object.

### Inbox / Conversations
**GET** `/admin/conversations`
List all chats from Facebook, Zalo, TikTok.

**POST** `/admin/conversations/{id}/reply`
Send a reply to the user.
- **Body**: `{ "message": "Dạ shop đã nhận thông tin ạ." }`

**PUT** `/admin/conversations/{id}/read`
Mark conversation as read.
