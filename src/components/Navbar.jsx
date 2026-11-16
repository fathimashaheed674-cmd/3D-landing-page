import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenPreorder, currentProgress = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'Technology', href: '#technology' },
    { name: 'Noise Cancelling', href: '#noise-cancelling' },
    { name: 'Specs', href: '#specs' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#050505] border-b border-gray-800'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo from my-resume (.nav-logo) */}
          <div className="flex items-center space-x-3">
            <a href="#" className="flex items-center space-x-2 group">
              <span className="font-display font-extrabold text-base tracking-tight text-white">
                SONY
              </span>
              <span className="text-gray-600 font-mono text-sm">/</span>
              <span className="font-mono text-xs text-gray-300 tracking-wider">
                WH-1000XM6
              </span>
            </a>
          </div>

          {/* Minimalist Navigation Links (.nav-links) */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="font-mono text-xs uppercase tracking-wider text-gray-300 hover:text-white transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Primary CTA Button (.btn-primary) from my-resume */}
          <div className="hidden sm:flex items-center space-x-4">
            <button
              onClick={onOpenPreorder}
              className="px-5 py-2 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(255,255,255,0.3)] flex items-center space-x-1.5"
            >
              <span>Experience XM6</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={onOpenPreorder}
              className="px-3.5 py-1.5 rounded-full bg-white text-black font-mono text-[11px] font-semibold"
            >
              Pre-order
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-gray-400 hover:text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Real-time scroll indicator line */}
      <div className="w-full h-[1px] bg-gray-800/60 overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-75"
          style={{ width: `${Math.min(100, Math.max(0, currentProgress * 100))}%` }}
        />
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-b border-gray-800 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="block font-mono text-xs uppercase tracking-wider text-gray-300 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-gray-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPreorder();
              }}
              className="w-full py-2.5 rounded-full bg-white text-black font-mono text-xs uppercase font-semibold text-center"
            >
              Pre-order WH-1000XM6 — $449
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
