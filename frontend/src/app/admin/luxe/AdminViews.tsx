import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Calendar as CalendarIcon,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  Bell,
  Search,
  Plus,
  Trash2,
  Brain,
  Package,
  Tag,
  Edit2,
  Printer,
  Lock,
  Star,
} from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { SERVICES, STAFF, PRODUCTS } from './constants';
import { Service, Product, Staff, ServiceCategory } from './types';
import { generateMarketingCampaign } from './geminiService';

// --- Shared Admin Components ---

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-bold text-lg">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// --- Admin Layout (full Luxe-style layout) ---

export const AdminLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-serif font-bold tracking-wider">Luxe Admin</h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-rose-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
          <NavLink
            to="/admin/calendar"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-rose-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <CalendarIcon size={20} /> Calendar
          </NavLink>
          <NavLink
            to="/admin/pos"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-rose-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <ShoppingBag size={20} /> POS System
          </NavLink>
          <NavLink
            to="/admin/services"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-rose-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <Package size={20} /> Services &amp; Inv
          </NavLink>
          <NavLink
            to="/admin/staff"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-rose-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <Users size={20} /> Staff &amp; HR
          </NavLink>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-rose-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <Settings size={20} /> Settings
          </NavLink>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => navigate('/admin/login')}
            className="flex items-center gap-2 text-slate-400 hover:text-white w-full"
          >
            <LogOut size={18} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">
          <h2 className="font-semibold text-gray-700">Management Portal</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell size={20} className="text-gray-500 cursor-pointer" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </div>
            <img
              src="https://picsum.photos/40/40"
              className="w-8 h-8 rounded-full border border-gray-200"
              alt="Admin"
            />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// --- Dashboard with AI ---

