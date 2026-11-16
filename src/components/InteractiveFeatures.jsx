import React, { useState } from 'react';
import { Volume2, Shield, Wind } from 'lucide-react';

export default function InteractiveFeatures() {
  const [activeMode, setActiveMode] = useState('anc');
  const [activeGesture, setActiveGesture] = useState('tap');

  const modes = [
    {
      id: 'anc',
      title: 'Active Noise Cancelling',
      decibels: '-42 dB',
      description: 'Dual QN2 processors invert ambient soundwaves with sub-millisecond precision. Jet engines and urban rumble dissolve completely.',
      icon: Shield,
    },
    {
      id: 'ambient',
      title: 'Adaptive Ambient Sound',
      decibels: 'Level 20/20',
      description: 'Microphones channel natural environmental voice and traffic audio into your ears without pausing your stream.',
      icon: Volume2,
    },
    {
      id: 'wind',
      title: 'Wind Noise Reduction',
      decibels: '-35 dB Wind',
      description: 'Recessed acoustic mesh deflects air turbulence while machine-learning models preserve speech clarity.',
      icon: Wind,
    },
  ];

  const gestures = [
    { id: 'tap', title: 'Double Tap', action: 'Play / Pause music, or answer phone call' },
    { id: 'swipe-v', title: 'Swipe Up / Down', action: 'Fluid step-free volume adjustment' },
    { id: 'swipe-h', title: 'Swipe Forward / Back', action: 'Skip track or return to previous track' },
    { id: 'palm', title: 'Cover Right Cup', action: 'Quick Attention: instantly dips audio for conversation' },
  ];

  return (
    <section id="technology" className="relative py-28 bg-[#050505] text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-gray-700 bg-transparent font-mono text-xs uppercase tracking-widest text-gray-400">
            <span className="badge-dot" />
            <span>Acoustic Intelligence</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Silence tailored to <span className="title-outline">every second</span>.
          </h2>
          <p className="font-sans text-base text-gray-400 leading-relaxed">
            Switch acoustic modes manually or allow the Auto NC Optimizer to adapt in real time to barometric pressure, ear anatomy, and ambient decibels.
          </p>
        </div>

        {/* Interactive Mode Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          {/* Mode Selector Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {modes.map((mode) => {
              const Icon = mode.icon;
              const isSelected = activeMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id)}
                  className={`text-left p-6 rounded-2xl border transition-all duration-300 relative group card-3d ${
                    isSelected
                      ? 'bg-[#121212] border-white shadow-[0_10px_30px_rgba(255,255,255,0.06)]'
                      : 'bg-[#0a0a0a] border-gray-800 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-xl ${isSelected ? 'bg-white text-black' : 'bg-gray-800 text-gray-400'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-display font-bold text-base tracking-tight text-white">
                        {mode.title}
                      </span>
                    </div>
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-full border border-gray-700 text-gray-300">
                      {mode.decibels}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-gray-400 leading-relaxed pl-11">
                    {mode.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Interactive Acoustic Simulation Screen */}
          <div className="lg:col-span-7 bg-[#0e0e0e] border border-gray-700 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div className="flex items-center space-x-3">
                <span className="badge-dot" />
                <span className="font-mono text-xs tracking-wider uppercase text-gray-300">
                  Acoustic Spectrum Simulation
                </span>
              </div>
              <span className="font-mono text-xs text-white uppercase tracking-wider">
                {activeMode === 'anc' ? 'Inversion Active' : activeMode === 'ambient' ? 'Transparent Mode' : 'Wind Shield On'}
              </span>
            </div>

            {/* Audio Wave Visualizer Simulation */}
            <div className="my-10 flex items-center justify-center space-x-1.5 h-36">
              {[...Array(36)].map((_, idx) => {
                let height = 20;
                if (activeMode === 'anc') {
                  height = 10 + Math.sin(idx * 0.4) * 8;
                } else if (activeMode === 'ambient') {
                  height = 20 + Math.abs(Math.sin(idx * 0.5) * 80);
                } else {
                  height = 15 + Math.cos(idx * 0.3) * 30;
                }
                return (
                  <div
                    key={idx}
                    className="w-1.5 rounded-full transition-all duration-500 bg-white"
                    style={{
                      height: `${height}px`,
                      opacity: 0.25 + (idx % 3) * 0.3,
                    }}
                  />
                );
              })}
            </div>

            {/* Waveform Diagnostics Footer */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-800 text-center font-mono">
              <div>
                <span className="block text-[10px] uppercase text-gray-500">External Noise</span>
                <span className="text-sm font-semibold text-white">
                  {activeMode === 'anc' ? '78 dB SPL' : activeMode === 'ambient' ? 'Ambient Mix' : 'Gust: 24 km/h'}
                </span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-gray-500">In-Ear Residual</span>
                <span className="text-sm font-semibold text-white">
                  {activeMode === 'anc' ? '36 dB (Quiet)' : activeMode === 'ambient' ? 'Voice Boosted' : 'Turbulence Cut'}
                </span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-gray-500">Processing Latency</span>
                <span className="text-sm font-semibold text-white">0.28 ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Intuitive Touch Gestures Showcase */}
        <div id="noise-cancelling" className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-gray-400">
                Capacitive Surface
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white mt-1">
                Fingertip sensor control.
              </h3>
            </div>
            <p className="font-sans text-sm text-gray-400 max-w-md">
              The entire right ear cup is an invisible, micro-etched touch sensor responding smoothly to gestures even when wearing gloves.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {gestures.map((gesture) => (
              <div
                key={gesture.id}
                onClick={() => setActiveGesture(gesture.id)}
                className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 card-3d ${
                  activeGesture === gesture.id
                    ? 'bg-gray-800 border-white shadow-[0_5px_20px_rgba(255,255,255,0.08)]'
                    : 'bg-[#050505] border-gray-800 hover:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display font-semibold text-sm text-white">
                    {gesture.title}
                  </span>
                  {activeGesture === gesture.id && (
                    <span className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <p className="font-sans text-xs text-gray-400 leading-relaxed">
                  {gesture.action}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
