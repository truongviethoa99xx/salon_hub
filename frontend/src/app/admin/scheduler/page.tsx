// apps/web/src/app/admin/scheduler/page.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { getSchedulerEvents, getStylists } from '../../../services/api';

// Map stylists to FullCalendar resources
const mapStylistsToResources = (stylists) => {
    return stylists.map(stylist => ({
        id: stylist.id,
        title: stylist.full_name,
    }));
};

export default function SchedulerPage() {
    const [events, setEvents] = useState([]);
    const [resources, setResources] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dateString = currentDate.toISOString().split('T')[0];
                const [eventsData, stylistsData] = await Promise.all([
                    getSchedulerEvents(dateString),
                    getStylists(),
                ]);
                setEvents(eventsData);
                setResources(mapStylistsToResources(stylistsData));
            } catch (error) {
                console.error("Failed to fetch scheduler data:", error);
            }
        };

        fetchData();
    }, [currentDate]);

    const { t } = useTranslation();
    
    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <div className="relative">
                <h1 className="text-6xl font-black text-black mb-3 tracking-tighter gradient-text">{t('scheduler.title')}</h1>
                <p className="text-lg text-gray-500 font-medium">{t('scheduler.subtitle')}</p>
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-black/5 rounded-full blur-3xl -z-10 animate-pulse-slow" />
            </div>
            <div className="relative bg-white rounded-3xl border border-black/10 p-8 shadow-sm premium-card overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-black/5 to-transparent rounded-full blur-3xl -z-10" />
                
                <div className="h-[calc(100vh-300px)] min-h-[600px]">
                    <FullCalendar
                        plugins={[resourceTimelinePlugin]}
                        initialView="resourceTimelineDay"
                        schedulerLicenseKey="GPL-TO-REMOVE-THE-WARNING"
                        resources={resources}
                        events={events}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'resourceTimelineDay,resourceTimelineWeek',
                        }}
                        resourceAreaHeaderContent={t('scheduler.stylistColumn')}
                        height="100%"
                    />
                </div>
            </div>
        </div>
    );
}
