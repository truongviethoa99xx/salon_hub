import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTimer } from '@/hooks/useTimer';
import { updateQueueItemStatus } from '@/services/api';
const WaitingCustomerCard = ({ customer, staffId }) => {
    const timeWaited = useTimer(customer.entered_at);
    const handleStartWashing = () => {
        // A real staffId would come from auth context
        updateQueueItemStatus(customer.id, 'WASHING', staffId)
            .catch(err => alert(`Error: ${err.message}`));
    };
    return (_jsxs("div", { className: "p-4 bg-white rounded-lg shadow-md border-l-4 border-yellow-400 flex flex-col space-y-2", children: [_jsxs("div", { children: [_jsx("p", { className: "font-bold text-lg", children: customer.booking.customer.full_name }), _jsxs("p", { className: "text-sm text-gray-600", children: ["D\u1ECBch v\u1EE5: ", customer.booking.service.name] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("p", { className: "text-lg font-mono bg-gray-200 px-2 py-1 rounded", children: ["Ch\u1EDD: ", timeWaited] }), _jsx("button", { onClick: handleStartWashing, className: "px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75", children: "M\u1EDDi kh\u00E1ch v\u00E0o" })] })] }));
};
export const WaitingColumn = ({ customers, staffId }) => (_jsxs("div", { className: "flex-1 p-4 bg-gray-100 rounded-lg", children: [_jsxs("h2", { className: "text-2xl font-bold mb-4 text-center text-gray-700", children: ["Danh S\u00E1ch Ch\u1EDD (", customers.length, ")"] }), _jsx("div", { className: "space-y-4", children: customers.length > 0 ? (customers.map(c => _jsx(WaitingCustomerCard, { customer: c, staffId: staffId }, c.id))) : (_jsx("p", { className: "text-center text-gray-500 mt-8", children: "Kh\u00F4ng c\u00F3 kh\u00E1ch n\u00E0o \u0111ang ch\u1EDD." })) })] }));
