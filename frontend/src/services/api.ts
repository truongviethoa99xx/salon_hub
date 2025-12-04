// apps/web/src/services/api.ts
const API_BASE_URL = 'http://localhost:3000/api';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

// --- Master Data ---
export const getBranches = () => fetch(`${API_BASE_URL}/master-data/branches`).then(handleResponse);
export const getServices = () => fetch(`${API_BASE_URL}/master-data/services`).then(handleResponse);
export const getStylists = () => fetch(`${API_BASE_URL}/master-data/stylists`).then(handleResponse);

export const createService = (serviceData: any) => {
    return fetch(`${API_BASE_URL}/master-data/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData),
    }).then(handleResponse);
};

export const updateService = (id: string, serviceData: any) => {
    return fetch(`${API_BASE_URL}/master-data/services/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData),
    }).then(handleResponse);
};

export const removeService = (id: string) => {
    return fetch(`${API_BASE_URL}/master-data/services/${id}`, {
        method: 'DELETE',
    }).then(res => { // DELETE might not return a body, so handle differently
        if (!res.ok) {
            return res.json().then(error => {
                throw new Error(error.message || 'Something went wrong');
            });
        }
        return; // No content on successful delete
    });
};

// --- Booking ---
export const checkAvailability = (params: { branchId: string; date: string; serviceId: string }) => {
  const query = new URLSearchParams(params).toString();
  return fetch(`${API_BASE_URL}/booking/availability?${query}`).then(handleResponse);
};

export const createBooking = (bookingData: any) => {
  return fetch(`${API_BASE_URL}/booking`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData),
  }).then(handleResponse);
};

export const getSchedulerEvents = (date: string, branchId?: string) => {
    const params = new URLSearchParams({ date });
    if (branchId) {
        params.append('branchId', branchId);
    }
    return fetch(`${API_BASE_URL}/booking/scheduler?${params.toString()}`).then(handleResponse);
};

// --- Queue ---
export const getQueueState = (branchId: string) => {
    return fetch(`${API_BASE_URL}/queue?branchId=${branchId}`).then(handleResponse);
};

export const updateQueueItemStatus = (itemId: string, status: string, staffId: string) => {
    return fetch(`${API_BASE_URL}/queue/${itemId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, staffId }),
    }).then(handleResponse);
};

export const joinQueue = (bookingId: string) => {
    return fetch(`${API_BASE_URL}/queue/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId }),
    }).then(handleResponse);
}

// --- Shift ---
export const createShift = (shiftData: any) => {
    return fetch(`${API_BASE_URL}/shifts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(shiftData),
    }).then(handleResponse);
};
