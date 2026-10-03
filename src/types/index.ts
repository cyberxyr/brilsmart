export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  description: string;
  image: string;
  price: number;
  previousPrice?: number;
  discount?: number;
  inStock: boolean;
  stockCount: number;
  weight: string;
  isFeatured?: boolean;
  isOnSale?: boolean;
  rating: number;
  reviewsCount: number;
  ingredients?: string;
  sku: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderCustomer {
  fullName: string;
  phone: string;
  email: string;
}

export interface DeliveryAddress {
  address: string;
  city: string;
  state: string;
  landmark?: string;
  instructions?: string;
}

export type OrderMethod = 'delivery' | 'pickup';
export type PaymentMethod = 'cash' | 'transfer' | 'card' | 'whatsapp';

export interface Order {
  id: string;
  date: string;
  method: OrderMethod;
  customer: OrderCustomer;
  address?: DeliveryAddress;
  pickupLocation?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: 'confirmed' | 'packing' | 'out_for_delivery' | 'delivered';
}

export interface StoreReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  location?: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  weekdayHours: string;
  sundayHours: string;
  freeDeliveryThreshold: number;
  standardDeliveryFee: number;
  adminPasscode?: string;
}