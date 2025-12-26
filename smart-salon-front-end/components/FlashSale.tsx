
import React from 'react';
import { Clock, Zap, Tag } from 'lucide-react';
import { Service } from '../types';

interface FlashSaleProps {
  onAdd: (service: Service) => void;
}

export const FlashSale: React.FC<FlashSaleProps> = ({ onAdd }) => {
  const flashDeals: Service[] = [
    { id: 'fs1', name: 'Combo Thư Giãn', price: 99000, originalPrice: 150000, category: 'spa', duration: '45m' },
    { id: 'fs2', name: 'Nhuộm Nâu Tây', price: 299000, originalPrice: 400000, category: 'chemical', duration: '90m' },
    { id: 'fs3', name: 'Uốn Ruffled', price: 320000, originalPrice: 450000, category: 'chemical', duration: '90m' },
    { id: 'fs4', name: 'Phục Hồi Keratin', price: 250000, originalPrice: 350000, category: 'spa', duration: '60m' },
    { id: 'fs5', name: 'Tẩy Tóc An Toàn', price: 150000, originalPrice: 200000, category: 'chemical', duration: '45m' },
  ];

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
          <Zap className="text-brand-500 fill-brand-500" size={28} />
          Flash Sale
        </h2>
        <div className="flex items-center gap-2 text-sm text-red-500 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20">
          <Clock size={16} />
          <span className="font-mono font-bold">02:15:30</span>
        </div>
      </div>

      {/* Slider Container */}
      <div className="flex overflow-x-auto gap-5 hide-scrollbar snap-x pb-4 -mx-4 px-4 md:mx-0 md:px-0">
        {flashDeals.map((deal) => (
          <div key={deal.id} className="min-w-[260px] md:min-w-[280px] bg-dark-800 rounded-2xl p-4 border border-brand-500/20 snap-center relative overflow-hidden group hover:border-brand-500 transition-colors">
            {/* Flash Tag */}
            <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-bl-xl z-10 shadow-lg">
              Giảm {Math.round(((deal.originalPrice! - deal.price) / deal.originalPrice!) * 100)}%
            </div>
            
            <div className="h-40 w-full bg-gray-700 rounded-xl mb-4 overflow-hidden relative">
                <img 
                    src={`https://picsum.photos/300/300?random=${deal.id}`} 
                    alt={deal.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    loading="lazy" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            
            <h3 className="font-bold text-white text-lg truncate mb-1">{deal.name}</h3>
            
            <div className="flex items-end gap-3 mb-4">
              <span className="text-brand-500 font-extrabold text-xl">{deal.price.toLocaleString()}đ</span>
              <span className="text-gray-500 text-sm line-through mb-1">{deal.originalPrice?.toLocaleString()}đ</span>
            </div>
            
            <button 
                onClick={() => onAdd(deal)}
                className="w-full bg-white/5 hover:bg-brand-500 hover:text-black border border-white/10 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <Tag size={16} />
              Áp dụng ngay
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
