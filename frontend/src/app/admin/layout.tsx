// apps/web/src/app/admin/layout.tsx
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Calendar, Scissors, Clock, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import LanguageSwitcher from '../../components/LanguageSwitcher';

const AdminSidebar = () => {
    const location = useLocation();
    const { t } = useTranslation();
    
    const navItems = [
        { 
            key: 'scheduler',
            href: '/admin/scheduler',
            icon: Calendar
        },
        { 
            key: 'services',
            href: '/admin/services',
            icon: Scissors
        },
        { 
            key: 'shifts',
            href: '/admin/shifts',
            icon: Clock
        },
    ];

    return (
        <aside className="w-72 flex-shrink-0 bg-gradient-to-b from-black to-gray-900 text-white flex flex-col border-r border-white/5 relative">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }} />
            
            {/* Logo/Brand Section */}
            <div className="px-8 py-10 border-b border-white/5 relative">
                <Link to="/admin" className="flex items-center gap-3 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-200 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-white/10">
                        <Scissors className="w-6 h-6 text-black" strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tighter text-white">{t('common.appName')}</h1>
                        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">{t('common.appSubtitle')}</p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-6 py-8 space-y-2 relative">
                <div className="mb-6">
                    <Link 
                        to="/admin"
                        className={cn(
                            "relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden group",
                            location.pathname === '/admin' 
                                ? "bg-white text-black shadow-xl shadow-black/20" 
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        {location.pathname === '/admin' && (
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50" />
                        )}
                        <Home className="w-5 h-5 relative z-10" strokeWidth={2.5} />
                        <span className="relative z-10">{t('common.home')}</span>
                    </Link>
                </div>

                <div className="space-y-1.5">
                    {navItems.map(item => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href;
                        
                        return (
                            <Link
                                key={item.key}
                                to={item.href}
                                className={cn(
                                    "relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden group",
                                    isActive
                                        ? "bg-white text-black shadow-xl shadow-black/20"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                {isActive && (
                                    <>
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50" />
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-black rounded-r-full" />
                                    </>
                                )}
                                <Icon 
                                    className={cn(
                                        "w-5 h-5 relative z-10 transition-transform duration-300",
                                        isActive ? "" : "group-hover:scale-110 group-hover:rotate-12"
                                    )} 
                                    strokeWidth={2.5}
                                />
                                <span className="relative z-10">{t(`sidebar.${item.key}`)}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Language Switcher */}
            <div className="px-6 py-4 border-t border-white/5 relative">
                <LanguageSwitcher />
            </div>

            {/* Footer */}
            <div className="px-6 py-6 border-t border-white/5 relative">
                <p className="text-xs text-gray-600 text-center font-medium">
                    {t('common.copyright')}
                </p>
            </div>
        </aside>
    );
};

export default function AdminLayout() {
    return (
        <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden relative">
            {/* Subtle animated background pattern */}
            <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                backgroundSize: '100px 100px',
            }} />
            
            <AdminSidebar />
            <main className="flex-1 overflow-auto salon-scrollbar relative">
                <div className="max-w-7xl mx-auto px-8 py-10 relative z-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}