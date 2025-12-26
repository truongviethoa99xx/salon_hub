
import React, { useState, useEffect } from 'react';
import { Language, translations } from '../translations';
import { useData } from '../contexts/DataContext';
import { Calendar, CheckCircle, Scissors, Clock, ChevronRight, User, Star } from 'lucide-react';
import { BookingParams, Stylist } from '../types';

interface BookingProps {
    lang: Language;
    initialParams: BookingParams | null;
}

export const Booking: React.FC<BookingProps> = ({ lang, initialParams }) => {
    const t = translations[lang].booking;
    
    // Use Context Data
    const { branches, services, stylists } = useData();

    const [selectedBranch, setSelectedBranch] = useState(branches[0]?.id || '');
    const [selectedService, setSelectedService] = useState(services[0]?.id || '');
    
    // Date & Time
    const [dates, setDates] = useState<{ date: string, day: string, fullDate: string }[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    
    // Stylist
    const [availableStylists, setAvailableStylists] = useState<Stylist[]>([]);
    const [selectedStylistId, setSelectedStylistId] = useState<string>('');

    // Load Initial Params from Hero Search
    useEffect(() => {
        if (initialParams) {
            // Service Logic
            const serviceMatch = services.find(s => s.category === initialParams.serviceCategory);
            if (serviceMatch) setSelectedService(serviceMatch.id);

            // Date Logic
            if (dates.length > 0 && initialParams.dateOffset !== undefined) {
                const targetDate = dates[initialParams.dateOffset];
                if (targetDate) setSelectedDate(targetDate.fullDate);
            }
        }
    }, [initialParams, dates, services]);

    // Generate next 7 days
    useEffect(() => {
        const nextDays = [];
        const daysVi = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        const daysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() + i);
            const dayIndex = d.getDay();
            nextDays.push({
                date: `${d.getDate()}/${d.getMonth() + 1}`,
                day: lang === 'vi' ? daysVi[dayIndex] : daysEn[dayIndex],
                fullDate: d.toISOString().split('T')[0]
            });
        }
        setDates(nextDays);
        if (!selectedDate) setSelectedDate(nextDays[0].fullDate);
    }, [lang]);

    // Update Stylists when Time changes
    useEffect(() => {
        if (selectedTime) {
            // Mock logic: Randomly filter stylists to simulate availability per slot
            // In real app, this would be an API call fetching available stylists for (Date + Time)
            const randomStylists = stylists.map(s => ({
                ...s,
                // If admin marked them busy in context, they are busy. Else random availability for time slot
                isBusy: s.isBusy || Math.random() > 0.7 
            })).sort((a, b) => (a.isBusy === b.isBusy ? 0 : a.isBusy ? 1 : -1)); // Move busy to end
            
            setAvailableStylists(randomStylists);
            setSelectedStylistId(''); // Reset selection
        } else {
            setAvailableStylists([]);
        }
    }, [selectedTime, selectedDate, stylists]);

    const timeSlots = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
        '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
        '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'
    ];

    if (!branches.length || !services.length) return null;

    return (
        <div className="w-full bg-brand-950 py-12 animate-in slide-in-from-right-4 duration-500">
             <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">{t.title}</h1>
                    <p className="text-gray-400">{t.desc}</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Form Section */}
                    <div className="lg:col-span-2 bg-dark-900 rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl">
                        <div className="space-y-8">
                            {/* Step 1: Branch */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                     <div className="w-8 h-8 rounded-full bg-brand-500 text-black font-bold flex items-center justify-center shadow-lg shadow-brand-500/20">1</div>
                                     <label className="text-lg font-bold text-white">{t.step1}</label>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {branches.map(branch => (
                                        <label 
                                            key={branch.id} 
                                            className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all group ${
                                                selectedBranch === branch.id 
                                                ? 'border-brand-500 bg-brand-500/10' 
                                                : 'border-white/10 bg-dark-800 hover:border-brand-500/50 hover:bg-dark-800/80'
                                            }`}
                                        >
                                            <input 
                                                type="radio" 
                                                name="branch" 
                                                value={branch.id}
                                                checked={selectedBranch === branch.id}
                                                onChange={(e) => setSelectedBranch(e.target.value)}
                                                className="hidden" 
                                            />
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedBranch === branch.id ? 'border-brand-500' : 'border-gray-500'}`}>
                                                {selectedBranch === branch.id && <div className="w-2.5 h-2.5 rounded-full bg-brand-500" />}
                                            </div>
                                            <div>
                                                <span className={`block font-bold transition-colors ${selectedBranch === branch.id ? 'text-brand-500' : 'text-white'}`}>
                                                    {branch.name}
                                                </span>
                                                <span className="text-xs text-gray-500">{branch.address}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Step 2: Service */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                     <div className="w-8 h-8 rounded-full bg-brand-500 text-black font-bold flex items-center justify-center shadow-lg shadow-brand-500/20">2</div>
                                     <label className="text-lg font-bold text-white">{t.step2}</label>
                                </div>
                                <div className="relative group">
                                    <select 
                                        value={selectedService}
                                        onChange={(e) => setSelectedService(e.target.value)}
                                        className="w-full bg-dark-800 border border-white/10 rounded-xl p-4 pl-12 text-white focus:outline-none focus:border-brand-500 appearance-none cursor-pointer hover:border-white/30 transition-colors"
                                    >
                                        {services.map(service => (
                                            <option key={service.id} value={service.id}>{service.name} - {service.price.toLocaleString()}đ</option>
                                        ))}
                                    </select>
                                    <Scissors className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-brand-500 transition-colors" size={20} />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <ChevronRight className="text-gray-500 rotate-90" size={16} />
                                    </div>
                                </div>
                            </div>

                            {/* Step 3: Date & Time */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                     <div className="w-8 h-8 rounded-full bg-brand-500 text-black font-bold flex items-center justify-center shadow-lg shadow-brand-500/20">3</div>
                                     <label className="text-lg font-bold text-white">{t.step3}</label>
                                </div>
                                
                                {/* Date Picker */}
                                <div className="mb-4 overflow-x-auto pb-2 hide-scrollbar">
                                    <div className="flex gap-2">
                                        {dates.map((d) => (
                                            <button
                                                key={d.fullDate}
                                                onClick={() => setSelectedDate(d.fullDate)}
                                                className={`min-w-[70px] p-3 rounded-xl flex flex-col items-center justify-center border transition-all ${
                                                    selectedDate === d.fullDate
                                                    ? 'bg-brand-500 border-brand-500 text-black shadow-lg shadow-brand-500/20 scale-105'
                                                    : 'bg-dark-800 border-white/10 text-gray-400 hover:border-brand-500/50 hover:text-white'
                                                }`}
                                            >
                                                <span className="text-xs font-medium mb-1">{d.day}</span>
                                                <span className="text-lg font-bold">{d.date}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Time Grid */}
                                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
                                    {timeSlots.map(time => (
                                        <button
                                            key={time}
                                            onClick={() => {
                                                setSelectedTime(time);
                                                setSelectedStylistId(''); // Reset stylist on time change
                                            }}
                                            className={`py-2 rounded-lg text-sm font-bold border transition-all ${
                                                selectedTime === time
                                                ? 'bg-brand-500 text-black border-brand-500 shadow-md scale-105'
                                                : 'bg-dark-800 text-gray-300 border-white/10 hover:border-brand-500/50 hover:text-white'
                                            }`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Step 4: Stylist Selection (Shown only after time selected) */}
                            {selectedTime && (
                                <div className="animate-in slide-in-from-top-4 duration-500 border-t border-white/5 pt-6">
                                     <div className="flex items-center gap-3 mb-4">
                                         <div className="w-8 h-8 rounded-full bg-brand-500 text-black font-bold flex items-center justify-center shadow-lg shadow-brand-500/20">4</div>
                                         <label className="text-lg font-bold text-white flex items-center gap-2">
                                             Chọn Thợ <span className="text-sm font-normal text-brand-500 bg-brand-500/10 px-2 py-0.5 rounded">lúc {selectedTime}</span>
                                         </label>
                                    </div>
                                    
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {availableStylists.map((stylist) => (
                                            <button 
                                                key={stylist.id}
                                                disabled={stylist.isBusy}
                                                onClick={() => setSelectedStylistId(stylist.id)}
                                                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                                                    stylist.isBusy 
                                                    ? 'opacity-50 grayscale bg-dark-800 border-white/5 cursor-not-allowed'
                                                    : selectedStylistId === stylist.id
                                                        ? 'border-brand-500 bg-brand-500/10'
                                                        : 'bg-dark-800 border-white/10 hover:bg-dark-700'
                                                }`}
                                            >
                                                <img src={stylist.avatar} alt={stylist.name} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-bold text-white">{stylist.name}</span>
                                                        <span className="text-xs bg-white/10 px-1.5 py-0.5 rounded text-gray-300">{stylist.level}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                                                        <Star size={10} className="fill-brand-500 text-brand-500" />
                                                        {stylist.rating} • {stylist.isBusy ? <span className="text-red-500 font-bold">Đã kín lịch</span> : <span className="text-green-500 font-bold">Còn trống</span>}
                                                    </div>
                                                </div>
                                                {selectedStylistId === stylist.id && !stylist.isBusy && (
                                                    <CheckCircle className="text-brand-500" size={20} />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="pt-6 border-t border-white/5">
                                <button 
                                    disabled={!selectedTime || !selectedStylistId}
                                    className={`w-full font-bold py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 text-lg ${
                                        !selectedTime || !selectedStylistId
                                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                        : 'bg-brand-500 text-black shadow-brand-500/20 hover:bg-brand-400 transform hover:-translate-y-1 active:scale-95'
                                    }`}
                                >
                                    <Calendar size={24} />
                                    {t.confirm}
                                </button>
                                {(!selectedTime || !selectedStylistId) && (
                                    <p className="text-center text-xs text-red-400 mt-2">Vui lòng chọn giờ và thợ cắt để tiếp tục</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Benefits Section */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl p-6 border border-white/5 sticky top-24">
                            <h3 className="font-bold text-white mb-4 text-lg">Quyền lợi đặt trước</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />
                                    <div>
                                        <p className="text-white font-medium text-sm">Không phải chờ đợi</p>
                                        <p className="text-xs text-gray-500">Được phục vụ ngay khi đến giờ hẹn</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />
                                    <div>
                                        <p className="text-white font-medium text-sm">Giữ chỗ Stylist</p>
                                        <p className="text-xs text-gray-500">Đảm bảo được phục vụ bởi thợ yêu thích</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />
                                    <div>
                                        <p className="text-white font-medium text-sm">Nhắc hẹn tự động</p>
                                        <p className="text-xs text-gray-500">Hệ thống gửi tin nhắn nhắc trước 30p</p>
                                    </div>
                                </li>
                            </ul>

                             <div className="mt-8 bg-brand-500/5 rounded-xl p-6 border border-brand-500/20 text-center">
                                <div className="text-brand-500 font-black text-4xl mb-2 animate-pulse">542+</div>
                                <p className="text-white font-bold text-sm">Khách hàng đã đặt hôm nay</p>
                                <div className="mt-4 flex -space-x-2 justify-center">
                                    {[1,2,3,4,5].map(i => (
                                        <img key={i} src={`https://picsum.photos/40/40?random=${i+20}`} className="w-8 h-8 rounded-full border-2 border-dark-900" alt="" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    );
};
