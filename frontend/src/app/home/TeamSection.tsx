import React from 'react';
import { Scissors, Award, Star } from 'lucide-react';

const stylists = [
  {
    name: 'Nguyễn Minh Tuấn',
    role: 'Master Stylist',
    experience: '12 năm',
    specialty: 'Cắt tóc nam & Tạo kiểu',
    rating: 4.9,
    isTop: true
  },
  {
    name: 'Trần Thu Hà',
    role: 'Senior Colorist',
    experience: '8 năm',
    specialty: 'Nhuộm & Tẩy chuyên sâu',
    rating: 4.8,
    isTop: true
  },
  {
    name: 'Lê Hoàng Nam',
    role: 'Creative Director',
    experience: '15 năm',
    specialty: 'Thiết kế tóc nghệ thuật',
    rating: 5.0,
    isTop: true
  },
  {
    name: 'Phạm Thị Lan',
    role: 'Hair Specialist',
    experience: '6 năm',
    specialty: 'Phục hồi tóc hư tổn',
    rating: 4.7,
    isTop: false
  }
];

export default function TeamSection() {
  return (
    <section className="relative py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-black/5 rounded-full mb-4">
            <span className="text-sm font-bold uppercase tracking-wider text-black">Đội ngũ chuyên gia</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-black mb-6 tracking-tight">
            Gặp gỡ <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-black">Stylist</span> của chúng tôi
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Đội ngũ chuyên gia tài năng với nhiều năm kinh nghiệm và đam mê nghề
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stylists.map((stylist, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-b from-gray-50 to-white rounded-3xl p-6 border-2 border-gray-200 hover:border-black transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              {stylist.isTop && (
                <div className="absolute -top-3 -right-3 p-3 bg-black rounded-full shadow-lg">
                  <Award className="w-5 h-5 text-white" />
                </div>
              )}

              {/* Avatar Placeholder */}
              <div className="relative mb-6">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <Scissors className="w-20 h-20 text-gray-500" strokeWidth={1.5} />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-black text-white text-xs font-bold rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-white" />
                  {stylist.rating}
                </div>
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="text-xl font-black text-black mb-1">{stylist.name}</h3>
                <p className="text-sm font-bold text-gray-600 mb-2">{stylist.role}</p>
                
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Kinh nghiệm:</span>
                    <span className="font-bold text-black">{stylist.experience}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{stylist.specialty}</p>
                </div>

                <button className="mt-4 w-full py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all duration-300 text-sm">
                  Đặt lịch với {stylist.name.split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Join Team CTA */}
        <div className="relative rounded-3xl bg-gradient-to-r from-black to-gray-800 p-12 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
              Bạn có đam mê với nghề làm tóc?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Chúng tôi luôn tìm kiếm những tài năng mới để gia nhập đội ngũ
            </p>
            <button className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
              Tìm hiểu cơ hội nghề nghiệp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

