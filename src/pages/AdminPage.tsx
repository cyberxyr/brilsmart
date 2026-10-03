import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { AdminProducts } from './admin/AdminProducts';
import { AdminOrders } from './admin/AdminOrders';
import { AdminSettings } from './admin/AdminSettings';
import {
  Package,
  ShoppingBag,
  Settings,
  Store,
  ArrowLeft,
  ExternalLink,
  Tag,
  TrendingUp,
  ShieldAlert,
  Lock,
  LogOut,
  KeyRound,
  CheckCircle,
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    products,
    orders,
    setActiveTab,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
  } = useStore();

  const [activeSection, setActiveSection] = useState<'products' | 'orders' | 'settings'>('products');
  const [passcodeInput, setPasscodeInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // If NOT authenticated, show the secure Staff Login Screen
  if (!isAdminAuthenticated) {
    const handleLoginSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMsg('');
      const success = loginAdmin(passcodeInput);
      if (!success) {
        setErrorMsg('Incorrect manager passcode. Access denied.');
      }
    };

    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6 animate-slide-up border border-slate-800">
          {/* Top Logo & Shield */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-brand-500 flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-7 h-7 stroke-[2.2]" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900">
              Bril's Mart Staff Portal
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Restricted access. Authorized store management & personnel only.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Staff / Manager Passcode
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder="Enter manager passcode..."
                  value={passcodeInput}
                  onChange={(e) => {
                    setPasscodeInput(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono tracking-widest focus:outline-none focus:border-brand-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold flex items-center gap-2 animate-fade-in">
                <ShieldAlert className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-brand-600 hover:bg-brand-700 active:scale-98 text-white font-bold text-xs rounded-xl shadow-md shadow-brand-600/25 transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Unlock Staff Portal</span>
            </button>
          </form>

          {/* Demo hint */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 text-center">
            <span className="font-semibold text-slate-700">Default Staff Passcode:</span>{' '}
            <code className="bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded font-bold font-mono">
              1234
            </code>
          </div>

          {/* Return to Customer Store */}
          <div className="pt-2 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => setActiveTab('home')}
              className="text-xs font-semibold text-slate-500 hover:text-brand-700 flex items-center justify-center gap-1.5 mx-auto transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Customer Storefront</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // KPI Calculations
  const totalProducts = products.length;
  const onSaleCount = products.filter((p) => p.isOnSale).length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const handleBackToStore = () => {
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-800">
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col justify-between flex-shrink-0">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-md">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-extrabold text-sm tracking-tight text-white">
                  Bril's <span className="text-brand-400">Mart</span>
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Staff Portal
                </span>
              </div>
            </div>
          </div>

          {/* Nav List */}
          <div className="p-4 space-y-1">
            <button
              onClick={() => setActiveSection('products')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeSection === 'products'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products ({totalProducts})</span>
            </button>

            <button
              onClick={() => setActiveSection('orders')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeSection === 'orders'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders</span>
              </span>
              <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded-full font-mono">
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveSection('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeSection === 'settings'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Store Settings</span>
            </button>
          </div>
        </div>

        {/* Sidebar Footer with Logout */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={handleBackToStore}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Customer Storefront</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="w-full py-2.5 px-3 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Lock & Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN ADMIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 capitalize">
              {activeSection === 'products' && 'Inventory & Product Catalog'}
              {activeSection === 'orders' && 'Customer Orders & Dispatch'}
              {activeSection === 'settings' && 'Store Configuration & Passcode'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Authorized session active • All changes sync to live storefront
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleBackToStore}
              className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <span>View Storefront</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={logoutAdmin}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Lock Admin Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* KPI Overview Strip */}
        <div className="p-6 pb-0">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Items</span>
                <p className="text-xl font-extrabold text-slate-900">{totalProducts}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Deals</span>
                <p className="text-xl font-extrabold text-slate-900">{onSaleCount}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Orders Received</span>
                <p className="text-xl font-extrabold text-slate-900">{orders.length}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Gross Sales</span>
                <p className="text-xl font-extrabold text-brand-700">₦{totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Body View */}
        <div className="p-6">
          {activeSection === 'products' && <AdminProducts />}
          {activeSection === 'orders' && <AdminOrders />}
          {activeSection === 'settings' && <AdminSettings />}
        </div>
      </main>
    </div>
  );
};