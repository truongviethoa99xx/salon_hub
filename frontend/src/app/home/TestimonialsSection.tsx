import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Nguyễn Thu Trang',
    role: 'Khách hàng thân thiết',
    rating: 5,
    content: 'Mình đã thử rất nhiều salon nhưng chỉ có Stylist là làm mình hài lòng nhất. Thợ chuyên nghiệp, tư vấn tận tâm, không gian sang trọng. Đặc biệt chị Hà nhuộm tóc rất đẹp!',
    date: '2 tuần trước'
  },
  {
    name: 'Trần Minh Khoa',
    role: 'Doanh nhân',
    rating: 5,
    content: 'Là nam giới mình khá kỹ tính về tóc. Anh Tuấn cắt tóc rất tỉ mỉ và hiểu được phong cách mình muốn. Giờ mình chỉ cắt tóc ở đây thôi. Highly recommended!',
    date: '1 tháng trước'
  },
  {
    name: 'Lê Hương Giang',
    role: 'Blogger làm đẹp',
    rating: 5,
    content: 'Tóc mình bị hư tổn nặng sau nhiều lần tẩy. Sau 3 lần điều trị phục hồi tóc ở Stylist, tóc mình đã trở lại mềm mượt như ban đầu. Siêu hài lòng luôn!',
    date: '3 tuần trước'
  },
  {
    name: 'Phạm Văn Long',
    role: 'Kỹ sư IT',
    rating: 5,
    content: 'Salon này khác biệt ở chỗ họ thực sự lắng nghe khách hàng. Không bị ép mua dịch vụ, tư vấn chân thành. Giá cả hợp lý với chất lượng cung cấp.',
    date: '1 tuần trước'
  },
  {
    name: 'Đỗ Mai Anh',
    role: 'Nhân viên văn phòng',
    rating: 5,
    content: 'Lần đầu đến đã được trải nghiệm VIP package. Từ gội đầu massage, cắt tóc đến tạo kiểu đều quá xuất sắc. Không gian thư giãn, nhân viên dễ thương. Chắc chắn sẽ quay lại!',
    date: '4 ngày trước'
  },
  {
    name: 'Vũ Hoàng Nam',
    role: 'Sinh viên',
    rating: 5,
    content: 'Mình là sinh viên nên khá lo về giá cả, nhưng Stylist có nhiều gói phù hợp với túi tiền. Chất lượng thì không hề thua kém các salon đắt tiền. Super value!',
    date: '2 tháng trước'
  }
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 bg-black text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-white/10 rounded-full mb-4">
            <span className="text-sm font-bold uppercase tracking-wider">Đánh giá khách hàng</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
            50,000+ Khách hàng
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white">
              Hài lòng & Tin tưởng
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Những chia sẻ chân thực từ khách hàng đã trải nghiệm dịch vụ của chúng tôi
          </p>
        </div>

        {/* Rating Summary */}
        <div className="flex flex-col items-center mb-16 p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 fill-white text-white" />
            ))}
          </div>
          <p className="text-5xl font-black mb-2">4.9 / 5.0</p>
          <p className="text-gray-400">Từ hơn 8,500+ đánh giá trên Google & Facebook</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-20">
                <Quote className="w-12 h-12" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-white text-white" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 leading-relaxed mb-6 relative z-10">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <p className="font-black text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
                <p className="text-xs text-gray-500">{testimonial.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-400 mb-6">Trải nghiệm dịch vụ để có đánh giá của riêng bạn!</p>
          <button className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
            Đặt lịch ngay hôm nay
          </button>
        </div>
      </div>
    </section>
  );
}

