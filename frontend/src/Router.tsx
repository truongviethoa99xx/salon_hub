import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import HomePage from './app/HomePage';
import AdminLayout from './app/admin/layout';
import {
  Dashboard as LuxeDashboard,
  CalendarView as LuxeCalendarView,
  POS as LuxePOS,
  ServiceInventory as LuxeServiceInventory,
  StaffManager as LuxeStaffManager,
  SettingsPage as LuxeSettingsPage,
  AdminLogin as LuxeAdminLogin,
} from './app/admin/luxe/AdminViews';
import StaffQueuePage from './app/staff/queue/page';

const StaffLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div>
      <nav>Staff Navigation (Placeholder)</nav>
      {children}
      <Outlet />
    </div>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Luxe-style Admin */}
        <Route path="/admin/login" element={<LuxeAdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<LuxeDashboard />} />
          <Route path="calendar" element={<LuxeCalendarView />} />
          <Route path="pos" element={<LuxePOS />} />
          <Route path="services" element={<LuxeServiceInventory />} />
          <Route path="staff" element={<LuxeStaffManager />} />
          <Route path="settings" element={<LuxeSettingsPage />} />
        </Route>

        <Route path="/staff" element={<StaffLayout />}>
          <Route index element={<p>Staff Dashboard Home (Placeholder)</p>} />
          <Route path="queue" element={<StaffQueuePage />} />
        </Route>

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;