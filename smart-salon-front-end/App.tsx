
import React, { useState, useEffect } from 'react';
import { DataProvider, useData } from './contexts/DataContext';
import { BookingParams, Service } from './types';
import { Language } from './translations';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LiveStatus } from './components/LiveStatus';
import { FlashSale } from './components/FlashSale';
import { SmartMenu } from './components/SmartMenu';
import { StylistSpotlight } from './components/StylistSpotlight';
import { Lookbook } from './components/Lookbook';
import { ShopBar } from './components/ShopBar';
import { Footer } from './components/Footer';
import { BottomBar } from './components/BottomBar';
import { FloatingActions } from './components/FloatingActions';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Booking } from './components/Booking';
import { Login } from './components/admin/Login';
import { Dashboard } from './components/admin/Dashboard';
import { CustomerRegister, CustomerLogin, BarberLogin, AdminLogin } from './components/auth';
import { Loader2 } from 'lucide-react';

// View modes type
type ViewMode =
  | 'landing'
  | 'register'
  | 'customer-login'
  | 'barber-login'
  | 'admin-login'
  | 'admin'
  | 'barber-dashboard';

const MainApp: React.FC = () => {
  // Access dynamic data from Context
  const { branches, siteSettings, isLoading, logout, currentUser } = useData();

  const [currentBranchId, setCurrentBranchId] = useState<string>('');
  const [cart, setCart] = useState<Service[]>([]);
  const [lang, setLang] = useState<Language>('vi');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [bookingParams, setBookingParams] = useState<BookingParams | null>(null);

  // View State
  const [viewMode, setViewMode] = useState<ViewMode>('landing');

  // Sync Document Title
  useEffect(() => {
    if (siteSettings?.brandName) {
      document.title = `${siteSettings.brandName} - ${siteSettings.heroTitle}`;
    }
  }, [siteSettings]);

  // Set initial branch once data is loaded
  useEffect(() => {
    if (branches.length > 0 && !currentBranchId) {
      setCurrentBranchId(branches[0].id);
    }
  }, [branches, currentBranchId]);

  // ScrollSpy
  useEffect(() => {
    if (viewMode !== 'landing') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    const sections = ['home', 'about', 'services', 'booking', 'contact'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [viewMode]);

  // Check LocalStorage for Admin Session and auto-redirect based on role
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
          setViewMode('admin');
        } else if (user.role === 'BARBER') {
          setViewMode('barber-dashboard');
        }
      } catch (e) {
        // Invalid user data, ignore
      }
    }
  }, []);

  // Listen for custom event from Footer to open Login
  useEffect(() => {
    const handleAdminRequest = () => setViewMode('admin-login');
    window.addEventListener('requestAdminLogin', handleAdminRequest);
    return () => window.removeEventListener('requestAdminLogin', handleAdminRequest);
  }, []);

  const currentBranch = branches.find(b => b.id === currentBranchId) || branches[0];

  const handleBranchChange = (branchId: string) => {
    setCurrentBranchId(branchId);
  };

  const addToCart = (service: Service) => {
    setCart(prev => [...prev, service]);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    alert(`Đã nhận booking! Tổng: ${totalPrice.toLocaleString()}đ.\nChúng tôi sẽ gọi xác nhận ngay.`);
    setCart([]);
  };

  // Auth handlers
  const handleLoginClick = (type: 'customer' | 'barber' | 'admin') => {
    switch (type) {
      case 'customer':
        setViewMode('customer-login');
        break;
      case 'barber':
        setViewMode('barber-login');
        break;
      case 'admin':
        setViewMode('admin-login');
        break;
    }
  };

  const handleRegisterClick = () => {
    setViewMode('register');
  };

  const handleCustomerLoginSuccess = () => {
    setViewMode('landing');
  };

  const handleBarberLoginSuccess = () => {
    setViewMode('barber-dashboard');
  };

  const handleAdminLoginSuccess = (role: 'ADMIN' | 'SUPER_ADMIN') => {
    setViewMode('admin');
  };

  const handleRegisterSuccess = () => {
    setViewMode('customer-login');
  };

  const handleLogout = () => {
    logout();
    setViewMode('landing');
  };

  const handleBackToLanding = () => {
    setViewMode('landing');
  };

  // --- LOADING SCREEN ---
  if (isLoading) {
      return (
          <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
              <Loader2 className="w-12 h-12 text-brand-500 animate-spin mb-4" />
              <p className="text-sm font-bold tracking-widest uppercase animate-pulse">Loading Smart Salon...</p>
          </div>
      )
  }

  // --- RENDER LOGIC ---

  // Customer Register
  if (viewMode === 'register') {
    return (
      <CustomerRegister
        onRegisterSuccess={handleRegisterSuccess}
        onBack={handleBackToLanding}
        onLoginClick={() => setViewMode('customer-login')}
      />
    );
  }

  // Customer Login
  if (viewMode === 'customer-login') {
    return (
      <CustomerLogin
        onLoginSuccess={handleCustomerLoginSuccess}
        onBack={handleBackToLanding}
        onRegisterClick={handleRegisterClick}
      />
    );
  }

  // Barber Login
  if (viewMode === 'barber-login') {
    return (
      <BarberLogin
        onLoginSuccess={handleBarberLoginSuccess}
        onBack={handleBackToLanding}
      />
    );
  }

  // Admin Login (for Admin & Super Admin)
  if (viewMode === 'admin-login') {
    return (
      <AdminLogin
        onLoginSuccess={handleAdminLoginSuccess}
        onBack={handleBackToLanding}
      />
    );
  }

  // Admin Dashboard
  if (viewMode === 'admin') {
    return <Dashboard onLogout={handleLogout} />;
  }

  // Barber Dashboard (placeholder - can be expanded later)
  if (viewMode === 'barber-dashboard') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Barber Dashboard</h1>
          <p className="text-gray-400 mb-6">Xin chào, {currentUser?.full_name}</p>
          <p className="text-gray-500 mb-8">Tính năng đang được phát triển...</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    );
  }

  if (!currentBranch) return null;

  return (
    <div className="min-h-screen bg-brand-950 flex flex-col font-sans text-white">
      <Header
        currentBranch={currentBranch}
        branches={branches}
        onBranchChange={handleBranchChange}
        lang={lang}
        onLangChange={setLang}
        activeSection={activeSection}
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
      />
      
      <main className="flex-grow w-full flex flex-col gap-0">
        <div id="home" className="w-full">
            <Hero lang={lang} onSearch={setBookingParams} />
        </div>

        <div className="w-full py-8 bg-brand-950">
            <div className="container mx-auto px-4 flex flex-col gap-12">
                <LiveStatus branch={currentBranch} />
            </div>
        </div>

        <div id="about" className="w-full scroll-mt-20">
            <About lang={lang} />
        </div>

        <div className="w-full py-8 bg-dark-900/30">
            <div className="container mx-auto px-4 flex flex-col gap-12">
                <FlashSale onAdd={addToCart} />
                <div id="services" className="scroll-mt-24">
                   <SmartMenu onAdd={addToCart} lang={lang} />
                </div>
            </div>
        </div>

        <div className="w-full py-12">
            <div className="container mx-auto px-4 flex flex-col gap-16">
                <StylistSpotlight />
                <Lookbook />
            </div>
        </div>

        <div id="booking" className="w-full scroll-mt-20">
            <Booking lang={lang} initialParams={bookingParams} />
        </div>

        <div className="w-full py-12 bg-dark-900/30">
             <div className="container mx-auto px-4">
                <ShopBar />
             </div>
        </div>

        <div id="contact" className="w-full scroll-mt-20">
            <Contact lang={lang} />
        </div>
      </main>

      <Footer lang={lang} />
      
      <BottomBar 
        itemCount={cart.length} 
        totalPrice={totalPrice} 
        onCheckout={handleCheckout} 
      />

      <FloatingActions lang={lang} />
    </div>
  );
};

const App: React.FC = () => {
    return (
        <DataProvider>
            <MainApp />
        </DataProvider>
    );
}

export default App;
