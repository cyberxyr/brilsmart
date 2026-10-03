import React, { useState, useRef, useEffect } from 'react';
import { useStore, NavTab } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { categories } from '../../data/storeInfo';
import {
  ShoppingBag,
  Search,
  MessageSquare,
  ChevronDown,
  X,
  Phone,
  Clock,
  Sparkles,
  Store,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    products,
    setSelectedProduct,
    setSelectedCategory,
    storeSettings,
  } = useStore();

  const { itemsCount, setIsDrawerOpen } = useCart();

  const [headerSearch, setHeaderSearch] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);

  const matchingProducts = headerSearch.trim()
    ? products
        .filter((p) =>
          p.name.toLowerCase().includes(headerSearch.toLowerCase()) ||
          p.brand.toLowerCase().includes(headerSearch.toLowerCase()) ||
          p.category.toLowerCase().includes(headerSearch.toLowerCase())
        )
        .slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'promotions', label: 'Promotions' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
    { id: 'find-us', label: 'Find Us' },
  ];

  const handleOpenWhatsApp = () => {
    const phone = storeSettings.whatsapp.replace(/\D/g, '');
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(
        "Hello Bril's Mart! I'm browsing your online store and have a question."
      )}`,
      '_blank'
    );
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-slate-100">
      {/* Top Announcement Bar */}
      <div className="bg-brand-900 text-white text-[11px] font-medium py-1.5 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-accent-yellow" />
          <span>
            Free Delivery on orders above <strong>₦{storeSettings.freeDeliveryThreshold.toLocaleString()}</strong> in Lagos!
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-slate-300">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-brand-300" />
            {storeSettings.weekdayHours}
          </span>
          <span className="text-slate-500">|</span>
          <span className="flex items-center gap-1">
            <Phone className="w-3 h-3 text-brand-300" />
            {storeSettings.phone}
          </span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
          >
            <div className="w-11 h-11 rounded-2xl bg-brand-600 group-hover:bg-brand-700 text-white flex items-center justify-center shadow-md shadow-brand-600/20 transition-all">
              <Store className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-brand-700 transition-colors flex items-center gap-1">
                Bril's <span className="text-brand-600">Mart</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block -mt-1">
                Supermarket
              </span>
            </div>
          </div>

          {/* Search Bar with live autocomplete */}
          <div ref={searchRef} className="relative flex-1 max-w-lg hidden sm:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for rice, noodles, milk, soap, diapers..."
                value={headerSearch}
                onChange={(e) => setHeaderSearch(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full pl-11 pr-10 py-2.5 bg-slate-100/90 border border-slate-200/80 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:border-brand-600 focus:bg-white focus:ring-2 focus:ring-brand-100 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              {headerSearch && (
                <button
                  onClick={() => setHeaderSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dropdown search results */}
            {isSearchFocused && headerSearch.trim() && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-slide-up">
                {matchingProducts.length > 0 ? (
                  <div className="p-2 divide-y divide-slate-100">
                    {matchingProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setSelectedProduct(p);
                          setIsSearchFocused(false);
                          setHeaderSearch('');
                        }}
                        className="p-2.5 hover:bg-slate-50 rounded-xl cursor-pointer flex items-center gap-3 transition-colors"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-100 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-900 truncate">{p.name}</p>
                          <span className="text-[11px] text-slate-400">
                            {p.brand} • {p.weight}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-brand-700">
                          ₦{p.price.toLocaleString()}
                        </span>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setActiveTab('shop');
                        setIsSearchFocused(false);
                      }}
                      className="w-full py-2 text-center text-xs font-bold text-brand-700 hover:underline"
                    >
                      View all matching items in Shop →
                    </button>
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No products found for "{headerSearch}". Try searching for groceries or drinks.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons (Customer Only: WhatsApp & Shopping Basket) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp Support CTA */}
            <button
              onClick={handleOpenWhatsApp}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold transition-colors"
              title="Chat with Store Support on WhatsApp"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative flex items-center gap-2 p-2.5 sm:px-4 sm:py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-600/25 transition-all active:scale-95"
              aria-label="Open Shopping Basket"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline text-xs font-bold">Cart</span>
              {itemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 sm:relative sm:top-0 sm:right-0 bg-accent-yellow text-slate-950 text-xs font-extrabold px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full shadow-sm animate-pulse-subtle">
                  {itemsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links (Purely customer facing) */}
        <nav className="hidden md:flex items-center justify-between border-t border-slate-100 py-2.5">
          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === link.id
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Category Dropdown */}
            <div ref={catRef} className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center gap-1"
              >
                <span>All Categories</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-slide-up">
                  <div className="grid grid-cols-1 gap-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setActiveTab('shop');
                          setIsCategoryOpen(false);
                        }}
                        className="flex items-center justify-between p-2 rounded-xl text-left hover:bg-brand-50 text-slate-700 hover:text-brand-700 text-xs transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <span>{cat.icon}</span>
                          <span className="font-semibold">{cat.name}</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {cat.count} items
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="text-xs text-brand-700 font-bold bg-brand-50/80 px-3 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
            <span>Store Open Now • Fast Lagos Delivery</span>
          </div>
        </nav>
      </div>
    </header>
  );
};