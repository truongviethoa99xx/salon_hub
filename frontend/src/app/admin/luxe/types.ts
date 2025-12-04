export enum ServiceCategory {
  HAIR_CUT = 'Hair Cut',
  COLOR = 'Coloring',
  SPA = 'Spa & Massage',
  NAILS = 'Nails',
  TREATMENT = 'Treatment',
}

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  durationMinutes: number;
  image: string;
  description?: string;
}

export interface Staff {
  id: string;
  name: string;
  role: 'Master Stylist' | 'Senior Stylist' | 'Junior' | 'Technician';
  avatar: string;
  rating: number;
  specialties: ServiceCategory[];
}

export interface Branch {
  id: string;
  name: string;
  address: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
}


