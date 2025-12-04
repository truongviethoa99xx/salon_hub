import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-black/5 rounded-full mb-4">
            <span className="text-sm font-bold uppercase tracking-wider text-black">Liên hệ</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-black mb-6 tracking-tight">
            Ghé thăm <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-black">Chúng tôi</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Đến với Stylist Salon để trải nghiệm dịch vụ đẳng cấp
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="space-y-6 mb-8">
              {/* Address */}
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-gray-200">
                <div className="p-4 rounded-xl bg-black text-white shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-xl mb-2">Địa chỉ</h3>
                  <p className="text-gray-600 leading-relaxed">
                    123 Nguyễn Huệ, Phường Bến Nghé,<br />
                    Quận 1, TP. Hồ Chí Minh
                  </p>
                  <a href="#" className="inline-block mt-2 text-sm font-bold text-black hover:text-gray-600 transition-colors">
                    Xem trên Google Maps →
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-gray-200">
                <div className="p-4 rounded-xl bg-black text-white shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-xl mb-2">Điện thoại</h3>
                  <a href="tel:0901234567" className="text-2xl font-black text-black hover:text-gray-600 transition-colors">
                    090 123 4567
                  </a>
                  <p className="text-sm text-gray-600 mt-1">Hotline hỗ trợ 24/7</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-gray-200">
                <div className="p-4 rounded-xl bg-black text-white shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-xl mb-2">Email</h3>
                  <a href="mailto:info@stylist.vn" className="text-xl font-black text-black hover:text-gray-600 transition-colors">
                    info@stylist.vn
                  </a>
                  <p className="text-sm text-gray-600 mt-1">Phản hồi trong vòng 24h</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-gray-200">
                <div className="p-4 rounded-xl bg-black text-white shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-xl mb-2">Giờ mở cửa</h3>
                  <div className="space-y-1 text-gray-600">
                    <p className="flex justify-between gap-8">
                      <span className="font-bold">Thứ 2 - Thứ 6:</span>
                      <span>8:00 - 22:00</span>
                    </p>
                    <p className="flex justify-between gap-8">
                      <span className="font-bold">Thứ 7 - Chủ nhật:</span>
                      <span>8:00 - 23:00</span>
                    </p>
                    <p className="text-sm text-green-600 font-bold mt-2">✓ Mở cửa cả ngày lễ</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="p-6 rounded-2xl bg-black text-white">
              <h3 className="font-black text-xl mb-4">Kết nối với chúng tôi</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  aria-label="Youtube"
                >
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                Theo dõi để cập nhật xu hướng tóc mới nhất và nhận ưu đãi đặc biệt!
              </p>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="relative">
            <div className="sticky top-8">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden border-2 border-gray-200">
                {/* Replace with actual Google Maps embed */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <MapPin className="w-20 h-20 mx-auto mb-4" />
                    <p className="font-bold text-xl mb-2">Google Maps</p>
                    <p className="text-sm">Embed map here</p>
                  </div>
                </div>
                {/* Uncomment and add your Google Maps embed URL
                <iframe
                  src="YOUR_GOOGLE_MAPS_EMBED_URL"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                */}
              </div>

              {/* Directions Button */}
              <div className="mt-6 p-6 rounded-2xl bg-white border border-gray-200 text-center">
                <p className="text-gray-600 mb-4">
                  Cần hướng dẫn đường đi?
                </p>
                <button className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                  <MapPin className="w-5 h-5 inline mr-2" />
                  Chỉ đường trên Google Maps
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

