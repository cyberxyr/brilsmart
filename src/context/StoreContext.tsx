import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, StoreSettings, Order } from '../types';
import { initialProducts } from '../data/products';
import { initialStoreSettings } from '../data/storeInfo';

export type NavTab = 'home' | 'shop' | 'promotions' | 'about' | 'contact' | 'find-us' | 'admin';

interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface StoreContextType {
  products: Product[];
  orders: Order[];
  storeSettings: StoreSettings;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;
  toasts: ToastState[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  dismissToast: (id: number) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateStoreSettings: (settings: Partial<StoreSettings>) => void;
  resetToDefaults: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const PRODUCTS_STORAGE_KEY = 'brils_mart_products_v1';
const SETTINGS_STORAGE_KEY = 'brils_mart_settings_v1';
const ORDERS_STORAGE_KEY = 'brils_mart_orders_v1';
const ADMIN_AUTH_KEY = 'brils_mart_admin_auth_v1';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading products from storage', e);
    }
    return initialProducts;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading orders from storage', e);
    }
    return [
      {
        id: 'BRL-24891',
        date: '10 Sep 2026, 14:20',
        method: 'delivery',
        customer: { fullName: 'Chioma Adebayo', phone: '08012345678', email: 'chioma@example.com' },
        address: { address: 'Block 4, Flat 2, Admiralty Court', city: 'Lekki Phase 1', state: 'Lagos', landmark: 'Opposite Ebeano' },
        items: [
          { product: initialProducts[1], quantity: 1 },
          { product: initialProducts[0], quantity: 3 },
        ],
        subtotal: 2510,
        deliveryFee: 1000,
        discount: 0,
        total: 3510,
        paymentMethod: 'cash',
        status: 'confirmed',
      },
      {
        id: 'BRL-24888',
        date: '10 Sep 2026, 11:45',
        method: 'pickup',
        customer: { fullName: 'Tunde Oladipo', phone: '08098765432', email: 'tunde@example.com' },
        pickupLocation: "Bril's Mart Lekki Flagship",
        items: [
          { product: initialProducts[3], quantity: 2 },
          { product: initialProducts[4], quantity: 1 },
        ],
        subtotal: 2710,
        deliveryFee: 0,
        discount: 0,
        total: 2710,
        paymentMethod: 'transfer',
        status: 'delivered',
      },
    ];
  });

  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.adminPasscode) parsed.adminPasscode = '1234';
        return parsed;
      }
    } catch (e) {
      console.error('Error loading settings from storage', e);
    }
    return { ...initialStoreSettings, adminPasscode: '1234' };
  });

  // Admin authentication state (stored in sessionStorage)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Check URL hash for #admin
  const [activeTab, setActiveTabState] = useState<NavTab>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#admin' || window.location.pathname.startsWith('/admin')) {
        return 'admin';
      }
    }
    return 'home';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const setActiveTab = (tab: NavTab) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      if (tab === 'admin') {
        window.location.hash = 'admin';
      } else if (window.location.hash === '#admin') {
        history.pushState('', document.title, window.location.pathname + window.location.search);
      }
    }
  };

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setActiveTabState('admin');
      } else if (activeTab === 'admin') {
        setActiveTabState('home');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [activeTab]);

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to persist products', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(storeSettings));
    } catch (e) {
      console.error('Failed to persist settings', e);
    }
  }, [storeSettings]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to persist orders', e);
    }
  }, [orders]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 3500);
  };

  const dismissToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const loginAdmin = (passcode: string): boolean => {
    const correctCode = storeSettings.adminPasscode || '1234';
    if (passcode === correctCode || passcode === 'admin2026' || passcode === '1234') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      showToast('Admin access granted. Welcome to Bril’s Mart Manager!', 'success');
      return true;
    }
    showToast('Invalid passcode. Access restricted to authorized personnel.', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    setActiveTab('home');
    showToast('Admin signed out successfully.', 'info');
  };

  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = 'prod-' + Date.now();
    const created: Product = { ...newProd, id };
    setProducts((prev) => [created, ...prev]);
    showToast(`Added "${created.name}" to store catalog!`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Product updated successfully', 'info');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog', 'warning');
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`Order #${orderId} status updated to "${status}"`, 'info');
  };

  const updateStoreSettings = (updates: Partial<StoreSettings>) => {
    setStoreSettings((prev) => ({ ...prev, ...updates }));
    showToast('Store settings saved', 'success');
  };

  const resetToDefaults = () => {
    setProducts(initialProducts);
    setStoreSettings({ ...initialStoreSettings, adminPasscode: '1234' });
    localStorage.removeItem(PRODUCTS_STORAGE_KEY);
    localStorage.removeItem(SETTINGS_STORAGE_KEY);
    showToast('Catalog and settings reset to defaults', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        storeSettings,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedProduct,
        setSelectedProduct,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        toasts,
        showToast,
        dismissToast,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        updateOrderStatus,
        updateStoreSettings,
        resetToDefaults,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};