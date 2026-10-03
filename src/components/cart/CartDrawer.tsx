import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    itemsCount,
    subtotal,
    deliveryFee,
    discount,
    total,
    couponCode,
    isDrawerOpen,
    setIsDrawerOpen,
    setIsCheckoutOpen,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const { storeSettings, setActiveTab } = useStore();
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isDrawerOpen) return null;

  const freeDeliveryThreshold = storeSettings.freeDeliveryThreshold;
  const progressToFree = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
  const amountLeftForFree = Math.max(0, freeDeliveryThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyCoupon(promoInput);
    if (res.success) {
      setPromoMessage({ text: res.message, error: false });
      setPromoInput('');
    } else {
      setPromoMessage({ text: res.message, error: true });
    }
  };

  const handleProceedCheckout = () => {
    setIsDrawerOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-brand-100 text-brand-700 rounded-xl">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Your Cart</h2>
              <p className="text-xs text-slate-500 font-medium">
                {itemsCount} {itemsCount === 1 ? 'item' : 'items'} in basket
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="px-5 py-3 bg-brand-50/70 border-b border-brand-100/60">
          <div className="flex items-center justify-between text-xs font-semibold text-brand-900 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              {amountLeftForFree > 0 ? (
                <>Add <strong>₦{amountLeftForFree.toLocaleString()}</strong> more for <strong>FREE Delivery</strong></>
              ) : (
                <span className="text-emerald-700 font-bold">🎉 You qualify for FREE Delivery!</span>
              )}
            </span>
            <span className="text-brand-700">{progressToFree}%</span>
          </div>
          <div className="w-full bg-brand-200/60 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-brand-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressToFree}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-slate-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-1">Your cart is empty</h3>
              <p className="text-xs text-slate-500 max-w-xs mb-6">
                Looks like you haven’t added any groceries or snacks yet.
              </p>
              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  setActiveTab('shop');
                }}
                className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm transition-all shadow-md shadow-brand-600/20"
              >
                Browse Everyday Products
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="py-3.5 first:pt-0 flex gap-3 group">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover bg-slate-100 border border-slate-200 flex-shrink-0"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-900 line-clamp-1 group-hover:text-brand-700 transition-colors">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">{item.product.weight}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Stepper */}
                    <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 p-0.5">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-slate-600 hover:bg-white rounded transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-slate-600 hover:bg-white rounded transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price calculation */}
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-900">
                        ₦{(item.product.price * item.quantity).toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        ₦{item.product.price.toLocaleString()} each
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/70 space-y-3">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Promo Code (e.g. BRIL10)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 font-medium uppercase"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Apply
              </button>
            </form>

            {/* Promo Message */}
            {couponCode && (
              <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Coupon "{couponCode}" applied
                </span>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-xs font-bold text-emerald-900 hover:underline"
                >
                  Remove
                </button>
              </div>
            )}
            {promoMessage && promoMessage.error && (
              <p className="text-[11px] text-rose-600 font-medium">{promoMessage.text}</p>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-slate-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase text-[11px]">FREE</span>
                  ) : (
                    `₦${deliveryFee.toLocaleString()}`
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
                <span className="text-base text-brand-700">₦{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <div className="pt-2 space-y-2">
              <button
                onClick={handleProceedCheckout}
                className="w-full py-3.5 px-4 bg-brand-600 hover:bg-brand-700 active:scale-[0.99] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-600/25 transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-full py-2 text-center text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};