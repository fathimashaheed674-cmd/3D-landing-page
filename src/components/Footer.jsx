import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] text-gray-400 border-t border-gray-800 pt-20 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Footnotes & Disclaimers */}
        <div className="space-y-2 border-b border-gray-800/80 pb-8 text-[11px] leading-relaxed text-gray-500 font-mono">
          <p>
            1. As of November 2026. Measured in accordance with JEITA-compliant standards in active noise-cancelling market.
          </p>
          <p>
            2. When using LDAC high-resolution codec at maximum transfer rate of 990 kbps. Requires compatible host device.
          </p>
          <p>
            3. Battery life condition: AAC codec, DSEE Ultimate Auto, EQ Off. Actual endurance may vary with environmental conditions.
          </p>
          <p>
            4. 100% zero-plastic packaging excludes coating and adhesive components.
          </p>
        </div>

        {/* Global Sony Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-4 uppercase tracking-wider">
              Products
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-gray-400">
              <li><a href="#overview" className="hover:text-white transition-colors">WH-1000XM6 Overview</a></li>
              <li><a href="#technology" className="hover:text-white transition-colors">Integrated Processor V2</a></li>
              <li><a href="#noise-cancelling" className="hover:text-white transition-colors">Adaptive Cancellation</a></li>
              <li><a href="#specs" className="hover:text-white transition-colors">Technical Specifications</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white text-sm mb-4 uppercase tracking-wider">
              Audio Heritage
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-gray-400">
              <li><span className="hover:text-white cursor-pointer transition-colors">360 Reality Audio</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">LDAC Wireless Hi-Res</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">DSEE Ultimate AI Engine</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Signature Series Sound</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white text-sm mb-4 uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-gray-400">
              <li><span className="hover:text-white cursor-pointer transition-colors">Firmware Updates</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Headphones Connect App</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Product Registration</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Authorized Retailers</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white text-sm mb-4 uppercase tracking-wider">
              Sustainability
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-gray-400">
              <li><span className="hover:text-white cursor-pointer transition-colors">Road to Zero 2050 Vision</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Plastic-Free Packaging</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Recycled Materials</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Global Environmental Plan</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px]">
          <div className="flex items-center space-x-4">
            <span className="font-display font-black text-white text-sm">SONY</span>
            <span className="text-gray-500">&copy; {new Date().getFullYear()} Sony Group Corporation. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Use</span>
            <span className="hover:text-white cursor-pointer transition-colors">Cookie Settings</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
