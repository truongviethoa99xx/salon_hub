
import { 
  Branch, Service, Stylist, Product, Review, 
  BookingItem, SiteSettings, Conversation,
  Customer, AIConfig, EmailConfig, ZNSConfig, Promotion
} from '../types';
import { 
  BRANCHES, SERVICES, STYLISTS, PRODUCTS, REVIEWS 
} from '../constants';

// --- CONFIGURATION ---
const API_URL = 'https://api.smartsalon.com/v1';
const USE_MOCK_API = true; // FORCE TRUE FOR DEMO

// --- USER TYPES ---
export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'BARBER' | 'CUSTOMER';

export interface AuthUser {
  id: number;
  username: string;
  full_name: string;
  phone: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  access_token: string;
  user: AuthUser;
}

export interface RegisterData {
  full_name: string;
  phone: string;
  email?: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    id: number;
    full_name: string;
    phone: string;
    email: string;
    role: string;
  };
}

// --- HELPERS ---
const getHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `Error ${response.status}`);
  }
  return response.json();
};

// --- MOCK DATA STORE (In-Memory) ---
interface MockUser {
  id: number;
  username: string;
  phone: string;
  email: string;
  password: string;
  full_name: string;
  role: UserRole;
}

let mockStore = {
  // Mock users for testing
  users: [
    { id: 1, username: 'superadmin', phone: '0900000001', email: 'superadmin@salon.com', password: '123456', full_name: 'Super Admin', role: 'SUPER_ADMIN' as UserRole },
    { id: 2, username: 'admin', phone: '0900000002', email: 'admin@salon.com', password: '123456', full_name: 'Admin Chi Nhánh', role: 'ADMIN' as UserRole },
    { id: 3, username: 'barber1', phone: '0900000003', email: 'barber@salon.com', password: '123456', full_name: 'Barber Minh', role: 'BARBER' as UserRole },
    { id: 4, username: 'customer1', phone: '0901234567', email: 'customer@gmail.com', password: '123456', full_name: 'Khách Hàng A', role: 'CUSTOMER' as UserRole },
  ] as MockUser[],
  branches: [...BRANCHES],
  services: [...SERVICES],
  stylists: [...STYLISTS],
  products: [...PRODUCTS],
  reviews: [...REVIEWS],
  bookings: [
    { id: 'bk1', customerName: 'Nguyễn Văn A', customerPhone: '0901234567', serviceId: 's1', stylistId: 'st1', branchId: 'b1', date: '2024-05-20', time: '10:00', status: 'pending', createdAt: '2024-05-19T10:00:00' },
    { id: 'bk2', customerName: 'Trần Văn B', customerPhone: '0909998887', serviceId: 's4', stylistId: 'st3', branchId: 'b1', date: '2024-05-20', time: '14:30', status: 'confirmed', createdAt: '2024-05-18T15:30:00' },
  ] as BookingItem[],
  settings: {
    brandName: 'Smart Salon',
    themeColor: '#f59e0b',
    heroTitle: 'Đẹp Trai Tức Thì',
    heroSubtitle: 'Không Cần Chờ Đợi',
    heroImage: 'https://picsum.photos/1920/1080?grayscale',
    contactHotline: '1900 6868',
    contactAddress: '123 Nguyễn Huệ, Quận 1, TP.HCM',
    socialFacebook: '#',
    socialTiktok: '#',
    socialZalo: '#',
  } as SiteSettings,
  conversations: [
    { 
        id: 'c1', user: 'Minh Tuấn', platform: 'Facebook', avatar: 'https://picsum.photos/50/50?random=100', lastMessage: 'Tiệm còn chỗ lúc 5h không ạ?', unreadCount: 1,
        messages: [{ id: 'm1', sender: 'user', text: 'Tiệm còn chỗ lúc 5h không ạ?', timestamp: '10:01' }]
    }
  ] as Conversation[],
  
  // Enhanced Customers Mock
  customers: [
      { 
          id: 'c1', name: 'Nguyễn Văn A', phone: '0901234567', email: 'vana@gmail.com', birthDate: '2000-05-20',
          totalVisits: 5, totalSpend: 1250000, lastVisit: '2024-05-01', rank: 'Silver', tags: ['Student', 'Nice'],
          history: [
               { id: 'h1', customerName: 'Nguyễn Văn A', customerPhone: '0901234567', serviceId: 's1', stylistId: 'st1', branchId: 'b1', date: '2024-05-01', time: '10:00', status: 'completed', createdAt: '2024-04-30' }
          ]
      },
      { 
          id: 'c2', name: 'Trần Văn B', phone: '0909998887', birthDate: '1995-10-10',
          totalVisits: 12, totalSpend: 5400000, lastVisit: '2024-05-18', rank: 'Gold', tags: ['VIP'],
          history: []
      },
      { 
          id: 'c3', name: 'Lê Thị C', phone: '0912345678', 
          totalVisits: 1, totalSpend: 150000, lastVisit: '2024-04-20', rank: 'New', tags: [],
          history: []
      }
  ] as Customer[],

  // Promotions Mock
  promotions: [
      {
          id: 'pr1', name: 'Ưu đãi Sinh Viên', description: 'Giảm 20% cho thẻ sinh viên', code: 'STUDENT20',
          type: 'percent', value: 20, startDate: '2024-01-01', endDate: '2024-12-31', isActive: true,
          conditions: { targetTag: 'Student' }
      },
      {
          id: 'pr2', name: 'Nhóm 3 Người', description: 'Giảm 30% khi đi nhóm 3 người', code: 'GROUP30',
          type: 'percent', value: 30, startDate: '2024-01-01', endDate: '2024-12-31', isActive: true,
          conditions: { minGroupSize: 3 }
      },
      {
          id: 'pr3', name: 'Tặng Keo Xịt', description: 'Tặng chai gôm nhỏ khi uốn/nhuộm', code: 'FREEGOM',
          type: 'gift', value: 0, giftName: 'Gôm Butterfly Mini', startDate: '2024-05-01', endDate: '2024-06-01', isActive: true,
          conditions: { requiredServiceId: 's4' } // Assuming s4 is a chemical service
      }
  ] as Promotion[],

  aiConfig: {
      apiKey: '',
      model: 'gemini-2.5-flash',
      temperature: 0.7,
      systemInstruction: 'Bạn là chuyên gia tư vấn tóc nam chuyên nghiệp, vui tính. Bạn có quyền truy cập vào danh sách dịch vụ và lịch trình để tư vấn chính xác.',
      isActive: true
  } as AIConfig,
  emailConfig: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: '587',
      smtpUser: 'booking@smartsalon.com',
      smtpPass: '******',
      enabled: true,
      templates: {
          bookingConfirmation: 'Chào {name}, lịch hẹn của bạn lúc {time} ngày {date} đã được xác nhận.',
          bookingReminder: 'Nhắc hẹn: Bạn có lịch cắt tóc tại Smart Salon vào ngày mai.',
          reviewRequest: 'Cảm ơn bạn đã ghé thăm. Hãy đánh giá dịch vụ nhé!'
      }
  } as EmailConfig,
  znsConfig: {
      oaId: '123456789',
      appId: '987654321',
      secretKey: '******',
      enabled: false,
      templates: {
          bookingSuccessId: '23456',
          reminderId: '34567'
      }
  } as ZNSConfig
};

