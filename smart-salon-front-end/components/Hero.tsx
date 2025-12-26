
import React, { useState } from 'react';
import { Calendar, Search, Loader2 } from 'lucide-react';
import { Language, translations } from '../translations';
import { BookingParams } from '../types';
import { useData } from '../contexts/DataContext';

interface HeroProps {
    lang: Language;
    onSearch: (params: BookingParams) => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onSearch }) => {
  const { siteSettings } = useData();
  const t = translations[lang].hero;
  const [isSearching, setIsSearching] = useState(false);
  const [selectedService, setSelectedService] = useState<'cut' | 'spa' | 'chemical'>('cut');
  const [selectedDateOffset, setSelectedDateOffset] = useState<number>(0);

  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate API delay
    setTimeout(() => {
        setIsSearching(false);
        onSearch({
            serviceCategory: selectedService,
            dateOffset: selectedDateOffset
        });

        // Manual Scroll with offset
        const element = document.getElementById('booking');
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }, 1200);
  };

  return (
    <section className="relative h-[650px] w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/60 to-transparent z-10"></div>
      <img
        src={siteSettings.heroImage || "https://picsum.photos/1920/1080?grayscale"}
        alt="Salon Atmosphere"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col md:flex-row items-center md:items-end pb-12 md:pb-24 gap-8">
        <div className="flex-1 w-full md:max-w-3xl pt-24 md:pt-0 animate-in slide-in-from-left duration-700">
          <span className="inline-block px-4 py-1.5 bg-brand-500 text-black text-xs md:text-sm font-bold rounded-full mb-4 animate-pulse shadow-lg shadow-brand-500/30">
            {t.badge}
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-4 drop-shadow-2xl">
            {siteSettings.heroTitle} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">{siteSettings.heroSubtitle}</span>
          </h1>
          <p className="text-gray-200 text-base md:text-lg max-w-xl leading-relaxed bg-black/30 backdrop-blur-sm p-2 rounded-lg border-l-4 border-brand-500">
            {t.desc}
          </p>
        </div>

        {/* Quick Booking Widget (Standalone Feature) */}
        <div className="w-full md:w-auto md:min-w-[380px] animate-in slide-in-from-bottom duration-700 delay-200">
             <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl relative overflow-hidden">
                {isSearching && (
                    <div className="absolute inset-0 bg-dark-900/90 z-20 flex flex-col items-center justify-center text-center">
                        <Loader2 className="w-10 h-10 text-brand-500 animate-spin mb-3" />
                        <p className="text-white font-bold">Đang tìm lịch trống...</p>
                        <p className="text-xs text-gray-400">Vui lòng chờ giây lát</p>
                    </div>
                )}

                <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-lg">
                    <Search className="text-brand-500" size={20} />
                    {t.btn}
                </h3>
                
                <div className="space-y-4 mb-5">
                     {/* Service Select */}
                     <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold uppercase tracking-wide ml-1">Dịch vụ</label>
                        <select 
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value as any)}
                            className="w-full bg-dark-900/80 text-white rounded-lg p-3 border border-white/10 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none appearance-none cursor-pointer hover:bg-dark-900"
                        >
                            <option value="cut">Cắt & Tạo kiểu</option>
                            <option value="spa">Gội & Spa</option>
                            <option value="chemical">Uốn / Nhuộm</option>
                        </select>
                     </div>

                     {/* Date Select */}
                     <div className="space-y-1">
                        <label className="text-xs text-gray-300 font-bold uppercase tracking-wide ml-1">Ngày đặt</label>
                         <div className="grid grid-cols-2 gap-2">
                             <button 
                                onClick={() => setSelectedDateOffset(0)}
                                className={`p-3 rounded-lg border text-sm font-bold transition-all ${selectedDateOffset === 0 ? 'bg-brand-500 text-black border-brand-500' : 'bg-dark-900/80 text-gray-400 border-white/10 hover:border-white/30'}`}
                             >
                                 {t.today}
                             </button>
                             <button 
                                onClick={() => setSelectedDateOffset(1)}
                                className={`p-3 rounded-lg border text-sm font-bold transition-all ${selectedDateOffset === 1 ? 'bg-brand-500 text-black border-brand-500' : 'bg-dark-900/80 text-gray-400 border-white/10 hover:border-white/30'}`}
                             >
                                 Ngày mai
                             </button>
                         </div>
                     </div>
                </div>

                <button 
                    onClick={handleSearch}
                    className="w-full bg-brand-500 hover:bg-brand-400 text-black font-bold py-4 rounded-xl transition-all active:scale-95 shadow-[0_0_25px_rgba(245,158,11,0.4)] uppercase tracking-wide flex items-center justify-center gap-2"
                >
                    <Search size={18} />
                    {t.btn}
                </button>
                <div className="mt-4 text-center">
                    <p className="text-xs text-gray-300">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                        542+ <span className="text-white font-bold">{t.proof}</span>
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
