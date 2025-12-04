// apps/web/src/app/staff/queue/components/WashingColumn.tsx
import React from 'react';
import { useTimer } from '@/hooks/useTimer';
import { updateQueueItemStatus } from '@/services/api';

const WashingCustomerCard = ({ customer }) => {
    const serviceTime = useTimer(customer.started_at);

    const handleFinishWashing = () => {
        // In a real app, the staffId might not be needed here if the backend
        // can infer it or if it's not required for the 'DONE' status.
        // Passing the current staff member's ID for completeness.
        updateQueueItemStatus(customer.id, 'DONE', customer.serviced_by.id)
            .catch(err => alert(`Error: ${err.message}`));
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md border-l-4 border-blue-500 flex flex-col space-y-2">
            <div>
                <p className="font-bold text-lg">{customer.booking.customer.full_name}</p>
                <p className="text-sm text-gray-600">Dịch vụ: {customer.booking.service.name}</p>
                <p className="text-sm text-gray-600">Nhân viên: {customer.serviced_by?.full_name || 'N/A'}</p>
            </div>
            <div className="flex items-center justify-between">
                <p className="text-lg font-mono bg-gray-200 px-2 py-1 rounded">
                    Thời gian: {serviceTime}
                </p>
                <button
                    onClick={handleFinishWashing}
                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                >
                    Hoàn tất gội
                </button>
            </div>
        </div>
    );
};

export const WashingColumn = ({ customers }) => (
  <div className="flex-1 p-4 bg-gray-100 rounded-lg">
    <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
      Đang Gội ({customers.length})
    </h2>
    <div className="space-y-4">
      {customers.length > 0 ? (
        customers.map(c => <WashingCustomerCard key={c.id} customer={c} />)
      ) : (
        <p className="text-center text-gray-500 mt-8">Chưa có khách nào đang gội.</p>
      )}
    </div>
  </div>
);
