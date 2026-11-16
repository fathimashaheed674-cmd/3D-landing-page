import React, { useState } from 'react';
import { BatteryCharging, Shield, Radio, Package, Music2 } from 'lucide-react';

export default function SpecsSection() {
  const [activeTab, setActiveTab] = useState('audio');

  const categories = [
    { id: 'audio', name: 'Audio & Acoustics', icon: Music2 },
    { id: 'anc', name: 'Noise Cancellation', icon: Shield },
    { id: 'battery', name: 'Battery & Power', icon: BatteryCharging },
    { id: 'connectivity', name: 'Connectivity & Smart', icon: Radio },
    { id: 'box', name: 'In The Box & Eco', icon: Package },
  ];

  const specsData = {
    audio: [
      { label: 'Driver Unit', value: '30mm custom carbon-composite dome with soft TPU edge' },
      { label: 'Frequency Response', value: '4 Hz – 40,000 Hz (JEITA Standard)' },
      { label: 'Passive Cable Mode', value: '4 Hz – 40,000 Hz via 3.5mm gold-plated stereo cable' },
      { label: 'Audio Restoration', value: 'DSEE Ultimate AI real-time audio upscaling engine' },
      { label: 'High-Res Codecs', value: 'LDAC (990 kbps / 96 kHz 24-bit), LC3 (LE Audio), AAC, SBC' },
      { label: 'Spatial Sound', value: '360 Reality Audio certified with personalized ear analysis' },
      { label: 'Impedance', value: '48 Ω active / 16 Ω passive (1 kHz)' },
    ],
    anc: [
      { label: 'Dual Processors', value: 'HD Noise Cancelling Processor QN2 + Integrated Processor V2' },
      { label: 'Microphone Array', value: '8 beamforming microphones (4 per ear cup) with acoustic mesh' },
      { label: 'Atmospheric Sensor', value: 'Real-time barometric pressure sensor for aircraft cabins' },
      { label: 'Personal Optimizer', value: 'Continuous head-shape and hair-gap acoustic leakage calibration' },
      { label: 'Quick Attention Mode', value: 'Instantly dips audio volume when right ear cup is covered' },
      { label: 'Wind Noise Reduction', value: 'Dual aerodynamic wind mesh baffles with machine-learning speech extraction' },
    ],
    battery: [
      { label: 'Battery Life (ANC ON)', value: 'Up to 40 hours continuous music playback' },
      { label: 'Battery Life (ANC OFF)', value: 'Up to 50 hours continuous music playback' },
      { label: 'Ultra-Fast PD Charge', value: '3 minutes of charging provides 3 hours of playback' },
      { label: 'Full Charge Time', value: 'Approx. 2.5 hours from 0% to 100%' },
      { label: 'Charging Interface', value: 'USB Type-C with USB Power Delivery (PD) fast-charge' },
      { label: 'Standby Endurance', value: 'Up to 200 hours' },
    ],
    connectivity: [
      { label: 'Bluetooth Version', value: 'Bluetooth 5.4 Class 1 with LE Audio support' },
      { label: 'Multipoint Connection', value: 'Simultaneous connection up to 3 devices (Mac, Windows, iOS, Android)' },
      { label: 'Transmission Range', value: 'Line of sight approx. 30 meters (98 ft)' },
      { label: 'Pairing Technology', value: 'Google Fast Pair, Microsoft Swift Pair, NFC Tap' },
      { label: 'Voice Assistants', value: 'Native Google Assistant & Amazon Alexa built-in' },
      { label: 'Wear Detection', value: 'Dual capacitive proximity sensors for auto-pause/play' },
    ],
    box: [
      { label: 'What is Included', value: 'WH-1000XM6 Headphones, collapsible magnetic carrying case' },
      { label: 'Cables Included', value: 'USB-C to USB-C charging cable, 1.2m 3.5mm stereo cable' },
      { label: 'Travel Accessories', value: 'In-flight stereo dual-pin plug adapter' },
      { label: 'Weight', value: '245 g (8.64 oz)' },
      { label: 'Environmental Standard', value: '100% zero-plastic packaging from recycled bamboo & sugarcane' },
      { label: 'Warranty Coverage', value: 'Sony Official 2-Year Limited International Warranty' },
    ],
  };

  return (
    <section id="specs" className="py-28 bg-[#050505] border-t border-gray-800 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-gray-700 bg-gray-900 font-mono text-xs uppercase tracking-widest text-gray-400">
            <span className="badge-dot" />
            <span>Engineering Architecture</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Technical <span className="title-outline">Specifications</span>.
          </h2>
          <p className="font-sans text-base text-gray-400">
            Uncompromising specifications calibrated for demanding audiophiles and frequent travelers.
          </p>
        </div>

        {/* Tab Navigation from my-resume */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-800 pb-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-black font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Specs Table */}
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden divide-y divide-gray-800/80">
          {specsData[activeTab].map((spec, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-12 py-4 px-6 md:px-8 hover:bg-white/[0.02] transition-colors"
            >
              <div className="md:col-span-4 font-mono text-xs uppercase tracking-wider text-gray-400 mb-1 md:mb-0">
                {spec.label}
              </div>
              <div className="md:col-span-8 font-sans text-sm font-medium text-gray-200">
                {spec.value}
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Metrics Grid from my-resume */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0a0a0a] border border-gray-800 text-center card-3d">
            <span className="block font-display text-4xl sm:text-5xl font-extrabold text-white">
              40h
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-gray-400 mt-2 block">
              Continuous ANC
            </span>
          </div>
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0a0a0a] border border-gray-800 text-center card-3d">
            <span className="block font-display text-4xl sm:text-5xl font-extrabold title-outline-thick">
              3m
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-gray-400 mt-2 block">
              Quick 3h Play
            </span>
          </div>
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0a0a0a] border border-gray-800 text-center card-3d">
            <span className="block font-display text-4xl sm:text-5xl font-extrabold text-white">
              245g
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-gray-400 mt-2 block">
              Chassis Weight
            </span>
          </div>
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0a0a0a] border border-gray-800 text-center card-3d">
            <span className="block font-display text-4xl sm:text-5xl font-extrabold title-outline-thick">
              990k
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-gray-400 mt-2 block">
              LDAC Bitrate
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
