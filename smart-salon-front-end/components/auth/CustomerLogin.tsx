import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface CustomerLoginProps {
  onLoginSuccess: () => void;
  onBack: () => void;
  onRegisterClick: () => void;
}

export const CustomerLogin: React.FC<CustomerLoginProps> = ({
  onLoginSuccess,
  onBack,
  onRegisterClick,
}) => {
  const { loginCustomer, siteSettings } = useData();
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
      setError('Vui lòng nhập số điện thoại hoặc email');
      return;
    }
    if (!formData.password) {
      setError('Vui lòng nhập mật khẩu');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await loginCustomer(formData.username, formData.password);
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || 'Đăng nhập thất bại, vui lòng thử lại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074"
          alt="Salon Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0a0a0f]/80 to-[#0a0a0f]" />
      </div>

      {/* Gradient Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[150px]" />
      </div>

      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">{siteSettings?.brandName || 'Smart Salon'}</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Chào mừng<br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              trở lại!
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Đăng nhập để đặt lịch, xem lịch sử và nhận ưu đãi độc quyền dành cho thành viên.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#12121a]/60 backdrop-blur-sm rounded-2xl p-4 border border-white/5">
              <div className="text-2xl font-bold text-amber-500 mb-1">50+</div>
              <div className="text-xs text-gray-500">Dịch vụ</div>
            </div>
            <div className="bg-[#12121a]/60 backdrop-blur-sm rounded-2xl p-4 border border-white/5">
              <div className="text-2xl font-bold text-amber-500 mb-1">20+</div>
              <div className="text-xs text-gray-500">Stylist</div>
            </div>
            <div className="bg-[#12121a]/60 backdrop-blur-sm rounded-2xl p-4 border border-white/5">
              <div className="text-2xl font-bold text-amber-500 mb-1">5</div>
              <div className="text-xs text-gray-500">Chi nhánh</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <div className="relative w-full max-w-md">
          {/* Card */}
          <div className="bg-[#12121a]/80 backdrop-blur-2xl rounded-3xl p-8 lg:p-10 border border-white/5 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">{siteSettings?.brandName || 'Smart Salon'}</span>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
                <User className="w-8 h-8 text-amber-500" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Đăng nhập</h2>
              <p className="text-gray-500">Nhập thông tin tài khoản của bạn</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username/Phone/Email */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Số điện thoại hoặc Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-600 group-focus-within:text-amber-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="0901234567 hoặc email@example.com"
                    className="w-full bg-[#1a1a24] border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
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
                    <Lock className="w-5 h-5 text-gray-600 group-focus-within:text-amber-500 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Nhập mật khẩu"
                    className="w-full bg-[#1a1a24] border border-white/5 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
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

              {/* Forgot Password */}
              <div className="text-right">
                <button type="button" className="text-sm text-amber-500 hover:text-amber-400 transition-colors">
                  Quên mật khẩu?
                </button>
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
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
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

            {/* Footer Links */}
            <div className="mt-8 text-center space-y-4">
              <p className="text-gray-500">
                Chưa có tài khoản?{' '}
                <button
                  onClick={onRegisterClick}
                  className="text-amber-500 hover:text-amber-400 font-medium transition-colors"
                >
                  Đăng ký ngay
                </button>
              </p>
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
