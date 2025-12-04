import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQueueSocket } from '../../../hooks/useQueueSocket';
import { WaitingColumn } from './components/WaitingColumn';
import { WashingColumn } from './components/WashingColumn';
export default function QueuePage() {
    // TODO: Replace with dynamic branchId and staffId from user session or URL
    const hardcodedBranchId = 'YOUR_BRANCH_ID_HERE'; // Replace with a real branch ID from your DB for testing
    const hardcodedStaffId = 'YOUR_STAFF_ID_HERE'; // Replace with a real staff user ID from your DB for testing
    const { queueState, isConnected } = useQueueSocket(hardcodedBranchId);
    return (_jsx("main", { className: "flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 bg-gray-50", children: _jsxs("div", { className: "w-full max-w-7xl mx-auto", children: [_jsxs("header", { className: "mb-8", children: [_jsx("h1", { className: "text-4xl font-extrabold text-center text-gray-800", children: "Qu\u1EA3n l\u00FD H\u00E0ng ch\u1EDD G\u1ED9i \u0111\u1EA7u" }), _jsxs("div", { className: "text-center text-lg text-gray-500 mt-2 flex items-center justify-center gap-2", children: [_jsx("span", { children: "Tr\u1EA1ng th\u00E1i k\u1EBFt n\u1ED1i:" }), _jsx("span", { className: `h-4 w-4 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}` }), _jsx("span", { children: isConnected ? 'Đã kết nối' : 'Mất kết nối' })] })] }), _jsxs("div", { className: "flex flex-col md:flex-row gap-8", children: [_jsx(WashingColumn, { customers: queueState.washing }), _jsx(WaitingColumn, { customers: queueState.waiting, staffId: hardcodedStaffId })] })] }) }));
}
