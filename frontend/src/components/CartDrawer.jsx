import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, CheckCircle, ArrowRight } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cart, setCart, onClearCart }) {
  const [checkedOut, setCheckedOut] = useState(false);

  if (!isOpen) return null;

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeItem = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckout = () => {
    setCheckedOut(true);
    setTimeout(() => {
      onClearCart();
      setCheckedOut(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#0B0F19] border-l border-gray-800 h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Cart Header */}
        <div className="p-5 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Your Shopping Cart</h2>
            <span className="bg-blue-500/10 text-cyan-400 text-xs font-bold px-2 py-0.5 rounded-full border border-cyan-500/20">
              {cart.reduce((a, b) => a + b.quantity, 0)} Items
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Content */}
        {checkedOut ? (
          <div className="flex-1 p-8 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white">Order Confirmed!</h3>
            <p className="text-xs text-gray-400 max-w-xs">
              Thank you for ordering with Ecell. Your hardware items are being prepared for pickup / dispatch.
            </p>
          </div>
        ) : cart.length === 0 ? (
          <div className="flex-1 p-8 text-center flex flex-col items-center justify-center text-gray-400 space-y-3">
            <ShoppingBag className="w-12 h-12 text-gray-600 mb-2" />
            <p className="text-sm font-semibold text-gray-300">Your cart is currently empty</p>
            <p className="text-xs text-gray-500">Explore monitors, cables, SSDs, and desktops to get started.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="glass-card rounded-xl p-3.5 flex items-center gap-3 border border-gray-800"
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg bg-gray-900 border border-gray-800 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                  <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20 mt-1 inline-block">
                    {item.category}
                  </span>
                  <div className="text-xs font-extrabold text-white mt-1">
                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1.5 bg-gray-900 border border-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1 text-gray-400 hover:text-white rounded transition"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold text-white px-1">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1 text-gray-400 hover:text-white rounded transition"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1.5 text-gray-500 hover:text-red-400 transition"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && !checkedOut && (
          <div className="p-5 border-t border-gray-800 bg-gray-950/80 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="text-gray-200 font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Estimated Tax (8%)</span>
                <span className="text-gray-200 font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-gray-800">
                <span>Total</span>
                <span className="text-cyan-400">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
