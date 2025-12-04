// apps/web/src/app/staff/queue/components/WaitingColumn.tsx
import React from 'react';
import { useTimer } from '@/hooks/useTimer';
import { updateQueueItemStatus } from '@/services/api';

const WaitingCustomerCard = ({ customer, staffId }) => {
    const timeWaited = useTimer(customer.entered_at);

    const handleStartWashing = () => {
        // A real staffId would come from auth context
        updateQueueItemStatus(customer.id, 'WASHING', staffId)
            .catch(err => alert(`Error: ${err.message}`));
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md border-l-4 border-yellow-400 flex flex-col space-y-2">
            <div>
                <p className="font-bold text-lg">{customer.booking.customer.full_name}</p>
                <p className="text-sm text-gray-600">Dịch vụ: {customer.booking.service.name}</p>
            </div>
            <div className="flex items-center justify-between">
                <p className="text-lg font-mono bg-gray-200 px-2 py-1 rounded">
                    Chờ: {timeWaited}
                </p>
                <button 
                    onClick={handleStartWashing}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                    Mời khách vào
                </button>
            </div>
        </div>
    );
};

export const WaitingColumn = ({ customers, staffId }) => (
  <div className="flex-1 p-4 bg-gray-100 rounded-lg">
    <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
      Danh Sách Chờ ({customers.length})
    </h2>
    <div className="space-y-4">
      {customers.length > 0 ? (
        customers.map(c => <WaitingCustomerCard key={c.id} customer={c} staffId={staffId} />)
      ) : (
        <p className="text-center text-gray-500 mt-8">Không có khách nào đang chờ.</p>
      )}
    </div>
  </div>
);
