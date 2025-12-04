import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
            
            {/* Gradient overlays for depth */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-8 group hover:bg-white/20 transition-all duration-300">
                    <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" strokeWidth={2.5} />
                    <span className="text-sm font-bold text-white uppercase tracking-wider">Premium Salon Experience</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tighter leading-none">
                    STYLIST
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white mt-2">
                        SALON
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
                    Nơi phong cách gặp gỡ nghệ thuật. Trải nghiệm dịch vụ cắt tóc và chăm sóc tóc 
                    <span className="text-white font-bold"> đẳng cấp quốc tế</span> tại Việt Nam.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
                    <Link to="/admin">
                        <Button className="bg-white text-black hover:bg-gray-100 px-10 py-7 text-lg font-black rounded-2xl shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 group">
                            <Calendar className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" strokeWidth={3} />
                            Đặt lịch ngay
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                        </Button>
                    </Link>
                    <Link to="#services">
                        <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black px-10 py-7 text-lg font-black rounded-2xl transition-all duration-300">
                            Xem dịch vụ
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                        <p className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:scale-110 transition-transform">15+</p>
                        <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Năm kinh nghiệm</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                        <p className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:scale-110 transition-transform">50K+</p>
                        <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Khách hàng</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                        <p className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:scale-110 transition-transform">20+</p>
                        <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Thợ chuyên nghiệp</p>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                </div>
            </div>
        </section>
    );
}

