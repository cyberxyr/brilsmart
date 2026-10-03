const fs = require('fs');

const checkoutTsx = `import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';
import { Order, OrderMethod, PaymentMethod } from '../../types';
import confetti from 'canvas-confetti';
import {
  X,
  Truck,
  Store,
  CreditCard,
  Building2,
  Banknote,
  MessageSquare,
  CheckCircle2,
  Printer,
  ArrowLeft,
  ArrowRight,
  Copy,
  Check,
  MapPin,
  Clock,
  ShieldCheck,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    items,
    subtotal,
    deliveryFee,
    discount,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    lastOrder,
    setLastOrder,
    generateWhatsAppOrderMessage,
  } = useCart();

  const { storeSettings, showToast, setActiveTab } = useStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [method, setMethod] = useState<OrderMethod>('delivery');

  const [customer, setCustomer] = useState({
    fullName: '',
    phone: '',
    email: '',
  });

  const [address, setAddress] = useState({
    address: '',
    city: 'Lagos',
    state: 'Lagos',
    landmark: '',
    instructions: '',
  });

  const [pickupLocation, setPickupLocation] = useState(
    'Main Store — 122 Supermart Road, Off Admiralty Way, Lekki Phase 1'
  );

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '5399 •••• •••• 4129',
    expiry: '12/28',
    cvv: '321',
  });

  if (!isCheckoutOpen) return null;

  const actualDeliveryFee = method === 'pickup' ? 0 : deliveryFee;
  const grandTotal = Math.max(0, subtotal + actualDeliveryFee - discount);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(label);
    showToast(\`Copied \${label} to clipboard!\`, 'info');
    setTimeout(() => setCopiedBank(null), 2000);
  };

  const handleCompleteOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = 'BRL-' + Math.floor(10000 + Math.random() * 90000);
      const newOrder: Order = {
        id: orderId,
        date: new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        method,
        customer,
        address: method === 'delivery' ? address : undefined,
        pickupLocation: method === 'pickup' ? pickupLocation : undefined,
        items: [...items],
        subtotal,
        deliveryFee: actualDeliveryFee,
        discount,
        total: grandTotal,
        paymentMethod,
        status: 'confirmed',
      };

      setLastOrder(newOrder);
      clearCart();
      setIsProcessing(false);
      setStep(5);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#16a34a', '#eab308', '#22c55e', '#3b82f6'],
      });

      showToast(\`Order #\${orderId} confirmed successfully!\`, 'success');
    }, 1200);
  };

  const openWhatsAppReceipt = (order: Order) => {
    const encoded = generateWhatsAppOrderMessage(order);
    const phone = storeSettings.whatsapp.replace(/\\D/g, '');
    window.open(\`https://wa.me/\${phone}?text=\${encoded}\`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative border border-slate-100 flex flex-col">
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 sticky top-0 z-20">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 block">
              {step < 5 ? \`Step \${step} of 4\` : 'Order Completed'}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {step === 1 && 'Select Fulfillment Method'}
              {step === 2 && 'Customer Contact Details'}
              {step === 3 && (method === 'delivery' ? 'Delivery Address' : 'Pickup Station')}
              {step === 4 && 'Payment & Order Review'}
              {step === 5 && 'Order Confirmation'}
            </h2>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper */}
        {step < 5 && (
          <div className="px-6 pt-4 pb-2 bg-white">
            <div className="grid grid-cols-4 gap-2">
              {[
                { num: 1, label: 'Method' },
                { num: 2, label: 'Details' },
                { num: 3, label: method === 'delivery' ? 'Address' : 'Pickup' },
                { num: 4, label: 'Payment' },
              ].map((s) => (
                <div key={s.num} className="flex flex-col gap-1">
                  <div
                    className={\`h-1.5 rounded-full transition-all duration-300 \${
                      step >= s.num ? 'bg-brand-600' : 'bg-slate-200'
                    }\`}
                  />
                  <span
                    className={\`text-[10px] font-semibold uppercase tracking-wider \${
                      step >= s.num ? 'text-brand-700' : 'text-slate-400'
                    }\`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Body */}
        <div className="p-5 sm:p-6 flex-1">
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 font-medium">
                How would you like to receive your everyday essentials?
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setMethod('delivery')}
                  className={\`p-5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between \${
                    method === 'delivery'
                      ? 'border-brand-600 bg-brand-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }\`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-brand-100 text-brand-700 rounded-xl">
                      <Truck className="w-6 h-6" />
                    </div>
                    <div
                      className={\`w-5 h-5 rounded-full border-2 flex items-center justify-center \${
                        method === 'delivery'
                          ? 'border-brand-600 bg-brand-600 text-white'
                          : 'border-slate-300'
                      }\`}
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
                      {subtotal >= storeSettings.freeDeliveryThreshold
                        ? 'FREE (Qualifies!)'
                        : \`₦\${storeSettings.standardDeliveryFee.toLocaleString()} Flat Rate\`}
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('pickup')}
                  className={\`p-5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between \${
                    method === 'pickup'
                      ? 'border-brand-600 bg-brand-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }\`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-amber-100 text-amber-800 rounded-xl">
                      <Store className="w-6 h-6" />
                    </div>
                    <div
                      className={\`w-5 h-5 rounded-full border-2 flex items-center justify-center \${
                        method === 'pickup'
                          ? 'border-brand-600 bg-brand-600 text-white'
                          : 'border-slate-300'
                      }\`}
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
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 font-medium">
                Please provide your contact details so we can coordinate your order.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chioma Adebayo"
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number (WhatsApp preferred) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0801 234 5678"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (For receipt)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. chioma@example.com"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-600 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              {method === 'delivery' ? (
                <>
                  <p className="text-xs text-slate-500 font-medium">
                    Where should our courier deliver your supermarket order?
                  </p>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Street Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Block 4, Flat 2, Admiralty Court"
                        value={address.address}
                        onChange={(e) => setAddress({ ...address, address: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-600 focus:bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          City / Area <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Lekki Phase 1"
                          value={address.city}
                          onChange={(e) => setAddress({ ...address, city: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-600 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          disabled
                          value="Lagos"
                          className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Closest Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Near Admiralty Toll Gate, opposite Zenith Bank"
                        value={address.landmark}
                        onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-600 focus:bg-white"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-xs text-slate-500 font-medium">
                    Choose your pickup supermarket branch:
                  </p>

                  <div className="space-y-3">
                    {[
                      {
                        title: "Bril's Mart Lekki Flagship",
                        desc: '122 Supermart Road, Off Admiralty Way, Lekki Phase 1',
                        hours: 'Mon - Sat: 7am - 9pm | Sun: 8am - 6pm',
                      },
                      {
                        title: "Bril's Mart Victoria Island Hub",
                        desc: 'Plot 14 Adeola Odeku Street, Victoria Island',
                        hours: 'Mon - Sat: 8am - 8pm',
                      },
                    ].map((hub, i) => (
                      <div
                        key={i}
                        onClick={() => setPickupLocation(`${hub.title} — ${hub.desc}`)}
                        className={\`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start justify-between \${
                          pickupLocation.includes(hub.title)
                            ? 'border-brand-600 bg-brand-50/50'
                            : 'border-slate-200 hover:border-slate-300'
                        }\`}
                      >
                        <div className="flex gap-3 items-start">
                          <MapPin className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{hub.title}</h4>
                            <p className="text-xs text-slate-600 mb-1">{hub.desc}</p>
                            <p className="text-[11px] text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {hub.hours}
                            </p>
                          </div>
                        </div>
                        <div
                          className={\`w-4 h-4 rounded-full border-2 mt-1 flex items-center justify-center \${
                            pickupLocation.includes(hub.title)
                              ? 'border-brand-600 bg-brand-600 text-white'
                              : 'border-slate-300'
                          }\`}
                        >
                          {pickupLocation.includes(hub.title) && <Check className="w-2.5 h-2.5" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-slate-900">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Fulfillment</span>
                  <span>
                    {actualDeliveryFee === 0 ? (
                      <strong className="text-emerald-700 uppercase font-bold text-[11px]">FREE</strong>
                    ) : (
                      \`₦\${actualDeliveryFee.toLocaleString()}\`
                    )}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount</span>
                    <span>-₦{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-base text-brand-700">₦{grandTotal.toLocaleString()}</span>
                </div>
              </div>

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
                        className={\`p-3 rounded-xl border-2 text-left flex items-center gap-2.5 transition-all text-xs font-semibold \${
                          paymentMethod === p.id
                            ? 'border-brand-600 bg-brand-50/60 text-brand-900'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }\`}
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
                </div>
              )}

              {paymentMethod === 'whatsapp' && (
                <div className="p-4 bg-brand-50/70 border border-brand-200 rounded-2xl text-xs space-y-2">
                  <p className="text-brand-900 font-semibold">
                    Prefer direct ordering via WhatsApp?
                  </p>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    Once you submit, we will automatically prepare your grocery list and open a WhatsApp chat directly with our store support team.
                  </p>
                </div>
              )}
            </div>
          )}

          {step === 5 && lastOrder && (
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
              </div>

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
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setActiveTab('shop');
                }}
                className="text-xs font-semibold text-slate-500 hover:text-brand-700 underline transition-colors"
              >
                Continue Shopping More Essentials
              </button>
            </div>
          )}
        </div>

        {/* Action Footer */}
        {step < 5 && (
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between sticky bottom-0 z-20">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as any)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-white text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => {
                  if (step === 2 && (!customer.fullName || !customer.phone)) {
                    showToast('Please provide your name and phone number', 'warning');
                    return;
                  }
                  if (step === 3 && method === 'delivery' && !address.address) {
                    showToast('Please provide your delivery street address', 'warning');
                    return;
                  }
                  setStep((s) => (s + 1) as any);
                }}
                className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-brand-600/20 transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCompleteOrder}
                disabled={isProcessing}
                className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-brand-600/25 transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Pay ₦{grandTotal.toLocaleString()}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
`;

fs.writeFileSync('src/components/cart/CheckoutModal.tsx', checkoutTsx, 'utf8');
console.log('src/components/cart/CheckoutModal.tsx generated cleanly!');