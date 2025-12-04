import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Calendar, Phone } from 'lucide-react';
import { Button } from '../../components/ui/button';
import LanguageSwitcher from '../../components/LanguageSwitcher';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Trang chủ', href: '#hero' },
    { label: 'Dịch vụ', href: '#services' },
    { label: 'Về chúng tôi', href: '#about' },
    { label: 'Đội ngũ', href: '#team' },
    { label: 'Đánh giá', href: '#testimonials' },
    { label: 'Liên hệ', href: '#contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-200'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className={`text-2xl font-black tracking-tighter transition-colors ${
                isScrolled ? 'text-black' : 'text-white'
              }`}>
                STYLIST
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`font-bold text-sm transition-colors hover:scale-105 ${
                    isScrolled
                      ? 'text-gray-700 hover:text-black'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <LanguageSwitcher />
              <a href="tel:0901234567">
                <Button
                  variant={isScrolled ? 'outline' : 'outline'}
                  className={`font-bold ${
                    isScrolled
                      ? 'border-black text-black hover:bg-black hover:text-white'
                      : 'border-white text-white hover:bg-white hover:text-black'
                  }`}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  090 123 4567
                </Button>
              </a>
              <Link to="/admin">
                <Button
                  className={`font-bold ${
                    isScrolled
                      ? 'bg-black text-white hover:bg-gray-800'
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Đặt lịch
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl transition-colors ${
                isScrolled
                  ? 'text-black hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-20 left-0 right-0 bg-white border-b border-gray-200 shadow-xl">
            <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="block py-3 text-lg font-bold text-black hover:text-gray-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <LanguageSwitcher />
                <a href="tel:0901234567" className="block">
                  <Button variant="outline" className="w-full font-bold border-black text-black">
                    <Phone className="w-4 h-4 mr-2" />
                    090 123 4567
                  </Button>
                </a>
                <Link to="/admin" className="block">
                  <Button className="w-full bg-black text-white font-bold">
                    <Calendar className="w-4 h-4 mr-2" />
                    Đặt lịch ngay
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

