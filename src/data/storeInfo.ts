import { StoreSettings, Category, StoreReview } from '../types';

export const initialStoreSettings: StoreSettings = {
  storeName: "Bril's Mart",
  tagline: "Your Everyday Essentials, All in One Place.",
  phone: "+234 800 123 4567",
  whatsapp: "+2348001234567",
  email: "hello@brilsmart.ng",
  address: "122 Supermart Road, Off Admiralty Way, Lekki Phase 1, Lagos, Nigeria",
  weekdayHours: "Mon - Sat: 7:00 AM – 9:00 PM",
  sundayHours: "Sunday: 8:00 AM – 6:00 PM",
  freeDeliveryThreshold: 15000,
  standardDeliveryFee: 1000,
};

export const categories: Category[] = [
  {
    id: 'groceries',
    name: 'Groceries',
    icon: '🥫',
    count: 24,
    description: 'Rice, pasta, grains, seasonings and cooking oils',
  },
  {
    id: 'snacks-drinks',
    name: 'Snacks & Drinks',
    icon: '🥤',
    count: 18,
    description: 'Crisps, chocolates, juices, soft drinks and water',
  },
  {
    id: 'bread-bakery',
    name: 'Bread & Bakery',
    icon: '🍞',
    count: 12,
    description: 'Freshly baked bread, rolls, cakes and pastries',
  },
  {
    id: 'baby-care',
    name: 'Baby Care',
    icon: '🍼',
    count: 15,
    description: 'Diapers, wipes, baby food and gentle toiletries',
  },
  {
    id: 'toiletries',
    name: 'Toiletries',
    icon: '🧴',
    count: 20,
    description: 'Bath soaps, toothpaste, shampoos and personal care',
  },
  {
    id: 'household',
    name: 'Household',
    icon: '🧻',
    count: 16,
    description: 'Tissue papers, kitchen towels, foil and storage',
  },
  {
    id: 'tea-coffee-milk',
    name: 'Tea, Coffee & Milk',
    icon: '☕',
    count: 14,
    description: 'Rich milk powders, tea bags, cocoa and instant coffee',
  },
  {
    id: 'cleaning-supplies',
    name: 'Cleaning Supplies',
    icon: '🧹',
    count: 16,
    description: 'Detergents, disinfectants, bleaches and dishwashing liquid',
  },
  {
    id: 'frozen-foods',
    name: 'Frozen Foods',
    icon: '❄️',
    count: 10,
    description: 'Frozen poultry, fish, sausages and mixed vegetables',
  },
];

export const customerReviews: StoreReview[] = [
  {
    id: 'rev-1',
    author: 'Chioma A.',
    rating: 5,
    comment: "Bril's Mart makes shopping so easy! I always find everything I need at great prices. Their customer care on WhatsApp is super fast.",
    date: 'August 2026',
    location: 'Lekki Phase 1',
  },
  {
    id: 'rev-2',
    author: 'Tunde O.',
    rating: 5,
    comment: 'Fast delivery and amazing customer service. Highly recommend! My groceries arrived neatly packed within 45 minutes.',
    date: 'August 2026',
    location: 'Victoria Island',
  },
  {
    id: 'rev-3',
    author: 'Mary J.',
    rating: 5,
    comment: 'My go-to supermarket for groceries and household essentials. Authentic brands, fair prices, and very friendly staff.',
    date: 'July 2026',
    location: 'Ikoyi',
  },
  {
    id: 'rev-4',
    author: 'Emeka N.',
    rating: 5,
    comment: 'The online store is so smooth and clean. Placing orders on my phone takes less than two minutes. The WhatsApp update keeps you informed.',
    date: 'July 2026',
    location: 'Oniru',
  },
];

export const faqs = [
  {
    q: 'How fast is home delivery?',
    a: 'Standard orders within our primary coverage area are delivered within 1 to 3 hours. Same-day express delivery is available for orders placed before 5:00 PM.',
  },
  {
    q: 'Can I pick up my order at the physical supermarket?',
    a: 'Yes! Select "Store Pickup" at checkout. We will pack your order within 30 minutes and hold it at customer service for quick collection.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept Cash on Delivery / Pay on Pickup, Instant Bank Transfer (GTBank & Zenith), Debit/Credit Cards (Verve, Mastercard, Visa), and direct WhatsApp confirmation.',
  },
  {
    q: 'Is there a minimum order amount for free delivery?',
    a: 'Yes, all orders of ₦15,000 and above qualify for 100% Free Home Delivery!',
  },
  {
    q: 'How do I order or make inquiries through WhatsApp?',
    a: 'Click the green WhatsApp button located in the header or bottom corner. You can send your grocery list directly or inquire about any product price and availability.',
  },
];