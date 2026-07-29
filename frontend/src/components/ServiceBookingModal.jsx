import React, { useState } from 'react';
import { X, CheckCircle2, Cpu, Loader2 } from 'lucide-react';
import { submitServiceBooking } from '../api.js';

export default function ServiceBookingModal({ isOpen, onClose, initialService = '' }) {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    service_type: initialService || 'BIOS & Firmware Flashing',
    device_details: '',
    issue_description: ''
  });

  const [loading, setLoading] = useState(false);
  const [successResult, setSuccessResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await submitServiceBooking(formData);
      setSuccessResult(res.request);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit service request');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccessResult(null);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="glass-card rounded-2xl max-w-lg w-full p-6 border border-gray-800 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {successResult ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-extrabold text-white">Service Booking Received!</h3>
            <p className="text-xs text-gray-300">
              Thank you, <strong className="text-cyan-300">{successResult.customer_name}</strong>. Your request for <strong className="text-cyan-300">{successResult.service_type}</strong> has been logged.
            </p>

            <div className="bg-gray-900/80 p-4 rounded-xl border border-gray-800 text-left text-xs space-y-1.5 text-gray-300">
              <div><strong className="text-gray-400">Request ID:</strong> #{successResult.id}</div>
              <div><strong className="text-gray-400">Device:</strong> {successResult.device_details}</div>
              <div><strong className="text-gray-400">Status:</strong> <span className="text-emerald-400 font-bold">{successResult.status}</span></div>
            </div>

            <p className="text-[11px] text-gray-400">
              Our technician will contact you at <span className="text-gray-200">{successResult.customer_phone}</span> within 1-2 hours to arrange drop-off / flash session.
            </p>

            <button
              onClick={handleReset}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-blue-600/30"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Book Software Service</h3>
                <p className="text-xs text-gray-400">Request flashing, OS setup, or system diagnostics</p>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  placeholder="e.g. Alex Johnson"
                  className="w-full px-3.5 py-2 bg-gray-900 border border-gray-800 rounded-xl text-xs text-gray-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.customer_email}
                    onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full px-3.5 py-2 bg-gray-900 border border-gray-800 rounded-xl text-xs text-gray-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.customer_phone}
                    onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2 bg-gray-900 border border-gray-800 rounded-xl text-xs text-gray-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Requested Solution *</label>
                <select
                  value={formData.service_type}
                  onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                  className="w-full px-3.5 py-2 bg-gray-900 border border-gray-800 rounded-xl text-xs text-gray-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="BIOS & Firmware Flashing">BIOS & Firmware Flashing ($25.00)</option>
                  <option value="OS Installation & Drivers">OS Installation & Drivers ($35.00)</option>
                  <option value="Custom Software Setup & Diagnostics">Custom Software Setup & Diagnostics ($40.00)</option>
                  <option value="Disk Formatting & Partitioning">Disk Formatting & Partitioning ($20.00)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Device Details *</label>
                <input
                  type="text"
                  required
                  value={formData.device_details}
                  onChange={(e) => setFormData({ ...formData, device_details: e.target.value })}
                  placeholder="e.g. ASUS B550 Motherboard / Dell Inspiron Laptop"
                  className="w-full px-3.5 py-2 bg-gray-900 border border-gray-800 rounded-xl text-xs text-gray-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Issue Description / Notes</label>
                <textarea
                  rows={3}
                  value={formData.issue_description}
                  onChange={(e) => setFormData({ ...formData, issue_description: e.target.value })}
                  placeholder="Describe your issue or requested software setup..."
                  className="w-full px-3.5 py-2 bg-gray-900 border border-gray-800 rounded-xl text-xs text-gray-200 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 hover:opacity-95 transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <span>Confirm Booking</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
