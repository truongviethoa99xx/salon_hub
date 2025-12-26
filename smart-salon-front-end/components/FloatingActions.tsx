
import React, { useState } from 'react';
import { Sparkles, X, Send, MessageCircle } from 'lucide-react';
import { getStylingAdvice } from '../services/geminiService';
import { Language, translations } from '../translations';
import { useData } from '../contexts/DataContext';

interface FloatingActionsProps {
    lang: Language;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ lang }) => {
  const { aiConfig } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const t = translations[lang].ai;

  const handleAsk = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setResponse('');
    
    // Check if AI is configured
    if (!aiConfig?.apiKey) {
        setResponse("Xin lỗi, chức năng AI chưa được cấu hình. Vui lòng liên hệ admin.");
        setIsLoading(false);
        return;
    }

    // Call the intelligent AI service
    const result = await getStylingAdvice(query, aiConfig.apiKey);
    setResponse(result);
    setIsLoading(false);
  };

  return (
    <>
      <div className="fixed bottom-24 right-4 z-40 flex flex-col gap-3">
        {/* Zalo Button */}
        <a 
            href="https://zalo.me/0901234567" // Placeholder Zalo link
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg border border-white/20 flex items-center justify-center hover:scale-110 transition-transform"
            title="Chat Zalo"
        >
            <span className="font-bold text-[10px] absolute -top-1 -right-1 bg-red-500 px-1 rounded-full">1</span>
            <div className="font-bold text-lg">Z</div>
        </a>

        {/* AI Button */}
        <button 
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-lg border border-white/20 flex items-center justify-center hover:scale-110 transition-transform group"
        >
            <Sparkles size={24} className="group-hover:animate-spin" />
        </button>
      </div>

      {/* AI Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-dark-800 w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-4 flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Sparkles size={16} className="text-yellow-300" /> {t.title}
              </h3>
              <button onClick={() => setIsOpen(false)}><X size={20} className="text-white/70 hover:text-white" /></button>
            </div>
            
            <div className="p-4 flex-1 overflow-y-auto min-h-[200px]">
              {response ? (
                <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
                  <p>{response}</p>
                </div>
              ) : (
                <div className="text-center text-gray-500 mt-8">
                  <Sparkles size={48} className="mx-auto mb-2 opacity-20" />
                  <p className="text-sm">{t.suggestion}</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-dark-900 border-t border-white/10 flex gap-2">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                placeholder={t.placeholder}
                className="flex-1 bg-dark-800 text-white text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
                disabled={isLoading}
              />
              <button 
                onClick={handleAsk}
                disabled={isLoading}
                className="bg-purple-600 rounded-full w-10 h-10 flex items-center justify-center text-white disabled:opacity-50"
              >
                {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Send size={18} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
