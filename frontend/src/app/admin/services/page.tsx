// apps/web/src/app/admin/services/page.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getServices, createService, updateService, removeService } from '../../../services/api';
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

// Represents a service object fetched from the backend
interface Service {
    id: string;
    name: string;
    price: number;
    duration_minutes: number;
    is_combo: boolean;
}

const ServiceForm = ({ service, onSave, closeDialog }) => {
    const { t } = useTranslation();
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

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-gray-700">{t('services.serviceName')}</Label>
                <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    className="border-2 border-black/10 focus:border-black rounded-xl py-6 text-base font-semibold"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="price" className="text-sm font-bold uppercase tracking-wider text-gray-700">{t('services.servicePrice')}</Label>
                    <Input 
                        id="price" 
                        name="price" 
                        type="number" 
                        value={formData.price} 
                        onChange={handleChange} 
                        required 
                        className="border-2 border-black/10 focus:border-black rounded-xl py-6 text-base font-semibold"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="duration_minutes" className="text-sm font-bold uppercase tracking-wider text-gray-700">{t('services.serviceDuration')}</Label>
                    <Input 
                        id="duration_minutes" 
                        name="duration_minutes" 
                        type="number" 
                        value={formData.duration_minutes} 
                        onChange={handleChange} 
                        required 
                        className="border-2 border-black/10 focus:border-black rounded-xl py-6 text-base font-semibold"
                    />
                </div>
            </div>
            <div className="flex items-center space-x-3 p-4 rounded-xl bg-gray-50 border border-black/10">
                <Input 
                    id="is_combo" 
                    name="is_combo" 
                    type="checkbox" 
                    checked={formData.is_combo} 
                    onChange={handleChange} 
                    className="w-5 h-5 rounded-md border-2 border-black/20"
                />
                <Label htmlFor="is_combo" className="text-sm font-bold text-black cursor-pointer">{t('services.isCombo')}</Label>
            </div>
            <DialogFooter>
                <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-black to-gray-900 text-white hover:shadow-xl hover:scale-105 transition-all duration-300 px-8 py-6 text-base font-bold rounded-xl w-full"
                >
                    {t('common.save')}
                </Button>
            </DialogFooter>
        </form>
    );
};

export default function ServiceManagementPage() {
    const { t } = useTranslation();
    const [services, setServices] = useState<Service[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);

    const fetchServices = async () => {
        try {
            const data = await getServices();
            setServices(data);
        } catch (error) {
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
            } else {
                await createService(serviceData);
            }
            fetchServices(); // Refresh table
        } catch (error) {
            console.error('Failed to save service:', error);
        }
    };

    const handleDelete = async (serviceId: string) => {
        if (window.confirm(t('services.deleteConfirm'))) {
            try {
                await removeService(serviceId);
                fetchServices(); // Refresh table
            } catch (error) {
                console.error('Failed to delete service:', error);
            }
        }
    };
    
    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <header className="flex justify-between items-start">
                <div className="relative">
                    <h1 className="text-6xl font-black text-black mb-3 tracking-tighter gradient-text">{t('services.title')}</h1>
                    <p className="text-lg text-gray-500 font-medium">{t('services.subtitle')}</p>
                    <div className="absolute -top-4 -left-4 w-20 h-20 bg-black/5 rounded-full blur-3xl -z-10 animate-pulse-slow" />
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button 
                            onClick={() => setEditingService(null)}
                            className="bg-gradient-to-r from-black to-gray-900 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 px-6 py-6 text-base font-bold rounded-2xl"
                        >
                            + {t('services.addService')}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-black tracking-tight">
                                {editingService ? t('services.editService') : t('services.addService')}
                            </DialogTitle>
                        </DialogHeader>
                        <ServiceForm service={editingService} onSave={handleSave} closeDialog={() => setIsDialogOpen(false)} />
                    </DialogContent>
                </Dialog>
            </header>

            <div className="relative bg-white rounded-3xl border border-black/10 overflow-hidden shadow-sm premium-card">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-black/5 to-transparent rounded-full blur-3xl -z-10" />
                
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gradient-to-r from-black to-gray-900 hover:from-gray-900 hover:to-black transition-all duration-300">
                            <TableHead className="text-white font-black text-sm uppercase tracking-wider py-5">{t('services.serviceName')}</TableHead>
                            <TableHead className="text-white font-black text-sm uppercase tracking-wider">{t('services.servicePrice')}</TableHead>
                            <TableHead className="text-white font-black text-sm uppercase tracking-wider">{t('common.time')}</TableHead>
                            <TableHead className="text-white font-black text-sm uppercase tracking-wider">{t('services.isCombo')}</TableHead>
                            <TableHead className="text-white font-black text-sm uppercase tracking-wider text-right">{t('common.actions')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services.map((service, index) => (
                            <TableRow 
                                key={service.id}
                                className={cn(
                                    "group transition-all duration-200",
                                    index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50/50 hover:bg-gray-100"
                                )}
                            >
                                <TableCell className="font-bold text-black text-base py-5">{service.name}</TableCell>
                                <TableCell className="text-black font-semibold text-base">{service.price.toLocaleString()} {t('common.currency')}</TableCell>
                                <TableCell className="text-gray-600 font-medium">{service.duration_minutes} {t('common.minutes')}</TableCell>
                                <TableCell>
                                    <span className={cn(
                                        "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm",
                                        service.is_combo 
                                            ? 'bg-gradient-to-r from-black to-gray-900 text-white' 
                                            : 'bg-gray-100 text-black border border-black/10'
                                    )}>
                                        {service.is_combo ? t('services.combo') : t('services.single')}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => { setEditingService(service); setIsDialogOpen(true); }}
                                        className="border-black/20 hover:bg-black hover:text-white hover:border-black transition-all duration-300 font-bold"
                                    >
                                        {t('common.edit')}
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => handleDelete(service.id)}
                                        className="border-red-200 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 font-bold"
                                    >
                                        {t('common.delete')}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
