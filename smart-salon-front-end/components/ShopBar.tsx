
import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../constants';

export const ShopBar: React.FC = () => {
  return (
    <section className="w-full border-t border-white/10 pt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Vuốt là Đẹp</h2>
        <a href="#" className="flex items-center gap-1 text-sm text-brand-500 hover:text-brand-400 font-medium transition-colors">
            Xem tất cả <ArrowRight size={16} />
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="bg-dark-800 p-3 rounded-xl flex flex-col gap-3 group hover:bg-dark-800/80 transition-all border border-transparent hover:border-white/10">
            <div className="aspect-square w-full bg-gray-700 rounded-lg overflow-hidden">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
            </div>
            <div className="flex-1 flex flex-col">
                <h4 className="text-sm font-bold text-white line-clamp-2 mb-1">{product.name}</h4>
                <div className="mt-auto">
                    <div className="text-brand-500 text-sm font-bold">{product.price.toLocaleString()}đ</div>
                    <button className="mt-2 w-full py-2 bg-white/5 rounded-lg text-xs font-bold text-white flex items-center justify-center gap-2 hover:bg-brand-500 hover:text-black transition-colors">
                        <ShoppingBag size={12} /> Thêm
                    </button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
