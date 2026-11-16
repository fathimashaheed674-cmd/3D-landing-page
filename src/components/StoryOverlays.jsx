import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function StoryOverlays({ progress, onOpenPreorder }) {
  // Helper to calculate smooth opacity & translateY for an interval [start, fadeInEnd, fadeOutStart, end]
  const getStageOpacity = (start, fadeInEnd, fadeOutStart, end) => {
    if (progress < start || progress > end) return 0;
    if (progress >= fadeInEnd && progress <= fadeOutStart) return 1;
    if (progress < fadeInEnd) {
      return (progress - start) / (fadeInEnd - start);
    }
    return (end - progress) / (end - fadeOutStart);
  };

  const getStageTransform = (start, fadeInEnd, fadeOutStart, end, maxTranslateY = 30) => {
    if (progress < start) return `translateY(${maxTranslateY}px)`;
    if (progress > end) return `translateY(-${maxTranslateY}px)`;
    if (progress >= fadeInEnd && progress <= fadeOutStart) return 'translateY(0px)';
    if (progress < fadeInEnd) {
      const ratio = 1 - (progress - start) / (fadeInEnd - start);
      return `translateY(${ratio * maxTranslateY}px)`;
    }
    const ratio = (progress - fadeOutStart) / (end - fadeOutStart);
    return `translateY(-${ratio * maxTranslateY}px)`;
  };

  // Section 1: Hero (0 - 16%)
  const op1 = getStageOpacity(0, 0.03, 0.11, 0.16);
  const tr1 = getStageTransform(0, 0.03, 0.11, 0.16, 20);

  // Section 2: Engineering Reveal (17% - 39%)
  const op2 = getStageOpacity(0.17, 0.22, 0.34, 0.39);
  const tr2 = getStageTransform(0.17, 0.22, 0.34, 0.39, 30);

  // Section 3: Noise Cancelling & Microphones (40% - 63%)
  const op3 = getStageOpacity(0.40, 0.45, 0.58, 0.63);
  const tr3 = getStageTransform(0.40, 0.45, 0.58, 0.63, 30);

  // Section 4: Sound & Upscaling (64% - 84%)
  const op4 = getStageOpacity(0.64, 0.69, 0.79, 0.84);
  const tr4 = getStageTransform(0.64, 0.69, 0.79, 0.84, 30);

  // Section 5: Reassembly & Final CTA (85% - 100%)
  const op5 = getStageOpacity(0.85, 0.89, 0.99, 1.0);
  const tr5 = getStageTransform(0.85, 0.89, 0.99, 1.0, 30);

  return (
    <div className="relative w-full h-full max-w-7xl mx-auto px-6 flex items-center justify-center">
      {/* =========================================================================
          ACT 1: HERO / INTRO (0 - 15%) — Completely Direct on Background, Zero Blur
      ========================================================================== */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-between py-20 text-center pointer-events-none transition-all duration-300"
        style={{
          opacity: op1,
          transform: tr1,
          visibility: op1 > 0 ? 'visible' : 'hidden',
        }}
      >
        {/* Top Badge: Pure border, NO background */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-gray-700 bg-transparent font-mono text-xs text-gray-300 tracking-wider">
          <span className="badge-dot" />
          <span>FLAGSHIP ACTIVE NOISE CANCELLING</span>
        </div>

        {/* Center Main Headline with Syne & Title Outline */}
        <div className="max-w-4xl space-y-4 my-auto px-4">
          <h1 className="font-display font-black tracking-tight leading-[0.9]">
            <span className="block text-4xl sm:text-6xl md:text-8xl text-white">
              SONY
            </span>
            <span className="block text-4xl sm:text-6xl md:text-8xl title-outline-thick">
              WH-1000XM6
            </span>
          </h1>
          <p className="font-display text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-gray-200 pt-2">
            Silence, perfected.
          </p>
          <p className="font-sans text-sm sm:text-base text-gray-400 max-w-lg mx-auto font-normal leading-relaxed">
            Flagship wireless noise cancelling, re-engineered for a world that never stops.
          </p>
        </div>

        {/* Mouse Scroll Indicator */}
        <div className="flex flex-col items-center space-y-2 text-gray-400 font-mono text-xs tracking-widest">
          <span>SCROLL TO DISASSEMBLE</span>
          <div className="w-5 h-8 border-2 border-gray-600 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-gray-400 rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* =========================================================================
          ACT 2: ENGINEERING REVEAL (15 - 40%) — Completely Direct on Background, Zero Blur
      ========================================================================== */}
      <div
        className="absolute left-6 md:left-12 lg:left-16 max-w-xl pointer-events-none transition-all duration-300"
        style={{
          opacity: op2,
          transform: tr2,
          visibility: op2 > 0 ? 'visible' : 'hidden',
        }}
      >
        <div className="space-y-4">
          {/* Section Label: Pure border, NO background */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-gray-700 bg-transparent font-mono text-[11px] text-gray-300 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>Phase 01 // Acoustic Architecture</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.05]">
            Precision-<span className="title-outline">engineered</span> for silence.
          </h2>

          <div className="space-y-3 font-sans text-sm md:text-base text-gray-300 leading-relaxed max-w-md">
            <p>
              Custom drivers, sealed acoustic chambers, and optimized airflow deliver studio-grade clarity.
            </p>
            <p className="text-gray-400">
              Every component is tuned for balance, power, and comfort—hour after hour.
            </p>
          </div>

          {/* Clean Specs directly on background */}
          <div className="pt-4 grid grid-cols-2 gap-6 border-t border-gray-800 max-w-md">
            <div>
              <span className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                Driver Dome
              </span>
              <span className="font-display text-sm md:text-base font-bold text-white">
                30mm Carbon Composite
              </span>
            </div>
            <div>
              <span className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                Internal Volume
              </span>
              <span className="font-display text-sm md:text-base font-bold text-white">
                Acoustic Sealed Cavity
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ACT 3: NOISE CANCELLING & MICROPHONES (40 - 65%) — Completely Direct on Background
      ========================================================================== */}
      <div
        className="absolute right-6 md:right-12 lg:right-16 max-w-xl text-left md:text-right pointer-events-none transition-all duration-300"
        style={{
          opacity: op3,
          transform: tr3,
          visibility: op3 > 0 ? 'visible' : 'hidden',
        }}
      >
        <div className="space-y-4 flex flex-col md:items-end">
          {/* Section Label: Pure border, NO background */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-gray-700 bg-transparent font-mono text-[11px] text-gray-300 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>Phase 02 // Active Cancellation</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.05]">
            Adaptive noise <span className="title-outline">cancelling</span>, redefined.
          </h2>

          <ul className="space-y-2.5 font-sans text-sm md:text-base text-gray-300 max-w-md">
            <li className="flex items-start md:justify-end space-x-3 md:space-x-reverse">
              <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0"></span>
              <span>Multi-microphone array listens in every direction.</span>
            </li>
            <li className="flex items-start md:justify-end space-x-3 md:space-x-reverse">
              <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0"></span>
              <span>Real-time noise analysis adjusts to your environment.</span>
            </li>
            <li className="flex items-start md:justify-end space-x-3 md:space-x-reverse">
              <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0"></span>
              <span>Your music stays pure—planes, trains, and crowds fade away.</span>
            </li>
          </ul>

          {/* Telemetry Stat */}
          <div className="pt-4 border-t border-gray-800 flex items-center space-x-4 font-mono text-xs text-gray-400">
            <span>QN2 HD ANC Processor</span>
            <span className="text-white font-semibold tracking-wider">700K CALCS/SEC</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ACT 4: SOUND & UPSCALING (65 - 85%) — Completely Direct on Background
      ========================================================================== */}
      <div
        className="absolute left-6 md:left-12 lg:left-16 max-w-xl pointer-events-none transition-all duration-300"
        style={{
          opacity: op4,
          transform: tr4,
          visibility: op4 > 0 ? 'visible' : 'hidden',
        }}
      >
        <div className="space-y-4">
          {/* Section Label: Pure border, NO background */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-gray-700 bg-transparent font-mono text-[11px] text-gray-300 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>Phase 03 // Audiophile Transducers</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.05]">
            Immersive, <span className="title-outline">lifelike</span> sound.
          </h2>

          <div className="space-y-3 font-sans text-sm md:text-base text-gray-300 leading-relaxed max-w-md">
            <p>
              High-performance drivers unlock detail, depth, and texture in every track.
            </p>
            <p className="text-gray-400">
              AI-enhanced upscaling restores clarity to compressed audio, so every note feels alive.
            </p>
          </div>

          {/* Monochromatic Pill Badges: Pure border, NO background */}
          <div className="pt-3 flex flex-wrap gap-2.5 font-mono text-xs">
            <span className="px-3 py-1 rounded-full border border-gray-700 text-gray-300 bg-transparent">
              LDAC 990 KBPS
            </span>
            <span className="px-3 py-1 rounded-full border border-gray-700 text-gray-300 bg-transparent">
              DSEE ULTIMATE AI
            </span>
            <span className="px-3 py-1 rounded-full border border-gray-500 text-white bg-transparent">
              360 REALITY AUDIO
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ACT 5: REASSEMBLY & FINAL HERO CTA (85 - 100%) — Completely Direct on Background
      ========================================================================== */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 transition-all duration-300 pointer-events-auto"
        style={{
          opacity: op5,
          transform: tr5,
          visibility: op5 > 0 ? 'visible' : 'hidden',
        }}
      >
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-gray-700 bg-transparent font-mono text-xs text-gray-300 tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>ARCHITECTURE FULLY REASSEMBLED</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[0.95]">
            <span className="block text-white">Hear everything.</span>
            <span className="block title-outline-thick">Feel nothing else.</span>
          </h2>

          <p className="font-sans text-base sm:text-xl font-normal text-gray-300 max-w-lg mx-auto">
            WH-1000XM6. Designed for focus, crafted for comfort.
          </p>

          <p className="font-mono text-xs sm:text-sm text-gray-400 tracking-wider">
            Engineered for airports, offices, and everything in between.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenPreorder}
              className="px-8 py-3.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_35px_rgba(255,255,255,0.25)] flex items-center space-x-2"
            >
              <span>Experience WH-1000XM6</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href="#specs"
              className="px-8 py-3.5 rounded-full border border-gray-600 hover:border-gray-400 hover:bg-gray-800 text-white font-mono text-xs uppercase tracking-wider transition-all duration-300"
            >
              See full specs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
