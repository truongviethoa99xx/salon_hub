import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, Outlet } from 'react-router-dom'; // Changed import
const AdminSidebar = () => {
    const navItems = [
        { name: 'Lịch Tổng', href: '/admin/scheduler' },
        { name: 'Quản lý Dịch vụ', href: '/admin/services' },
        { name: 'Quản lý Ca làm việc', href: '/admin/shifts' },
    ];
    return (_jsxs("aside", { className: "w-64 flex-shrink-0 bg-gray-800 text-white p-4", children: [_jsx("h2", { className: "text-2xl font-bold mb-6", children: "Admin Dashboard" }), _jsx("nav", { children: _jsx("ul", { children: navItems.map(item => (_jsx("li", { className: "mb-2", children: _jsxs(Link, { to: item.href, className: "block p-2 rounded-md hover:bg-gray-700 transition-colors", children: [" ", item.name] }) }, item.name))) }) })] }));
};
export default function AdminLayout() {
    return (_jsxs("div", { className: "flex h-screen bg-gray-100", children: [_jsx(AdminSidebar, {}), _jsxs("main", { className: "flex-1 p-8 overflow-auto", children: [_jsx(Outlet, {}), " "] })] }));
}
