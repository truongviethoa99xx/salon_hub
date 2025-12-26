
export interface Service {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'cut' | 'spa' | 'chemical';
  image?: string;
  duration: string;
}

export interface Stylist {
  id: string;
  name: string;
  level: 'Senior' | 'Master' | 'Director';
  rating: number;
  reviewCount: number;
  specialty: string;
  isBusy: boolean;
  avatar: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  distance?: string;
  queueStatus: {
    busyLevel: 'Low' | 'Medium' | 'High';
    chairsAvailable: number;
    bedsWaiting: number;
  };
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface Review {
  id: string;
  user: string;
  comment: string;
  rating: number;
  platform: 'Facebook' | 'Google' | 'TikTok' | 'Website';
  date: string;
  status: 'pending' | 'approved' | 'hidden';
  reply?: string;
}

export interface BookingParams {
    serviceCategory?: 'cut' | 'spa' | 'chemical';
    dateOffset?: number; // 0 for today, 1 for tomorrow
}

// --- ADMIN TYPES ---

export interface BookingItem {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceId: string;
  stylistId: string;
  branchId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface SiteSettings {
  brandName: string;
  logoUrl?: string; // If empty, use text
  themeColor: string; // Hex code
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  contactHotline: string;
  contactAddress: string;
  socialFacebook: string;
  socialTiktok: string;
  socialZalo: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'admin';
  timestamp: string;
}

export interface Conversation {
  id: string;
  user: string;
  platform: 'Facebook' | 'Zalo' | 'TikTok';
  avatar: string;
  lastMessage: string;
  unreadCount: number;
  messages: Message[];
}

// --- NEW MODULES ---

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  birthDate?: string; // YYYY-MM-DD
  totalVisits: number;
  totalSpend: number;
  lastVisit: string;
  rank: 'New' | 'Member' | 'Silver' | 'Gold' | 'Diamond';
  tags: string[]; // e.g., "Student", "Vip", "Bad Attitude"
  notes?: string;
  history: BookingItem[]; // Past bookings
}

export interface Promotion {
  id: string;
  name: string;
  description: string;
  code: string;
  type: 'percent' | 'fixed' | 'gift';
  value: number; // Percentage or Amount
  giftName?: string; // If type is gift
  startDate: string;
  endDate: string;
  isActive: boolean;
  conditions: {
    minGroupSize?: number; // e.g., 3 people
    targetTag?: string; // e.g., "Student"
    requiredServiceId?: string; // e.g., Buy Combo A get Gift
    minSpend?: number;
  };
}

export interface AIConfig {
  apiKey: string;
  model: string;
  temperature: number;
  systemInstruction: string;
  isActive: boolean;
}

export interface EmailConfig {
  smtpHost: string;
  smtpPort: string;
  smtpUser: string;
  smtpPass: string;
  enabled: boolean;
  templates: {
    bookingConfirmation: string;
    bookingReminder: string;
    reviewRequest: string;
  };
}

export interface ZNSConfig {
  oaId: string;
  appId: string;
  secretKey: string;
  enabled: boolean;
  templates: {
    bookingSuccessId: string;
    reminderId: string;
  };
}
