import React from 'react';
import { OrderMethod } from '../../types';
import { Truck, Store, Check } from 'lucide-react';

interface Props {
  method: OrderMethod;
  setMethod: (m: OrderMethod) => void;
  subtotal: number;
  freeDeliveryThreshold: number;
  standardDeliveryFee: number;
}

export const CheckoutFulfillment: React.FC<Props> = ({
  method,
  setMethod,
  subtotal,
  freeDeliveryThreshold,
  standardDeliveryFee,
}) => {
  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-500 font-medium">
        How would you like to receive your everyday essentials?
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setMethod('delivery')}
          className={`p-5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
            method === 'delivery'
              ? 'border-brand-600 bg-brand-50/50 shadow-sm'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-brand-100 text-brand-700 rounded-xl">
              <Truck className="w-6 h-6" />
            </div>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                method === 'delivery'
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : 'border-slate-300'
              }`}
            >
              {method === 'delivery' && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Home Delivery</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Delivered directly to your doorstep within 1 to 3 hours across Lagos.
            </p>
            <span className="inline-block mt-3 text-xs font-bold text-brand-700">
              {subtotal >= freeDeliveryThreshold
                ? 'FREE (Qualifies!)'
                : `₦${standardDeliveryFee.toLocaleString()} Flat Rate`}
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setMethod('pickup')}
          className={`p-5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
            method === 'pickup'
              ? 'border-brand-600 bg-brand-50/50 shadow-sm'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-100 text-amber-800 rounded-xl">
              <Store className="w-6 h-6" />
            </div>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                method === 'pickup'
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : 'border-slate-300'
              }`}
            >
              {method === 'pickup' && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Store Pickup</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pick up directly from Bril's Mart customer desk in 30 minutes.
            </p>
            <span className="inline-block mt-3 text-xs font-bold text-emerald-700">
              FREE (No extra charges)
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};