// --- MOCK ADAPTER ---
const mockCall = <T>(data: T, delay = 500): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
};

// --- MOCK AUTH HELPERS ---
const findMockUser = (identifier: string, password: string, allowedRoles?: UserRole[]): MockUser | null => {
  const user = mockStore.users.find(u =>
    (u.username === identifier || u.phone === identifier || u.email === identifier) &&
    u.password === password
  );
  if (!user) return null;
  if (allowedRoles && !allowedRoles.includes(user.role)) return null;
  return user;
};

const buildAuthResponse = (user: MockUser): AuthResponse => ({
  access_token: `mock-jwt-token-${user.role.toLowerCase()}-${Date.now()}`,
  user: {
    id: user.id,
    username: user.username,
    full_name: user.full_name,
    phone: user.phone,
    email: user.email,
    role: user.role,
  }
});

export const apiClient = {
  // --- AUTH: CUSTOMER ---
  registerCustomer: async (data: RegisterData): Promise<RegisterResponse> => {
    if (USE_MOCK_API) {
      // Check if phone exists
      const existingPhone = mockStore.users.find(u => u.phone === data.phone);
      if (existingPhone) {
        return Promise.reject(new Error('Số điện thoại đã được sử dụng'));
      }
      // Check if email exists
      if (data.email) {
        const existingEmail = mockStore.users.find(u => u.email === data.email);
        if (existingEmail) {
          return Promise.reject(new Error('Email đã được sử dụng'));
        }
      }
      // Create new user
      const newUser: MockUser = {
        id: mockStore.users.length + 1,
        username: data.phone,
        phone: data.phone,
        email: data.email || '',
        password: data.password,
        full_name: data.full_name,
        role: 'CUSTOMER'
      };
      mockStore.users.push(newUser);
      return mockCall({
        message: 'Đăng ký thành công',
        user: {
          id: newUser.id,
          full_name: newUser.full_name,
          phone: newUser.phone,
          email: newUser.email,
          role: newUser.role
        }
      }, 800);
    }
    return fetch(`${API_URL}/auth/customer/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse);
  },

  loginCustomer: async (username: string, password: string): Promise<AuthResponse> => {
    if (USE_MOCK_API) {
      const user = findMockUser(username, password, ['CUSTOMER']);
      if (!user) {
        return Promise.reject(new Error('Số điện thoại/email hoặc mật khẩu không đúng'));
      }
      return mockCall(buildAuthResponse(user));
    }
    return fetch(`${API_URL}/auth/customer/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    }).then(handleResponse);
  },

  // --- AUTH: BARBER ---
  loginBarber: async (username: string, password: string): Promise<AuthResponse> => {
    if (USE_MOCK_API) {
      const user = findMockUser(username, password, ['BARBER']);
      if (!user) {
        return Promise.reject(new Error('Thông tin đăng nhập không đúng hoặc bạn không phải là Barber'));
      }
      return mockCall(buildAuthResponse(user));
    }
    return fetch(`${API_URL}/auth/barber/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    }).then(handleResponse);
  },

  // --- AUTH: ADMIN & SUPER_ADMIN ---
  loginAdmin: async (username: string, password: string): Promise<AuthResponse> => {
    if (USE_MOCK_API) {
      const user = findMockUser(username, password, ['ADMIN', 'SUPER_ADMIN']);
      if (!user) {
        return Promise.reject(new Error('Thông tin đăng nhập không đúng hoặc bạn không có quyền truy cập'));
      }
      return mockCall(buildAuthResponse(user));
    }
    return fetch(`${API_URL}/auth/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    }).then(handleResponse);
  },

  // --- AUTH: LEGACY (backwards compatibility) ---
  login: async (username: string, password: string): Promise<AuthResponse> => {
    if (USE_MOCK_API) {
      const user = findMockUser(username, password);
      if (!user) {
        return Promise.reject(new Error('Sai tài khoản hoặc mật khẩu'));
      }
      return mockCall(buildAuthResponse(user));
    }
    return fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    }).then(handleResponse);
  },

  // --- PUBLIC DATA ---
  getSettings: async (): Promise<SiteSettings> => {
    if (USE_MOCK_API) return mockCall(mockStore.settings);
    return fetch(`${API_URL}/settings`).then(handleResponse);
  },

  getBranches: async (): Promise<Branch[]> => {
    if (USE_MOCK_API) return mockCall(mockStore.branches);
    return fetch(`${API_URL}/branches`).then(handleResponse);
  },

  getServices: async (): Promise<Service[]> => {
    if (USE_MOCK_API) return mockCall(mockStore.services);
    return fetch(`${API_URL}/services`).then(handleResponse);
  },

  getStylists: async (): Promise<Stylist[]> => {
    if (USE_MOCK_API) return mockCall(mockStore.stylists);
    return fetch(`${API_URL}/stylists`).then(handleResponse);
  },

  getProducts: async (): Promise<Product[]> => {
    if (USE_MOCK_API) return mockCall(mockStore.products);
    return fetch(`${API_URL}/products`).then(handleResponse);
  },

  getReviews: async (): Promise<Review[]> => {
    if (USE_MOCK_API) return mockCall(mockStore.reviews);
    return fetch(`${API_URL}/reviews`).then(handleResponse);
  },

  // --- BOOKING ---
  createBooking: async (booking: Omit<BookingItem, 'id' | 'createdAt' | 'status'>) => {
    if (USE_MOCK_API) {
      const newBooking: BookingItem = {
        ...booking,
        id: `bk${Date.now()}`,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      mockStore.bookings.unshift(newBooking);
      return mockCall(newBooking, 800);
    }
    return fetch(`${API_URL}/booking`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking)
    }).then(handleResponse);
  },

  // --- ADMIN: MANAGE DATA ---
  updateSettings: async (settings: Partial<SiteSettings>) => {
    if (USE_MOCK_API) {
        mockStore.settings = { ...mockStore.settings, ...settings };
        return mockCall(mockStore.settings);
    }
    return fetch(`${API_URL}/admin/settings`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(settings)
    }).then(handleResponse);
  },

  updateBranch: async (id: string, data: Partial<Branch>) => {
    if (USE_MOCK_API) {
        mockStore.branches = mockStore.branches.map(b => b.id === id ? { ...b, ...data } : b);
        return mockCall(data);
    }
    return fetch(`${API_URL}/admin/branches/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    }).then(handleResponse);
  },

  // Services CRUD
  addService: async (service: Service) => {
      if (USE_MOCK_API) {
          mockStore.services.push(service);
          return mockCall(service);
      }
      return fetch(`${API_URL}/admin/services`, {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify(service)
      }).then(handleResponse);
  },
  updateService: async (id: string, data: Partial<Service>) => {
      if (USE_MOCK_API) {
          mockStore.services = mockStore.services.map(s => s.id === id ? { ...s, ...data } : s);
          return mockCall(data);
      }
      return fetch(`${API_URL}/admin/services/${id}`, {
          method: 'PUT',
          headers: getHeaders(),
          body: JSON.stringify(data)
      }).then(handleResponse);
  },
  deleteService: async (id: string) => {
      if (USE_MOCK_API) {
          mockStore.services = mockStore.services.filter(s => s.id !== id);
          return mockCall({ success: true });
      }
      return fetch(`${API_URL}/admin/services/${id}`, {
          method: 'DELETE',
          headers: getHeaders()
      }).then(handleResponse);
  },

  // Stylist CRUD
  toggleStylistStatus: async (id: string) => {
      if (USE_MOCK_API) {
          mockStore.stylists = mockStore.stylists.map(s => s.id === id ? { ...s, isBusy: !s.isBusy } : s);
          return mockCall({ success: true });
      }
      return fetch(`${API_URL}/admin/stylists/${id}/availability`, {
          method: 'PUT',
          headers: getHeaders()
      }).then(handleResponse);
  },

  // Bookings Admin
  getBookings: async () => {
    if (USE_MOCK_API) return mockCall(mockStore.bookings);
    return fetch(`${API_URL}/admin/bookings`, { headers: getHeaders() }).then(handleResponse);
  },

  updateBookingStatus: async (id: string, status: BookingItem['status']) => {
      if (USE_MOCK_API) {
          mockStore.bookings = mockStore.bookings.map(b => b.id === id ? { ...b, status } : b);
          return mockCall({ success: true });
      }
      return fetch(`${API_URL}/admin/bookings/${id}/status`, {
          method: 'PUT',
          headers: getHeaders(),
          body: JSON.stringify({ status })
      }).then(handleResponse);
  },

  // Inbox
  getConversations: async () => {
    if (USE_MOCK_API) return mockCall(mockStore.conversations);
    return fetch(`${API_URL}/admin/conversations`, { headers: getHeaders() }).then(handleResponse);
  },

  sendMessage: async (conversationId: string, text: string) => {
      if (USE_MOCK_API) {
          mockStore.conversations = mockStore.conversations.map(c => {
              if (c.id === conversationId) {
                  return {
                      ...c,
                      lastMessage: text,
                      unreadCount: 0,
                      messages: [...c.messages, {
                          id: `m${Date.now()}`,
                          sender: 'admin',
                          text: text,
                          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      }]
                  }
              }
              return c;
          });
          return mockCall({ success: true });
      }
      return fetch(`${API_URL}/admin/conversations/${conversationId}/reply`, {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify({ message: text })
      }).then(handleResponse);
  },

  // --- CRM & MODULES ---
  getCustomers: async () => {
      if (USE_MOCK_API) return mockCall(mockStore.customers);
      return fetch(`${API_URL}/admin/customers`, { headers: getHeaders() }).then(handleResponse);
  },
  
  // Promotions
  getPromotions: async () => {
      if (USE_MOCK_API) return mockCall(mockStore.promotions);
      return fetch(`${API_URL}/admin/promotions`, { headers: getHeaders() }).then(handleResponse);
  },
  addPromotion: async (promo: Promotion) => {
      if (USE_MOCK_API) {
          mockStore.promotions.push(promo);
          return mockCall(promo);
      }
      return fetch(`${API_URL}/admin/promotions`, {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify(promo)
      }).then(handleResponse);
  },
  deletePromotion: async (id: string) => {
      if (USE_MOCK_API) {
          mockStore.promotions = mockStore.promotions.filter(p => p.id !== id);
          return mockCall({success:true});
      }
      return fetch(`${API_URL}/admin/promotions/${id}`, { method: 'DELETE', headers: getHeaders() }).then(handleResponse);
  },

  getAIConfig: async () => {
      if (USE_MOCK_API) return mockCall(mockStore.aiConfig);
      return fetch(`${API_URL}/admin/config/ai`, { headers: getHeaders() }).then(handleResponse);
  },
  updateAIConfig: async (config: AIConfig) => {
      if (USE_MOCK_API) {
          mockStore.aiConfig = config;
          return mockCall(config);
      }
      return fetch(`${API_URL}/admin/config/ai`, {
          method: 'PUT',
          headers: getHeaders(),
          body: JSON.stringify(config)
      }).then(handleResponse);
  },

  getEmailConfig: async () => {
      if (USE_MOCK_API) return mockCall(mockStore.emailConfig);
      return fetch(`${API_URL}/admin/config/email`, { headers: getHeaders() }).then(handleResponse);
  },
  updateEmailConfig: async (config: EmailConfig) => {
      if (USE_MOCK_API) {
          mockStore.emailConfig = config;
          return mockCall(config);
      }
      return fetch(`${API_URL}/admin/config/email`, {
          method: 'PUT',
          headers: getHeaders(),
          body: JSON.stringify(config)
      }).then(handleResponse);
  },

  getZNSConfig: async () => {
      if (USE_MOCK_API) return mockCall(mockStore.znsConfig);
      return fetch(`${API_URL}/admin/config/zns`, { headers: getHeaders() }).then(handleResponse);
  },
  updateZNSConfig: async (config: ZNSConfig) => {
      if (USE_MOCK_API) {
          mockStore.znsConfig = config;
          return mockCall(config);
      }
      return fetch(`${API_URL}/admin/config/zns`, {
          method: 'PUT',
          headers: getHeaders(),
          body: JSON.stringify(config)
      }).then(handleResponse);
  },
  
  updateReview: async (id: string, update: Partial<Review>) => {
      if (USE_MOCK_API) {
          mockStore.reviews = mockStore.reviews.map(r => r.id === id ? { ...r, ...update } : r);
          return mockCall({ success: true });
      }
      return fetch(`${API_URL}/admin/reviews/${id}`, {
          method: 'PUT',
          headers: getHeaders(),
          body: JSON.stringify(update)
      }).then(handleResponse);
  }
};
