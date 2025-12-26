
import React, { useState } from 'react';
import { Lock, ArrowLeft, Loader2 } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface LoginProps {
  onLogin: () => void;
  onBack: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onBack }) => {
  const { login } = useData();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      await login(username, password);
      onLogin(); // Navigate to Dashboard on success
    } catch (err: any) {
      setError(err.message || 'Đăng nhập thất bại');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md bg-dark-900 border border-white/10 rounded-2xl p-8 shadow-2xl">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 text-sm"
        >
          <ArrowLeft size={16} /> Quay lại trang chủ
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-500/10 text-brand-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white">Đăng nhập Quản trị</h2>
          <p className="text-gray-500 text-sm mt-1">Hệ thống quản lý Smart Salon O2O</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg text-center animate-in shake">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Tài khoản</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-dark-800 border border-white/10 rounded-xl p-3 text-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 focus:outline-none"
              placeholder="admin"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Mật khẩu</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-dark-800 border border-white/10 rounded-xl p-3 text-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 focus:outline-none"
              placeholder="••••••"
            />
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-500 hover:bg-brand-600 text-black font-bold py-3 rounded-xl transition-colors mt-4 flex items-center justify-center gap-2"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : 'Đăng nhập'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-xs text-gray-600">
          Demo: admin / 123456
        </div>
      </div>
    </div>
  );
};
