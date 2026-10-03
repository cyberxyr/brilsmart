import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { categories, customerReviews } from '../data/storeInfo';
import { ProductCard } from '../components/product/ProductCard';
import {
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  Sparkles,
  Star,
  MessageSquare,
  ChevronRight,
  Phone,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, setActiveTab, setSelectedCategory, storeSettings } = useStore();
  const [popularTab, setPopularTab] = useState('all');

  const specialOffers = products.filter((p) => p.isOnSale).slice(0, 4);

  const filteredPopular = products
    .filter((p) => {
      if (popularTab === 'all') return true;
      if (popularTab === 'groceries') return p.category === 'groceries';
      if (popularTab === 'drinks') return p.category === 'snacks-drinks';
      if (popularTab === 'snacks') return p.category === 'snacks-drinks' || p.category === 'bread-bakery';
      if (popularTab === 'household') return p.category === 'household' || p.category === 'cleaning-supplies';
      return true;
    })
    .slice(0, 8);

  const handleOpenWhatsApp = () => {
    const phone = storeSettings.whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent("Hello Bril's Mart! I'd like to place an order.")}`, '_blank');
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-slate-50 pt-8 pb-12 sm:pb-20 border-b border-brand-100/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 border border-brand-200 text-brand-800 text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                <span>Your Trusted Neighbourhood Supermarket</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Your Everyday Essentials, <br />
                <span className="text-brand-600">All in One Place.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Quality products. Great prices. Everything you need for your home, family and everyday life delivered right to your doorstep.
              </p>

              <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start pt-2">
                <button
                  onClick={() => setActiveTab('shop')}
                  className="px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-brand-600/30 transition-all"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveTab('promotions')}
                  className="px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-50 active:scale-95 text-slate-800 border-2 border-slate-200 hover:border-slate-300 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-all"
                >
                  <Tag className="w-5 h-5 text-accent-yellow" />
                  <span>View Promotions</span>
                </button>
              </div>

              {/* Quick stats highlight */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>1,000+ Items in Stock</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Express 1h Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Pay on Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image (The uploaded supermarket basket!) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md lg:max-w-none flex items-center justify-center">
                {/* Subtle decorative glow ring */}
                <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-brand-200/50 rounded-full blur-3xl pointer-events-none" />

                {/* Hero basket image with gentle float */}
                <img
                  src="/images/hero-basket.png"
                  alt="Bril's Mart Everyday Groceries Basket"
                  className="relative z-10 w-full max-w-sm sm:max-w-md object-contain drop-shadow-2xl animate-bounce-gentle"
                />

                {/* Floating promo badge */}
                <div className="absolute -bottom-3 right-4 sm:right-8 z-20 bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-yellow/20 text-accent-orange flex items-center justify-center font-black text-sm">
                    15%
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-slate-800 leading-tight">Weekend Deals</p>
                    <span className="text-[10px] text-slate-500 font-medium">Up to 20% off</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST / VALUE PROPOSITION STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
          {[
            {
              icon: ShieldCheck,
              title: 'Quality Products',
              desc: 'Carefully selected everyday essentials',
              color: 'bg-emerald-100 text-emerald-700',
            },
            {
              icon: Tag,
              title: 'Great Prices',
              desc: 'Affordable prices for everyday needs',
              color: 'bg-amber-100 text-amber-800',
            },
            {
              icon: Truck,
              title: 'Fast & Reliable',
              desc: 'Quick delivery or seamless pickup',
              color: 'bg-blue-100 text-blue-700',
            },
            {
              icon: Sparkles,
              title: 'Easy Shopping',
              desc: 'Simple and stress-free shopping',
              color: 'bg-purple-100 text-purple-700',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-3.5 p-2 sm:p-3">
                <div className={`w-11 h-11 rounded-2xl flex-shrink-0 flex items-center justify-center ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Shop by Category</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Explore our complete range of everyday supermarket aisles</p>
          </div>
          <button
            onClick={() => setActiveTab('shop')}
            className="text-xs font-bold text-brand-700 hover:text-brand-800 flex items-center gap-1"
          >
            <span>View all aisles</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setActiveTab('shop');
              }}
              className="p-3.5 bg-white hover:bg-brand-50 rounded-2xl border border-slate-200/80 hover:border-brand-300 flex flex-col items-center justify-center text-center group transition-all shadow-xs hover:shadow-sm"
            >
              <span className="text-3xl mb-2 transform group-hover:scale-110 transition-transform">
                {cat.icon}
              </span>
              <span className="text-xs font-bold text-slate-800 group-hover:text-brand-800 leading-tight">
                {cat.name}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 font-medium">
                {cat.count}+ items
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 4. SPECIAL OFFERS (From Blueprint & Mockup) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-500/10 via-brand-500/10 to-emerald-500/10 p-6 sm:p-8 rounded-3xl border border-amber-200/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-accent-orange bg-white px-3 py-1 rounded-full border border-amber-300">
                Discount Deals
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Special Offers Just For You
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                Save more on your everyday essentials with exclusive weekly discounts.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('promotions')}
              className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>View All Offers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {specialOffers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. DELIVERY / SHOPPING CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-brand-700 text-white rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-brand-900/15">
          <div className="space-y-2 text-center md:text-left z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-200 bg-brand-800/80 px-3 py-1 rounded-full">
              Doorstep Convenience
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold">We Deliver Directly To You!</h2>
            <p className="text-xs sm:text-sm text-brand-100 max-w-lg leading-relaxed">
              Fast, reliable and affordable delivery across Lagos. Relax at home while we pick, pack and deliver fresh groceries.
            </p>
          </div>

          <div className="flex items-center gap-4 z-10">
            <button
              onClick={() => setActiveTab('shop')}
              className="px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-brand-900 font-bold text-sm shadow-md transition-all active:scale-95"
            >
              Shop Now
            </button>
          </div>

          {/* Background pattern */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-white/5 skew-x-12 pointer-events-none" />
        </div>
      </section>

      {/* 6. POPULAR PRODUCTS (With Category Filter Tabs) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Popular Products</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Customer favorites ordered again and again</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
            {[
              { id: 'all', label: 'All' },
              { id: 'groceries', label: 'Groceries' },
              { id: 'drinks', label: 'Drinks' },
              { id: 'snacks', label: 'Snacks' },
              { id: 'household', label: 'Household' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setPopularTab(tab.id)}
                className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                  popularTab === tab.id
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredPopular.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Real Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">What Our Customers Say</h2>
          <p className="text-xs text-slate-500 mt-1">Read feedback from our regular shoppers and families</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {customerReviews.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">— {review.author}</span>
                <span className="text-slate-400">{review.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CONTACT / WHATSAPP CTA STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 bg-slate-900 text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold">Need Help Finding Something?</h3>
            <p className="text-xs text-slate-400">
              Have a question about a product, bulk price or availability? We’re always happy to assist.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleOpenWhatsApp}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};