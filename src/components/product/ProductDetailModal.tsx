import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { X, Star, ShoppingCart, Truck, ShieldCheck, RefreshCw, Plus, Minus, Check } from 'lucide-react';
import { Badge } from '../common/Badge';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, products } = useStore();
  const { addToCart, setIsCheckoutOpen } = useCart();
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!selectedProduct) return null;

  const handleAddToCart = () => {
    if (!selectedProduct.inStock) return;
    addToCart(selectedProduct, qty);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const handleBuyNow = () => {
    if (!selectedProduct.inStock) return;
    addToCart(selectedProduct, qty);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  // Related products from same category
  const related = products
    .filter((p) => p.category === selectedProduct.category && p.id !== selectedProduct.id)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-slate-100">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 bg-slate-100 hover:bg-slate-200 text-slate-600 p-2 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          {/* Left: Product Image */}
          <div className="flex flex-col">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              {selectedProduct.discount && (
                <div className="absolute top-3 left-3">
                  <Badge variant="yellow" size="md">
                    {selectedProduct.discount}% OFF
                  </Badge>
                </div>
              )}
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <Truck className="w-4 h-4 mx-auto text-brand-600 mb-1" />
                <span className="text-[11px] text-slate-600 font-medium block">Fast Delivery</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <ShieldCheck className="w-4 h-4 mx-auto text-brand-600 mb-1" />
                <span className="text-[11px] text-slate-600 font-medium block">100% Genuine</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <RefreshCw className="w-4 h-4 mx-auto text-brand-600 mb-1" />
                <span className="text-[11px] text-slate-600 font-medium block">Easy Return</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Category and brand */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md">
                  {selectedProduct.brand}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-medium capitalize">
                  {selectedProduct.category.replace('-', ' ')}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-2">
                {selectedProduct.name}
              </h2>

              {/* Rating & Stock */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg">
                  <Star className="w-4 h-4 text-amber-500 fill-current" />
                  <span className="text-xs font-bold text-amber-900">{selectedProduct.rating}</span>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {selectedProduct.reviewsCount} customer reviews
                </span>
                <span className="text-xs text-slate-300">|</span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    selectedProduct.inStock
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {selectedProduct.inStock ? `In Stock (${selectedProduct.stockCount} left)` : 'Out of Stock'}
                </span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mb-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  ₦{selectedProduct.price.toLocaleString()}
                </span>
                {selectedProduct.previousPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    ₦{selectedProduct.previousPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-slate-500 ml-auto font-medium">
                  Size: <strong className="text-slate-700">{selectedProduct.weight}</strong>
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {selectedProduct.description}
              </p>

              {/* Ingredients if available */}
              {selectedProduct.ingredients && (
                <div className="mb-4 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <strong className="text-slate-700 block mb-0.5">Ingredients / Contents:</strong>
                  {selectedProduct.ingredients}
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-100">
              {/* Quantity Stepper */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-slate-600">Select Quantity:</span>
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    className="p-1 rounded-lg hover:bg-white text-slate-600 disabled:opacity-30"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-slate-800">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(selectedProduct.stockCount, q + 1))}
                    disabled={qty >= selectedProduct.stockCount}
                    className="p-1 rounded-lg hover:bg-white text-slate-600 disabled:opacity-30"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add & Buy Now Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedProduct.inStock}
                  className={`py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                    !selectedProduct.inStock
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : isAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-600/20'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={!selectedProduct.inStock}
                  className="py-3 px-4 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-md disabled:bg-slate-100 disabled:text-slate-400"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Footer */}
        {related.length > 0 && (
          <div className="bg-slate-50 p-6 rounded-b-3xl border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Similar Products in {selectedProduct.category.replace('-', ' ')}
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {related.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedProduct(item);
                    setQty(1);
                  }}
                  className="p-2.5 bg-white rounded-xl border border-slate-200 hover:border-brand-400 cursor-pointer transition-all flex items-center gap-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg bg-slate-100"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate">{item.name}</p>
                    <p className="text-xs font-bold text-brand-700">₦{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};