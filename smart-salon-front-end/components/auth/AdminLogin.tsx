import React, { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, ArrowLeft, Loader2, Mail, Settings, BarChart3, Users, Database } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface AdminLoginProps {
  onLoginSuccess: (role: 'ADMIN' | 'SUPER_ADMIN') => void;
  onBack: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onBack,
}) => {
  const { loginAdmin, siteSettings } = useData();
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
      setError('Vui lòng nhập email');
      return;
    }
    if (!formData.password) {
      setError('Vui lòng nhập mật khẩu');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await loginAdmin(formData.username, formData.password);
      onLoginSuccess(result.role as 'ADMIN' | 'SUPER_ADMIN');
    } catch (err: any) {
      setError(err.message || 'Đăng nhập thất bại, vui lòng thử lại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a10] flex relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2070"
          alt="Admin Background"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a10] via-[#0a0a10]/85 to-[#0a0a10]" />
      </div>

      {/* Gradient Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px]" />
      </div>

      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">{siteSettings?.brandName || 'Smart Salon'}</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Quản trị<br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              hệ thống
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Truy cập bảng điều khiển để quản lý chi nhánh, nhân viên, dịch vụ và xem báo cáo kinh doanh.
          </p>

          {/* Admin Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#12121a]/60 backdrop-blur-sm rounded-2xl p-4 border border-white/5">
              <BarChart3 className="w-6 h-6 text-indigo-500 mb-2" />
              <div className="text-sm font-medium text-white mb-1">Báo cáo</div>
              <div className="text-xs text-gray-500">Doanh thu & thống kê</div>
            </div>
            <div className="bg-[#12121a]/60 backdrop-blur-sm rounded-2xl p-4 border border-white/5">
              <Users className="w-6 h-6 text-indigo-500 mb-2" />
              <div className="text-sm font-medium text-white mb-1">Nhân sự</div>
              <div className="text-xs text-gray-500">Quản lý nhân viên</div>
            </div>
            <div className="bg-[#12121a]/60 backdrop-blur-sm rounded-2xl p-4 border border-white/5">
              <Settings className="w-6 h-6 text-indigo-500 mb-2" />
              <div className="text-sm font-medium text-white mb-1">Cài đặt</div>
              <div className="text-xs text-gray-500">Cấu hình hệ thống</div>
            </div>
            <div className="bg-[#12121a]/60 backdrop-blur-sm rounded-2xl p-4 border border-white/5">
              <Database className="w-6 h-6 text-indigo-500 mb-2" />
              <div className="text-sm font-medium text-white mb-1">Dữ liệu</div>
              <div className="text-xs text-gray-500">Khách hàng & dịch vụ</div>
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
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">{siteSettings?.brandName || 'Smart Salon'}</span>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-400/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
                <Shield className="w-8 h-8 text-indigo-500" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Admin Đăng nhập</h2>
              <p className="text-gray-500">Quản trị viên & Super Admin</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-600 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="admin@example.com"
                    className="w-full bg-[#1a1a24] border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
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
                    <Lock className="w-5 h-5 text-gray-600 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Nhập mật khẩu"
                    className="w-full bg-[#1a1a24] border border-white/5 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
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
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
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
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3">
                <p className="text-indigo-400 text-xs">
                  Chỉ dành cho quản trị viên được cấp phép. Liên hệ Super Admin nếu cần hỗ trợ.
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
