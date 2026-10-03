import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { MessageSquare, X, Send, ShoppingBag } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const { storeSettings } = useStore();
  const { items, total } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const phone = storeSettings.whatsapp.replace(/\D/g, '');

  const sendInquiry = (text: string) => {
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
    setIsOpen(false);
  };

  const sendCartInquiry = () => {
    if (items.length === 0) {
      sendInquiry("Hello Bril's Mart, I have a quick question about products in stock.");
      return;
    }
    const list = items
      .map((i) => `• ${i.product.name} x${i.quantity} (₦${(i.product.price * i.quantity).toLocaleString()})`)
      .join('\n');
    const msg = `Hello Bril's Mart! I am looking to purchase the following items:\n${list}\n\nTotal: ₦${total.toLocaleString()}\nAre these currently available for delivery?`;
    sendInquiry(msg);
  };

  return (
    <div className="fixed bottom-20 sm:bottom-8 right-4 sm:right-6 z-40">
      {/* Popover */}
      {isOpen && (
        <div className="mb-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-slide-up">
          <div className="bg-[#25D366] p-3.5 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <div>
                <h4 className="font-bold text-xs">Chat with Bril's Mart</h4>
                <p className="text-[10px] text-emerald-100">Usually responds in minutes</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-emerald-100 hover:text-white rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 space-y-2 text-xs">
            <p className="text-slate-600 text-[11px]">
              How can our supermarket attendants help you today?
            </p>

            <button
              onClick={() => sendInquiry("Hello Bril's Mart! Do you have fresh items in stock today?")}
              className="w-full text-left p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-100 text-slate-700 font-medium transition-colors"
            >
              🥦 Check product availability
            </button>

            <button
              onClick={() => sendInquiry("Hello, I want to inquire about home delivery to my area.")}
              className="w-full text-left p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-100 text-slate-700 font-medium transition-colors"
            >
              🚚 Delivery coverage inquiry
            </button>

            {items.length > 0 && (
              <button
                onClick={sendCartInquiry}
                className="w-full text-left p-2 rounded-xl bg-brand-50 hover:bg-brand-100 border border-brand-200 text-brand-900 font-bold transition-colors flex items-center justify-between"
              >
                <span>🛒 Order my current {items.length} items</span>
                <Send className="w-3.5 h-3.5 text-brand-700" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95 group relative"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="w-7 h-7 fill-white" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-accent-yellow border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-accent-yellow border-2 border-white" />
      </button>
    </div>
  );
};