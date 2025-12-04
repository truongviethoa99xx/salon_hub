import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Scissors, Clock, TrendingUp, Users, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/button';
import { cn } from '../../../lib/utils';

const StatCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    href,
    color = 'black'
}: {
    title: string;
    value: string | number;
    change?: string;
    icon: React.ElementType;
    href?: string;
    color?: 'black' | 'white';
}) => {
    const content = (
        <div className={cn(
            "relative overflow-hidden rounded-3xl p-8 premium-card group",
            color === 'black' 
                ? "bg-gradient-to-br from-black via-gray-900 to-black text-white" 
                : "bg-white text-black border border-black/10 shadow-sm"
        )}>
            {/* Animated gradient overlay */}
            <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                color === 'black'
                    ? "bg-gradient-to-br from-gray-800/50 to-transparent"
                    : "bg-gradient-to-br from-gray-50/50 to-transparent"
            )} />
            
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
            
            <div className="relative z-10 flex items-start justify-between">
                <div className="flex-1">
                    <p className={cn(
                        "text-xs font-bold uppercase tracking-wider mb-3",
                        color === 'black' ? "text-gray-400" : "text-gray-500"
                    )}>
                        {title}
                    </p>
                    <p className={cn(
                        "text-5xl font-black mb-2 tracking-tight",
                        color === 'black' ? "text-white" : "text-black"
                    )}>
                        {value}
                    </p>
                    {change && (
                        <p className={cn(
                            "text-sm font-semibold flex items-center gap-1.5",
                            color === 'black' ? "text-gray-300" : "text-gray-600"
                        )}>
                            <TrendingUp className="w-4 h-4" strokeWidth={3} />
                            {change}
                        </p>
                    )}
                </div>
                <div className={cn(
                    "p-4 rounded-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300",
                    color === 'black' ? "bg-white/10" : "bg-black/5"
                )}>
                    <Icon className={cn(
                        "w-7 h-7",
                        color === 'black' ? "text-white" : "text-black"
                    )} strokeWidth={2.5} />
                </div>
            </div>
        </div>
    );

    if (href) {
        return (
            <Link to={href} className="block">
                {content}
            </Link>
        );
    }

    return content;
};

export default function AdminDashboard() {
    const { t } = useTranslation();

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header */}
            <div className="relative">
                <h1 className="text-6xl font-black text-black mb-3 tracking-tighter gradient-text">
                    {t('dashboard.title')}
                </h1>
                <p className="text-lg text-gray-500 font-medium">{t('dashboard.subtitle')}</p>
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-black/5 rounded-full blur-3xl -z-10 animate-pulse-slow" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                    title={t('dashboard.todaySchedule')}
                    value="24"
                    change={t('dashboard.scheduleChange')}
                    icon={Calendar}
                    href="/admin/scheduler"
                    color="black"
                />
                <StatCard
                    title={t('dashboard.services')}
                    value="15"
                    change={t('dashboard.servicesChange')}
                    icon={Scissors}
                    href="/admin/services"
                    color="white"
                />
                <StatCard
                    title={t('dashboard.shifts')}
                    value="8"
                    change={t('dashboard.shiftsChange')}
                    icon={Clock}
                    href="/admin/shifts"
                    color="black"
                />
            </div>

            {/* Quick Actions */}
            <div className="relative bg-white rounded-3xl border border-black/10 p-10 shadow-sm premium-card overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-black/5 to-transparent rounded-full blur-3xl -z-10" />
                
                <h2 className="text-3xl font-black text-black mb-8 tracking-tight">{t('dashboard.quickActions')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <Link to="/admin/scheduler">
                        <div className="group relative h-28 flex flex-col items-center justify-center gap-3 border-2 border-black/10 rounded-2xl hover:border-black hover:bg-black hover:shadow-2xl transition-all duration-300 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Calendar className="w-8 h-8 text-black group-hover:text-white group-hover:scale-110 transition-all duration-300 relative z-10" strokeWidth={2.5} />
                            <span className="font-bold text-black group-hover:text-white relative z-10">{t('dashboard.viewSchedule')}</span>
                        </div>
                    </Link>
                    <Link to="/admin/services">
                        <div className="group relative h-28 flex flex-col items-center justify-center gap-3 border-2 border-black/10 rounded-2xl hover:border-black hover:bg-black hover:shadow-2xl transition-all duration-300 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Scissors className="w-8 h-8 text-black group-hover:text-white group-hover:scale-110 transition-all duration-300 relative z-10" strokeWidth={2.5} />
                            <span className="font-bold text-black group-hover:text-white relative z-10">{t('dashboard.manageServices')}</span>
                        </div>
                    </Link>
                    <Link to="/admin/shifts">
                        <div className="group relative h-28 flex flex-col items-center justify-center gap-3 border-2 border-black/10 rounded-2xl hover:border-black hover:bg-black hover:shadow-2xl transition-all duration-300 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Clock className="w-8 h-8 text-black group-hover:text-white group-hover:scale-110 transition-all duration-300 relative z-10" strokeWidth={2.5} />
                            <span className="font-bold text-black group-hover:text-white relative z-10">{t('dashboard.manageShifts')}</span>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="relative bg-white rounded-3xl border border-black/10 p-10 shadow-sm premium-card overflow-hidden">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-black/5 to-transparent rounded-full blur-3xl -z-10" />
                
                <h2 className="text-3xl font-black text-black mb-8 tracking-tight">{t('dashboard.recentActivity')}</h2>
                <div className="space-y-3">
                    <div className="group flex items-center gap-5 p-5 rounded-2xl hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-black/5">
                        <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                            <Calendar className="w-6 h-6 text-white" strokeWidth={2.5} />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-black text-lg">{t('dashboard.newBooking')}</p>
                            <p className="text-sm text-gray-500 font-medium">Khách hàng Nguyễn Văn A - 14:30</p>
                        </div>
                        <span className="text-xs text-gray-400 font-semibold">5 {t('dashboard.minutesAgo')}</span>
                    </div>
                    <div className="group flex items-center gap-5 p-5 rounded-2xl hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-black/5">
                        <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                            <Scissors className="w-6 h-6 text-white" strokeWidth={2.5} />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-black text-lg">{t('dashboard.newService')}</p>
                            <p className="text-sm text-gray-500 font-medium">Gội đầu + Cắt tóc combo</p>
                        </div>
                        <span className="text-xs text-gray-400 font-semibold">2 {t('dashboard.hoursAgo')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

