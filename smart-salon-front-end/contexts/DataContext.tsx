
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    Branch, Service, Stylist, Product, Review,
    BookingItem, SiteSettings, Conversation,
    Customer, AIConfig, EmailConfig, ZNSConfig, Promotion
} from '../types';
import { apiClient, AuthUser, UserRole } from '../services/apiClient';

interface DataContextType {
  // Data
  branches: Branch[];
  services: Service[];
  stylists: Stylist[];
  products: Product[];
  reviews: Review[];
  bookings: BookingItem[];
  siteSettings: SiteSettings;
  conversations: Conversation[];

  // New Modules Data
  customers: Customer[];
  promotions: Promotion[];
  aiConfig: AIConfig | null;
  emailConfig: EmailConfig | null;
  znsConfig: ZNSConfig | null;

  // States
  isLoading: boolean;
  isAdmin: boolean;

  // User Auth State
  currentUser: AuthUser | null;
  isAuthenticated: boolean;

  // Actions - Legacy
  login: (u: string, p: string) => Promise<void>;
  logout: () => void;

  // Actions - New Auth
  loginCustomer: (username: string, password: string) => Promise<void>;
  loginBarber: (username: string, password: string) => Promise<void>;
  loginAdmin: (username: string, password: string) => Promise<{ role: UserRole }>;
  registerCustomer: (data: { full_name: string; phone: string; email?: string; password: string }) => Promise<void>;
  
  updateBranch: (id: string, data: Partial<Branch>) => void;
  updateService: (id: string, data: Partial<Service>) => void;
  addService: (service: Service) => void;
  deleteService: (id: string) => void;
  updateStylist: (id: string, data: Partial<Stylist>) => void;
  addStylist: (stylist: Stylist) => void;
  toggleStylistStatus: (id: string) => void;
  
