import React from 'react';
import { Award, Heart, Users, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Chuyên nghiệp',
    description: 'Đội ngũ stylist được đào tạo bài bản, nhiều năm kinh nghiệm'
  },
  {
    icon: Heart,
    title: 'Tận tâm',
    description: 'Luôn lắng nghe và thấu hiểu nhu cầu của từng khách hàng'
  },
  {
    icon: Users,
    title: 'Cộng đồng',
    description: 'Hơn 50,000+ khách hàng tin tưởng và quay lại'
  },
  {
    icon: TrendingUp,
    title: 'Xu hướng',
    description: 'Luôn cập nhật xu hướng tóc mới nhất thế giới'
  }
];

export default function AboutSection() {
  return (
    <section className="relative py-24 bg-black text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-block px-4 py-2 bg-white/10 rounded-full mb-6">
              <span className="text-sm font-bold uppercase tracking-wider">Về chúng tôi</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
              15 Năm Tạo Nên
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white">
                Phong Cách Việt
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Stylist Salon ra đời từ đam mê và khát vọng nâng tầm ngành làm đẹp Việt Nam. 
              Chúng tôi tin rằng mỗi mái tóc là một tác phẩm nghệ thuật, và mỗi khách hàng 
              xứng đáng được trải nghiệm dịch vụ đẳng cấp quốc tế.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="group">
                    <div className="flex items-start gap-3">
                      <div className="p-3 rounded-xl bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                        <Icon className="w-6 h-6" strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="font-black text-lg mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
              Tìm hiểu thêm về chúng tôi
            </button>
          </div>

          {/* Right - Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-gray-700 to-gray-900 p-8 flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <p className="text-6xl font-black mb-2">15+</p>
                  <p className="text-sm text-gray-400 uppercase tracking-wider font-bold">Năm</p>
                </div>
              </div>
              <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-gray-800 to-black p-8 flex items-center justify-center border border-white/10 hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                  <Award className="w-16 h-16 mx-auto mb-4" />
                  <p className="font-bold">Top Salon</p>
                  <p className="text-sm text-gray-400">Việt Nam 2024</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-gray-700 to-gray-900 p-8 flex items-center justify-center border border-white/10 hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                  <Users className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-4xl font-black mb-2">50K+</p>
                  <p className="text-sm text-gray-400 uppercase tracking-wider font-bold">Khách hàng</p>
                </div>
              </div>
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-gray-800 to-black p-8 flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <p className="text-6xl font-black mb-2">20+</p>
                  <p className="text-sm text-gray-400 uppercase tracking-wider font-bold">Stylist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

