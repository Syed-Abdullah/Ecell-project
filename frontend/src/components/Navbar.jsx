import React from 'react';
import { ShoppingCart, Cpu, Wrench, Search, Zap } from 'lucide-react';

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenBooking,
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab
}) {
  return (
    <nav className="sticky top-0 z-40 bg-[#0B0F19]/90 backdrop-blur-md border-b border-gray-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('hardware')}>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-emerald-400 p-[2px]">
            <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
              <Zap className="w-6 h-6 text-cyan-400 fill-cyan-400/20" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                Ecell
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-cyan-400 border border-cyan-500/20">
                Tech Store
              </span>
            </div>
            <p className="text-xs text-gray-400 font-medium">Electronics & Software Solutions</p>
          </div>
        </div>

        {/* Live Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (activeTab !== 'hardware') setActiveTab('hardware');
            }}
            placeholder="Search Monitors, SSDs, Cables, Desktops, Pendrives..."
            className="w-full pl-10 pr-4 py-2 bg-gray-900/80 border border-gray-700/60 rounded-xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
          />
        </div>

        {/* Nav Tabs & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex bg-gray-900/80 p-1 rounded-xl border border-gray-800">
            <button
              onClick={() => setActiveTab('hardware')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'hardware'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Hardware Shop</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'services'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Software Solutions</span>
            </button>
          </div>

          {/* Book Software Service Action */}
          <button
            onClick={onOpenBooking}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 hover:border-emerald-400 transition"
          >
            <Wrench className="w-4 h-4 text-emerald-400" />
            <span>Book Service</span>
          </button>

          {/* Cart Icon Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white transition"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0B0F19] shadow-md">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </nav>
  );
}
