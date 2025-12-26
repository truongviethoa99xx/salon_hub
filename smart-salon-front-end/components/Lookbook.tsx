
import React, { useState } from 'react';
import { ArrowLeftRight, Quote } from 'lucide-react';

export const Lookbook: React.FC = () => {
  const [activeView, setActiveView] = useState<'before' | 'after'>('after');

  return (
    <section className="w-full bg-dark-900/50 rounded-3xl p-6 md:p-12 border border-white/5">
      <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">Khách Hàng Lột Xác</h2>
          <p className="text-gray-400">Hàng ngàn khách hàng đã thay đổi diện mạo</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Main Compare Image */}
        <div className="flex-1 w-full max-w-4xl">
            <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group bg-black">
                <img 
                    src={activeView === 'before' ? 'https://picsum.photos/800/600?grayscale&blur=2' : 'https://picsum.photos/800/600?random=50'} 
                    alt="Customer Lookbook"
                    className="w-full h-full object-cover transition-all duration-700"
                />
                
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-xl">
                    <button 
                        onClick={() => setActiveView('before')}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeView === 'before' ? 'bg-white text-black shadow-lg' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
                    >
                        Trước
                    </button>
                    <button 
                        onClick={() => setActiveView('after')}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeView === 'after' ? 'bg-brand-500 text-black shadow-lg' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
                    >
                        Sau
                    </button>
                </div>

                <div className="absolute top-6 right-6 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg text-xs text-white flex items-center gap-2 border border-white/10">
                    <ArrowLeftRight size={14} className="text-brand-500" />
                    <span>Chạm để so sánh</span>
                </div>
            </div>
        </div>
        
        {/* Reviews Side */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <div className="bg-dark-800 p-6 rounded-2xl border border-white/5 relative">
                <Quote className="absolute top-4 right-4 text-brand-500/20" size={40} />
                <p className="text-gray-300 italic leading-relaxed mb-4">"Cắt xong nhìn như người khác luôn, quá đỉnh! Thợ cắt rất kỹ, tư vấn form đầu hợp lý."</p>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">TV</div>
                    <div>
                        <div className="text-sm font-bold text-white">Trần Văn A</div>
                        <div className="text-xs text-gray-500">Khách hàng thân thiết</div>
                    </div>
                </div>
            </div>

             <div className="bg-dark-800 p-6 rounded-2xl border border-white/5 relative">
                <Quote className="absolute top-4 right-4 text-brand-500/20" size={40} />
                <p className="text-gray-300 italic leading-relaxed mb-4">"Màu nhuộm lên chuẩn, tóc mềm không bị khô. 10 điểm cho dịch vụ."</p>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">LH</div>
                    <div>
                        <div className="text-sm font-bold text-white">Lê Hoàng B</div>
                        <div className="text-xs text-gray-500">Đặt qua Website</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
