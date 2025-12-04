// apps/web/src/app/staff/queue/page.tsx
import React from 'react';
import { useQueueSocket } from '../../../hooks/useQueueSocket';
import { WaitingColumn } from './components/WaitingColumn';
import { WashingColumn } from './components/WashingColumn';

export default function QueuePage() {
  // TODO: Replace with dynamic branchId and staffId from user session or URL
  const hardcodedBranchId = 'YOUR_BRANCH_ID_HERE'; // Replace with a real branch ID from your DB for testing
  const hardcodedStaffId = 'YOUR_STAFF_ID_HERE'; // Replace with a real staff user ID from your DB for testing
  
  const { queueState, isConnected } = useQueueSocket(hardcodedBranchId);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 bg-gray-50">
      <div className="w-full max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-center text-gray-800">Quản lý Hàng chờ Gội đầu</h1>
          <div className="text-center text-lg text-gray-500 mt-2 flex items-center justify-center gap-2">
            <span>Trạng thái kết nối:</span>
            <span className={`h-4 w-4 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span>{isConnected ? 'Đã kết nối' : 'Mất kết nối'}</span>
          </div>
        </header>
        
        <div className="flex flex-col md:flex-row gap-8">
          <WashingColumn customers={queueState.washing} />
          <WaitingColumn customers={queueState.waiting} staffId={hardcodedStaffId} />
        </div>
      </div>
    </main>
  );
}
