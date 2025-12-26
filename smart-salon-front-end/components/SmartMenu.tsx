
import React, { useState } from 'react';
import { Plus, Scissors, Sparkles, Beaker } from 'lucide-react';
import { Service } from '../types';
import { useData } from '../contexts/DataContext';
import { Language, translations } from '../translations';

interface SmartMenuProps {
  onAdd: (service: Service) => void;
  lang: Language;
}

export const SmartMenu: React.FC<SmartMenuProps> = ({ onAdd, lang }) => {
  const { services } = useData();
  const [activeTab, setActiveTab] = useState<'cut' | 'spa' | 'chemical'>('cut');
  const t = translations[lang].menu;

  const filteredServices = services.filter(s => s.category === activeTab);

  const icons = {
      cut: <Scissors size={18} />,
      spa: <Sparkles size={18} />,
      chemical: <Beaker size={18} />
  }

  return (
    <section className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h2 className="text-3xl font-bold text-white">{t.title}</h2>
          
          {/* Tabs */}
          <div className="flex p-1 bg-dark-800 rounded-xl overflow-x-auto max-w-full md:w-auto border border-white/5">
            {(['cut', 'spa', 'chemical'] as const).map((tab) => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab 
                    ? 'bg-brand-500 text-black shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
                {icons[tab]}
                {tab === 'cut' ? t.cut : tab === 'spa' ? t.spa : t.chemical}
            </button>
            ))}
         </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div key={service.id} className="flex flex-col bg-dark-800 rounded-2xl overflow-hidden border border-white/5 hover:border-brand-500/50 transition-all group h-full">
            <div className="flex items-center p-4 gap-4">
                {service.image ? (
                    <img src={service.image} alt={service.name} className="w-20 h-20 rounded-xl object-cover shrink-0" loading="lazy" />
                ) : (
                    <div className="w-20 h-20 rounded-xl bg-white/5 flex items-center justify-center text-gray-600 shrink-0">
                        <Scissors />
                    </div>
                )}
                
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-lg truncate group-hover:text-brand-500 transition-colors">{service.name}</h3>
                    <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-brand-500 font-bold text-lg">{service.price.toLocaleString()}đ</span>
                        {service.originalPrice && (
                        <span className="text-gray-600 text-xs line-through">{service.originalPrice.toLocaleString()}đ</span>
                        )}
                    </div>
                    <span className="text-xs text-gray-500 mt-2 block flex items-center gap-1">
                        <ClockIcon size={12} /> {t.duration}: {service.duration}
                    </span>
                </div>
            </div>
            
            <div className="mt-auto p-4 pt-0">
                <button 
                    onClick={() => onAdd(service)}
                    className="w-full py-3 rounded-lg bg-white/5 text-white font-bold text-sm hover:bg-brand-500 hover:text-black transition-colors flex items-center justify-center gap-2 border border-white/5"
                >
                    <Plus size={16} /> {t.add}
                </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ClockIcon = ({size}: {size: number}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
)
