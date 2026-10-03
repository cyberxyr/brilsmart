import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { categories } from '../data/storeInfo';
import { ProductCard } from '../components/product/ProductCard';
import {
  Search,
  Filter,
  ArrowUpDown,
  RotateCcw,
  PackageOpen,
  X,
  SlidersHorizontal,
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { products, selectedCategory, setSelectedCategory } = useStore();

  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(15000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.brand))).filter(Boolean);
    return ['all', ...list];
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        // Search filter
        if (
          search.trim() &&
          !p.name.toLowerCase().includes(search.toLowerCase()) &&
          !p.brand.toLowerCase().includes(search.toLowerCase()) &&
          !p.category.toLowerCase().includes(search.toLowerCase())
        )
          return false;
        // Brand filter
        if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;
        // In Stock filter
        if (inStockOnly && !p.inStock) return false;
        // On Sale filter
        if (onSaleOnly && !p.isOnSale) return false;
        // Price filter
        if (p.price > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // featured default
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, search, selectedBrand, inStockOnly, onSaleOnly, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSearch('');
    setInStockOnly(false);
    setOnSaleOnly(false);
    setMaxPrice(15000);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedBrand !== 'all' ||
    search !== '' ||
    inStockOnly ||
    onSaleOnly ||
    maxPrice < 15000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Supermarket Catalog
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Shop All Everyday Products
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Showing {filteredProducts.length} of {products.length} fresh products
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-brand-600 shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-brand-600 shadow-2xs"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="md:hidden px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* SIDEBAR FILTERS (Desktop + Mobile Drawer) */}
        <div
          className={`${
            isMobileFilterOpen ? 'block fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden md:block'
          } space-y-6 md:sticky md:top-24 bg-white md:bg-transparent rounded-3xl`}
        >
          {isMobileFilterOpen && (
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 md:hidden">
              <h3 className="font-bold text-base text-slate-900">Filter Products</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Categories
              </h3>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-xl font-semibold flex items-center justify-between transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>All Aisles</span>
                  <span className="text-[10px] text-slate-400">{products.length}</span>
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl font-semibold flex items-center justify-between transition-colors ${
                      selectedCategory === c.id
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{c.icon}</span>
                      <span>{c.name}</span>
                    </span>
                    <span className="text-[10px] text-slate-400">{c.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Max Price
                </h3>
                <span className="text-xs font-bold text-brand-700">₦{maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500"
                max="15000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-brand-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>₦500</span>
                <span>₦15,000+</span>
              </div>
            </div>

            {/* Brand Filter */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Brand
              </h3>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-brand-600"
              >
                <option value="all">All Brands</option>
                {brands
                  .filter((b) => b !== 'all')
                  .map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
              </select>
            </div>

            {/* Toggles */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500"
                />
                <span className="font-semibold text-slate-700">In Stock Only</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onSaleOnly}
                  onChange={(e) => setOnSaleOnly(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500"
                />
                <span className="font-semibold text-slate-700">On Sale / Discounted</span>
              </label>
            </div>

            {/* Reset Button */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="md:col-span-3 space-y-6">
          {/* Active filter badges */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">Active filters:</span>
              {selectedCategory !== 'all' && (
                <span className="px-2.5 py-1 bg-brand-100 text-brand-800 rounded-lg flex items-center gap-1 font-semibold">
                  Category: {selectedCategory.replace('-', ' ')}
                  <button onClick={() => setSelectedCategory('all')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedBrand !== 'all' && (
                <span className="px-2.5 py-1 bg-slate-200 text-slate-800 rounded-lg flex items-center gap-1 font-semibold">
                  Brand: {selectedBrand}
                  <button onClick={() => setSelectedBrand('all')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {onSaleOnly && (
                <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg flex items-center gap-1 font-semibold">
                  Deals Only
                  <button onClick={() => setOnSaleOnly(false)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {search && (
                <span className="px-2.5 py-1 bg-slate-200 text-slate-800 rounded-lg flex items-center gap-1 font-semibold">
                  Search: "{search}"
                  <button onClick={() => setSearch('')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Grid */}
          {filteredProducts.length === 0 ? (
            <div className="p-12 bg-white rounded-3xl border border-slate-200 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <PackageOpen className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">We couldn't find what you're looking for</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Try adjusting your search keywords, price filter, or choose one of our popular aisles.
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};