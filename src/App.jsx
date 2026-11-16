import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import ScrollytellingCanvas from './components/ScrollytellingCanvas';
import StoryOverlays from './components/StoryOverlays';
import InteractiveFeatures from './components/InteractiveFeatures';
import ColorFinishes from './components/ColorFinishes';
import SpecsSection from './components/SpecsSection';
import PreorderModal from './components/PreorderModal';
import Footer from './components/Footer';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPreorderOpen, setIsPreorderOpen] = useState(false);

  const handleProgressUpdate = useCallback((progress, frame) => {
    setScrollProgress(progress);
    setCurrentFrame(frame);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black font-sans relative">
      {/* Interactive Custom Cursor from chay1504/my-resume */}
      <CustomCursor />

      {/* Minimalist Top Navigation */}
      <Navbar
        onOpenPreorder={() => setIsPreorderOpen(true)}
        currentProgress={scrollProgress}
      />

      {/* Main Core Interaction: Sticky Scrollytelling Canvas & Direct Floating Typography (Zero Blur Layer) */}
      <main>
        <ScrollytellingCanvas onProgressUpdate={handleProgressUpdate}>
          <StoryOverlays
            progress={scrollProgress}
            onOpenPreorder={() => setIsPreorderOpen(true)}
          />
        </ScrollytellingCanvas>

        {/* Section 2: Interactive Acoustic Intelligence & Gestures */}
        <InteractiveFeatures />

        {/* Section 3: Industrial Color Finishes Showcase */}
        <ColorFinishes onOpenPreorder={() => setIsPreorderOpen(true)} />

        {/* Section 4: High-End Technical Specifications */}
        <SpecsSection />
      </main>

      {/* Corporate Minimalist Global Footer */}
      <Footer />

      {/* Direct Pre-Order Configuration Modal */}
      <PreorderModal
        isOpen={isPreorderOpen}
        onClose={() => setIsPreorderOpen(false)}
      />
    </div>
  );
}
