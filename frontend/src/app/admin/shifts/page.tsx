// apps/web/src/app/admin/shifts/page.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getStylists, getBranches, createShift } from '../../../services/api';
import { cn } from '../../../lib/utils';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../../components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';

interface Stylist {
    id: string;
    full_name: string;
}

interface Branch {
    id: string;
    name: string;
}

const ShiftForm = ({ stylists, branches, onSave, closeDialog }) => {
    const { t } = useTranslation();
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

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="stylistId" className="text-sm font-bold uppercase tracking-wider text-gray-700">{t('shifts.stylist')}</Label>
                    <select 
                        id="stylistId" 
                        name="stylistId" 
                        value={formData.stylistId} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border-2 border-black/10 rounded-xl focus:border-black transition-all text-base font-semibold bg-white"
                    >
                        {stylists.map(s => <option key={s.id} value={s.id}>{s.full_name}</option>)}
                    </select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="branchId" className="text-sm font-bold uppercase tracking-wider text-gray-700">{t('shifts.branch')}</Label>
                    <select 
                        id="branchId" 
                        name="branchId" 
                        value={formData.branchId} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border-2 border-black/10 rounded-xl focus:border-black transition-all text-base font-semibold bg-white"
                    >
                        {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="shiftDate" className="text-sm font-bold uppercase tracking-wider text-gray-700">{t('shifts.date')}</Label>
                <Input 
                    id="shiftDate" 
                    name="shiftDate" 
                    type="date" 
                    value={formData.shiftDate} 
                    onChange={handleChange} 
                    required 
                    className="border-2 border-black/10 focus:border-black rounded-xl py-6 text-base font-semibold"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="startTime" className="text-sm font-bold uppercase tracking-wider text-gray-700">{t('shifts.startTime')}</Label>
                    <Input 
                        id="startTime" 
                        name="startTime" 
                        type="time" 
                        value={formData.startTime} 
                        onChange={handleChange} 
                        required 
                        className="border-2 border-black/10 focus:border-black rounded-xl py-6 text-base font-semibold"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="endTime" className="text-sm font-bold uppercase tracking-wider text-gray-700">{t('shifts.endTime')}</Label>
                    <Input 
                        id="endTime" 
                        name="endTime" 
                        type="time" 
                        value={formData.endTime} 
                        onChange={handleChange} 
                        required 
                        className="border-2 border-black/10 focus:border-black rounded-xl py-6 text-base font-semibold"
                    />
                </div>
            </div>
            <DialogFooter>
                <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-black to-gray-900 text-white hover:shadow-xl hover:scale-105 transition-all duration-300 px-8 py-6 text-base font-bold rounded-xl w-full"
                >
                    {t('shifts.saveShift')}
                </Button>
            </DialogFooter>
        </form>
    );
};

export default function ShiftManagementPage() {
    const { t } = useTranslation();
    const [stylists, setStylists] = useState<Stylist[]>([]);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [stylistsData, branchesData] = await Promise.all([getStylists(), getBranches()]);
                setStylists(stylistsData);
                setBranches(branchesData);
            } catch (error) {
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
        } catch (error) {
            console.error('Failed to create shift:', error);
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <header className="flex justify-between items-start">
                <div className="relative">
                    <h1 className="text-6xl font-black text-black mb-3 tracking-tighter gradient-text">{t('shifts.title')}</h1>
                    <p className="text-lg text-gray-500 font-medium">{t('shifts.subtitle')}</p>
                    <div className="absolute -top-4 -left-4 w-20 h-20 bg-black/5 rounded-full blur-3xl -z-10 animate-pulse-slow" />
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-black to-gray-900 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 px-6 py-6 text-base font-bold rounded-2xl">
                            + {t('shifts.addShift')}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-black tracking-tight">{t('shifts.newShift')}</DialogTitle>
                        </DialogHeader>
                        <ShiftForm 
                            stylists={stylists} 
                            branches={branches} 
                            onSave={handleSaveShift} 
                            closeDialog={() => setIsDialogOpen(false)} 
                        />
                    </DialogContent>
                </Dialog>
            </header>

            <div className="relative bg-white rounded-3xl border border-black/10 overflow-hidden shadow-sm premium-card">
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-black/5 to-transparent rounded-full blur-3xl -z-10" />
                
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gradient-to-r from-black to-gray-900 hover:from-gray-900 hover:to-black transition-all duration-300">
                            <TableHead className="text-white font-black text-sm uppercase tracking-wider py-5">{t('shifts.stylistName')}</TableHead>
                            <TableHead className="text-white font-black text-sm uppercase tracking-wider">{t('shifts.branch')}</TableHead>
                            <TableHead className="text-white font-black text-sm uppercase tracking-wider">{t('shifts.date')}</TableHead>
                            <TableHead className="text-white font-black text-sm uppercase tracking-wider">{t('shifts.workingHours')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {stylists.map((stylist, index) => (
                            <TableRow 
                                key={stylist.id}
                                className={cn(
                                    "group transition-all duration-200",
                                    index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50/50 hover:bg-gray-100"
                                )}
                            >
                                <TableCell className="font-bold text-black text-base py-5">{stylist.full_name}</TableCell>
                                <TableCell className="text-gray-600 font-medium">-</TableCell>
                                <TableCell className="text-gray-600 font-medium">-</TableCell>
                                <TableCell className="text-gray-600 font-medium">-</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
