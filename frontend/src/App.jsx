import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import ProductCatalog from './components/ProductCatalog.jsx';
import ServiceCatalog from './components/ServiceCatalog.jsx';
import ServiceBookingModal from './components/ServiceBookingModal.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Footer from './components/Footer.jsx';
import { fetchProducts, fetchServices } from './api.js';

export default function App() {
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('hardware'); // 'hardware' | 'services'

  // Cart State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Service Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingServiceType, setBookingServiceType] = useState('');

  // Load products & services
  const loadData = async () => {
    setLoadingProducts(true);
    try {
      const [prodData, servData] = await Promise.all([
        fetchProducts(selectedCategory, searchQuery),
        fetchServices(),
      ]);
      setProducts(prodData);
      setServices(servData);
    } catch (err) {
      console.error('Error fetching data from backend API:', err);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedCategory, searchQuery]);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleOpenBooking = (serviceTitle = '') => {
    setBookingServiceType(serviceTitle);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-gray-100 font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Top Navigation */}
      <Navbar
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Hero Banner */}
      <HeroSection
        onOpenBooking={() => handleOpenBooking()}
        setActiveTab={setActiveTab}
      />

      {/* Main Content View */}
      <main className="flex-1">
        {activeTab === 'hardware' ? (
          <ProductCatalog
            products={products}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onAddToCart={handleAddToCart}
            loading={loadingProducts}
            onRefresh={loadData}
          />
        ) : (
          <ServiceCatalog
            services={services}
            onOpenBooking={handleOpenBooking}
          />
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        setCart={setCart}
        onClearCart={() => setCart([])}
      />

      {/* Software Service Booking Modal */}
      <ServiceBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={bookingServiceType}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
