import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  Navigation,
  Car,
  CreditCard,
  CheckCircle,
} from 'lucide-react';

export const FindUsPage: React.FC = () => {
  const { storeSettings } = useStore();

  const handleDirections = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${storeSettings.storeName}, ${storeSettings.address}`
      )}`,
      '_blank'
    );
  };

  const handleCall = () => {
    window.location.href = `tel:${storeSettings.phone.replace(/\s+/g, '')}`;
  };

  const handleWhatsApp = () => {
    const phone = storeSettings.whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent("Hello Bril's Mart! I'm planning to visit your physical store.")}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-16">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
          Store Locator
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Visit Bril's Mart Physical Store
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Clean aisles, air-conditioned comfort, friendly attendants and abundant parking.
        </p>
      </div>

      {/* Main Store Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        {/* Details column */}
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg">
              Main Flagship Supermarket
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">{storeSettings.storeName}</h2>

            {/* Address */}
            <div className="flex items-start gap-3 mt-4 text-xs text-slate-600">
              <MapPin className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 block mb-0.5">Physical Address</strong>
                <p className="leading-relaxed">{storeSettings.address}</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3 mt-4 text-xs text-slate-600">
              <Clock className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 block mb-0.5">Opening Hours</strong>
                <p>{storeSettings.weekdayHours}</p>
                <p>{storeSettings.sundayHours}</p>
              </div>
            </div>

            {/* In-store amenities */}
            <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Car className="w-4 h-4 text-brand-600" />
                <span>Free Secured Parking</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CreditCard className="w-4 h-4 text-brand-600" />
                <span>POS & Cash Accepted</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle className="w-4 h-4 text-brand-600" />
                <span>Bakery & Cold Drinks</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle className="w-4 h-4 text-brand-600" />
                <span>Curbside Pickup</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-100">
            <button
              onClick={handleDirections}
              className="flex-1 min-w-[140px] py-3 px-4 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md shadow-brand-600/20"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
            </button>

            <button
              onClick={handleCall}
              className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs rounded-xl flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Map column / preview */}
        <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 relative min-h-[320px] flex items-center justify-center">
          {/* Simulated Stylized Map with Roads and Landmark */}
          <div className="absolute inset-0 bg-[#e5e9ec] p-6 flex flex-col justify-between">
            <div className="border-b-4 border-white/80 w-full h-8 flex items-center px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Admiralty Way (Lekki Phase 1)
            </div>
            <div className="w-12 h-full absolute left-1/3 top-0 border-r-4 border-l-4 border-white/70" />
            <div className="w-full h-10 border-t-4 border-white/70 flex items-center justify-end px-6 text-[10px] font-bold text-slate-400">
              To Lekki Toll Gate & Ikoyi Link Bridge →
            </div>
          </div>

          {/* Map Pin Badge */}
          <div className="relative z-10 p-4 bg-white rounded-2xl shadow-xl border border-slate-200/80 flex items-center gap-3 animate-bounce-gentle">
            <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-md">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Bril's Mart Supermarket</p>
              <p className="text-[11px] text-slate-500">122 Supermart Road, Lekki Phase 1</p>
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                ● Open Today until 9:00 PM
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};