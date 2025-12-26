
import React from 'react';
import { Language, translations } from '../translations';
import { Shield } from 'lucide-react';

interface FooterProps {
    lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations[lang].footer;
  
  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const event = new CustomEvent('requestAdminLogin');
    window.dispatchEvent(event);
  };

  return (
    <footer className="bg-black text-gray-500 text-center py-8 pb-32 text-xs border-t border-white/5 w-full">
      <div className="container mx-auto px-4">
        <p className="font-bold text-white mb-2">{t.system}</p>
        <p className="mb-4">{t.address}</p>
        <div className="flex justify-center gap-4 mb-4">
            <a href="#" className="hover:text-brand-500">Facebook</a>
            <a href="#" className="hover:text-brand-500">TikTok</a>
            <a href="#" className="hover:text-brand-500">Zalo OA</a>
        </div>
        <div className="flex flex-col items-center gap-2">
            <p>© 2024 Smart Salon. {t.rights}</p>
            <button 
                onClick={handleAdminClick}
                className="flex items-center gap-1 text-[10px] text-gray-700 hover:text-gray-500 transition-colors"
            >
                <Shield size={10} /> Admin Login
            </button>
        </div>
      </div>
    </footer>
  );
};
