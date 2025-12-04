import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Trang chủ', href: '#hero' },
    { label: 'Dịch vụ', href: '#services' },
    { label: 'Về chúng tôi', href: '#about' },
    { label: 'Đội ngũ', href: '#team' },
  ];

  const services = [
    'Cắt tóc & Tạo kiểu',
    'Nhuộm & Tẩy tóc',
    'Uốn & Duỗi',
    'Phục hồi tóc',
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-black mb-4 tracking-tighter">STYLIST</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Nâng tầm vẻ đẹp Việt với dịch vụ chăm sóc tóc đẳng cấp quốc tế.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Youtube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-black mb-4 uppercase tracking-wider">Liên kết</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/admin" className="text-gray-400 hover:text-white transition-colors">
                  Quản lý (Admin)
                </Link>
              </li>
              <li>
                <Link to="/staff" className="text-gray-400 hover:text-white transition-colors">
                  Nhân viên (Staff)
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-black mb-4 uppercase tracking-wider">Dịch vụ</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-black mb-4 uppercase tracking-wider">Liên hệ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  123 Nguyễn Huệ, Quận 1,<br />TP. Hồ Chí Minh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400 shrink-0" />
                <a href="tel:0901234567" className="text-gray-400 hover:text-white transition-colors">
                  090 123 4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400 shrink-0" />
                <a href="mailto:info@stylist.vn" className="text-gray-400 hover:text-white transition-colors">
                  info@stylist.vn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Stylist Salon. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 fill-red-500 text-red-500" /> in Vietnam
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

