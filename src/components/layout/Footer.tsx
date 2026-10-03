import React from 'react';
import { useStore, NavTab } from '../../context/StoreContext';
import { Store, Phone, Mail, MapPin, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { storeSettings, setActiveTab, setSelectedCategory } = useStore();

  const handleNav = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800 text-xs">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => handleNav('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-md">
                <Store className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Bril's <span className="text-brand-400">Mart</span>
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Your friendly neighbourhood supermarket dedicated to providing top quality groceries,
              snacks, fresh bakery, household items and personal care products at fair, affordable prices.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 font-bold text-[11px]">
                💳 Verve
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 font-bold text-[11px]">
                💳 Mastercard
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 font-bold text-[11px]">
                💳 Visa
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-brand-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop')}
                  className="hover:text-brand-400 transition-colors"
                >
                  Shop All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('groceries');
                    handleNav('shop');
                  }}
                  className="hover:text-brand-400 transition-colors"
                >
                  Groceries & Staples
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('promotions')}
                  className="hover:text-brand-400 transition-colors"
                >
                  Special Deals & Offers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-brand-400 transition-colors"
                >
                  About Bril's Mart
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Service */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Customer Service
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-brand-400 transition-colors"
                >
                  Contact Us & FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('find-us')}
                  className="hover:text-brand-400 transition-colors"
                >
                  Store Directions & Map
                </button>
              </li>
              <li className="text-slate-400">Doorstep Delivery Policy</li>
              <li className="text-slate-400">Return & Exchange Guarantee</li>
              <li className="text-slate-400">Terms & Conditions</li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Opening Hours & Visit
            </h4>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-slate-200 font-semibold">{storeSettings.weekdayHours}</p>
                  <p className="text-slate-300">{storeSettings.sundayHours}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                <p className="leading-snug">{storeSettings.address}</p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span className="text-slate-200 font-semibold">{storeSettings.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Bril's Mart Supermarket. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Quality You Can Trust</span>
            <span>•</span>
            <span>Everyday Fair Prices</span>
            <span>•</span>
            <span>Fast Lagos Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};