export const Dashboard = () => {
  const [aiInsight, setAiInsight] = useState<{ strategy: string; smsContent: string } | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const data = [
    { name: 'Mon', revenue: 4000 },
    { name: 'Tue', revenue: 3000 },
    { name: 'Wed', revenue: 2000 },
    { name: 'Thu', revenue: 2780 },
    { name: 'Fri', revenue: 1890 },
    { name: 'Sat', revenue: 2390 },
    { name: 'Sun', revenue: 3490 },
  ];

  const pieData = [
    { name: 'Hair', value: 400 },
    { name: 'Color', value: 300 },
    { name: 'Spa', value: 300 },
    { name: 'Nails', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const handleConsultAI = async () => {
    setLoadingAi(true);
    const result = await generateMarketingCampaign(2500, 'Wednesday');
    setAiInsight(result);
    setLoadingAi(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Overview</h1>
        <button
          onClick={handleConsultAI}
          disabled={loadingAi}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition shadow-lg shadow-purple-200"
        >
          <Brain size={18} /> {loadingAi ? 'Consulting AI...' : 'AI Business Consultant'}
        </button>
      </div>

      {aiInsight && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 relative">
          <h3 className="text-purple-800 font-bold mb-2 flex items-center gap-2">
            <Brain size={18} />
            AI Insight
          </h3>
          <p className="text-gray-700 mb-4">
            <strong>Strategy:</strong> {aiInsight.strategy}
          </p>
          <div className="bg-white p-3 rounded-lg border border-purple-100">
            <p className="text-xs text-gray-500 uppercase font-bold mb-1">Suggested SMS Campaign</p>
            <p className="font-mono text-sm text-gray-800">{aiInsight.smsContent}</p>
          </div>
          <button
            onClick={() => setAiInsight(null)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {['Daily Revenue', 'Appointments', 'New Customers', 'Inventory Alerts'].map((label, i) => (
          <div key={label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">{label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {['$3,240', '24', '8', '3 Items'][i]}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-700 mb-6">Weekly Revenue</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-700 mb-6">Service Mix</h3>
          <div className="h-64 flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Calendar ---

export const CalendarView = () => {
  const hours = Array.from({ length: 11 }, (_, i) => 9 + i); // 9am to 7pm

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-bold text-lg">Schedule - Today</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">Day</button>
          <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">Week</button>
          <button className="px-3 py-1 text-sm bg-rose-600 text-white rounded">New Appointment</button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="min-w-[800px]">
          {/* Header Row: Staff */}
          <div className="flex border-b sticky top-0 bg-white z-10">
            <div className="w-20 p-4 border-r bg-gray-50" />
            {STAFF.map((staff) => (
              <div key={staff.id} className="flex-1 p-3 text-center border-r bg-gray-50">
                <div className="font-bold text-sm">{staff.name}</div>
                <div className="text-xs text-gray-500">{staff.role}</div>
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="relative">
            {hours.map((h) => (
              <div key={h} className="flex border-b h-24">
                <div className="w-20 p-2 text-xs text-gray-400 border-r text-right pr-4 -translate-y-2">
                  {h}:00
                </div>
                {STAFF.map((staff) => (
                  <div key={staff.id} className="flex-1 border-r relative group hover:bg-gray-50 transition">
                    {/* Simulated Appointment */}
                    {staff.id === 'st1' && h === 10 && (
                      <div className="absolute top-2 left-1 right-1 bottom-2 bg-blue-100 border-l-4 border-blue-500 rounded p-2 text-xs cursor-pointer hover:shadow-md">
                        <p className="font-bold text-blue-800">Alice M.</p>
                        <p className="text-blue-600">Hair Cut (45m)</p>
                      </div>
                    )}
                    {staff.id === 'st2' && h === 14 && (
                      <div className="absolute top-2 left-1 right-1 bottom-[-4rem] z-10 bg-green-100 border-l-4 border-green-500 rounded p-2 text-xs cursor-pointer hover:shadow-md">
                        <p className="font-bold text-green-800">Sophie L.</p>
                        <p className="text-green-600">Full Color (3h)</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- POS ---

export const POS = () => {
  const [cart, setCart] = useState<(Service | Product)[]>([]);
  const [search, setSearch] = useState('');

  const addToCart = (item: Service | Product) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const filteredServices = SERVICES.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );
  const filteredProducts = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Left: Catalog */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search services or products..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="font-bold text-gray-500 mb-3 text-sm uppercase">Services</h3>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {filteredServices.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => addToCart(s)}
                className="border rounded-lg p-3 text-left hover:border-rose-500 hover:bg-rose-50 transition cursor-pointer"
              >
                <div className="text-sm font-bold">{s.name}</div>
                <div className="text-rose-600 font-bold mt-1">${s.price}</div>
              </button>
            ))}
          </div>

          <h3 className="font-bold text-gray-500 mb-3 text-sm uppercase">Retail Products</h3>
          <div className="grid grid-cols-3 gap-3">
            {filteredProducts.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => addToCart(p)}
                className="border rounded-lg p-3 text-left hover:border-amber-500 hover:bg-amber-50 transition cursor-pointer"
              >
                <div className="text-sm font-bold">{p.name}</div>
                <div className="text-xs text-gray-500">Stock: {p.stock}</div>
                <div className="text-amber-600 font-bold mt-1">${p.price}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Cart */}
      <div className="w-96 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
        <div className="p-4 border-b bg-gray-50 rounded-t-xl flex justify-between items-center">
          <h3 className="font-bold">Current Bill</h3>
          <button
            onClick={() => setCart([])}
            className="text-xs text-red-500 hover:text-red-700"
          >
            Clear
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 && <p className="text-center text-gray-400 mt-10">Empty Cart</p>}
          {cart.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="flex justify-between items-center pb-2 border-b border-dashed"
            >
              <div>
                <div className="text-sm font-medium">{item.name}</div>
                <div className="text-xs text-gray-500">
                  {(item as any).category || (item as any).role}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold">${item.price}</span>
                <button
                  type="button"
                  onClick={() => removeFromCart(idx)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-gray-50 border-t space-y-3 rounded-b-xl">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${total}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Tax (8%)</span>
            <span>${(total * 0.08).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
            <span>Total</span>
            <span>${(total * 1.08).toFixed(2)}</span>
          </div>
          <button
            type="button"
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition"
          >
            Charge ${(total * 1.08).toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Service & Inventory Manager ---

export const ServiceInventory = () => {
  const [activeTab, setActiveTab] = useState<'services' | 'products'>('services');
  const [services, setServices] = useState<Service[]>(SERVICES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editService, setEditService] = useState<Service | null>(null);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleEdit = (service: Service) => {
    setEditService(service);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditService(null);
    setIsModalOpen(true);
  };

  const handleSaveService: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const newService: Service = {
      id: editService ? editService.id : `s${Date.now()}`,
      name: (formData.get('name') as string) || '',
      category: (formData.get('category') as ServiceCategory) || ServiceCategory.HAIR_CUT,
      price: Number(formData.get('price') || 0),
      durationMinutes: Number(formData.get('durationMinutes') || 0),
      image: editService?.image || 'https://picsum.photos/400/300',
      description: (formData.get('description') as string) || '',
    };

    setServices((prev) =>
      editService ? prev.map((s) => (s.id === editService.id ? newService : s)) : [...prev, newService],
    );
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setActiveTab('services')}
            className={`pb-4 px-4 font-bold text-sm border-b-2 transition ${
              activeTab === 'services' ? 'border-rose-600 text-rose-600' : 'border-transparent text-gray-500'
            }`}
          >
            Services List
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`pb-4 px-4 font-bold text-sm border-b-2 transition ${
              activeTab === 'products' ? 'border-rose-600 text-rose-600' : 'border-transparent text-gray-500'
            }`}
          >
            Product Inventory
          </button>
        </div>
        {activeTab === 'services' && (
          <button
            type="button"
            onClick={handleAddNew}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
          >
            <Plus size={16} /> Add Service
          </button>
        )}
      </div>

      <div className="p-6 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-500 text-sm border-b">
              <th className="pb-3 pl-4">Name</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Price</th>
              <th className="pb-3">{activeTab === 'services' ? 'Duration' : 'Stock Status'}</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {activeTab === 'services'
              ? services.map((s) => (
                  <tr key={s.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 pl-4 font-medium">{s.name}</td>
                    <td className="py-4 text-gray-500">{s.category}</td>
                    <td className="py-4">${s.price}</td>
                    <td className="py-4 text-gray-500">{s.durationMinutes} min</td>
                    <td className="py-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(s)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Edit2 size={16} className="text-gray-600" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(s.id)}
                        className="p-1 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))
              : PRODUCTS.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 pl-4 font-medium">{p.name}</td>
                    <td className="py-4 text-gray-500">{p.category}</td>
                    <td className="py-4">${p.price}</td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          p.stock < 20 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                        }`}
                      >
                        {p.stock} Units
                      </span>
                    </td>
                    <td className="py-4">
                      <button type="button" className="p-1 hover:bg-gray-200 rounded">
                        <Edit2 size={16} className="text-gray-600" />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editService ? 'Edit Service' : 'New Service'}
      >
        <form onSubmit={handleSaveService} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Service Name</label>
            <input
              name="name"
              defaultValue={editService?.name}
              required
              className="w-full mt-1 border rounded p-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Price ($)</label>
              <input
                name="price"
                type="number"
                defaultValue={editService?.price}
                required
                className="w-full mt-1 border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration (min)</label>
              <input
                name="durationMinutes"
                type="number"
                defaultValue={editService?.durationMinutes}
                required
                className="w-full mt-1 border rounded p-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              defaultValue={editService?.category}
              className="w-full mt-1 border rounded p-2"
            >
              {Object.values(ServiceCategory).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              defaultValue={editService?.description}
              className="w-full mt-1 border rounded p-2"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700">
              Save Service
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

// --- Staff Manager ---

export const StaffManager = () => {
  const [staffList, setStaffList] = useState<Staff[]>(STAFF);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveStaff: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const newStaff: Staff = {
      id: `st${Date.now()}`,
      name: (formData.get('name') as string) || '',
      role: (formData.get('role') as any) || 'Junior',
      rating: 5.0,
      avatar: `https://picsum.photos/100/100?random=${Date.now()}`,
      specialties: [],
    };

    setStaffList((prev) => [...prev, newStaff]);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Remove this staff member?')) {
      setStaffList((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Team Members</h2>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-rose-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={16} /> Add Staff
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {staffList.map((staff) => (
          <div
            key={staff.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center relative group"
          >
            <button
              type="button"
              onClick={() => handleDelete(staff.id)}
              className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
            >
              <X size={16} />
            </button>
            <img
              src={staff.avatar}
              className="w-20 h-20 rounded-full mb-4 object-cover"
              alt={staff.name}
            />
            <h3 className="font-bold text-lg">{staff.name}</h3>
            <p className="text-rose-600 font-medium text-sm mb-4">{staff.role}</p>

            <div className="grid grid-cols-2 w-full border-t border-b py-3 my-2">
              <div>
                <p className="text-gray-400 text-xs uppercase">Rating</p>
                <p className="font-bold flex items-center justify-center gap-1">
                  <Star size={12} className="text-orange-400" /> {staff.rating}
                </p>
              </div>
              <div className="border-l">
                <p className="text-gray-400 text-xs uppercase">Revenue</p>
                <p className="font-bold">$12.5k</p>
              </div>
            </div>

            <div className="w-full flex gap-2 mt-4">
              <button
                type="button"
                className="flex-1 border border-gray-200 py-2 rounded-lg text-sm hover:bg-gray-50"
              >
                Edit
              </button>
              <button
                type="button"
                className="flex-1 bg-gray-900 text-white py-2 rounded-lg text-sm hover:bg-gray-800"
              >
                View Schedule
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Team Member">
        <form onSubmit={handleSaveStaff} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input name="name" required className="w-full mt-1 border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select name="role" className="w-full mt-1 border rounded p-2">
              <option>Master Stylist</option>
              <option>Senior Stylist</option>
              <option>Junior</option>
              <option>Technician</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700"
            >
              Add Staff
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

// --- Settings ---

export const SettingsPage = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">System Settings</h2>
        <p className="text-gray-500 text-sm">Manage salon configuration and preferences.</p>
      </div>

      <div className="p-6 space-y-8">
        {/* General */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Tag size={18} /> General Info
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salon Name</label>
              <input
                type="text"
                defaultValue="Luxe & Aura"
                className="w-full border rounded-lg p-2.5 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Contact</label>
              <input
                type="text"
                defaultValue="(555) 999-0000"
                className="w-full border rounded-lg p-2.5 bg-gray-50"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Printer size={18} /> Hardware &amp; POS
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Thermal Printer</p>
                <p className="text-sm text-gray-500">Epson TM-T82III (192.168.1.200)</p>
              </div>
              <span className="text-green-600 text-sm font-bold bg-green-100 px-2 py-1 rounded">
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Barcode Scanner</p>
                <p className="text-sm text-gray-500">USB Input Mode</p>
              </div>
              <button type="button" className="text-blue-600 text-sm font-bold">
                Configure
              </button>
            </div>
          </div>
        </div>

        <div className="border-t pt-6 flex justify-end gap-4">
          <button type="button" className="px-6 py-2 border rounded-lg text-gray-600">
            Cancel
          </button>
          <button type="button" className="px-6 py-2 bg-rose-600 text-white rounded-lg">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Admin Login ---

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');

  const handlePin = (num: string) => {
    if (pin.length < 4) setPin((prev) => prev + num);
  };

  useEffect(() => {
    if (pin === '1234') {
      navigate('/admin/dashboard');
    }
  }, [pin, navigate]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm text-center shadow-2xl">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Management Portal</h2>
        <p className="text-gray-500 mb-8">Enter your 4-digit PIN to access</p>

        <div className="flex justify-center gap-4 mb-8">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full ${
                pin.length > i ? 'bg-rose-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => handlePin(n.toString())}
              className="h-14 rounded-lg bg-gray-50 hover:bg-gray-100 font-bold text-xl transition"
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPin('')}
            className="h-14 text-gray-500 font-medium"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => handlePin('0')}
            className="h-14 rounded-lg bg-gray-50 hover:bg-gray-100 font-bold text-xl transition"
          >
            0
          </button>
          <button
            type="button"
            onClick={() => setPin((prev) => prev.slice(0, -1))}
            className="h-14 text-gray-500 font-medium"
          >
            Del
          </button>
        </div>

        <p className="text-xs text-gray-400">Default PIN: 1234</p>
      </div>
    </div>
  );
};


