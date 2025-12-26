
import React from 'react';
import { Branch } from '../types';

interface LiveStatusProps {
    branch: Branch;
}

export const LiveStatus: React.FC<LiveStatusProps> = ({ branch }) => {
  const { busyLevel, chairsAvailable, bedsWaiting } = branch.queueStatus;

  const color = busyLevel === 'Low' ? 'bg-green-500' : busyLevel === 'Medium' ? 'bg-yellow-500' : 'bg-red-500';
  const text = busyLevel === 'Low' ? 'Vắng khách' : busyLevel === 'Medium' ? 'Hơi đông' : 'Rất đông';

  return (
    <section className="w-full">
        <div className="bg-gradient-to-r from-dark-800 to-dark-900 border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 relative z-10 gap-4">
                <div>
                     <h3 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        Live Status
                        <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-gray-400 font-normal normal-case">{branch.name}</span>
                     </h3>
                     <p className="text-xs text-gray-500 mt-1">*Cập nhật thời gian thực từ Camera AI</p>
                </div>
                
                <div className="flex items-center gap-3 bg-black/20 px-4 py-2 rounded-full border border-white/5 self-start md:self-auto">
                    <span className="relative flex h-3 w-3">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`}></span>
                        <span className={`relative inline-flex rounded-full h-3 w-3 ${color}`}></span>
                    </span>
                    <span className="text-sm font-bold text-white">{text}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                <div className="bg-dark-950/50 rounded-xl p-4 text-center border border-white/5">
                    <div className="text-3xl font-black text-white mb-1">{chairsAvailable}</div>
                    <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Ghế Cắt Trống</div>
                </div>
                <div className="bg-dark-950/50 rounded-xl p-4 text-center border border-white/5">
                    <div className="text-3xl font-black text-white mb-1">{bedsWaiting}</div>
                    <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Khách chờ gội</div>
                </div>
                 <div className="bg-dark-950/50 rounded-xl p-4 text-center border border-white/5 hidden md:block">
                    <div className="text-3xl font-black text-white mb-1">15p</div>
                    <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Thời gian chờ TB</div>
                </div>
                 <div className="bg-dark-950/50 rounded-xl p-4 text-center border border-white/5 hidden md:block">
                    <div className="text-3xl font-black text-white mb-1">5</div>
                    <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Stylist đang làm</div>
                </div>
            </div>
        </div>
    </section>
  );
};
