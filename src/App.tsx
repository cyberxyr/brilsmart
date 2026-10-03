import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { WhatsAppButton } from './components/layout/WhatsAppButton';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { ProductDetailModal } from './components/product/ProductDetailModal';
import { ToastContainer } from './components/common/Toast';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { PromotionsPage } from './pages/PromotionsPage';
import { AboutPage } from './pages/AboutPage';
import { FindUsPage } from './pages/FindUsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

const MainContent: React.FC = () => {
  const { activeTab } = useStore();

  // If on Admin Page, show dedicated full-screen Admin Portal
  if (activeTab === 'admin') {
    return (
      <div className="min-h-screen bg-slate-100">
        <AdminPage />
        <ToastContainer />
      </div>
    );
  }

  // Customer Storefront Layout
  return (
    <main className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header />

      <div className="flex-1">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'shop' && <ShopPage />}
        {activeTab === 'promotions' && <PromotionsPage />}
        {activeTab === 'about' && <AboutPage />}
        {activeTab === 'find-us' && <FindUsPage />}
        {activeTab === 'contact' && <ContactPage />}
      </div>

      <Footer />
      <MobileNav />
      <WhatsAppButton />
      <CartDrawer />
      <CheckoutModal />
      <ProductDetailModal />
      <ToastContainer />
    </main>
  );
};

export function App() {
  return (
    <StoreProvider>
      <CartProvider>
        <MainContent />
      </CartProvider>
    </StoreProvider>
  );
}

export default App;