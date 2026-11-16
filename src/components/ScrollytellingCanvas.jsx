import React, { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 120;
const FRAME_BASE_PATH = '/sequence/frame_';

export default function ScrollytellingCanvas({ onProgressUpdate, children }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const animationFrameIdRef = useRef(null);

  // Preload all 120 frames
  useEffect(() => {
    let isMounted = true;
    const images = [];
    let loaded = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNumber = String(i).padStart(3, '0');
      img.src = `${FRAME_BASE_PATH}${frameNumber}.webp`;

      img.onload = () => {
        if (!isMounted) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded >= 15 && !isReady) {
          setIsReady(true);
        }
      };
      img.onerror = () => {
        console.warn(`Failed to load frame ${i}`);
        if (!isMounted) return;
        loaded++;
        setLoadedCount(loaded);
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      isMounted = false;
    };
  }, []);

  // Draw frame to canvas with crisp DPI & contain sizing
  const renderFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;

    if (canvas.width !== canvasWidth * dpr || canvas.height !== canvasHeight * dpr) {
      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Pure deep background matching exact frame borders
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Calculate aspect ratio containment
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawHeight = canvasHeight * 0.88;
      drawWidth = drawHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasWidth * 0.95;
      drawHeight = drawWidth / imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = (canvasHeight - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  }, []);

  // Smooth frame interpolation loop (lerp)
  useEffect(() => {
    const loop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.05) {
        currentFrameRef.current += diff * 0.22;
        const frameToRender = Math.max(
          0,
          Math.min(TOTAL_FRAMES - 1, Math.round(currentFrameRef.current))
        );
        renderFrame(frameToRender);
      }
      animationFrameIdRef.current = requestAnimationFrame(loop);
    };

    animationFrameIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [renderFrame]);

  // Handle scroll calculation
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollableHeight = rect.height - window.innerHeight;
      if (totalScrollableHeight <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScrollableHeight;
      const progress = Math.max(0, Math.min(1, rawProgress));

      const targetFrame = progress * (TOTAL_FRAMES - 1);
      targetFrameRef.current = targetFrame;

      if (onProgressUpdate) {
        onProgressUpdate(progress, targetFrame);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [onProgressUpdate]);

  useEffect(() => {
    if (isReady) {
      renderFrame(0);
    }
  }, [isReady, renderFrame]);

  const loadPercent = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));

  return (
    <div
      ref={containerRef}
      id="overview"
      className="relative w-full h-[520vh] bg-[#050505]"
    >
      {/* Sticky Full-Viewport Stage — PURE #050505 background with NO blur or gradient overlays */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#050505]">
        {/* HTML5 Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block bg-[#050505] transition-opacity duration-500"
          style={{ opacity: isReady ? 1 : 0 }}
        />

        {/* Loading Overlay */}
        {!isReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505] z-30">
            <div className="relative w-16 h-16 flex items-center justify-center mb-6">
              <div className="absolute inset-0 rounded-full border border-gray-800"></div>
              <div className="absolute inset-0 rounded-full border-t-2 border-white animate-spin"></div>
              <span className="text-[10px] tracking-widest font-mono text-gray-400">{loadPercent}%</span>
            </div>
            <p className="text-xs uppercase tracking-widest text-gray-500 font-mono">
              Loading XM6 Architecture
            </p>
          </div>
        )}

        {/* Story Overlays (rendered directly on top of canvas, NO background layer) */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
