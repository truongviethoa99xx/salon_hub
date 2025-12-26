
import { Branch, Service, Stylist, Product, Review } from './types';

export const BRANCHES: Branch[] = [
  {
    id: 'b1',
    name: 'Smart Salon Quận 1',
    address: '123 Nguyễn Huệ, Q.1, TP.HCM',
    distance: '500m',
    queueStatus: { busyLevel: 'Medium', chairsAvailable: 2, bedsWaiting: 1 }
  },
  {
    id: 'b2',
    name: 'Smart Salon Phú Nhuận',
    address: '45 Phan Xích Long, Q.PN, TP.HCM',
    distance: '2.5km',
    queueStatus: { busyLevel: 'High', chairsAvailable: 0, bedsWaiting: 3 }
  },
];

export const SERVICES: Service[] = [
  { id: 's1', name: 'Combo Đế Vương (Cắt + Gội)', price: 150000, originalPrice: 200000, category: 'cut', duration: '45m' },
  { id: 's2', name: 'Cắt Tóc Stylist', price: 80000, category: 'cut', duration: '30m' },
  { id: 's3', name: 'Gội Đầu Dưỡng Sinh', price: 60000, category: 'spa', duration: '30m' },
  { id: 's4', name: 'Uốn Layer Sâu', price: 350000, originalPrice: 450000, category: 'chemical', duration: '90m', image: 'https://picsum.photos/200/200?random=1' },
  { id: 's5', name: 'Nhuộm Khói Sáng', price: 400000, category: 'chemical', duration: '120m', image: 'https://picsum.photos/200/200?random=2' },
];

export const STYLISTS: Stylist[] = [
  { id: 'st1', name: 'Tony Việt', level: 'Master', rating: 4.9, reviewCount: 128, specialty: 'Chuyên Mullet', isBusy: false, avatar: 'https://picsum.photos/100/100?random=10' },
  { id: 'st2', name: 'Kevin Tuấn', level: 'Senior', rating: 4.8, reviewCount: 85, specialty: 'Chuyên Undercut', isBusy: true, avatar: 'https://picsum.photos/100/100?random=11' },
  { id: 'st3', name: 'Hải Barber', level: 'Director', rating: 5.0, reviewCount: 312, specialty: 'Chuyên Side Part', isBusy: false, avatar: 'https://picsum.photos/100/100?random=12' },
];

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Sáp Volcanic Clay', price: 240000, image: 'https://picsum.photos/150/150?random=20' },
  { id: 'p2', name: 'Gôm Butterfly Shadow', price: 120000, image: 'https://picsum.photos/150/150?random=21' },
];

export const REVIEWS: Review[] = [
  { id: 'r1', user: 'Minh Quân', comment: 'Cắt đẹp, thợ nhiệt tình, đặt lịch qua web siêu nhanh không phải chờ.', rating: 5, platform: 'Google', date: '2024-05-10', status: 'approved' },
  { id: 'r2', user: 'Tuấn Hưng', comment: 'Combo đế vương gội bao phê. 10 điểm.', rating: 5, platform: 'Facebook', date: '2024-05-11', status: 'approved' },
];
