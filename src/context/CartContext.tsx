import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order } from '../types';
import { useStore } from './StoreContext';

interface CartContextType {
  items: CartItem[];
  itemsCount: number;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  couponCode: string;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  lastOrder: Order | null;
  setLastOrder: (order: Order | null) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  deleteOrder: (orderId: string) => void;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  generateWhatsAppOrderMessage: (order: Order) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = 'brils_mart_cart_v1';
const ORDER_STORAGE_KEY = 'brils_mart_last_order_v1';
const ALL_ORDERS_STORAGE_KEY = 'brils_mart_all_orders_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { storeSettings, showToast } = useStore();

  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error reading cart from localStorage', e);
    }
    return [
      {
        product: {
          id: 'prod-2',
          name: 'Milo Chocolate Malt Food Drink',
          category: 'tea-coffee-milk',
          brand: 'Nestlé',
          description: 'Nutritious malt drink for everyday energy.',
          image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80',
          price: 2150,
          previousPrice: 2500,
          discount: 14,
          inStock: true,
          stockCount: 65,
          weight: '400g Refill',
          rating: 4.8,
          reviewsCount: 92,
          sku: 'MIL-MAL-400G',
        },
        quantity: 1,
      },
      {
        product: {
          id: 'prod-1',
          name: 'Indomie Instant Noodles Chicken Flavor',
          category: 'groceries',
          brand: 'Indomie',
          description: 'Nigeria’s favourite instant noodles.',
          image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=600&auto=format&fit=crop&q=80',
          price: 120,
          previousPrice: 130,
          discount: 8,
          inStock: true,
          stockCount: 150,
          weight: '70g',
          rating: 4.9,
          reviewsCount: 184,
          sku: 'IND-CHK-70G',
        },
        quantity: 3,
      },
    ];
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscountRate, setCouponDiscountRate] = useState(0);

  const [lastOrder, setLastOrder] = useState<Order | null>(() => {
    try {
      const saved = localStorage.getItem(ORDER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error reading last order', e);
    }
    return null;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ALL_ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error reading orders history', e);
    }
    // Seed initial demo orders for the admin dashboard
    return [
      {
        id: 'BRL-24891',
        date: '10 Sep 2026, 14:20',
        method: 'delivery',
        customer: {
          fullName: 'Chioma Adebayo',
          phone: '0803 123 4567',
          email: 'chioma.a@example.com',
        },
        address: {
          address: 'Block 4, Flat 2, Admiralty Court',
          city: 'Lekki Phase 1',
          state: 'Lagos',
          landmark: 'Opposite Ebeano',
        },
        items: [
          {
            product: {
              id: 'prod-4',
              name: 'Golden Penny Semovita Premium Wheat',
              category: 'groceries',
              brand: 'Golden Penny',
              description: 'Superior wheat semolina.',
              image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
              price: 780,
              inStock: true,
              stockCount: 40,
              weight: '1kg',
              rating: 4.8,
              reviewsCount: 110,
              sku: 'GP-SEM-1KG',
            },
            quantity: 2,
          },
          {
            product: {
              id: 'prod-2',
              name: 'Milo Chocolate Malt Food Drink',
              category: 'tea-coffee-milk',
              brand: 'Nestlé',
              description: 'Nutritious malt food drink.',
              image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80',
              price: 2150,
              inStock: true,
              stockCount: 65,
              weight: '400g Refill',
              rating: 4.8,
              reviewsCount: 92,
              sku: 'MIL-MAL-400G',
            },
            quantity: 1,
          },
        ],
        subtotal: 3710,
        deliveryFee: 1000,
        discount: 0,
        total: 4710,
        paymentMethod: 'cash',
        status: 'out_for_delivery',
      },
      {
        id: 'BRL-21044',
        date: '10 Sep 2026, 11:05',
        method: 'pickup',
        customer: {
          fullName: 'Tunde Olatunji',
          phone: '0812 987 6543',
          email: 'tunde@example.com',
        },
        pickupLocation: "Bril's Mart Lekki Flagship — 122 Supermart Road",
        items: [
          {
            product: {
              id: 'prod-16',
              name: 'Mama Gold Premium Parboiled Nigerian Rice',
              category: 'groceries',
              brand: 'Mama Gold',
              description: 'Stoneless parboiled rice.',
              image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
              price: 9500,
              inStock: true,
              stockCount: 20,
              weight: '5kg Bag',
              rating: 4.9,
              reviewsCount: 142,
              sku: 'MMG-RIC-5KG',
            },
            quantity: 1,
          },
        ],
        subtotal: 9500,
        deliveryFee: 0,
        discount: 0,
        total: 9500,
        paymentMethod: 'transfer',
        status: 'packing',
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      if (lastOrder) {
        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(lastOrder));
      }
    } catch (e) {
      console.error('Failed to save last order', e);
    }
  }, [lastOrder]);

  useEffect(() => {
    try {
      localStorage.setItem(ALL_ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders history', e);
    }
  }, [orders]);

  const itemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const deliveryFee = subtotal === 0 
    ? 0 
    : subtotal >= storeSettings.freeDeliveryThreshold 
      ? 0 
      : storeSettings.standardDeliveryFee;

  const discount = Math.round(subtotal * couponDiscountRate);
  const total = Math.max(0, subtotal + deliveryFee - discount);

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setLastOrder(order);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`Order #${orderId} status updated to "${status.replace('_', ' ')}"`, 'info');
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    showToast(`Order #${orderId} removed`, 'warning');
  };

  const addToCart = (product: Product, quantity = 1) => {
    if (!product.inStock) {
      showToast(`${product.name} is currently out of stock`, 'error');
      return;
    }

    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    showToast(`${product.name} added to your cart!`, 'success');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    const item = items.find((i) => i.product.id === productId);
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
    if (item) {
      showToast(`Removed "${item.product.name}" from cart`, 'info');
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'BRIL10' || trimmed === 'SAVE10') {
      setCouponCode(trimmed);
      setCouponDiscountRate(0.10);
      showToast('Coupon applied: 10% OFF your subtotal!', 'success');
      return { success: true, message: '10% discount applied!' };
    }
    if (trimmed === 'BRIL20') {
      setCouponCode(trimmed);
      setCouponDiscountRate(0.20);
      showToast('Special Promo: 20% OFF applied!', 'success');
      return { success: true, message: '20% discount applied!' };
    }
    showToast('Invalid or expired coupon code. Try BRIL10', 'warning');
    return { success: false, message: 'Invalid coupon code. Try "BRIL10"' };
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponDiscountRate(0);
    showToast('Coupon removed', 'info');
  };

  const generateWhatsAppOrderMessage = (order: Order): string => {
    const lines: string[] = [
      `🛒 *NEW ORDER: ${order.id}*`,
      `*Store:* ${storeSettings.storeName}`,
      `*Customer:* ${order.customer.fullName} (${order.customer.phone})`,
      `*Fulfillment:* ${order.method === 'delivery' ? '🚚 Home Delivery' : '🏬 Store Pickup'}`,
    ];

    if (order.method === 'delivery' && order.address) {
      lines.push(`*Address:* ${order.address.address}, ${order.address.city}, ${order.address.state}`);
      if (order.address.landmark) {
        lines.push(`*Landmark:* ${order.address.landmark}`);
      }
    } else if (order.pickupLocation) {
      lines.push(`*Pickup Point:* ${order.pickupLocation}`);
    }

    lines.push('\n*Ordered Items:*');
    order.items.forEach((item, idx) => {
      lines.push(`${idx + 1}. ${item.product.name} (${item.product.weight}) x${item.quantity} — ₦${(item.product.price * item.quantity).toLocaleString()}`);
    });

    lines.push('\n*Summary:*');
    lines.push(`Subtotal: ₦${order.subtotal.toLocaleString()}`);
    if (order.deliveryFee > 0) {
      lines.push(`Delivery Fee: ₦${order.deliveryFee.toLocaleString()}`);
    } else if (order.method === 'delivery') {
      lines.push(`Delivery Fee: FREE (Order above ₦${storeSettings.freeDeliveryThreshold.toLocaleString()})`);
    }
    if (order.discount > 0) {
      lines.push(`Discount: -₦${order.discount.toLocaleString()}`);
    }
    lines.push(`*Total: ₦${order.total.toLocaleString()}*`);
    lines.push(`*Payment:* ${order.paymentMethod.toUpperCase()}`);

    return encodeURIComponent(lines.join('\n'));
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemsCount,
        subtotal,
        deliveryFee,
        discount,
        total,
        couponCode,
        isDrawerOpen,
        setIsDrawerOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastOrder,
        setLastOrder,
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        generateWhatsAppOrderMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};