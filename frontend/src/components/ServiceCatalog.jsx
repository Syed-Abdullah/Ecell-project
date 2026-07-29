import React from 'react';
import { Zap, Cpu, Wrench, HardDrive, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

const ICON_MAP = {
  Zap: Zap,
  Cpu: Cpu,
  Wrench: Wrench,
  HardDrive: HardDrive,
};

export default function ServiceCatalog({ services, onOpenBooking }) {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold">
          <Wrench className="w-3.5 h-3.5" />
          <span>Ecell Software Lab</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white">Professional Software Solutions</h2>
        <p className="text-sm text-gray-400">
          Hardware problems solved with high-precision software setup, firmware flashing, and deep diagnostics.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => {
          const IconComponent = ICON_MAP[service.icon_name] || Wrench;
          const features = typeof service.features === 'string' ? JSON.parse(service.features || '[]') : (service.features || []);

          return (
            <div
              key={service.id}
              className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between border border-gray-800 hover:border-cyan-500/40 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition" />

              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 font-medium">Starting from</span>
                    <div className="text-xl font-extrabold text-white">${parseFloat(service.price_estimate).toFixed(2)}</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition">
                  {service.title}
                </h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  {service.description}
                </p>

                {/* Turnaround Badge */}
                <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-900 border border-gray-800 text-[11px] font-medium text-cyan-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Turnaround: {service.turnaround_time}</span>
                </div>

                {/* Features List */}
                <ul className="mt-5 space-y-2 border-t border-gray-800/80 pt-4">
                  {features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-800/80">
                <button
                  onClick={() => onOpenBooking(service.title)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition flex items-center justify-center gap-2"
                >
                  <span>Book This Solution</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
