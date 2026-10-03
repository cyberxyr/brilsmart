import React from 'react';
import { Order } from '../../types';
import { CheckCircle2, MessageSquare, Printer, Check } from 'lucide-react';

interface Props {
  lastOrder: Order;
  openWhatsAppReceipt: (order: Order) => void;
  onContinueShopping: () => void;
}

export const CheckoutConfirmation: React.FC<Props> = ({
  lastOrder,
  openWhatsAppReceipt,
  onContinueShopping,
}) => {
  return (
    <div className="text-center py-4 space-y-6 animate-fade-in">
      <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
        <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
      </div>

      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
          Order Successfully Placed
        </span>
        <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
          Thank You, {lastOrder.customer.fullName}!
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          We are preparing your everyday essentials right now.
        </p>
      </div>

      {/* Order Reference details */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto text-left space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-500">Order Reference:</span>
          <span className="font-mono font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
            #{lastOrder.id}
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Total Paid / Due:</span>
          <span className="font-extrabold text-brand-700 text-sm">
            ₦{lastOrder.total.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Fulfillment:</span>
          <span className="font-semibold text-slate-800 capitalize">
            {lastOrder.method === 'delivery' ? 'Home Delivery (1–3 Hours)' : 'Store Pickup (Ready in 30m)'}
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Payment Method:</span>
          <span className="font-semibold text-slate-800 uppercase">
            {lastOrder.paymentMethod}
          </span>
        </div>
      </div>

      {/* Simulated Live Order Status Tracker */}
      <div className="max-w-md mx-auto p-4 rounded-2xl bg-white border border-slate-200 text-left">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
          Live Order Status
        </h4>
        <div className="space-y-3">
          {[
            { title: 'Order Placed & Confirmed', time: 'Just now', active: true, done: true },
            { title: 'Supermarket Attendant Packing Items', time: 'Estimated: 15 mins', active: true, done: false },
            { title: 'Dispatch Rider En Route', time: 'Estimated: 45 mins', active: false, done: false },
            { title: 'Delivered to Doorstep', time: 'Estimated: 1-2 hours', active: false, done: false },
          ].map((s, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs">
              <div
                className={`w-4 h-4 rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center ${
                  s.done
                    ? 'bg-emerald-600 text-white'
                    : s.active
                    ? 'bg-amber-400 text-white animate-pulse'
                    : 'bg-slate-200'
                }`}
              >
                {s.done && <Check className="w-2.5 h-2.5" />}
              </div>
              <div className="flex-1 flex justify-between">
                <span className={s.done || s.active ? 'font-semibold text-slate-900' : 'text-slate-400'}>
                  {s.title}
                </span>
                <span className="text-[10px] text-slate-400">{s.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-2">
        <button
          type="button"
          onClick={() => openWhatsAppReceipt(lastOrder)}
          className="flex-1 py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Send to WhatsApp</span>
        </button>

        <button
          type="button"
          onClick={() => window.print()}
          className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>Print</span>
        </button>
      </div>

      <button
        type="button"
        onClick={onContinueShopping}
        className="text-xs font-semibold text-slate-500 hover:text-brand-700 underline transition-colors"
      >
        Continue Shopping More Essentials
      </button>
    </div>
  );
};