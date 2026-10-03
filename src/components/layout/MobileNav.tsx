import React, { useState } from 'react';
import { useStore, NavTab } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { categories } from '../../data/storeInfo';
import {
  Home,
  ShoppingBag,
  Grid,
  Percent,
  X,
  Store,
  Phone,
  Info,
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab, setSelectedCategory } = useStore();
  const { itemsCount, setIsDrawerOpen } = useCart();
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);

  const handleTab = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Category Bottom Sheet */}
      {isCategorySheetOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end animate-fade-in">
          <div
            onClick={() => setIsCategorySheetOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
          />
          <div className="relative bg-white rounded-t-3xl p-5 shadow-2xl z-10 max-h-[75vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Browse All Categories</h3>
              <button
                onClick={() => setIsCategorySheetOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-4">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCategory(c.id);
                    setActiveTab('shop');
                    setIsCategorySheetOpen(false);
                  }}
                  className="p-3 bg-slate-50 hover:bg-brand-50 rounded-2xl text-left border border-slate-100 flex items-center gap-3 transition-colors"
                >
                  <span className="text-xl">{c.icon}</span>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 text-xs truncate">{c.name}</p>
                    <span className="text-[10px] text-slate-400">{c.count} items</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fixed Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-lg">
        <button
          onClick={() => handleTab('home')}
          className={`flex flex-col items-center gap-1 p-1 rounded-xl transition-colors ${
            activeTab === 'home' ? 'text-brand-700 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => handleTab('shop')}
          className={`flex flex-col items-center gap-1 p-1 rounded-xl transition-colors ${
            activeTab === 'shop' ? 'text-brand-700 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Store className="w-5 h-5" />
          <span className="text-[10px]">Shop</span>
        </button>

        <button
          onClick={() => setIsCategorySheetOpen(true)}
          className="flex flex-col items-center gap-1 p-1 rounded-xl text-slate-500 hover:text-slate-900 transition-colors"
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px]">Categories</span>
        </button>

        <button
          onClick={() => handleTab('promotions')}
          className={`flex flex-col items-center gap-1 p-1 rounded-xl transition-colors ${
            activeTab === 'promotions' ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Percent className="w-5 h-5" />
          <span className="text-[10px]">Offers</span>
        </button>

        <button
          onClick={() => setIsDrawerOpen(true)}
          className="relative flex flex-col items-center gap-1 p-1 rounded-xl text-brand-700 font-bold"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {itemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-accent-yellow text-slate-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {itemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">Cart</span>
        </button>
      </div>
    </>
  );
};