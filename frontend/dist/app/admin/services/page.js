import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// apps/web/src/app/admin/services/page.tsx
import { useState, useEffect } from 'react';
import { getServices, createService, updateService, removeService } from '../../../services/api';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, } from '../../../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, } from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
const ServiceForm = ({ service, onSave, closeDialog }) => {
    const [formData, setFormData] = useState({
        name: service?.name || '',
        price: service?.price || 0,
        duration_minutes: service?.duration_minutes || 30,
        is_combo: service?.is_combo || false,
    });
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave(formData);
        closeDialog();
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "name", children: "T\u00EAn d\u1ECBch v\u1EE5" }), _jsx(Input, { id: "name", name: "name", value: formData.name, onChange: handleChange, required: true })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "price", children: "Gi\u00E1" }), _jsx(Input, { id: "price", name: "price", type: "number", value: formData.price, onChange: handleChange, required: true })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "duration_minutes", children: "Th\u1EDDi gian (ph\u00FAt)" }), _jsx(Input, { id: "duration_minutes", name: "duration_minutes", type: "number", value: formData.duration_minutes, onChange: handleChange, required: true })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Input, { id: "is_combo", name: "is_combo", type: "checkbox", checked: formData.is_combo, onChange: handleChange }), _jsx(Label, { htmlFor: "is_combo", children: "L\u00E0 Combo?" })] }), _jsx(DialogFooter, { children: _jsx(Button, { type: "submit", children: "L\u01B0u" }) })] }));
};
export default function ServiceManagementPage() {
    const [services, setServices] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const fetchServices = async () => {
        try {
            const data = await getServices();
            setServices(data);
        }
        catch (error) {
            console.error('Failed to fetch services:', error);
        }
    };
    useEffect(() => {
        fetchServices();
    }, []);
    const handleSave = async (serviceData) => {
        try {
            if (editingService) {
                await updateService(editingService.id, serviceData);
            }
            else {
                await createService(serviceData);
            }
            fetchServices(); // Refresh table
        }
        catch (error) {
            console.error('Failed to save service:', error);
        }
    };
    const handleDelete = async (serviceId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa dịch vụ này?')) {
            try {
                await removeService(serviceId);
                fetchServices(); // Refresh table
            }
            catch (error) {
                console.error('Failed to delete service:', error);
            }
        }
    };
    return (_jsxs("div", { className: "p-4", children: [_jsxs("header", { className: "flex justify-between items-center mb-4", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Qu\u1EA3n l\u00FD D\u1ECBch v\u1EE5" }), _jsxs(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { onClick: () => setEditingService(null), children: "Th\u00EAm D\u1ECBch v\u1EE5" }) }), _jsxs(DialogContent, { children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: editingService ? 'Sửa Dịch vụ' : 'Thêm Dịch vụ' }) }), _jsx(ServiceForm, { service: editingService, onSave: handleSave, closeDialog: () => setIsDialogOpen(false) })] })] })] }), _jsx("div", { className: "rounded-lg border", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "T\u00EAn D\u1ECBch v\u1EE5" }), _jsx(TableHead, { children: "Gi\u00E1" }), _jsx(TableHead, { children: "Th\u1EDDi gian" }), _jsx(TableHead, { children: "L\u00E0 Combo" }), _jsx(TableHead, { children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsx(TableBody, { children: services.map(service => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: service.name }), _jsxs(TableCell, { children: [service.price.toLocaleString(), " VN\u0110"] }), _jsxs(TableCell, { children: [service.duration_minutes, " ph\u00FAt"] }), _jsx(TableCell, { children: service.is_combo ? 'Có' : 'Không' }), _jsxs(TableCell, { className: "space-x-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => { setEditingService(service); setIsDialogOpen(true); }, children: "S\u1EEDa" }), _jsx(Button, { variant: "destructive", size: "sm", onClick: () => handleDelete(service.id), children: "X\u00F3a" })] })] }, service.id))) })] }) })] }));
}
