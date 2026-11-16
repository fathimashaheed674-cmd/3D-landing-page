import React, { useState } from 'react';
import { Check, Shield, Feather } from 'lucide-react';

export default function ColorFinishes({ onOpenPreorder }) {
  const [selectedColor, setSelectedColor] = useState('black');

  const finishes = [
    {
      id: 'black',
      name: 'Matte Black',
      subtitle: 'The Signature Stealth Flagship',
      hex: '#141416',
      description: 'Crafted with a specialized low-reflection matte finish that eliminates fingerprint oils and glares under studio illumination.',
    },
    {
      id: 'silver',
      name: 'Platinum Silver',
      subtitle: 'Warm Architectural Titanium',
      hex: '#D1D0CE',
      description: 'A refined platinum aesthetic inspired by modern architectural forms, complemented by subtle champagne hardware.',
    },
    {
      id: 'navy',
      name: 'Midnight Navy',
      subtitle: 'Deep Executive Indigo',
      hex: '#1E293B',
      description: 'Deep indigo alloy composite that reveals rich deep blue specular reflections under direct lighting.',
    },
  ];

  const currentFinish = finishes.find((f) => f.id === selectedColor) || finishes[0];

  return (
    <section className="py-28 bg-[#0a0a0a] border-t border-gray-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-2xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-gray-700 bg-transparent font-mono text-xs uppercase tracking-widest text-gray-400">
            <span className="badge-dot" />
            <span>Industrial Form</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Crafted for <span className="title-outline">weightless wear</span>.
          </h2>
          <p className="font-sans text-base text-gray-400">
            Engineered with seamless stepless sliders, silent hinges, and plush synthetic soft-fit leather.
          </p>
        </div>

        {/* Color Switcher Showcase Card */}
        <div className="max-w-5xl bg-[#0e0e0e] border border-gray-700 rounded-3xl p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Visual Headphone Silhouette Showcase */}
            <div className="relative flex items-center justify-center p-8 bg-[#050505] rounded-2xl border border-gray-800 min-h-[320px]">
              <div className="relative w-56 h-56 flex items-center justify-center">
                <div
                  className="w-48 h-48 rounded-full border-[10px] transition-all duration-500 relative flex items-center justify-center"
                  style={{
                    borderColor: currentFinish.hex,
                    boxShadow: '0 0 30px rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <div className="absolute -left-3 w-8 h-24 rounded-2xl bg-neutral-900 border border-gray-700" />
                  <div className="absolute -right-3 w-8 h-24 rounded-2xl bg-neutral-900 border border-gray-700" />
                  <div className="text-center">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500 block">
                      SONY
                    </span>
                    <span className="font-display text-sm font-bold text-white">WH-1000XM6</span>
                    <span className="block font-mono text-xs text-gray-300 mt-1">
                      {currentFinish.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Selector Details */}
            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-gray-400">
                  Select Edition
                </span>
                <h3 className="font-display text-3xl font-extrabold text-white mt-1">
                  {currentFinish.name}
                </h3>
                <p className="font-mono text-xs text-gray-400 mt-1">
                  {currentFinish.subtitle}
                </p>
                <p className="font-sans text-sm text-gray-300 leading-relaxed mt-3">
                  {currentFinish.description}
                </p>
              </div>

              {/* Swatches */}
              <div className="flex items-center space-x-4 pt-2">
                {finishes.map((finish) => (
                  <button
                    key={finish.id}
                    onClick={() => setSelectedColor(finish.id)}
                    className={`relative p-1 rounded-full transition-all duration-300 ${
                      selectedColor === finish.id
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0a0a0a]'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                    title={finish.name}
                  >
                    <div
                      className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center shadow-inner"
                      style={{ backgroundColor: finish.hex }}
                    >
                      {selectedColor === finish.id && (
                        <Check className="w-4 h-4 text-white drop-shadow" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Ergonomic Accolades */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800 font-mono text-xs">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Feather className="w-4 h-4 text-white" />
                  <span>245G ULTRALIGHT</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Shield className="w-4 h-4 text-white" />
                  <span>ZERO-PINCH LEATHER</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenPreorder}
                  className="w-full py-3.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
                >
                  Configure {currentFinish.name} — $449
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