  addBooking: (booking: Omit<BookingItem, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateBookingStatus: (id: string, status: BookingItem['status']) => void;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  markConversationRead: (id: string) => void;
  sendMessage: (conversationId: string, text: string) => void;

  // New Actions
  saveAIConfig: (config: AIConfig) => Promise<void>;
  saveEmailConfig: (config: EmailConfig) => Promise<void>;
  saveZNSConfig: (config: ZNSConfig) => Promise<void>;
  replyReview: (id: string, reply: string) => Promise<void>;
  toggleReviewStatus: (id: string) => Promise<void>;
  addPromotion: (promo: Promotion) => Promise<void>;
  deletePromotion: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Default settings for initial render to avoid white screen before fetch
const DEFAULT_SETTINGS: SiteSettings = {
  brandName: 'Smart Salon',
  themeColor: '#f59e0b',
  heroTitle: 'Đẹp Trai Tức Thì',
  heroSubtitle: 'Loading...',
  heroImage: 'https://picsum.photos/1920/1080?grayscale',
  contactHotline: '...',
  contactAddress: '...',
  socialFacebook: '#',
  socialTiktok: '#',
  socialZalo: '#',
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // User Auth State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Public Data
  const [branches, setBranches] = useState<Branch[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  // Public but dynamic based on backend
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [aiConfig, setAiConfig] = useState<AIConfig | null>(null); // Needed for public chat

  // Admin Data
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [emailConfig, setEmailConfig] = useState<EmailConfig | null>(null);
  const [znsConfig, setZnsConfig] = useState<ZNSConfig | null>(null);

  // 1. Initial Load (Public Data)
  useEffect(() => {
    const loadPublicData = async () => {
      try {
        const s = await apiClient.getSettings();
        setSiteSettings(s);
        if (s.themeColor) document.documentElement.style.setProperty('--color-brand', s.themeColor);

        const b = await apiClient.getBranches();
        setBranches(b);

        const sv = await apiClient.getServices();
        setServices(sv);

        const st = await apiClient.getStylists();
        setStylists(st);

        const p = await apiClient.getProducts();
        setProducts(p);
        
        const r = await apiClient.getReviews();
        setReviews(r.filter(review => review.status === 'approved'));

        const promos = await apiClient.getPromotions();
        setPromotions(promos);
        
        // Load AI Config publicly so the chat works (in real app, use backend proxy to hide key)
        const ai = await apiClient.getAIConfig();
        setAiConfig(ai);

      } catch (error) {
        console.error("Failed to load public data", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPublicData();

    // Check Session & Restore User
    const token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('currentUser');
    if (token && savedUser) {
      try {
        const user = JSON.parse(savedUser) as AuthUser;
        setCurrentUser(user);
        setIsAuthenticated(true);
        if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
          setIsAdmin(true);
        }
      } catch (e) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  // 2. Admin Load (Private Data)
  useEffect(() => {
    if (isAdmin) {
      const loadAdminData = async () => {
        try {
          const [bk, cv, cu, em, zns, allReviews] = await Promise.all([
            apiClient.getBookings(),
            apiClient.getConversations(),
            apiClient.getCustomers(),
            apiClient.getEmailConfig(),
            apiClient.getZNSConfig(),
            apiClient.getReviews()
          ]);
          setBookings(bk);
          setConversations(cv);
          setCustomers(cu);
          setEmailConfig(em);
          setZnsConfig(zns);
          setReviews(allReviews);
        } catch (error) {
          console.error("Failed to load admin data", error);
        }
      };
      loadAdminData();
    }
  }, [isAdmin]);

  // --- ACTIONS ---

  // Helper to save auth state
  const saveAuthState = (token: string, user: AuthUser) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  // Legacy login (backwards compatibility)
  const login = async (u: string, p: string) => {
    const data = await apiClient.login(u, p);
    saveAuthState(data.access_token, data.user);
    if (data.user.role === 'ADMIN' || data.user.role === 'SUPER_ADMIN') {
      setIsAdmin(true);
    }
  };

  // Customer Login
  const loginCustomer = async (username: string, password: string) => {
    const data = await apiClient.loginCustomer(username, password);
    saveAuthState(data.access_token, data.user);
  };

  // Barber Login
  const loginBarber = async (username: string, password: string) => {
    const data = await apiClient.loginBarber(username, password);
    saveAuthState(data.access_token, data.user);
  };

  // Admin Login (returns role for redirect logic)
  const loginAdmin = async (username: string, password: string): Promise<{ role: UserRole }> => {
    const data = await apiClient.loginAdmin(username, password);
    saveAuthState(data.access_token, data.user);
    setIsAdmin(true);
    return { role: data.user.role };
  };

  // Customer Register
  const registerCustomer = async (data: { full_name: string; phone: string; email?: string; password: string }) => {
    await apiClient.registerCustomer(data);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  // Branch
  const updateBranch = async (id: string, data: Partial<Branch>) => {
    setBranches(prev => prev.map(b => b.id === id ? { ...b, ...data } : b));
    await apiClient.updateBranch(id, data);
  };

  // Service
  const updateService = async (id: string, data: Partial<Service>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
    await apiClient.updateService(id, data);
  };

  const addService = async (service: Service) => {
    setServices(prev => [...prev, service]);
    await apiClient.addService(service);
  };

  const deleteService = async (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    await apiClient.deleteService(id);
  };

  // Stylist
  const updateStylist = (id: string, data: Partial<Stylist>) => { };
  const addStylist = (stylist: Stylist) => { };

  const toggleStylistStatus = async (id: string) => {
    setStylists(prev => prev.map(s => s.id === id ? { ...s, isBusy: !s.isBusy } : s));
    await apiClient.toggleStylistStatus(id);
  };

  // Bookings
  const addBooking = async (bookingData: Omit<BookingItem, 'id' | 'createdAt' | 'status'>) => {
      await apiClient.createBooking(bookingData);
      if (isAdmin) {
          const b = await apiClient.getBookings();
          setBookings(b);
      }
  };

  const updateBookingStatus = async (id: string, status: BookingItem['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    await apiClient.updateBookingStatus(id, status);
  };

  // Settings
  const updateSiteSettings = async (settings: Partial<SiteSettings>) => {
    setSiteSettings(prev => {
        const newSettings = { ...prev, ...settings };
        if (settings.themeColor) {
            document.documentElement.style.setProperty('--color-brand', settings.themeColor);
        }
        return newSettings;
    });
    await apiClient.updateSettings(settings);
  };

  // Inbox
  const markConversationRead = (id: string) => {
    setConversations(prev => prev.map(c => c.id === id ? { ...c, unreadCount: 0 } : c));
  };

  const sendMessage = async (conversationId: string, text: string) => {
    setConversations(prev => prev.map(c => {
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
            };
        }
        return c;
    }));
    await apiClient.sendMessage(conversationId, text);
  };

  // New Module Actions
  const saveAIConfig = async (config: AIConfig) => {
      setAiConfig(config);
      await apiClient.updateAIConfig(config);
  }
  const saveEmailConfig = async (config: EmailConfig) => {
      setEmailConfig(config);
      await apiClient.updateEmailConfig(config);
  }
  const saveZNSConfig = async (config: ZNSConfig) => {
      setZnsConfig(config);
      await apiClient.updateZNSConfig(config);
  }
  const replyReview = async (id: string, reply: string) => {
      setReviews(prev => prev.map(r => r.id === id ? { ...r, reply } : r));
      await apiClient.updateReview(id, { reply });
  }
  const toggleReviewStatus = async (id: string) => {
      const review = reviews.find(r => r.id === id);
      if (!review) return;
      const newStatus = review.status === 'hidden' ? 'approved' : 'hidden';
      setReviews(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
      await apiClient.updateReview(id, { status: newStatus });
  }
  
  const addPromotion = async (promo: Promotion) => {
      setPromotions(prev => [...prev, promo]);
      await apiClient.addPromotion(promo);
  }
  
  const deletePromotion = async (id: string) => {
      setPromotions(prev => prev.filter(p => p.id !== id));
      await apiClient.deletePromotion(id);
  }

  return (
    <DataContext.Provider value={{
      branches, services, stylists, products, reviews,
      bookings, siteSettings, conversations,
      customers, promotions, aiConfig, emailConfig, znsConfig,
      isLoading, isAdmin,
      currentUser, isAuthenticated,
      login, logout,
      loginCustomer, loginBarber, loginAdmin, registerCustomer,
      updateBranch, updateService, addService, deleteService,
      updateStylist, addStylist, toggleStylistStatus,
      addBooking, updateBookingStatus, updateSiteSettings, markConversationRead, sendMessage,
      saveAIConfig, saveEmailConfig, saveZNSConfig, replyReview, toggleReviewStatus,
      addPromotion, deletePromotion
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
