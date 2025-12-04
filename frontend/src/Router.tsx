import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import HomePage from './app/HomePage';
import AdminLayout from './app/admin/layout';
import AdminDashboard from './app/admin/dashboard/page';
import AdminSchedulerPage from './app/admin/scheduler/page';
import AdminServicesPage from './app/admin/services/page';
import AdminShiftsPage from './app/admin/shifts/page';
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
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="scheduler" element={<AdminSchedulerPage />} />
          <Route path="services" element={<AdminServicesPage />} />
          <Route path="shifts" element={<AdminShiftsPage />} />
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