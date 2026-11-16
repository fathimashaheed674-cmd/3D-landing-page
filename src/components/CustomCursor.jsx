import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [outlinePos, setOutlinePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop mouse)
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    setIsVisible(true);

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    let animationFrameId;
    const updateOutline = () => {
      setOutlinePos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18,
      }));
      animationFrameId = requestAnimationFrame(updateOutline);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(updateOutline);

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'BUTTON' ||
        e.target.tagName === 'A' ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pos.x, pos.y]);

  if (!isVisible) return null;

  return (
    <>
      <div
        className="cursor-dot hidden md:block"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: isHovering ? 'translate(-50%, -50%) scale(1.6)' : 'translate(-50%, -50%) scale(1)',
        }}
      />
      <div
        className="cursor-outline hidden md:block"
        style={{
          left: `${outlinePos.x}px`,
          top: `${outlinePos.y}px`,
          width: isHovering ? '54px' : '36px',
          height: isHovering ? '54px' : '36px',
          borderColor: isHovering ? 'rgba(0, 214, 255, 0.8)' : 'rgba(255, 255, 255, 0.35)',
        }}
      />
    </>
  );
}
