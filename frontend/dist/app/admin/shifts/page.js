import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// apps/web/src/app/admin/shifts/page.tsx
import { useState, useEffect } from 'react';
import { getStylists, getBranches, createShift } from '../../../services/api';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, } from '../../../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, } from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
const ShiftForm = ({ stylists, branches, onSave, closeDialog }) => {
    const [formData, setFormData] = useState({
        stylistId: stylists[0]?.id || '',
        branchId: branches[0]?.id || '',
        shiftDate: new Date().toISOString().split('T')[0],
        startTime: '09:00',
        endTime: '17:00',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave(formData);
        closeDialog();
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "stylistId", children: "Th\u1EE3" }), _jsx("select", { id: "stylistId", name: "stylistId", value: formData.stylistId, onChange: handleChange, className: "w-full p-2 border rounded-md", children: stylists.map(s => _jsx("option", { value: s.id, children: s.full_name }, s.id)) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "branchId", children: "Chi nh\u00E1nh" }), _jsx("select", { id: "branchId", name: "branchId", value: formData.branchId, onChange: handleChange, className: "w-full p-2 border rounded-md", children: branches.map(b => _jsx("option", { value: b.id, children: b.name }, b.id)) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "shiftDate", children: "Ng\u00E0y" }), _jsx(Input, { id: "shiftDate", name: "shiftDate", type: "date", value: formData.shiftDate, onChange: handleChange, required: true })] }), _jsxs("div", { className: "flex gap-4", children: [_jsxs("div", { className: "flex-1", children: [_jsx(Label, { htmlFor: "startTime", children: "Gi\u1EDD b\u1EAFt \u0111\u1EA7u" }), _jsx(Input, { id: "startTime", name: "startTime", type: "time", value: formData.startTime, onChange: handleChange, required: true })] }), _jsxs("div", { className: "flex-1", children: [_jsx(Label, { htmlFor: "endTime", children: "Gi\u1EDD k\u1EBFt th\u00FAc" }), _jsx(Input, { id: "endTime", name: "endTime", type: "time", value: formData.endTime, onChange: handleChange, required: true })] })] }), _jsx(DialogFooter, { children: _jsx(Button, { type: "submit", children: "L\u01B0u ca l\u00E0m vi\u1EC7c" }) })] }));
};
export default function ShiftManagementPage() {
    const [stylists, setStylists] = useState([]);
    const [branches, setBranches] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [stylistsData, branchesData] = await Promise.all([getStylists(), getBranches()]);
                setStylists(stylistsData);
                setBranches(branchesData);
            }
            catch (error) {
                console.error('Failed to fetch master data:', error);
            }
        };
        fetchData();
    }, []);
    const handleSaveShift = async (shiftData) => {
        try {
            await createShift(shiftData);
            // Here you would typically refresh a list of shifts, but for now we just close the modal
            console.log('Shift created successfully');
        }
        catch (error) {
            console.error('Failed to create shift:', error);
        }
    };
    return (_jsxs("div", { className: "p-4", children: [_jsxs("header", { className: "flex justify-between items-center mb-4", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Qu\u1EA3n l\u00FD Ca l\u00E0m vi\u1EC7c" }), _jsxs(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { children: "X\u1EBFp l\u1ECBch" }) }), _jsxs(DialogContent, { children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "X\u1EBFp l\u1ECBch l\u00E0m vi\u1EC7c m\u1EDBi" }) }), _jsx(ShiftForm, { stylists: stylists, branches: branches, onSave: handleSaveShift, closeDialog: () => setIsDialogOpen(false) })] })] })] }), _jsx("div", { className: "rounded-lg border", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsx(TableRow, { children: _jsx(TableHead, { children: "T\u00EAn Th\u1EE3" }) }) }), _jsx(TableBody, { children: stylists.map(stylist => (_jsx(TableRow, { children: _jsx(TableCell, { children: stylist.full_name }) }, stylist.id))) })] }) })] }));
}
