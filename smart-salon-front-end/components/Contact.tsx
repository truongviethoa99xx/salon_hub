
import React from 'react';
import { Language, translations } from '../translations';
import { MapPin, Phone, Clock, Mail, Send } from 'lucide-react';

interface ContactProps {
    lang: Language;
}

export const Contact: React.FC<ContactProps> = ({ lang }) => {
    const t = translations[lang].contact;

    return (
        <div className="w-full bg-brand-950 py-12 animate-in fade-in duration-500">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.title}</h1>
                    <p className="text-gray-400 text-lg">Chúng tôi luôn sẵn sàng lắng nghe và phục vụ bạn</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Info Column */}
                    <div className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-dark-800 p-8 rounded-2xl border border-white/10 hover:border-brand-500/50 transition-colors group">
                                <div className="w-12 h-12 bg-brand-500/10 text-brand-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <MapPin size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{t.address}</h3>
                                <p className="text-gray-400">123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</p>
                            </div>

                            <div className="bg-dark-800 p-8 rounded-2xl border border-white/10 hover:border-brand-500/50 transition-colors group">
                                <div className="w-12 h-12 bg-brand-500/10 text-brand-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Phone size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{t.phone}</h3>
                                <p className="text-gray-400 font-mono text-lg">1900 6868</p>
                                <p className="text-gray-500 text-sm">090 123 4567</p>
                            </div>

                             <div className="bg-dark-800 p-8 rounded-2xl border border-white/10 hover:border-brand-500/50 transition-colors group md:col-span-2">
                                <div className="w-12 h-12 bg-brand-500/10 text-brand-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Clock size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{t.hours}</h3>
                                <p className="text-gray-400">08:30 - 21:00 (Tất cả các ngày trong tuần)</p>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="w-full h-[300px] bg-dark-800 rounded-2xl overflow-hidden border border-white/10 relative group shadow-2xl">
                            <img 
                                src="https://picsum.photos/1200/600?grayscale&blur=2" 
                                alt="Map" 
                                className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button className="bg-brand-500 text-black px-6 py-3 rounded-xl font-bold shadow-lg transform group-hover:scale-105 transition-transform flex items-center gap-2">
                                    <MapPin size={20} /> {t.map}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Form Column */}
                    <div className="bg-dark-900 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
                        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                 <Mail className="text-brand-500" />
                            </div>
                            Gửi tin nhắn
                        </h3>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">{t.form_name}</label>
                                    <input type="text" className="w-full bg-dark-800 border border-white/10 rounded-xl p-4 text-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 focus:outline-none transition-all" placeholder="Nguyễn Văn A" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">{t.form_phone}</label>
                                    <input type="tel" className="w-full bg-dark-800 border border-white/10 rounded-xl p-4 text-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 focus:outline-none transition-all" placeholder="090 xxx xxxx" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">{t.form_msg}</label>
                                <textarea rows={6} className="w-full bg-dark-800 border border-white/10 rounded-xl p-4 text-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 focus:outline-none transition-all" placeholder="Nội dung cần tư vấn..."></textarea>
                            </div>
                            <button type="button" className="w-full bg-brand-500 hover:bg-brand-600 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-transform active:scale-95 text-lg shadow-lg shadow-brand-500/20">
                                <Send size={20} />
                                {t.send}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
