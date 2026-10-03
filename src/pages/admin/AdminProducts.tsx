import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { categories } from '../../data/storeInfo';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Save,
  Tag,
  Package,
  Check,
  X,
} from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();

  const [filterQuery, setFilterQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});

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

  const filteredProducts = products.filter((p) => {
    if (selectedCat !== 'all' && p.category !== selectedCat) return false;
    if (
      filterQuery.trim() &&
      !p.name.toLowerCase().includes(filterQuery.toLowerCase()) &&
      !p.brand.toLowerCase().includes(filterQuery.toLowerCase())
    )
      return false;
    return true;
  });

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

  return (
    <div className="space-y-6">
      {/* Top Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex flex-1 gap-2 items-center">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search products by name or brand..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-600 focus:bg-white"
            />
          </div>

          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
          >
            <option value="all">All Aisles ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all"
        >
          {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{isAdding ? 'Close Form' : 'Add New Product'}</span>
        </button>
      </div>

      {/* Add Form Drawer/Box */}
      {isAdding && (
        <form
          onSubmit={handleAddSubmit}
          className="p-6 bg-white border border-brand-200 rounded-3xl space-y-4 shadow-sm animate-slide-up"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Package className="w-4 h-4 text-brand-600" />
              <span>Add Product to Supermarket Inventory</span>
            </h3>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Product Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Peak Milk Powder"
                value={newProd.name}
                onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Supermarket Category</label>
              <select
                value={newProd.category}
                onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
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
                placeholder="e.g. Nestlé / Peak / Unilever"
                value={newProd.brand}
                onChange={(e) => setNewProd({ ...newProd, brand: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Retail Price (₦)</label>
              <input
                type="number"
                required
                value={newProd.price}
                onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Previous / Strikethrough Price (₦)</label>
              <input
                type="number"
                value={newProd.previousPrice ?? ''}
                onChange={(e) => setNewProd({ ...newProd, previousPrice: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Discount %</label>
              <input
                type="number"
                value={newProd.discount ?? ''}
                onChange={(e) => setNewProd({ ...newProd, discount: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Package Weight / Size</label>
              <input
                type="text"
                placeholder="e.g. 400g Tin / 1kg Bag"
                value={newProd.weight}
                onChange={(e) => setNewProd({ ...newProd, weight: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Stock Count</label>
              <input
                type="number"
                value={newProd.stockCount}
                onChange={(e) => setNewProd({ ...newProd, stockCount: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Image URL</label>
              <input
                type="text"
                value={newProd.image}
                onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Short Description</label>
            <textarea
              rows={2}
              placeholder="Product summary for customer..."
              value={newProd.description}
              onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-sm"
            >
              Save Product
            </button>
          </div>
        </form>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4">Item & Brand</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price (₦)</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Promotion</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => {
                const isEditing = editingId === p.id;
                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 rounded-xl object-cover bg-slate-100 border border-slate-200 flex-shrink-0"
                        />
                        <div className="min-w-0 max-w-xs">
                          <p className="font-bold text-slate-900 truncate">{p.name}</p>
                          <span className="text-[11px] text-slate-400 font-medium">
                            {p.brand} • {p.weight}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 capitalize text-slate-600 font-medium">
                      {p.category.replace('-', ' ')}
                    </td>

                    <td className="p-4">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editForm.price ?? p.price}
                          onChange={(e) =>
                            setEditForm({ ...editForm, price: Number(e.target.value) })
                          }
                          className="w-24 p-1.5 border rounded-lg text-xs font-bold bg-white"
                        />
                      ) : (
                        <div className="font-bold text-slate-900 text-sm">
                          ₦{p.price.toLocaleString()}
                          {p.previousPrice && (
                            <span className="text-[11px] text-slate-400 line-through block font-normal">
                              ₦{p.previousPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      )}
                    </td>

                    <td className="p-4">
                      {isEditing ? (
                        <div className="space-y-1">
                          <input
                            type="number"
                            value={editForm.stockCount ?? p.stockCount}
                            onChange={(e) =>
                              setEditForm({ ...editForm, stockCount: Number(e.target.value) })
                            }
                            className="w-20 p-1 border rounded text-xs"
                          />
                          <label className="flex items-center gap-1 cursor-pointer text-[11px]">
                            <input
                              type="checkbox"
                              checked={editForm.inStock ?? p.inStock}
                              onChange={(e) =>
                                setEditForm({ ...editForm, inStock: e.target.checked })
                              }
                            />
                            <span>In Stock</span>
                          </label>
                        </div>
                      ) : (
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            p.inStock
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {p.inStock ? `${p.stockCount} in stock` : 'Out of Stock'}
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      {isEditing ? (
                        <div className="space-y-1">
                          <label className="flex items-center gap-1 cursor-pointer text-[11px]">
                            <input
                              type="checkbox"
                              checked={editForm.isOnSale ?? p.isOnSale}
                              onChange={(e) =>
                                setEditForm({ ...editForm, isOnSale: e.target.checked })
                              }
                            />
                            <span>On Sale</span>
                          </label>
                          {editForm.isOnSale && (
                            <input
                              type="number"
                              placeholder="Discount %"
                              value={editForm.discount ?? ''}
                              onChange={(e) =>
                                setEditForm({ ...editForm, discount: Number(e.target.value) })
                              }
                              className="w-16 p-1 border rounded text-xs"
                            />
                          )}
                        </div>
                      ) : p.isOnSale ? (
                        <span className="inline-flex items-center gap-1 text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                          <Tag className="w-3 h-3 text-amber-700" />
                          {p.discount}% OFF
                        </span>
                      ) : (
                        <span className="text-slate-400 font-medium">—</span>
                      )}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {isEditing ? (
                          <button
                            onClick={() => saveEdit(p.id)}
                            className="p-2 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors shadow-xs"
                            title="Save Changes"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => startEdit(p)}
                            className="p-2 text-slate-500 hover:text-brand-700 hover:bg-slate-100 rounded-xl transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
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
    </div>
  );
};