import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order } from '../../types';
import {
  ShoppingBag,
  MessageSquare,
  Truck,
  Store,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus, storeSettings } = useStore();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredOrders = orders.filter((o) => {
    if (filterStatus !== 'all' && o.status !== filterStatus) return false;
    return true;
  });

  const sendWhatsAppCustomer = (order: Order) => {
    const phone = order.customer.phone.replace(/\D/g, '');
    const msg = `Hello ${order.customer.fullName}! This is Bril's Mart regarding your Order #${order.id}. Current Status: ${order.status.toUpperCase()}. Total: ₦${order.total.toLocaleString()}.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Top filter bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Customer Orders Management</h3>
          <p className="text-xs text-slate-500">Track, update and fulfill incoming supermarket orders</p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-600">Filter:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700"
          >
            <option value="all">All Orders ({orders.length})</option>
            <option value="confirmed">Confirmed</option>
            <option value="packing">Packing</option>
            <option value="out_for_delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="p-12 bg-white rounded-3xl border border-slate-200 text-center space-y-3">
          <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
          <h4 className="font-bold text-slate-800 text-sm">No orders match this status</h4>
          <p className="text-xs text-slate-400">When customers place orders, they will appear here instantly.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-extrabold text-slate-900 bg-slate-100 px-3 py-1 rounded-xl">
                      #{order.id}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{order.date}</span>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        order.method === 'delivery'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {order.method === 'delivery' ? <Truck className="w-3 h-3" /> : <Store className="w-3 h-3" />}
                      {order.method === 'delivery' ? 'Home Delivery' : 'Store Pickup'}
                    </span>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500">Status:</span>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                      className={`p-2 rounded-xl text-xs font-bold border ${
                        order.status === 'delivered'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : order.status === 'out_for_delivery'
                          ? 'bg-blue-50 text-blue-800 border-blue-300'
                          : order.status === 'packing'
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : 'bg-purple-50 text-purple-800 border-purple-300'
                      }`}
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="packing">Packing Items</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Customer Info */}
                  <div className="p-3.5 bg-slate-50 rounded-2xl space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Customer</span>
                    <p className="font-bold text-slate-800">{order.customer.fullName}</p>
                    <p className="text-slate-600 font-medium">📞 {order.customer.phone}</p>
                    {order.customer.email && <p className="text-slate-500">✉️ {order.customer.email}</p>}
                  </div>

                  {/* Destination */}
                  <div className="p-3.5 bg-slate-50 rounded-2xl space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Fulfillment Location</span>
                    {order.method === 'delivery' && order.address ? (
                      <div>
                        <p className="font-bold text-slate-800">{order.address.address}</p>
                        <p className="text-slate-600">{order.address.city}, {order.address.state}</p>
                        {order.address.landmark && <p className="text-slate-400 text-[11px]">Landmark: {order.address.landmark}</p>}
                      </div>
                    ) : (
                      <p className="font-bold text-slate-800">{order.pickupLocation}</p>
                    )}
                  </div>

                  {/* Payment & Financials */}
                  <div className="p-3.5 bg-slate-50 rounded-2xl space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Payment & Invoice</span>
                    <p className="font-bold text-slate-800 capitalize">Method: {order.paymentMethod}</p>
                    <p className="text-slate-600">Subtotal: ₦{order.subtotal.toLocaleString()}</p>
                    <p className="text-brand-700 font-black text-sm">Total: ₦{order.total.toLocaleString()}</p>
                  </div>
                </div>

                {/* Items preview list */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Ordered Groceries ({order.items.length} items):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2 bg-slate-50 rounded-xl flex items-center gap-2.5 text-xs"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-8 h-8 rounded-lg object-cover bg-white border border-slate-200"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-800 truncate">{item.product.name}</p>
                          <span className="text-[11px] text-slate-400 font-medium">
                            Qty: {item.quantity} × ₦{item.product.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer action */}
                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => sendWhatsAppCustomer(order)}
                    className="px-4 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Contact Customer via WhatsApp</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};