import React, { useState } from 'react';
import { ShoppingCart, Check, Tag } from 'lucide-react';

export default function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const specs = typeof product.specs === 'string' ? JSON.parse(product.specs || '{}') : (product.specs || {});

  return (
    <div className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between group">
      
      {/* Image Container */}
      <div className="relative aspect-video w-full bg-gray-900 overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-80" />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-md">
            {product.badge}
          </div>
        )}

        {/* Stock Status */}
        <div className="absolute bottom-3 right-3 bg-gray-900/80 backdrop-blur-sm text-xs px-2.5 py-1 rounded-md text-gray-300 border border-gray-700/50 flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
          <span>{product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}</span>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              {product.category}
            </span>
          </div>

          <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Key Specs Pills */}
          {Object.keys(specs).length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {Object.entries(specs).map(([key, val]) => (
                <span
                  key={key}
                  className="text-[10px] bg-gray-800/80 text-gray-300 px-2 py-0.5 rounded border border-gray-700/60"
                >
                  <strong className="text-gray-400">{key}:</strong> {val}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Pricing & Action */}
        <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Price</div>
            <div className="text-lg font-extrabold text-white">
              ${parseFloat(product.price).toFixed(2)}
            </div>
          </div>

          <button
            onClick={handleAdd}
            disabled={product.stock <= 0}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              added
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 active:scale-95'
            } ${product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" /> Added
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
