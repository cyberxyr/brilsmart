import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Save, RotateCcw, Download, KeyRound, ShieldCheck } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { storeSettings, updateStoreSettings, resetToDefaults, products, showToast } = useStore();
  const [form, setForm] = useState(storeSettings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings(form);
  };

  const exportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `brils_mart_catalog_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Catalog exported as JSON file', 'info');
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Store Information Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div>
          <h3 className="text-base font-bold text-slate-900">Store Information & Business Hours</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure contact hotlines, location, and operational schedule displayed on the storefront.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="sm:col-span-2">
            <label className="block font-semibold text-slate-700 mb-1">Supermarket Name</label>
            <input
              type="text"
              value={form.storeName}
              onChange={(e) => setForm({ ...form, storeName: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Customer Care Phone</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">WhatsApp Hotline</label>
            <input
              type="text"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold text-slate-700 mb-1">Official Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold text-slate-700 mb-1">Physical Store Address</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Weekday Hours (Mon – Sat)</label>
            <input
              type="text"
              value={form.weekdayHours}
              onChange={(e) => setForm({ ...form, weekdayHours: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Sunday Hours</label>
            <input
              type="text"
              value={form.sundayHours}
              onChange={(e) => setForm({ ...form, sundayHours: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Free Delivery Min. Order (₦)</label>
            <input
              type="number"
              value={form.freeDeliveryThreshold}
              onChange={(e) => setForm({ ...form, freeDeliveryThreshold: Number(e.target.value) })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Standard Delivery Fee (₦)</label>
            <input
              type="number"
              value={form.standardDeliveryFee}
              onChange={(e) => setForm({ ...form, standardDeliveryFee: Number(e.target.value) })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
            />
          </div>

          {/* Admin Passcode Security */}
          <div className="sm:col-span-2 pt-2 border-t border-slate-100">
            <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-brand-600" />
              <span>Manager Access Passcode (PIN)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 1234 or custom password"
              value={form.adminPasscode ?? '1234'}
              onChange={(e) => setForm({ ...form, adminPasscode: e.target.value })}
              className="w-full sm:w-64 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs font-bold"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Used to unlock the staff portal. Keep this safe from customers.
            </p>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Configuration</span>
          </button>
        </div>
      </form>

      {/* Catalog Backup & Reset */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Database Tools & Sample Catalog</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Export current catalog data or restore factory demo items at any time.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={exportData}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Catalog (JSON)</span>
          </button>

          <button
            type="button"
            onClick={resetToDefaults}
            className="px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset to Original Demo Catalog</span>
          </button>
        </div>
      </div>
    </div>
  );
};