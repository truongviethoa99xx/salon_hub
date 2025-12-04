import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import HomePage from './app/HomePage';
import AdminLayout from './app/admin/layout';
import AdminSchedulerPage from './app/admin/scheduler/page';
import AdminServicesPage from './app/admin/services/page';
import AdminShiftsPage from './app/admin/shifts/page';
import StaffQueuePage from './app/staff/queue/page';
const StaffLayout = ({ children }) => {
    return (_jsxs("div", { children: [_jsx("nav", { children: "Staff Navigation (Placeholder)" }), children, _jsx(Outlet, {})] }));
};
const Router = () => {
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsxs(Route, { path: "/admin", element: _jsx(AdminLayout, {}), children: [_jsx(Route, { index: true, element: _jsx("p", { children: "Admin Dashboard Home (Placeholder)" }) }), _jsx(Route, { path: "scheduler", element: _jsx(AdminSchedulerPage, {}) }), _jsx(Route, { path: "services", element: _jsx(AdminServicesPage, {}) }), _jsx(Route, { path: "shifts", element: _jsx(AdminShiftsPage, {}) })] }), _jsxs(Route, { path: "/staff", element: _jsx(StaffLayout, {}), children: [_jsx(Route, { index: true, element: _jsx("p", { children: "Staff Dashboard Home (Placeholder)" }) }), _jsx(Route, { path: "queue", element: _jsx(StaffQueuePage, {}) })] }), _jsx(Route, { path: "*", element: _jsx("div", { children: "404 Not Found" }) })] }) }));
};
export default Router;
