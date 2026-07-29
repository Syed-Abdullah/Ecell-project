import React from 'react';
import { Zap, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800/80 pt-12 pb-8 text-xs text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Ecell Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
            <span className="text-xl font-extrabold text-white tracking-tight">Ecell</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Your premier destination for monitors, cables, desktops, SSDs, HDDs, pendrives, and custom software flashing & installation solutions.
          </p>
        </div>

        {/* Store Hours & Location */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Visit Our Store</h4>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>124 Tech Avenue, Suite 101, Electronics Plaza</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Customer Support</h4>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>+1 (800) 555-ECELL</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-400 shrink-0" />
            <span>support@ecell-tech.com</span>
          </div>
        </div>

        {/* Featured Software Solutions */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Software Services</h4>
          <ul className="space-y-1">
            <li>• BIOS & Motherboard Flashing</li>
            <li>• Windows 11 & Linux Installation</li>
            <li>• SSD NVMe Migration & Cloning</li>
            <li>• Drive Formatting & RAID Diagnostics</li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-gray-900 text-center text-gray-500">
        © {new Date().getFullYear()} Ecell Startup Shop. All rights reserved. Powered by React, Vite, Express & PostgreSQL (Dockerized).
      </div>
    </footer>
  );
}
