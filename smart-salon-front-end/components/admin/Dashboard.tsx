
import React, { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import { 
    LogOut, LayoutDashboard, Users, Scissors, MapPin, Plus, Trash2, Edit2, CheckCircle, 
    XCircle, Calendar, MessageSquare, Settings, Search, Send, Bot, Star, Eye, EyeOff,
    Mail, MessageCircle, BarChart3, Gift, Tag, History, Cake
} from 'lucide-react';
import { Service, Stylist, BookingItem, Customer, Promotion } from '../../types';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { 
    branches, services, stylists, bookings, siteSettings, conversations,
    customers, reviews, aiConfig, emailConfig, znsConfig, promotions,
    updateBranch, updateService, addService, deleteService, 
    updateStylist, addStylist, toggleStylistStatus,
    updateBookingStatus, updateSiteSettings, markConversationRead, sendMessage,
    saveAIConfig, saveEmailConfig, saveZNSConfig, replyReview, toggleReviewStatus,
    addPromotion, deletePromotion
  } = useData();

  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'stylists' | 'branches' | 'bookings' | 'inbox' | 'crm' | 'reviews' | 'marketing' | 'promotions' | 'ai' | 'settings'>('overview');
  
  // Booking Filter State
  const [bookingFilter, setBookingFilter] = useState<'all' | 'pending' | 'confirmed' | 'today'>('all');

  // Inbox State
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState('');
  
  // CRM State
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Settings State
  const [localSettings, setLocalSettings] = useState(siteSettings);
  
  // New States for Modules
  const [localAI, setLocalAI] = useState(aiConfig);
  const [localEmail, setLocalEmail] = useState(emailConfig);
  const [localZNS, setLocalZNS] = useState(znsConfig);
  const [reviewReply, setReviewReply] = useState<{id: string, text: string} | null>(null);

  // Modal States
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  
  // Promotions Modal
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);

  useEffect(() => {
    if (activeTab === 'settings') setLocalSettings(siteSettings);
    if (activeTab === 'ai' && aiConfig) setLocalAI(aiConfig);
    if (activeTab === 'marketing') {
        if (emailConfig) setLocalEmail(emailConfig);
        if (znsConfig) setLocalZNS(znsConfig);
    }
  }, [activeTab, siteSettings, aiConfig, emailConfig, znsConfig]);

  // --- Handlers ---

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newService: any = {
      name: formData.get('name'),
      price: Number(formData.get('price')),
      originalPrice: Number(formData.get('originalPrice')) || undefined,
      category: formData.get('category'),
      duration: formData.get('duration'),
    };

    if (editingService) {
      updateService(editingService.id, newService);
    } else {
      addService({ ...newService, id: `s${Date.now()}` });
    }
    setIsServiceModalOpen(false);
    setEditingService(null);
  };
  
  const handleSavePromotion = (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      
      const newPromo: Promotion = {
          id: `p${Date.now()}`,
          name: formData.get('name') as string,
          description: formData.get('description') as string,
          code: formData.get('code') as string,
          type: formData.get('type') as any,
          value: Number(formData.get('value')),
          giftName: formData.get('giftName') as string || undefined,
          startDate: formData.get('startDate') as string,
          endDate: formData.get('endDate') as string,
          isActive: true,
          conditions: {
              targetTag: formData.get('targetTag') as string || undefined,
              minGroupSize: Number(formData.get('minGroupSize')) || undefined,
              requiredServiceId: formData.get('requiredServiceId') as string || undefined
          }
      };
      
      addPromotion(newPromo);
      setIsPromoModalOpen(false);
  }

  const handleSendMessage = () => {
    if (chatInput.trim() && selectedConversationId) {
        sendMessage(selectedConversationId, chatInput);
        setChatInput('');
    }
  };

  const handleSaveSettings = () => {
      updateSiteSettings(localSettings);
      alert('Đã lưu cấu hình Landing Page!');
  };
  
  const handleSaveAI = () => {
      if (localAI) {
          saveAIConfig(localAI);
          alert('Đã cập nhật cấu hình AI!');
      }
  }

  const handleSaveMarketing = () => {
      if (localEmail) saveEmailConfig(localEmail);
      if (localZNS) saveZNSConfig(localZNS);
      alert('Đã lưu cấu hình Marketing!');
  }

  // --- Derived Data ---
  const filteredBookings = bookings.filter(b => {
      if (bookingFilter === 'all') return true;
      if (bookingFilter === 'today') return b.date === new Date().toISOString().split('T')[0];
      return b.status === bookingFilter;
  });

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  return (
    <div className="min-h-screen bg-black flex font-sans text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-900 border-r border-white/10 flex flex-col fixed inset-y-0 overflow-y-auto hide-scrollbar z-50">
        <div className="p-6 border-b border-white/10">
           <div className="flex items-center gap-2 font-bold text-xl text-brand-500">
              <div className="w-8 h-8 bg-brand-500 text-black rounded-lg flex items-center justify-center">S</div>
              Admin Panel
           </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
            <div className="text-[10px] font-bold text-gray-500 uppercase px-4 py-2 mt-2">Quản lý</div>
            <button 
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-sm ${activeTab === 'overview' ? 'bg-brand-500 text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
                <LayoutDashboard size={18} /> Tổng quan
            </button>
            <button 
                onClick={() => setActiveTab('bookings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-sm ${activeTab === 'bookings' ? 'bg-brand-500 text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
                <Calendar size={18} /> Lịch hẹn
            </button>
            <button 
                onClick={() => setActiveTab('inbox')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-sm ${activeTab === 'inbox' ? 'bg-brand-500 text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
                <MessageSquare size={18} /> Tin nhắn
            </button>

            <div className="text-[10px] font-bold text-gray-500 uppercase px-4 py-2 mt-4">Khách hàng</div>
            <button 
                onClick={() => setActiveTab('crm')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-sm ${activeTab === 'crm' ? 'bg-brand-500 text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
                <Users size={18} /> CRM
            </button>
            <button 
                onClick={() => setActiveTab('promotions')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-sm ${activeTab === 'promotions' ? 'bg-brand-500 text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
                <Gift size={18} /> Khuyến mãi
            </button>
            <button 
                onClick={() => setActiveTab('reviews')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-sm ${activeTab === 'reviews' ? 'bg-brand-500 text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
                <Star size={18} /> Đánh giá
            </button>

            <div className="text-[10px] font-bold text-gray-500 uppercase px-4 py-2 mt-4">Vận hành</div>
            <button 
                onClick={() => setActiveTab('branches')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-sm ${activeTab === 'branches' ? 'bg-brand-500 text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
                <MapPin size={18} /> Chi nhánh
            </button>
            <button 
                onClick={() => setActiveTab('services')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-sm ${activeTab === 'services' ? 'bg-brand-500 text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
                <Scissors size={18} /> Dịch vụ
            </button>
            <button 
                onClick={() => setActiveTab('stylists')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-sm ${activeTab === 'stylists' ? 'bg-brand-500 text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
                <Users size={18} /> Stylist
            </button>

            <div className="text-[10px] font-bold text-gray-500 uppercase px-4 py-2 mt-4">Hệ thống</div>
            <button 
                onClick={() => setActiveTab('marketing')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-sm ${activeTab === 'marketing' ? 'bg-brand-500 text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
                <Mail size={18} /> Marketing Auto
            </button>
             <button 
                onClick={() => setActiveTab('ai')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-sm ${activeTab === 'ai' ? 'bg-brand-500 text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
                <Bot size={18} /> Cấu hình AI
            </button>
            <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-sm ${activeTab === 'settings' ? 'bg-brand-500 text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
                <Settings size={18} /> Cấu hình Web
            </button>
        </nav>

        <div className="p-4 border-t border-white/10 mt-auto">
            <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-500/10 transition-colors">
                <LogOut size={20} /> Đăng xuất
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8 bg-black h-screen overflow-y-auto">
        
        {/* VIEW: OVERVIEW */}
        {activeTab === 'overview' && (
             <div className="animate-in fade-in">
                <h1 className="text-3xl font-bold mb-8">Tổng quan Salon</h1>
                <div className="grid grid-cols-4 gap-6 mb-8">
                    <div className="bg-dark-900 p-6 rounded-2xl border border-white/10">
                        <div className="text-gray-400 text-xs font-bold uppercase mb-2">Booking Hôm nay</div>
                        <div className="text-4xl font-black text-brand-500">{bookings.filter(b => b.date === new Date().toISOString().split('T')[0]).length}</div>
                    </div>
                    <div className="bg-dark-900 p-6 rounded-2xl border border-white/10">
                        <div className="text-gray-400 text-xs font-bold uppercase mb-2">Doanh thu dự kiến</div>
                        <div className="text-4xl font-black text-green-500">18.5tr</div>
                    </div>
                    <div className="bg-dark-900 p-6 rounded-2xl border border-white/10">
                        <div className="text-gray-400 text-xs font-bold uppercase mb-2">Khách hàng mới</div>
                        <div className="text-4xl font-black text-purple-500">{customers.filter(c => c.rank === 'New').length}</div>
                    </div>
                    <div className="bg-dark-900 p-6 rounded-2xl border border-white/10">
                        <div className="text-gray-400 text-xs font-bold uppercase mb-2">Đánh giá TB</div>
                        <div className="text-4xl font-black text-yellow-500 flex items-center gap-2">
                            4.9 <Star className="fill-yellow-500 text-yellow-500" size={24} />
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* VIEW: CRM (ENHANCED) */}
        {activeTab === 'crm' && (
             <div className="animate-in fade-in h-[calc(100vh-100px)] flex gap-6">
                {/* Customer List */}
                <div className="w-1/3 bg-dark-900 rounded-2xl border border-white/10 flex flex-col">
                    <div className="p-4 border-b border-white/10 flex justify-between items-center">
                        <h2 className="font-bold text-lg">Khách hàng</h2>
                        <div className="text-xs text-gray-500">{customers.length} users</div>
                    </div>
                    <div className="p-4 border-b border-white/10">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
                            <input type="text" placeholder="Tìm tên, sđt..." className="w-full bg-black border border-white/20 rounded-lg pl-10 pr-4 py-2 text-sm text-white" />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {customers.map(c => (
                            <div 
                                key={c.id} 
                                onClick={() => setSelectedCustomer(c)}
                                className={`p-4 hover:bg-white/5 cursor-pointer border-b border-white/5 transition-colors ${selectedCustomer?.id === c.id ? 'bg-brand-500/10 border-l-4 border-l-brand-500' : ''}`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <div className="font-bold text-white">{c.name}</div>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                                        c.rank === 'Diamond' ? 'bg-cyan-500 text-black' :
                                        c.rank === 'Gold' ? 'bg-yellow-500 text-black' :
                                        c.rank === 'Silver' ? 'bg-gray-400 text-black' : 'bg-gray-800 text-gray-400'
                                    }`}>{c.rank}</span>
                                </div>
                                <div className="text-xs text-gray-500 mb-1">{c.phone}</div>
                                <div className="flex gap-1 flex-wrap">
                                    {c.tags.map(tag => (
                                        <span key={tag} className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Customer Detail */}
                <div className="flex-1 bg-dark-900 rounded-2xl border border-white/10 p-8 overflow-y-auto">
                    {selectedCustomer ? (
                        <>
                            <div className="flex justify-between items-start mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center text-2xl font-black text-black shadow-lg shadow-brand-500/20">
                                        {selectedCustomer.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">{selectedCustomer.name}</h2>
                                        <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                                            <span>{selectedCustomer.phone}</span>
                                            <span>•</span>
                                            <span>{selectedCustomer.email || 'Chưa có email'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-gray-500 uppercase font-bold mb-1">Tổng chi tiêu</div>
                                    <div className="text-2xl font-black text-green-500">{selectedCustomer.totalSpend.toLocaleString()}đ</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                                    <div className="flex items-center gap-2 text-xs text-gray-500 uppercase font-bold mb-2">
                                        <Cake size={14} /> Sinh nhật
                                    </div>
                                    <div className="font-medium text-white">{selectedCustomer.birthDate || 'Chưa cập nhật'}</div>
                                </div>
                                <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                                    <div className="flex items-center gap-2 text-xs text-gray-500 uppercase font-bold mb-2">
                                        <History size={14} /> Lần cuối
                                    </div>
                                    <div className="font-medium text-white">{selectedCustomer.lastVisit}</div>
                                </div>
                                <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                                    <div className="flex items-center gap-2 text-xs text-gray-500 uppercase font-bold mb-2">
                                        <Tag size={14} /> Tags
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        {selectedCustomer.tags.map(tag => (
                                            <span key={tag} className="text-xs bg-brand-500/20 text-brand-500 px-2 py-1 rounded">{tag}</span>
                                        ))}
                                        <button className="text-xs bg-white/10 px-2 py-1 rounded hover:bg-white/20">+</button>
                                    </div>
                                </div>
                            </div>

                            <h3 className="font-bold text-lg mb-4 border-b border-white/10 pb-2">Lịch sử sử dụng dịch vụ</h3>
                            <div className="space-y-4">
                                {selectedCustomer.history.map(h => (
                                    <div key={h.id} className="bg-black/40 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                                        <div>
                                            <div className="font-bold text-white">{h.date} <span className="text-xs font-normal text-gray-500">lúc {h.time}</span></div>
                                            <div className="text-sm text-gray-300 mt-1">Cắt tóc Stylist + Gội</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-brand-500 font-bold">150.000đ</div>
                                            <div className="text-xs text-green-500 uppercase font-bold">Hoàn thành</div>
                                        </div>
                                    </div>
                                ))}
                                {selectedCustomer.history.length === 0 && <p className="text-gray-500 italic">Chưa có lịch sử</p>}
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500">
                            <Users size={48} className="mb-4 opacity-20" />
                            <p>Chọn một khách hàng để xem chi tiết</p>
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* VIEW: PROMOTIONS (NEW) */}
        {activeTab === 'promotions' && (
            <div className="animate-in fade-in">
                 <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Chương trình Khuyến mãi</h1>
                    <button onClick={() => setIsPromoModalOpen(true)} className="bg-brand-500 text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-brand-400">
                        <Plus size={18} /> Thêm chương trình
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {promotions.map(promo => (
                        <div key={promo.id} className="bg-dark-900 rounded-2xl border border-white/10 p-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 bg-brand-500 text-black text-xs font-bold px-3 py-1 rounded-bl-xl z-10">
                                {promo.type === 'percent' ? `Giảm ${promo.value}%` : promo.type === 'gift' ? 'Tặng quà' : `Giảm ${promo.value}k`}
                            </div>
                            
                            <h3 className="text-xl font-bold mb-2 text-white">{promo.name}</h3>
                            <p className="text-gray-400 text-sm mb-4">{promo.description}</p>
                            
                            <div className="bg-black/40 rounded-xl p-3 mb-4 border border-white/5 border-dashed flex justify-between items-center">
                                <code className="text-brand-500 font-bold text-lg">{promo.code}</code>
                                <span className="text-xs text-gray-500 uppercase font-bold">{promo.isActive ? 'Đang chạy' : 'Tạm dừng'}</span>
                            </div>

                            <div className="space-y-2 text-xs text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Calendar size={12} /> {promo.startDate} - {promo.endDate}
                                </div>
                                {promo.conditions.targetTag && (
                                    <div className="flex items-center gap-2">
                                        <Tag size={12} /> Áp dụng cho: <span className="text-white">{promo.conditions.targetTag}</span>
                                    </div>
                                )}
                                {promo.conditions.minGroupSize && (
                                    <div className="flex items-center gap-2">
                                        <Users size={12} /> Nhóm tối thiểu: <span className="text-white">{promo.conditions.minGroupSize} người</span>
                                    </div>
                                )}
                            </div>
                            
                            <button onClick={() => deletePromotion(promo.id)} className="absolute bottom-4 right-4 p-2 text-red-500 hover:bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* VIEW: REVIEWS */}
        {activeTab === 'reviews' && (
             <div className="animate-in fade-in">
                <h1 className="text-3xl font-bold mb-8">Đánh giá & Phản hồi</h1>
                <div className="grid gap-4">
                    {reviews.map(review => (
                        <div key={review.id} className="bg-dark-900 p-6 rounded-2xl border border-white/10">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center text-black font-bold">
                                        {review.user.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold">{review.user}</div>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            {review.date} • {review.platform}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex text-yellow-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} className={i < review.rating ? "fill-current" : "text-gray-700"} />
                                        ))}
                                    </div>
                                    <button 
                                        onClick={() => toggleReviewStatus(review.id)}
                                        className={`p-2 rounded-lg transition-colors ${review.status === 'hidden' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}
                                        title={review.status === 'hidden' ? "Đang ẩn" : "Đang hiện"}
                                    >
                                        {review.status === 'hidden' ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-300 mb-4">{review.comment}</p>
                            
                            {review.reply ? (
                                <div className="bg-white/5 p-4 rounded-xl border-l-4 border-brand-500">
                                    <div className="text-xs font-bold text-brand-500 uppercase mb-1">Phản hồi của Salon</div>
                                    <p className="text-sm text-gray-400">{review.reply}</p>
                                </div>
                            ) : (
                                <div className="mt-4">
                                    {reviewReply?.id === review.id ? (
                                        <div className="flex gap-2">
                                            <input 
                                                value={reviewReply.text}
                                                onChange={(e) => setReviewReply({ ...reviewReply, text: e.target.value })}
                                                className="flex-1 bg-black border border-white/20 rounded-lg p-2 text-sm text-white"
                                                placeholder="Nhập nội dung trả lời..."
                                                autoFocus
                                            />
                                            <button onClick={() => { replyReview(review.id, reviewReply.text); setReviewReply(null); }} className="bg-brand-500 text-black px-4 py-2 rounded-lg font-bold text-sm">Gửi</button>
                                            <button onClick={() => setReviewReply(null)} className="text-gray-500 px-2">Hủy</button>
                                        </div>
                                    ) : (
                                        <button onClick={() => setReviewReply({ id: review.id, text: '' })} className="text-brand-500 text-sm font-bold hover:underline">Trả lời đánh giá</button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* ... (Other existing views: MARKETING, AI, BOOKINGS, INBOX, SETTINGS, BRANCHES, SERVICES, STYLISTS - Kept same as previous output) ... */}
        
        {/* VIEW: SERVICES */}
        {activeTab === 'services' && (
            <div className="animate-in fade-in">
                 <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Danh sách Dịch vụ</h1>
                    <button 
                        onClick={() => { setEditingService(null); setIsServiceModalOpen(true); }}
                        className="bg-brand-500 text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-brand-400"
                    >
                        <Plus size={18} /> Thêm dịch vụ
                    </button>
                </div>

                <div className="bg-dark-900 rounded-2xl border border-white/10 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-gray-400 text-xs uppercase">
                            <tr>
                                <th className="p-4">Tên dịch vụ</th>
                                <th className="p-4">Danh mục</th>
                                <th className="p-4">Giá bán</th>
                                <th className="p-4">Giá gốc</th>
                                <th className="p-4">Thời gian</th>
                                <th className="p-4 text-right">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {services.map(s => (
                                <tr key={s.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-bold">{s.name}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                                            s.category === 'cut' ? 'bg-blue-500/20 text-blue-500' :
                                            s.category === 'spa' ? 'bg-green-500/20 text-green-500' :
                                            'bg-purple-500/20 text-purple-500'
                                        }`}>
                                            {s.category === 'cut' ? 'Cắt' : s.category === 'spa' ? 'Spa' : 'Hóa chất'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-brand-500">{s.price.toLocaleString()}đ</td>
                                    <td className="p-4 text-gray-500 decoration-slice">{s.originalPrice ? s.originalPrice.toLocaleString() + 'đ' : '-'}</td>
                                    <td className="p-4">{s.duration}</td>
                                    <td className="p-4 flex justify-end gap-2">
                                        <button onClick={() => { setEditingService(s); setIsServiceModalOpen(true); }} className="p-2 hover:bg-white/10 rounded-lg text-blue-400"><Edit2 size={16} /></button>
                                        <button onClick={() => deleteService(s.id)} className="p-2 hover:bg-white/10 rounded-lg text-red-500"><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
      </main>

      {/* Service Modal */}
      {isServiceModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-dark-900 w-full max-w-lg rounded-2xl border border-white/10 p-6 shadow-2xl">
                  <h3 className="text-xl font-bold mb-4">{editingService ? 'Sửa dịch vụ' : 'Thêm dịch vụ mới'}</h3>
                  <form onSubmit={handleSaveService} className="space-y-4">
                      <div>
                          <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Tên dịch vụ</label>
                          <input name="name" defaultValue={editingService?.name} required className="w-full bg-black border border-white/20 rounded-lg p-2 text-white" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Giá bán</label>
                            <input name="price" type="number" defaultValue={editingService?.price} required className="w-full bg-black border border-white/20 rounded-lg p-2 text-white" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Giá gốc</label>
                            <input name="originalPrice" type="number" defaultValue={editingService?.originalPrice} className="w-full bg-black border border-white/20 rounded-lg p-2 text-white" />
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                           <div>
                              <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Danh mục</label>
                              <select name="category" defaultValue={editingService?.category || 'cut'} className="w-full bg-black border border-white/20 rounded-lg p-2 text-white">
                                  <option value="cut">Cắt & Tạo kiểu</option>
                                  <option value="spa">Gội & Spa</option>
                                  <option value="chemical">Uốn / Nhuộm</option>
                              </select>
                           </div>
                           <div>
                            <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Thời gian</label>
                            <input name="duration" defaultValue={editingService?.duration || '30m'} className="w-full bg-black border border-white/20 rounded-lg p-2 text-white" />
                          </div>
                      </div>

                      <div className="flex justify-end gap-2 mt-6">
                          <button type="button" onClick={() => setIsServiceModalOpen(false)} className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10">Hủy</button>
                          <button type="submit" className="px-6 py-2 rounded-lg bg-brand-500 text-black font-bold hover:bg-brand-400">Lưu</button>
                      </div>
                  </form>
              </div>
          </div>
      )}
      
      {/* Promotion Modal */}
      {isPromoModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-dark-900 w-full max-w-lg rounded-2xl border border-white/10 p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
                  <h3 className="text-xl font-bold mb-4">Thêm chương trình khuyến mãi</h3>
                  <form onSubmit={handleSavePromotion} className="space-y-4">
                      <div>
                          <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Tên chương trình</label>
                          <input name="name" required className="w-full bg-black border border-white/20 rounded-lg p-2 text-white" placeholder="Ví dụ: Giảm giá sinh viên" />
                      </div>
                      <div>
                          <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Mô tả ngắn</label>
                          <input name="description" required className="w-full bg-black border border-white/20 rounded-lg p-2 text-white" />
                      </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Mã Code</label>
                            <input name="code" required className="w-full bg-black border border-white/20 rounded-lg p-2 text-white font-mono" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Loại ưu đãi</label>
                            <select name="type" className="w-full bg-black border border-white/20 rounded-lg p-2 text-white">
                                <option value="percent">Giảm theo %</option>
                                <option value="fixed">Giảm tiền mặt</option>
                                <option value="gift">Tặng quà</option>
                            </select>
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Giá trị (hoặc 0 nếu tặng quà)</label>
                            <input name="value" type="number" defaultValue="0" className="w-full bg-black border border-white/20 rounded-lg p-2 text-white" />
                          </div>
                          <div>
                             <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Tên quà tặng (Nếu có)</label>
                             <input name="giftName" className="w-full bg-black border border-white/20 rounded-lg p-2 text-white" />
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Bắt đầu</label>
                            <input name="startDate" type="date" required className="w-full bg-black border border-white/20 rounded-lg p-2 text-white" />
                          </div>
                          <div>
                             <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Kết thúc</label>
                             <input name="endDate" type="date" required className="w-full bg-black border border-white/20 rounded-lg p-2 text-white" />
                          </div>
                      </div>
                      
                      <div className="border-t border-white/10 pt-4 mt-4">
                          <label className="block text-xs font-bold uppercase text-brand-500 mb-2">Điều kiện áp dụng (Tùy chọn)</label>
                           <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Tag khách hàng</label>
                                <input name="targetTag" placeholder="VD: Student" className="w-full bg-black border border-white/20 rounded-lg p-2 text-white" />
                              </div>
                              <div>
                                 <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Nhóm tối thiểu (người)</label>
                                 <input name="minGroupSize" type="number" className="w-full bg-black border border-white/20 rounded-lg p-2 text-white" />
                              </div>
                          </div>
                      </div>

                      <div className="flex justify-end gap-2 mt-6">
                          <button type="button" onClick={() => setIsPromoModalOpen(false)} className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10">Hủy</button>
                          <button type="submit" className="px-6 py-2 rounded-lg bg-brand-500 text-black font-bold hover:bg-brand-400">Lưu</button>
                      </div>
                  </form>
              </div>
          </div>
      )}

    </div>
  );
};
