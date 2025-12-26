
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
import { Loader2 } from 'lucide-react';

const MainApp: React.FC = () => {
  // Access dynamic data from Context
  const { branches, siteSettings, isLoading, logout } = useData();
  
  const [currentBranchId, setCurrentBranchId] = useState<string>('');
  const [cart, setCart] = useState<Service[]>([]);
  const [lang, setLang] = useState<Language>('vi');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [bookingParams, setBookingParams] = useState<BookingParams | null>(null);
  
  // View State (Landing, Login, Admin)
  const [viewMode, setViewMode] = useState<'landing' | 'login' | 'admin'>('landing');

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

  // Check LocalStorage for Admin Session
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
        // Optional: Auto redirect
    }
  }, []);

  // Listen for custom event from Footer to open Login
  useEffect(() => {
    const handleAdminRequest = () => setViewMode('login');
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

  const handleLoginSuccess = () => {
      setViewMode('admin');
  };

  const handleLogout = () => {
      logout();
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

  if (viewMode === 'login') {
      return <Login onLogin={handleLoginSuccess} onBack={() => setViewMode('landing')} />;
  }

  if (viewMode === 'admin') {
      return <Dashboard onLogout={handleLogout} />;
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
