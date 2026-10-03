import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { categories } from '../../data/storeInfo';
import {
  X,
  Plus,
  Edit2,
  Trash2,
  Save,
  RotateCcw,
  Search,
  CheckCircle2,
  Sliders,
  Settings,
  Package,
} from 'lucide-react';

export const AdminModal: React.FC = () => {
  const {
    products,
    storeSettings,
    isAdminOpen,
    setIsAdminOpen,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStoreSettings,
    resetToDefaults,
  } = useStore();

  const [activeAdminTab, setActiveAdminTab] = useState<'products' | 'settings'>('products');
  const [filterQuery, setFilterQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});

  // New product state
  const [isAdding, setIsAdding] = useState(false);
  const [newProd, setNewProd] = useState<Omit<Product, 'id'>>({
    name: '',
    category: 'groceries',
    brand: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80',
    price: 1000,
    previousPrice: 1200,
    discount: 16,
    inStock: true,
    stockCount: 50,
    weight: '500g',
    isFeatured: true,
    isOnSale: true,
    rating: 4.8,
    reviewsCount: 12,
    sku: 'BRL-NEW-01',
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(storeSettings);

  if (!isAdminOpen) return null;

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(filterQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setEditForm({ ...p });
  };

  const saveEdit = (id: string) => {
    updateProduct(id, editForm);
    setEditingId(null);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) return;
    addProduct(newProd);
    setIsAdding(false);
    setNewProd({
      name: '',
      category: 'groceries',
      brand: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80',
      price: 1000,
      previousPrice: 1200,
      discount: 16,
      inStock: true,
      stockCount: 50,
      weight: '500g',
      isFeatured: true,
      isOnSale: true,
      rating: 4.8,
      reviewsCount: 12,
      sku: 'BRL-NEW-01',
    });
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings(settingsForm);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl relative border border-slate-100 flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-600 rounded-xl">
              <Sliders className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Bril's Mart Store Manager (CMS)</h2>
              <p className="text-xs text-slate-400">
                Update products, prices, stock levels, promotions, and store info in real-time.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="px-6 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveAdminTab('products')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeAdminTab === 'products'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products Catalog ({products.length})</span>
            </button>
            <button
              onClick={() => setActiveAdminTab('settings')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeAdminTab === 'settings'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Store Information & Hours</span>
            </button>
          </div>

          <button
            onClick={resetToDefaults}
            className="px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Reset catalog and settings to demo state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {activeAdminTab === 'products' ? (
            <div className="space-y-4">
              {/* Top toolbar */}
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search products to edit..."
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-600"
                  />
                </div>

                <button
                  onClick={() => setIsAdding(!isAdding)}
                  className="w-full sm:w-auto px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAdding ? 'Close Form' : 'Add New Product'}</span>
                </button>
              </div>

              {/* Add Product Form */}
              {isAdding && (
                <form
                  onSubmit={handleAddSubmit}
                  className="p-5 bg-brand-50/50 border border-brand-200 rounded-2xl space-y-3 animate-slide-up"
                >
                  <h3 className="text-xs font-bold text-brand-900 uppercase tracking-wider">
                    Add Product to Supermarket Catalog
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Product Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Golden Penny Spaghetti"
                        value={newProd.name}
                        onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Category</label>
                      <select
                        value={newProd.category}
                        onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Brand</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Nestlé"
                        value={newProd.brand}
                        onChange={(e) => setNewProd({ ...newProd, brand: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Price (₦)</label>
                      <input
                        type="number"
                        required
                        value={newProd.price}
                        onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Weight / Unit</label>
                      <input
                        type="text"
                        placeholder="e.g. 500g Pack"
                        value={newProd.weight}
                        onChange={(e) => setNewProd({ ...newProd, weight: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Stock Count</label>
                      <input
                        type="number"
                        value={newProd.stockCount}
                        onChange={(e) => setNewProd({ ...newProd, stockCount: Number(e.target.value) })}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAdding(false)}
                      className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl"
                    >
                      Save Product
                    </button>
                  </div>
                </form>
              )}

              {/* Products Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 text-slate-700 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Stock</th>
                      <th className="p-3">Promotion</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredProducts.map((p) => {
                      const isEditing = editingId === p.id;
                      return (
                        <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-9 h-9 rounded-lg object-cover bg-slate-100 flex-shrink-0"
                              />
                              <div>
                                <p className="font-bold text-slate-800 line-clamp-1">{p.name}</p>
                                <span className="text-[11px] text-slate-400 font-medium">
                                  {p.brand} • {p.weight}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 capitalize text-slate-600">
                            {p.category.replace('-', ' ')}
                          </td>
                          <td className="p-3">
                            {isEditing ? (
                              <input
                                type="number"
                                value={editForm.price ?? p.price}
                                onChange={(e) =>
                                  setEditForm({ ...editForm, price: Number(e.target.value) })
                                }
                                className="w-20 p-1 border rounded text-xs font-bold"
                              />
                            ) : (
                              <span className="font-bold text-slate-900">
                                ₦{p.price.toLocaleString()}
                              </span>
                            )}
                          </td>
                          <td className="p-3">
                            {isEditing ? (
                              <label className="flex items-center gap-1 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={editForm.inStock ?? p.inStock}
                                  onChange={(e) =>
                                    setEditForm({ ...editForm, inStock: e.target.checked })
                                  }
                                />
                                <span>In Stock</span>
                              </label>
                            ) : (
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  p.inStock
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}
                              >
                                {p.inStock ? `${p.stockCount} in stock` : 'Out of Stock'}
                              </span>
                            )}
                          </td>
                          <td className="p-3">
                            {isEditing ? (
                              <label className="flex items-center gap-1 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={editForm.isOnSale ?? p.isOnSale}
                                  onChange={(e) =>
                                    setEditForm({ ...editForm, isOnSale: e.target.checked })
                                  }
                                />
                                <span>On Sale</span>
                              </label>
                            ) : p.isOnSale ? (
                              <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full text-[10px] font-bold">
                                {p.discount}% OFF Deal
                              </span>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {isEditing ? (
                                <button
                                  onClick={() => saveEdit(p.id)}
                                  className="p-1.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700"
                                  title="Save"
                                >
                                  <Save className="w-3.5 h-3.5" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => startEdit(p)}
                                  className="p-1.5 text-slate-500 hover:text-brand-700 hover:bg-slate-100 rounded-lg"
                                  title="Edit"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button
                                onClick={() => deleteProduct(p.id)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveSettings} className="max-w-2xl space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Storefront Contact & Hours Configuration
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Supermarket Name</label>
                  <input
                    type="text"
                    value={settingsForm.storeName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Customer Care Phone</label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">WhatsApp Hotline</label>
                    <input
                      type="text"
                      value={settingsForm.whatsapp}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Store Address</label>
                  <input
                    type="text"
                    value={settingsForm.address}
                    onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Monday – Saturday Hours</label>
                    <input
                      type="text"
                      value={settingsForm.weekdayHours}
                      onChange={(e) => setSettingsForm({ ...settingsForm, weekdayHours: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Sunday Hours</label>
                    <input
                      type="text"
                      value={settingsForm.sundayHours}
                      onChange={(e) => setSettingsForm({ ...settingsForm, sundayHours: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Free Delivery Min. Order (₦)</label>
                    <input
                      type="number"
                      value={settingsForm.freeDeliveryThreshold}
                      onChange={(e) => setSettingsForm({ ...settingsForm, freeDeliveryThreshold: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Standard Delivery Fee (₦)</label>
                    <input
                      type="number"
                      value={settingsForm.standardDeliveryFee}
                      onChange={(e) => setSettingsForm({ ...settingsForm, standardDeliveryFee: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Store Settings</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};