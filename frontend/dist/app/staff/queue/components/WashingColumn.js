import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs("div", { className: "p-4 bg-white rounded-lg shadow-md border-l-4 border-blue-500 flex flex-col space-y-2", children: [_jsxs("div", { children: [_jsx("p", { className: "font-bold text-lg", children: customer.booking.customer.full_name }), _jsxs("p", { className: "text-sm text-gray-600", children: ["D\u1ECBch v\u1EE5: ", customer.booking.service.name] }), _jsxs("p", { className: "text-sm text-gray-600", children: ["Nh\u00E2n vi\u00EAn: ", customer.serviced_by?.full_name || 'N/A'] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("p", { className: "text-lg font-mono bg-gray-200 px-2 py-1 rounded", children: ["Th\u1EDDi gian: ", serviceTime] }), _jsx("button", { onClick: handleFinishWashing, className: "px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75", children: "Ho\u00E0n t\u1EA5t g\u1ED9i" })] })] }));
};
export const WashingColumn = ({ customers }) => (_jsxs("div", { className: "flex-1 p-4 bg-gray-100 rounded-lg", children: [_jsxs("h2", { className: "text-2xl font-bold mb-4 text-center text-gray-700", children: ["\u0110ang G\u1ED9i (", customers.length, ")"] }), _jsx("div", { className: "space-y-4", children: customers.length > 0 ? (customers.map(c => _jsx(WashingCustomerCard, { customer: c }, c.id))) : (_jsx("p", { className: "text-center text-gray-500 mt-8", children: "Ch\u01B0a c\u00F3 kh\u00E1ch n\u00E0o \u0111ang g\u1ED9i." })) })] }));
