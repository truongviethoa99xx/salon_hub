import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// apps/web/src/app/admin/scheduler/page.tsx
import { useState, useEffect } from 'react';
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
            }
            catch (error) {
                console.error("Failed to fetch scheduler data:", error);
            }
        };
        fetchData();
    }, [currentDate]);
    return (_jsxs("div", { className: "p-4 h-full", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "L\u1ECBch T\u1ED5ng" }), _jsx("div", { className: "h-[80vh]", children: _jsx(FullCalendar, { plugins: [resourceTimelinePlugin], initialView: "resourceTimelineDay", schedulerLicenseKey: "GPL-TO-REMOVE-THE-WARNING" // Replace with a real key in production
                    , resources: resources, events: events, headerToolbar: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'resourceTimelineDay,resourceTimelineWeek',
                    }, resourceAreaHeaderContent: "Th\u1EE3 c\u1EAFt", height: "100%" }) })] }));
}
