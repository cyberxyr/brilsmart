import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';
import { Sparkles, Clock, Tag } from 'lucide-react';

export const PromotionsPage: React.FC = () => {
  const { products } = useStore();
  const [dealFilter, setDealFilter] = useState<'all' | '10' | '20'>('all');

  // Flash sale countdown simulation
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const promoProducts = products.filter((p) => {
    if (!p.isOnSale) return false;
    if (dealFilter === '10') return (p.discount ?? 0) <= 12;
    if (dealFilter === '20') return (p.discount ?? 0) >= 13;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-brand-600 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-white">
            <Sparkles className="w-3.5 h-3.5 text-accent-yellow" />
            <span>Weekend Super Saver Offers</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Special Deals & Discounts
          </h1>

          <p className="text-xs sm:text-sm text-amber-50 leading-relaxed max-w-lg">
            Enjoy unbeatable savings on branded groceries, baby care, cleaning supplies, and everyday snacks. Limited quantities available!
          </p>

          {/* Countdown Clock */}
          <div className="pt-2 flex items-center gap-2 text-xs font-bold">
            <Clock className="w-4 h-4 text-white" />
            <span>Deals End In:</span>
            <div className="flex items-center gap-1.5 font-mono">
              <span className="bg-black/30 px-2 py-1 rounded-lg">{String(timeLeft.hours).padStart(2, '0')}h</span>
              <span>:</span>
              <span className="bg-black/30 px-2 py-1 rounded-lg">{String(timeLeft.minutes).padStart(2, '0')}m</span>
              <span>:</span>
              <span className="bg-black/30 px-2 py-1 rounded-lg">{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
          </div>
        </div>

        {/* Decorative circle */}
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Active Supermarket Deals</h2>
          <p className="text-xs text-slate-500">{promoProducts.length} items currently discounted</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold">
          {[
            { id: 'all', label: 'All Deals' },
            { id: '10', label: 'Up to 12% OFF' },
            { id: '20', label: '14% – 20% OFF' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setDealFilter(tab.id as any)}
              className={`px-4 py-2 rounded-xl transition-all ${
                dealFilter === tab.id
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
        {promoProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};