import React from 'react';
import { PaymentMethod, OrderMethod } from '../../types';
import { Banknote, Building2, CreditCard, MessageSquare, ShieldCheck, Copy, Check } from 'lucide-react';

interface Props {
  method: OrderMethod;
  subtotal: number;
  actualDeliveryFee: number;
  discount: number;
  grandTotal: number;
  itemsCount: number;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (p: PaymentMethod) => void;
  copiedBank: string | null;
  copyToClipboard: (text: string, label: string) => void;
  cardDetails: { cardNumber: string; expiry: string; cvv: string };
  setCardDetails: React.Dispatch<React.SetStateAction<{ cardNumber: string; expiry: string; cvv: string }>>;
}

export const CheckoutPayment: React.FC<Props> = ({
  method,
  subtotal,
  actualDeliveryFee,
  discount,
  grandTotal,
  itemsCount,
  paymentMethod,
  setPaymentMethod,
  copiedBank,
  copyToClipboard,
  cardDetails,
  setCardDetails,
}) => {
  return (
    <div className="space-y-5">
      {/* Order Summary box */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-2">
        <div className="flex justify-between text-slate-600">
          <span>Items ({itemsCount} unique)</span>
          <span className="font-semibold text-slate-900">₦{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Fulfillment ({method === 'delivery' ? 'Home Delivery' : 'Store Pickup'})</span>
          <span>
            {actualDeliveryFee === 0 ? (
              <strong className="text-emerald-700 uppercase font-bold text-[11px]">FREE</strong>
            ) : (
              `₦${actualDeliveryFee.toLocaleString()}`
            )}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-emerald-700 font-semibold">
            <span>Discount Applied</span>
            <span>-₦{discount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
          <span>Total Amount</span>
          <span className="text-base text-brand-700">₦{grandTotal.toLocaleString()}</span>
        </div>
      </div>

      {/* Payment Method Selector */}
      <div>
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
          Select Payment Option
        </label>

        <div className="grid grid-cols-2 gap-2.5">
          {[
            { id: 'cash', label: method === 'delivery' ? 'Cash on Delivery' : 'Pay at Store', icon: Banknote },
            { id: 'transfer', label: 'Bank Transfer', icon: Building2 },
            { id: 'card', label: 'Debit Card (Demo)', icon: CreditCard },
            { id: 'whatsapp', label: 'WhatsApp Order', icon: MessageSquare },
          ].map((p) => {
            const Icon = p.icon;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPaymentMethod(p.id as PaymentMethod)}
                className={`p-3 rounded-xl border-2 text-left flex items-center gap-2.5 transition-all text-xs font-semibold ${
                  paymentMethod === p.id
                    ? 'border-brand-600 bg-brand-50/60 text-brand-900'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <Icon className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span className="truncate">{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {paymentMethod === 'transfer' && (
        <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-emerald-900">GTBank Account</span>
            <button
              type="button"
              onClick={() => copyToClipboard('0123456789', 'GTBank Account')}
              className="text-emerald-800 hover:text-emerald-950 flex items-center gap-1 font-semibold"
            >
              {copiedBank === 'GTBank Account' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy</span>
            </button>
          </div>
          <p className="font-mono text-sm font-extrabold text-emerald-950 tracking-wider">0123456789</p>
          <p className="text-slate-600 text-[11px]">Account Name: <strong>Bril's Mart Supermarket Ltd</strong></p>
        </div>
      )}

      {paymentMethod === 'card' && (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Card Number (Demo)</label>
            <input
              type="text"
              value={cardDetails.cardNumber}
              onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Expiry</label>
              <input
                type="text"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">CVV</label>
              <input
                type="password"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono"
              />
            </div>
          </div>
          <p className="text-[10px] text-slate-500 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
            256-bit bank grade simulated SSL payment encryption.
          </p>
        </div>
      )}

      {paymentMethod === 'whatsapp' && (
        <div className="p-4 bg-brand-50/70 border border-brand-200 rounded-2xl text-xs space-y-2">
          <p className="text-brand-900 font-semibold">
            Prefer direct ordering via WhatsApp?
          </p>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            Once you submit, we will automatically prepare your grocery list and open a WhatsApp chat directly with our store attendant.
          </p>
        </div>
      )}
    </div>
  );
};