import React from 'react';

interface Props {
  customer: { fullName: string; phone: string; email: string };
  setCustomer: React.Dispatch<React.SetStateAction<{ fullName: string; phone: string; email: string }>>;
}

export const CheckoutDetails: React.FC<Props> = ({ customer, setCustomer }) => {
  return (
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
            Email Address (For e-receipt)
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
  );
};