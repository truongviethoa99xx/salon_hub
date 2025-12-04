import { Service, ServiceCategory, Staff, Branch, Product } from './types';

export const BRANCHES: Branch[] = [
  { id: 'b1', name: 'Luxe Central', address: '123 Fashion Ave, Dist 1' },
  { id: 'b2', name: 'Luxe Riverside', address: '45 River Rd, Dist 2' },
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: 'Signature Layer Cut',
    category: ServiceCategory.HAIR_CUT,
    price: 35,
    durationMinutes: 45,
    image: 'https://picsum.photos/400/300?random=1',
    description: 'Precision cut tailored to your face shape with our signature layering technique.',
  },
  {
    id: 's2',
    name: 'Balayage & Tone',
    category: ServiceCategory.COLOR,
    price: 150,
    durationMinutes: 180,
    image: 'https://picsum.photos/400/300?random=2',
    description: 'Hand-painted highlights for a natural, sun-kissed look.',
  },
  {
    id: 's3',
    name: 'Deep Tissue Massage',
    category: ServiceCategory.SPA,
    price: 80,
    durationMinutes: 60,
    image: 'https://picsum.photos/400/300?random=3',
    description: 'Relieves severe tension in the muscle and the connective tissue.',
  },
  {
    id: 's4',
    name: 'Gel Manicure',
    category: ServiceCategory.NAILS,
    price: 40,
    durationMinutes: 45,
    image: 'https://picsum.photos/400/300?random=4',
  },
  {
    id: 's5',
    name: 'Keratin Treatment',
    category: ServiceCategory.TREATMENT,
    price: 200,
    durationMinutes: 120,
    image: 'https://picsum.photos/400/300?random=5',
  },
];

export const STAFF: Staff[] = [
  {
    id: 'st1',
    name: 'Sarah Jenkins',
    role: 'Master Stylist',
    avatar: 'https://picsum.photos/100/100?random=10',
    rating: 4.9,
    specialties: [ServiceCategory.HAIR_CUT, ServiceCategory.COLOR],
  },
  {
    id: 'st2',
    name: 'Michael Chen',
    role: 'Senior Stylist',
    avatar: 'https://picsum.photos/100/100?random=11',
    rating: 4.7,
    specialties: [ServiceCategory.HAIR_CUT, ServiceCategory.TREATMENT],
  },
  {
    id: 'st3',
    name: 'Elena Rodriguez',
    role: 'Technician',
    avatar: 'https://picsum.photos/100/100?random=12',
    rating: 4.8,
    specialties: [ServiceCategory.SPA, ServiceCategory.NAILS],
  },
];

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Luxe Argan Oil', sku: 'LAO-001', price: 25, stock: 45, category: 'Hair Care' },
  { id: 'p2', name: 'Color Protect Shampoo', sku: 'CPS-002', price: 18, stock: 12, category: 'Hair Care' },
  { id: 'p3', name: 'Matte Clay Wax', sku: 'MCW-003', price: 22, stock: 30, category: 'Styling' },
];


