import React from 'react';
import { Cpu, Zap, ShieldCheck, HardDrive, Monitor, Disc } from 'lucide-react';

export default function HeroSection({ onOpenBooking, setActiveTab }) {
  return (
    <div className="relative overflow-hidden bg-hero-gradient pt-10 pb-16 border-b border-gray-800/40">
      
      {/* Background Ambient Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 fill-cyan-400" />
              <span>Next-Gen Hardware & Software Hub</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Your One-Stop Shop for <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                Hardware & Software Solutions
              </span>
            </h1>

            <p className="text-gray-400 text-base leading-relaxed max-w-2xl">
              Equip your workstation with high-performance <strong className="text-gray-200">Monitors, Cables, Desktops, SSDs, HDDs & Pendrives</strong>. 
              Plus, get expert software services including <strong className="text-cyan-300">BIOS Flashing</strong>, <strong className="text-cyan-300">Clean OS Installation</strong> & <strong className="text-cyan-300">Disk Diagnostics</strong>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab('hardware')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] transition"
              >
                Browse Hardware Store
              </button>

              <button
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-xl bg-gray-900 border border-cyan-500/40 text-cyan-300 font-semibold text-sm hover:bg-gray-800 hover:border-cyan-400 transition flex items-center gap-2"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                Book Software Service
              </button>
            </div>

            {/* Quick Badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-gray-800/80">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-xs font-bold text-white">100% Genuine</div>
                  <div className="text-[11px] text-gray-400">Authentic Tech</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Zap className="w-5 h-5 text-cyan-400" />
                <div>
                  <div className="text-xs font-bold text-white">Same-Day Flashing</div>
                  <div className="text-[11px] text-gray-400">Express Turnaround</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <HardDrive className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-xs font-bold text-white">Tested Storage</div>
                  <div className="text-[11px] text-gray-400">Verified SSD/HDD</div>
                </div>
              </div>
            </div>

          </div>

          {/* Hero Feature Grid Showcase */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            
            <div className="glass-card rounded-2xl p-5 border border-gray-800/80 hover:border-blue-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
                <Monitor className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">Monitors & Displays</h3>
              <p className="text-xs text-gray-400 mt-1">4K UHD, Ultrawides & high refresh rate IPS screens.</p>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-gray-800/80 hover:border-cyan-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
                <HardDrive className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">SSD & HDD Storage</h3>
              <p className="text-xs text-gray-400 mt-1">PCIe 4.0 NVMe SSDs & high capacity enterprise HDDs.</p>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-gray-800/80 hover:border-emerald-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">BIOS / Firmware Flashing</h3>
              <p className="text-xs text-gray-400 mt-1">Motherboard BIOS updates & EEPROM flash programming.</p>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-gray-800/80 hover:border-purple-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
                <Disc className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">OS & Software Setup</h3>
              <p className="text-xs text-gray-400 mt-1">Clean Windows/Linux installs, drivers & partition setup.</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
