import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BottomBarProps {
  itemCount: number;
  totalPrice: number;
  onCheckout: () => void;
}

export const BottomBar: React.FC<BottomBarProps> = ({ itemCount, totalPrice, onCheckout }) => {
  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black via-black/90 to-transparent">
        <div className="max-w-2xl mx-auto bg-brand-500 text-black rounded-xl shadow-lg shadow-brand-500/20 p-4 flex items-center justify-between animate-in slide-in-from-bottom duration-300">
            <div>
                <div className="text-xs font-semibold opacity-80">{itemCount} dịch vụ đã chọn</div>
                <div className="text-lg font-extrabold">{totalPrice.toLocaleString()}đ</div>
            </div>
            <button 
                onClick={onCheckout}
                className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-lg font-bold hover:bg-gray-900 transition-colors"
            >
                HOÀN TẤT <ChevronRight size={18} />
            </button>
        </div>
    </div>
  );
};