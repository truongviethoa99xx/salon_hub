
import React, { useState } from 'react';
import { MapPin, Menu, X, Globe } from 'lucide-react';
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
}

export const Header: React.FC<HeaderProps> = ({ 
  currentBranch, 
  branches, 
  onBranchChange,
  lang,
  onLangChange,
  activeSection
}) => {
  const { siteSettings } = useData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[lang].nav;
  const tMenu = translations[lang].menu;

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
                <div className="relative">
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
                </div>
            </div>
        )}
      </div>
    </header>
  );
};
