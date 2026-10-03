import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShieldCheck,
  Tag,
  Smile,
  Truck,
  HeartHandshake,
  Users,
  Award,
  Calendar,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActiveTab } = useStore();

  return (
    <div className="space-y-12 sm:space-y-16 py-8 pb-16">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200">
            About Bril's Mart
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Your Friendly Neighbourhood Supermarket
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Committed to providing Nigerian families, students, and workers with authentic, fresh groceries and everyday home supplies at honest prices.
          </p>
        </div>
      </section>

      {/* Story & Image Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-8 bg-white rounded-3xl border border-slate-200 shadow-xs">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              Fresh Products, Fair Prices & Warm Service
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              At Bril’s Mart, we understand that shopping for daily essentials shouldn’t be complicated or overpriced. From early morning breakfast items and cooking staples like rice, beans, pasta, and vegetable oil to household toiletries and cleaning detergents, our aisles are curated to keep your pantry full.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Whether you walk through our physical supermarket doors or order through our streamlined website and WhatsApp channel, our pledge is simple: quick fulfillment, verified product authenticity, and genuine customer care.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActiveTab('shop')}
                className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-600/20"
              >
                Browse Our Store Catalog
              </button>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 shadow-inner">
            <img
              src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format&fit=crop&q=80"
              alt="Inside Bril's Mart Supermarket Aisles"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4 Stats Banner (From Blueprint & Mockup) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Users, stat: '5,000+', label: 'Happy Customers', sub: 'Served monthly' },
            { icon: Award, stat: '1,000+', label: 'Everyday Products', sub: 'Stocked on shelves' },
            { icon: Calendar, stat: '2+ Years', label: 'In Business', sub: 'Reliable service' },
            { icon: HeartHandshake, stat: '100%', label: 'Customer Satisfaction', sub: 'Genuine products' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-brand-900 text-white rounded-3xl text-center space-y-2 shadow-sm"
              >
                <Icon className="w-6 h-6 mx-auto text-brand-400" />
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">{item.stat}</h3>
                <p className="text-xs font-bold text-slate-200">{item.label}</p>
                <span className="text-[10px] text-brand-300 block font-medium">{item.sub}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl font-extrabold text-slate-900">Our Guiding Values</h2>
          <p className="text-xs text-slate-500 mt-1">What sets Bril’s Mart apart every single day</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { icon: ShieldCheck, title: 'Quality First', desc: 'Direct from trusted manufacturers with valid dates' },
            { icon: Tag, title: 'Great Prices', desc: 'Competitive retail pricing for everyday family budgets' },
            { icon: Smile, title: 'Customer Care', desc: 'Friendly assistants ready to help in-store and online' },
            { icon: Truck, title: 'Fast Delivery', desc: 'Orders delivered within 1 to 3 hours across coverage zones' },
            { icon: HeartHandshake, title: 'Reliability', desc: 'Accurate orders packed with utmost care and freshness' },
          ].map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="p-5 bg-white rounded-2xl border border-slate-200/80 text-center space-y-2 shadow-2xs"
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900">{val.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};