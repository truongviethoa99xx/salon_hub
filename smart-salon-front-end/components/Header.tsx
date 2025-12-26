
import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Menu, X, Globe, User, LogIn, UserPlus, ChevronDown, LogOut, Scissors, Shield } from 'lucide-react';
import { Branch } from '../types';
import { Language, translations } from '../translations';
import { useData } from '../contexts/DataContext';

interface HeaderProps {
  currentBranch: Branch;
  branches: Branch[];
  onBranchChange: (branchId: string) => void;
  lang: Language;
  onLangChange: (lang: Language) => void;
  activeSection: string;
  onLoginClick?: (type: 'customer' | 'barber' | 'admin') => void;
  onRegisterClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentBranch,
  branches,
  onBranchChange,
  lang,
  onLangChange,
  activeSection,
  onLoginClick,
  onRegisterClick
}) => {
  const { siteSettings, currentUser, isAuthenticated, logout } = useData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const authDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const t = translations[lang].nav;
  const tMenu = translations[lang].menu;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (authDropdownRef.current && !authDropdownRef.current.contains(event.target as Node)) {
        setIsAuthDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'home', label: t.home },
    { id: 'about', label: t.about },
    { id: 'services', label: tMenu.title },
    { id: 'booking', label: t.booking },
    { id: 'contact', label: t.contact },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Height of sticky header + padding
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-950/95 backdrop-blur-md border-b border-white/10 shadow-lg transition-all duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
            {/* Logo Area */}
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => scrollToSection('home')}
            >
            {siteSettings.logoUrl ? (
                <img src={siteSettings.logoUrl} alt={siteSettings.brandName} className="h-8 md:h-10 w-auto object-contain" />
            ) : (
                <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center font-bold text-black shadow-brand-500/50 shadow-sm group-hover:rotate-12 transition-transform">
                    {siteSettings.brandName.charAt(0)}
                </div>
            )}
            <span className="font-bold text-white hidden sm:block text-lg tracking-tight">{siteSettings.brandName}</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
                {navLinks.map(link => (
                    <button
                        key={link.id}
                        onClick={() => scrollToSection(link.id)}
                        className={`text-sm font-bold px-4 py-2 rounded-full transition-all duration-300 relative ${
                          activeSection === link.id 
                            ? 'text-brand-500 bg-brand-500/10 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        {link.label}
                        {activeSection === link.id && (
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-500 rounded-full"></span>
                        )}
                    </button>
                ))}
            </nav>

            <div className="flex items-center gap-3">
                {/* Branch Selector */}
                <div className="relative hidden sm:block group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none text-brand-500">
                        <MapPin size={14} />
                    </div>
                    <select
                        value={currentBranch.id}
                        onChange={(e) => onBranchChange(e.target.value)}
                        className="bg-dark-800 text-white text-xs rounded-full py-2 pl-8 pr-4 appearance-none focus:outline-none focus:ring-1 focus:ring-brand-500 border border-white/10 cursor-pointer hover:bg-dark-800/80 transition-colors max-w-[200px] truncate font-medium"
                    >
                        {branches.map(b => (
                        <option key={b.id} value={b.id}>
                            {b.name}
                        </option>
                        ))}
                    </select>
                </div>

                {/* Lang Selector */}
                <div className="relative hidden sm:block">
                   <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none text-gray-400">
                        <Globe size={12} />
                   </div>
                   <select
                        value={lang}
                        onChange={(e) => onLangChange(e.target.value as Language)}
                        className="bg-dark-800 text-white text-xs rounded border border-white/10 py-1.5 pl-6 pr-2 appearance-none focus:outline-none hover:border-brand-500 cursor-pointer uppercase font-bold"
                   >
                        <option value="vi">VN</option>
                        <option value="en">EN</option>
                   </select>
                </div>

                {/* Auth Buttons */}
                {isAuthenticated && currentUser ? (
                  // User is logged in - Show user dropdown
                  <div className="relative hidden sm:block" ref={userDropdownRef}>
                    <button
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className="flex items-center gap-2 bg-dark-800 hover:bg-dark-700 text-white text-sm rounded-full py-2 px-4 border border-white/10 transition-colors"
                    >
                      <div className="w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center text-black text-xs font-bold">
                        {currentUser.full_name.charAt(0).toUpperCase()}
                      </div>
                      <span className="max-w-[100px] truncate font-medium">{currentUser.full_name}</span>
                      <ChevronDown size={14} className={`transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isUserDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-dark-800 rounded-lg border border-white/10 shadow-xl py-1 z-50">
                        <div className="px-4 py-2 border-b border-white/10">
                          <p className="text-xs text-gray-400">Xin chào,</p>
                          <p className="text-sm font-medium text-white truncate">{currentUser.full_name}</p>
                          <p className="text-xs text-brand-500">{currentUser.role}</p>
                        </div>
                        <button
                          onClick={() => { logout(); setIsUserDropdownOpen(false); }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut size={16} />
                          Đăng xuất
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  // User is not logged in - Show auth buttons
                  <div className="hidden sm:flex items-center gap-2">
                    {/* Register Button */}
                    <button
                      onClick={onRegisterClick}
                      className="flex items-center gap-1.5 text-sm font-medium text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <UserPlus size={16} />
                      Đăng ký
                    </button>

                    {/* Login Dropdown */}
                    <div className="relative" ref={authDropdownRef}>
                      <button
                        onClick={() => setIsAuthDropdownOpen(!isAuthDropdownOpen)}
                        className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-black text-sm font-bold px-4 py-2 rounded-lg transition-colors"
                      >
                        <LogIn size={16} />
                        Đăng nhập
                        <ChevronDown size={14} className={`transition-transform ${isAuthDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isAuthDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-52 bg-dark-800 rounded-lg border border-white/10 shadow-xl py-1 z-50">
                          <button
                            onClick={() => { onLoginClick?.('customer'); setIsAuthDropdownOpen(false); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <User size={18} className="text-brand-500" />
                            <div className="text-left">
                              <p className="font-medium">Khách hàng</p>
                              <p className="text-xs text-gray-500">Đặt lịch & quản lý</p>
                            </div>
                          </button>
                          <button
                            onClick={() => { onLoginClick?.('barber'); setIsAuthDropdownOpen(false); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <Scissors size={18} className="text-emerald-500" />
                            <div className="text-left">
                              <p className="font-medium">Barber</p>
                              <p className="text-xs text-gray-500">Thợ cắt tóc</p>
                            </div>
                          </button>
                          <button
                            onClick={() => { onLoginClick?.('admin'); setIsAuthDropdownOpen(false); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <Shield size={18} className="text-indigo-500" />
                            <div className="text-left">
                              <p className="font-medium">Admin</p>
                              <p className="text-xs text-gray-500">Quản trị hệ thống</p>
                            </div>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white p-1 hover:text-brand-500 transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
            <div className="md:hidden pt-4 pb-2 border-t border-white/10 mt-3 animate-in slide-in-from-top-2">
                <div className="flex flex-col gap-2">
                    {navLinks.map(link => (
                        <button
                            key={link.id}
                            onClick={() => scrollToSection(link.id)}
                            className={`text-left py-3 px-3 rounded-lg font-medium transition-colors ${
                              activeSection === link.id
                                ? 'bg-brand-500/10 text-brand-500 border border-brand-500/20'
                                : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            {link.label}
                        </button>
                    ))}
                    <div className="mt-2 pt-4 border-t border-white/5">
                        <p className="text-xs text-gray-500 mb-2 uppercase font-bold">Chi nhánh</p>
                        <div className="relative">
                             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-brand-500">
                                <MapPin size={16} />
                            </div>
                            <select
                                value={currentBranch.id}
                                onChange={(e) => onBranchChange(e.target.value)}
                                className="w-full bg-dark-800 text-white text-sm rounded-lg py-3 pl-10 pr-4 border border-white/10"
                            >
                                {branches.map(b => (
                                <option key={b.id} value={b.id}>
                                    {b.name}
                                </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Mobile Auth Buttons */}
                    <div className="mt-4 pt-4 border-t border-white/5">
                      {isAuthenticated && currentUser ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 px-3 py-2 bg-dark-800 rounded-lg">
                            <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center text-black font-bold">
                              {currentUser.full_name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-white font-medium">{currentUser.full_name}</p>
                              <p className="text-xs text-brand-500">{currentUser.role}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => { logout(); setIsMenuOpen(false); }}
                            className="w-full flex items-center justify-center gap-2 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <LogOut size={18} />
                            Đăng xuất
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <button
                            onClick={() => { onRegisterClick?.(); setIsMenuOpen(false); }}
                            className="w-full flex items-center justify-center gap-2 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors border border-white/10"
                          >
                            <UserPlus size={18} />
                            Đăng ký thành viên
                          </button>
                          <p className="text-xs text-gray-500 text-center uppercase font-bold pt-2">Đăng nhập</p>
                          <button
                            onClick={() => { onLoginClick?.('customer'); setIsMenuOpen(false); }}
                            className="w-full flex items-center gap-3 py-3 px-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                          >
                            <User size={18} className="text-brand-500" />
                            Khách hàng
                          </button>
                          <button
                            onClick={() => { onLoginClick?.('barber'); setIsMenuOpen(false); }}
                            className="w-full flex items-center gap-3 py-3 px-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                          >
                            <Scissors size={18} className="text-emerald-500" />
                            Barber
                          </button>
                          <button
                            onClick={() => { onLoginClick?.('admin'); setIsMenuOpen(false); }}
                            className="w-full flex items-center gap-3 py-3 px-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                          >
                            <Shield size={18} className="text-indigo-500" />
                            Admin
                          </button>
                        </div>
                      )}
                    </div>
                </div>
            </div>
        )}
      </div>
    </header>
  );
};
