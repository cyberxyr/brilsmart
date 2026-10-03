import React, { useState } from 'react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';
import { ShoppingCart, Check, Star, Eye } from 'lucide-react';
import { Badge } from '../common/Badge';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { setSelectedProduct } = useStore();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-brand-300 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Top badges */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        {product.discount ? (
          <Badge variant="yellow" size="md" className="shadow-sm">
            {product.discount}% OFF
          </Badge>
        ) : product.isFeatured ? (
          <Badge variant="green" size="sm">
            Popular
          </Badge>
        ) : <div />}

        {!product.inStock && (
          <Badge variant="red" size="sm">
            Out of Stock
          </Badge>
        )}
      </div>

      {/* Image container */}
      <div className="relative pt-[85%] bg-slate-50 overflow-hidden flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />

        {/* Quick View Floating Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProduct(product);
          }}
          className="absolute bottom-3 right-3 bg-white/95 text-slate-700 hover:text-brand-600 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform translate-y-1 group-hover:translate-y-0"
          title="Quick View"
          aria-label="Quick View"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Details body */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          {/* Brand & Weight */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold uppercase tracking-wider text-brand-700">{product.brand}</span>
            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-medium text-slate-600">{product.weight}</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-slate-800 group-hover:text-brand-700 text-sm leading-snug line-clamp-2 transition-colors mb-1">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-semibold text-slate-700">{product.rating}</span>
            <span className="text-xs text-slate-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Pricing & Add to cart */}
        <div className="pt-2 border-t border-slate-100 mt-2">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base sm:text-lg font-bold text-slate-900">
              ₦{product.price.toLocaleString()}
            </span>
            {product.previousPrice && (
              <span className="text-xs text-slate-400 line-through">
                ₦{product.previousPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-2.5 px-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
              !product.inStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : isAdded
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-brand-600 hover:bg-brand-700 active:scale-[0.98] text-white shadow-sm shadow-brand-600/20'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 text-emerald-200 animate-fade-in" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>{product.inStock ? 'Add to Cart' : 'Sold Out'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};