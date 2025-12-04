import React from 'react';
import { Scissors, Sparkles, Droplet, Palette, Zap, Crown } from 'lucide-react';

const services = [
  {
    icon: Scissors,
    title: 'Cắt tóc & Tạo kiểu',
    description: 'Tạo phong cách độc đáo với đội ngũ stylist chuyên nghiệp',
    price: 'Từ 150.000đ',
    popular: true
  },
  {
    icon: Palette,
    title: 'Nhuộm & Tẩy tóc',
    description: 'Màu sắc thời thượng với thuốc nhuộm cao cấp từ châu Âu',
    price: 'Từ 500.000đ',
    popular: true
  },
  {
    icon: Sparkles,
    title: 'Uốn & Duỗi',
    description: 'Công nghệ ép ion hiện đại, giữ nếp lâu và bảo vệ tóc',
    price: 'Từ 800.000đ',
    popular: false
  },
  {
    icon: Droplet,
    title: 'Gội đầu & Massage',
    description: 'Thư giãn tuyệt đối với liệu pháp massage đầu chuyên sâu',
    price: 'Từ 80.000đ',
    popular: false
  },
  {
    icon: Zap,
    title: 'Phục hồi tóc hư tổn',
    description: 'Điều trị chuyên sâu cho tóc khô, xơ, gãy rụng',
    price: 'Từ 300.000đ',
    popular: false
  },
  {
    icon: Crown,
    title: 'VIP Package',
    description: 'Trọn gói chăm sóc toàn diện với stylist cao cấp',
    price: 'Từ 2.000.000đ',
    popular: true
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-black/5 rounded-full mb-4">
            <span className="text-sm font-bold uppercase tracking-wider text-black">Dịch vụ của chúng tôi</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-black mb-6 tracking-tight">
            Dịch vụ <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-black">Đẳng cấp</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trải nghiệm các dịch vụ chăm sóc tóc chuyên nghiệp với đội ngũ stylist tài năng
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`group relative p-8 rounded-3xl bg-white border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  service.popular 
                    ? 'border-black shadow-lg' 
                    : 'border-gray-200 hover:border-black'
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 -right-3 px-4 py-1 bg-black text-white text-xs font-bold rounded-full shadow-lg">
                    PHỔ BIẾN
                  </div>
                )}
                
                <div className={`inline-flex p-4 rounded-2xl mb-6 transition-all duration-300 ${
                  service.popular
                    ? 'bg-black text-white group-hover:scale-110'
                    : 'bg-gray-100 text-black group-hover:bg-black group-hover:text-white group-hover:scale-110'
                }`}>
                  <Icon className="w-8 h-8" strokeWidth={2} />
                </div>

                <h3 className="text-2xl font-black text-black mb-3 group-hover:text-gray-800 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-2xl font-black text-black">{service.price}</span>
                  <button className="text-sm font-bold text-black hover:text-gray-600 transition-colors flex items-center gap-1 group-hover:gap-2 transition-all">
                    Đặt lịch →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA at bottom */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">Không tìm thấy dịch vụ bạn cần?</p>
          <button className="px-8 py-4 bg-black text-white font-bold rounded-2xl hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg">
            Liên hệ tư vấn miễn phí
          </button>
        </div>
      </div>
    </section>
  );
}

