import React, { useState } from 'react';
import { X, Check, ShieldCheck, Truck, CreditCard } from 'lucide-react';

export default function PreorderModal({ isOpen, onClose }) {
  const [selectedColor, setSelectedColor] = useState('black');
  const [engraving, setEngraving] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const finishes = [
    { id: 'black', name: 'Matte Black', hex: '#141416' },
    { id: 'silver', name: 'Platinum Silver', hex: '#D1D0CE' },
    { id: 'navy', name: 'Midnight Navy', hex: '#1E293B' },
  ];

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsOrdered(true);
    }, 1200);
  };

  const handleReset = () => {
    setIsOrdered(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#0e0e0e] border border-gray-700 rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] z-10 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {!isOrdered ? (
          <div>
            <div className="space-y-1 mb-6">
              <span className="font-mono text-[11px] uppercase text-gray-400 tracking-widest block">
                Official Sony Direct Pre-order
              </span>
              <h3 className="font-display text-3xl font-extrabold tracking-tight text-white">
                Sony WH-1000XM6
              </h3>
              <p className="font-sans text-xs text-gray-400">
                Silence, perfected. Ships in 2–3 business days with complimentary priority express delivery.
              </p>
            </div>

            <form onSubmit={handleCheckout} className="space-y-5">
              {/* Finish Selection */}
              <div>
                <label className="block font-mono text-xs text-gray-400 mb-2 uppercase tracking-wider">
                  1. Select Edition
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {finishes.map((f) => (
                    <button
                      type="button"
                      key={f.id}
                      onClick={() => setSelectedColor(f.id)}
                      className={`p-3 rounded-2xl border flex flex-col items-center space-y-2 transition-all ${selectedColor === f.id
                          ? 'border-white bg-gray-800'
                          : 'border-gray-800 bg-[#070707] hover:border-gray-600'
                        }`}
                    >
                      <div
                        className="w-5 h-5 rounded-full border border-gray-600"
                        style={{ backgroundColor: f.hex }}
                      />
                      <span className="font-mono text-[11px] text-gray-200">{f.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Free Custom Laser Engraving */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-mono text-xs text-gray-400 uppercase tracking-wider">
                    2. Complimentary Engraving
                  </label>
                  <span className="font-mono text-[10px] text-white">FREE</span>
                </div>
                <input
                  type="text"
                  maxLength={16}
                  placeholder="e.g. SONY AUDIO / YOUR NAME"
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-gray-700 text-xs text-white font-mono placeholder:text-gray-600 focus:outline-none focus:border-white"
                />
              </div>

              {/* Order Summary & Perks */}
              <div className="bg-[#050505] border border-gray-800 rounded-2xl p-4 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-gray-300">
                  <span>Sony WH-1000XM6 ({selectedColor.toUpperCase()})</span>
                  <span>$449.00</span>
                </div>
                <div className="flex items-center justify-between text-gray-400">
                  <span className="flex items-center space-x-1.5">
                    <Truck className="w-3.5 h-3.5 text-white" />
                    <span>Priority Express Shipping</span>
                  </span>
                  <span className="text-white">FREE</span>
                </div>
                <div className="flex items-center justify-between text-gray-400">
                  <span className="flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                    <span>2-Year Sony Extended Care</span>
                  </span>
                  <span className="text-white">INCLUDED</span>
                </div>
                <div className="pt-2 border-t border-gray-800 flex items-center justify-between font-bold text-sm text-white">
                  <span>Total Amount</span>
                  <span>$449.00</span>
                </div>
              </div>

              {/* Checkout Button from my-resume */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,255,255,0.25)] flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Complete Pre-Order — $449.00</span>
                  </>
                )}
              </button>

              <p className="font-mono text-[10px] text-center text-gray-500">
                Includes 30-day money-back satisfaction guarantee & zero restocking fees.
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-5">
            <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="font-mono text-xs uppercase tracking-wider text-gray-400">
                Order Confirmed
              </span>
              <h3 className="font-display text-3xl font-extrabold text-white">
                Welcome to pure silence.
              </h3>
              <p className="font-sans text-xs text-gray-400 max-w-xs mx-auto">
                Your pre-order for Sony WH-1000XM6 ({selectedColor.toUpperCase()}) has been placed.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#050505] border border-gray-800 font-mono text-xs text-left space-y-1">
              <div className="flex justify-between text-gray-400">
                <span>Order Ref:</span>
                <span className="text-white">SNY-XM6-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              {engraving && (
                <div className="flex justify-between text-gray-400">
                  <span>Custom Engraving:</span>
                  <span className="text-white">"{engraving}"</span>
                </div>
              )}
              <div className="flex justify-between text-gray-400">
                <span>Delivery:</span>
                <span className="text-white">Priority Express (2-3 Days)</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full border border-gray-600 hover:border-gray-400 font-mono text-xs uppercase text-white transition-colors"
            >
              Back to Experience
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
