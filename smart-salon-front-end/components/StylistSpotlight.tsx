
import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export const StylistSpotlight: React.FC = () => {
  const { stylists } = useData();

  return (
    <section className="w-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Top Stylist</h2>
          <p className="text-gray-400">Đội ngũ chuyên nghiệp, tận tâm tại chi nhánh</p>
        </div>
        <a href="#" className="hidden md:block text-brand-500 font-medium hover:underline">Xem tất cả</a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {stylists.map((stylist) => (
          <div key={stylist.id} className="bg-dark-800 rounded-2xl p-4 md:p-6 border border-white/5 relative overflow-hidden group hover:bg-dark-800/80 hover:border-brand-500/30 transition-all">
            {/* Busy Status Badge */}
             <div className={`absolute top-4 right-4 z-10 px-2 py-1 rounded-full text-[10px] font-bold border ${
                stylist.isBusy 
                ? 'bg-red-500/10 text-red-500 border-red-500/20' 
                : 'bg-green-500/10 text-green-500 border-green-500/20'
             }`}>
                {stylist.isBusy ? 'BẬN' : 'SẴN SÀNG'}
             </div>

            <div className="flex flex-col items-center text-center">
              <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4 group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={stylist.avatar} 
                  alt={stylist.name} 
                  className="w-full h-full rounded-full object-cover border-4 border-dark-900 shadow-2xl" 
                  loading="lazy"
                />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-brand-500 text-black text-[10px] font-extrabold px-3 py-1 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1">
                   <ShieldCheck size={12} /> {stylist.level}
                </div>
              </div>
              
              <h3 className="font-bold text-white text-lg mb-1">{stylist.name}</h3>
              <p className="text-sm text-gray-400 mb-3">{stylist.specialty}</p>
              
              <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full mb-4">
                <div className="flex">
                    {[1,2,3,4,5].map(i => (
                        <Star key={i} size={10} className={`${i <= Math.round(stylist.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'}`} />
                    ))}
                </div>
                <span className="text-xs font-bold text-white">{stylist.rating}</span>
                <span className="text-[10px] text-gray-500">({stylist.reviewCount})</span>
              </div>

              <button className={`w-full py-2.5 rounded-lg text-xs font-bold transition-colors ${
                  stylist.isBusy 
                  ? 'bg-white/5 text-gray-400 cursor-not-allowed' 
                  : 'bg-brand-500 text-black hover:bg-brand-400 shadow-lg shadow-brand-500/20'
              }`}>
                  {stylist.isBusy ? 'Đặt trước' : 'Chọn ngay'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
