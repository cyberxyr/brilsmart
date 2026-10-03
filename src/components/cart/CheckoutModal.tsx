import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';
import { Order, OrderMethod, PaymentMethod } from '../../types';
import confetti from 'canvas-confetti';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { CheckoutFulfillment } from './CheckoutFulfillment';
import { CheckoutDetails } from './CheckoutDetails';
import { CheckoutAddress } from './CheckoutAddress';
import { CheckoutPayment } from './CheckoutPayment';
import { CheckoutConfirmation } from './CheckoutConfirmation';

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

  const { storeSettings, showToast, setActiveTab, addOrder } = useStore();

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
    "Bril's Mart Lekki Flagship — 122 Supermart Road, Off Admiralty Way, Lekki Phase 1"
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
    showToast(`Copied ${label} to clipboard!`, 'info');
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

      addOrder(newOrder);
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

      showToast(`Order #${orderId} confirmed successfully!`, 'success');
    }, 1200);
  };

  const openWhatsAppReceipt = (order: Order) => {
    const encoded = generateWhatsAppOrderMessage(order);
    const phone = storeSettings.whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative border border-slate-100 flex flex-col">
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 sticky top-0 z-20">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 block">
              {step < 5 ? `Step ${step} of 4` : 'Order Completed'}
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

        {/* Stepper Header */}
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
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      step >= s.num ? 'bg-brand-600' : 'bg-slate-200'
                    }`}
                  />
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider ${
                      step >= s.num ? 'text-brand-700' : 'text-slate-400'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Body Steps */}
        <div className="p-5 sm:p-6 flex-1">
          {step === 1 && (
            <CheckoutFulfillment
              method={method}
              setMethod={setMethod}
              subtotal={subtotal}
              freeDeliveryThreshold={storeSettings.freeDeliveryThreshold}
              standardDeliveryFee={storeSettings.standardDeliveryFee}
            />
          )}

          {step === 2 && (
            <CheckoutDetails customer={customer} setCustomer={setCustomer} />
          )}

          {step === 3 && (
            <CheckoutAddress
              method={method}
              address={address}
              setAddress={setAddress}
              pickupLocation={pickupLocation}
              setPickupLocation={setPickupLocation}
            />
          )}

          {step === 4 && (
            <CheckoutPayment
              method={method}
              subtotal={subtotal}
              actualDeliveryFee={actualDeliveryFee}
              discount={discount}
              grandTotal={grandTotal}
              itemsCount={items.length}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              copiedBank={copiedBank}
              copyToClipboard={copyToClipboard}
              cardDetails={cardDetails}
              setCardDetails={setCardDetails}
            />
          )}

          {step === 5 && lastOrder && (
            <CheckoutConfirmation
              lastOrder={lastOrder}
              openWhatsAppReceipt={openWhatsAppReceipt}
              onContinueShopping={() => {
                setIsCheckoutOpen(false);
                setActiveTab('shop');
              }}
            />
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