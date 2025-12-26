import React, { useState } from 'react';
import { Scissors, Lock, Eye, EyeOff, ArrowLeft, Loader2, Phone, Star, Clock, Users } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface BarberLoginProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

export const BarberLogin: React.FC<BarberLoginProps> = ({
  onLoginSuccess,
  onBack,
}) => {
  const { loginBarber, siteSettings } = useData();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username.trim()) {
      setError('Vui lòng nhập số điện thoại');
      return;
    }
    if (!formData.password) {
      setError('Vui lòng nhập mật khẩu');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await loginBarber(formData.username, formData.password);
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || 'Đăng nhập thất bại, vui lòng thử lại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f0a] flex relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070"
          alt="Barber Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f0a] via-[#0a0f0a]/80 to-[#0a0f0a]" />
      </div>

      {/* Gradient Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[150px]" />
      </div>

      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Scissors className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">{siteSettings?.brandName || 'Smart Salon'}</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Xin chào<br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              Barber!
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Đăng nhập để quản lý lịch hẹn, xem khách hàng và theo dõi doanh thu cá nhân.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#121a12]/60 backdrop-blur-sm rounded-2xl p-4 border border-white/5">
              <Clock className="w-6 h-6 text-emerald-500 mb-2" />
              <div className="text-sm font-medium text-white mb-1">Quản lý lịch hẹn</div>
              <div className="text-xs text-gray-500">Xem và xác nhận booking</div>
            </div>
            <div className="bg-[#121a12]/60 backdrop-blur-sm rounded-2xl p-4 border border-white/5">
              <Users className="w-6 h-6 text-emerald-500 mb-2" />
              <div className="text-sm font-medium text-white mb-1">Danh sách khách</div>
              <div className="text-xs text-gray-500">Thông tin khách hàng</div>
            </div>
            <div className="bg-[#121a12]/60 backdrop-blur-sm rounded-2xl p-4 border border-white/5">
              <Star className="w-6 h-6 text-emerald-500 mb-2" />
              <div className="text-sm font-medium text-white mb-1">Đánh giá</div>
              <div className="text-xs text-gray-500">Xem phản hồi khách hàng</div>
            </div>
            <div className="bg-[#121a12]/60 backdrop-blur-sm rounded-2xl p-4 border border-white/5">
              <Scissors className="w-6 h-6 text-emerald-500 mb-2" />
              <div className="text-sm font-medium text-white mb-1">Thống kê</div>
              <div className="text-xs text-gray-500">Doanh thu & hiệu suất</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <div className="relative w-full max-w-md">
          {/* Card */}
          <div className="bg-[#121a12]/80 backdrop-blur-2xl rounded-3xl p-8 lg:p-10 border border-white/5 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
                  <Scissors className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">{siteSettings?.brandName || 'Smart Salon'}</span>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                <Scissors className="w-8 h-8 text-emerald-500" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Barber Đăng nhập</h2>
              <p className="text-gray-500">Dành cho thợ cắt tóc</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Số điện thoại
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="w-5 h-5 text-gray-600 group-focus-within:text-emerald-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại"
                    className="w-full bg-[#1a241a] border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Mật khẩu
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-600 group-focus-within:text-emerald-500 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Nhập mật khẩu"
                    className="w-full bg-[#1a241a] border border-white/5 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-600 hover:text-gray-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs">!</span>
                  </div>
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Đang đăng nhập...
                  </>
                ) : (
                  'Đăng nhập'
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center space-y-4">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
                <p className="text-emerald-400 text-xs">
                  Liên hệ Admin nếu quên mật khẩu hoặc cần hỗ trợ
                </p>
              </div>
              <button
                onClick={onBack}
                className="text-gray-600 hover:text-gray-400 text-sm flex items-center justify-center gap-2 mx-auto transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Quay lại trang chủ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
