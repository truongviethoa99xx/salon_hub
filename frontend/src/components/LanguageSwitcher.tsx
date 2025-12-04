import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronUp } from 'lucide-react';
import { cn } from '../lib/utils';

const languages = [
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
      >
        <div className="flex items-center gap-3">
          <Globe className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-300" strokeWidth={2.5} />
          <div className="flex items-center gap-2">
            <span className="text-lg">{currentLanguage.flag}</span>
            <span className="text-sm font-semibold text-white">{currentLanguage.label}</span>
          </div>
        </div>
        <ChevronUp className={cn(
          "w-4 h-4 text-gray-400 transition-transform duration-300",
          isOpen ? "rotate-180" : ""
        )} strokeWidth={2.5} />
      </button>
      
      {/* Language Dropdown */}
      <div className={cn(
        "absolute bottom-full mb-2 left-0 right-0 transition-all duration-300 origin-bottom",
        isOpen 
          ? "opacity-100 visible scale-100" 
          : "opacity-0 invisible scale-95"
      )}>
        <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl border border-white/10 p-2 shadow-2xl backdrop-blur-xl">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-200 flex items-center gap-3 group",
                i18n.language === lang.code
                  ? "bg-white text-black shadow-lg"
                  : "text-white hover:bg-white/5"
              )}
            >
              <span className="text-lg group-hover:scale-125 transition-transform duration-200">{lang.flag}</span>
              <span className="font-semibold">{lang.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

