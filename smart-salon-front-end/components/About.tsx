
import React from 'react';
import { Language, translations } from '../translations';
import { Award, Users, Scissors } from 'lucide-react';

interface AboutProps {
    lang: Language;
}

export const About: React.FC<AboutProps> = ({ lang }) => {
    const t = translations[lang].about;

    return (
        <div className="w-full bg-brand-950 py-12 animate-in fade-in duration-500">
            <div className="container mx-auto px-4">
                {/* Hero of About */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">{t.title}</h1>
                    <div className="w-32 h-1.5 bg-brand-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                    <div className="relative group order-2 lg:order-1">
                        <div className="absolute -inset-4 bg-brand-500 rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition duration-500"></div>
                        <img 
                            src="https://picsum.photos/800/800?grayscale" 
                            alt="Salon Interior" 
                            className="relative rounded-3xl shadow-2xl w-full object-cover aspect-square border border-white/10"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            {t.story} <span className="text-brand-500">.</span>
                        </h2>
                        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                            <p>{t.desc1}</p>
                            <p>{t.desc2}</p>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-6 mt-12">
                            <div className="text-center p-6 bg-dark-800 rounded-2xl border border-white/5 shadow-xl hover:border-brand-500/50 transition-colors">
                                <Users className="w-10 h-10 text-brand-500 mx-auto mb-3" />
                                <div className="text-3xl font-black text-white">50k+</div>
                                <div className="text-xs text-gray-400 uppercase font-bold tracking-widest mt-1">{t.stats1}</div>
                            </div>
                            <div className="text-center p-6 bg-dark-800 rounded-2xl border border-white/5 shadow-xl hover:border-brand-500/50 transition-colors">
                                <Scissors className="w-10 h-10 text-brand-500 mx-auto mb-3" />
                                <div className="text-3xl font-black text-white">20+</div>
                                <div className="text-xs text-gray-400 uppercase font-bold tracking-widest mt-1">{t.stats2}</div>
                            </div>
                            <div className="text-center p-6 bg-dark-800 rounded-2xl border border-white/5 shadow-xl hover:border-brand-500/50 transition-colors">
                                <Award className="w-10 h-10 text-brand-500 mx-auto mb-3" />
                                <div className="text-3xl font-black text-white">5</div>
                                <div className="text-xs text-gray-400 uppercase font-bold tracking-widest mt-1">{t.stats3}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission Section */}
                <div className="relative rounded-3xl overflow-hidden bg-dark-800 border border-white/5">
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                     <div className="relative z-10 px-6 py-20 text-center max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold text-brand-500 mb-8 uppercase tracking-widest">{t.mission}</h2>
                        <p className="text-3xl md:text-4xl font-medium text-white leading-normal italic">
                            "Không chỉ là cắt tóc, đó là nghệ thuật kiến tạo phong cách và sự tự tin cho phái mạnh Việt."
                        </p>
                        <div className="mt-8 font-bold text-gray-500">- CEO Smart Salon -</div>
                     </div>
                </div>
            </div>
        </div>
    );
};
