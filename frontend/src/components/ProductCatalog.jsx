import React, { useState } from 'react';
import ProductCard from './ProductCard.jsx';
import { SlidersHorizontal, Package, RefreshCw } from 'lucide-react';

const CATEGORIES = ['All', 'Monitors', 'Cables', 'Desktop', 'HDD', 'SSD', 'Pendrives'];

export default function ProductCatalog({
  products,
  selectedCategory,
  setSelectedCategory,
  onAddToCart,
  loading,
  onRefresh
}) {
  const [sortBy, setSortBy] = useState('default');

  // Filter & Sort Products
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return parseFloat(a.price) - parseFloat(b.price);
    if (sortBy === 'price-high') return parseFloat(b.price) - parseFloat(a.price);
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Catalog Header & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-white">Hardware Inventory</h2>
            <span className="bg-blue-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {products.length} Items
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Explore authentic monitors, cables, desktops, and storage gear.</p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <div className="flex bg-gray-900/90 p-1 rounded-xl border border-gray-800">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-xl px-3 py-1.5 text-xs text-gray-300">
            <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none text-xs text-gray-200 focus:outline-none cursor-pointer pr-1"
            >
              <option value="default" className="bg-gray-900 text-gray-200">Sort by Featured</option>
              <option value="price-low" className="bg-gray-900 text-gray-200">Price: Low to High</option>
              <option value="price-high" className="bg-gray-900 text-gray-200">Price: High to Low</option>
              <option value="name" className="bg-gray-900 text-gray-200">Name: A to Z</option>
            </select>
          </div>

          <button
            onClick={onRefresh}
            title="Refresh Inventory"
            className="p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-cyan-400 hover:border-gray-700 transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Grid Display */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="glass-card rounded-2xl p-5 h-80 animate-pulse flex flex-col justify-between">
              <div className="bg-gray-800 rounded-xl h-40 w-full mb-4" />
              <div className="bg-gray-800 rounded h-4 w-3/4 mb-2" />
              <div className="bg-gray-800 rounded h-3 w-1/2" />
              <div className="bg-gray-800 rounded h-8 w-full mt-4" />
            </div>
          ))}
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center max-w-md mx-auto my-12 border border-gray-800">
          <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white">No products found</h3>
          <p className="text-xs text-gray-400 mt-1">Try selecting a different category or clear search filters.</p>
          <button
            onClick={() => setSelectedCategory('All')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-500 transition"
          >
            Show All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}

    </section>
  );
}
