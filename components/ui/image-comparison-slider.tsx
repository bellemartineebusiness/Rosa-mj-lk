"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";

interface ImageComparisonProps {
  beforeImage: string;
  afterImage: string;
  altBefore?: string;
  altAfter?: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export const ImageComparison = ({
  beforeImage,
  afterImage,
  altBefore = "Före",
  altAfter = "Efter",
  beforeLabel = "FÖRE",
  afterLabel = "EFTER",
}: ImageComparisonProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      let newPosition = ((clientX - rect.left) / rect.width) * 100;
      newPosition = Math.max(0, Math.min(100, newPosition));
      setSliderPosition(newPosition);
    },
    [isDragging]
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = useCallback(() => setIsDragging(false), []);
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleTouchStart = () => setIsDragging(true);
  const handleTouchEnd = () => setIsDragging(false);
  const handleTouchMove = (e: React.TouchEvent) =>
    handleMove(e.touches[0].clientX);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto select-none rounded-2xl overflow-hidden shadow-2xl border-2 border-[#700143]/20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* After image */}
      <div
        className="absolute top-0 left-0 h-full w-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={afterImage}
          alt={altAfter}
          className="h-full w-full object-cover object-left"
          draggable="false"
        />
        {/* After label */}
        <div className="absolute top-4 left-4 bg-[#700143] text-[#f8edaa] text-xs font-bold px-3 py-1 rounded-full">
          {afterLabel}
        </div>
      </div>

      {/* Before image */}
      <img
        src={beforeImage}
        alt={altBefore}
        className="block h-full w-full object-cover object-left"
        draggable="false"
      />
      {/* Before label */}
      <div className="absolute top-4 right-4 bg-[#f8edaa] text-[#700143] text-xs font-bold px-3 py-1 rounded-full">
        {beforeLabel}
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-[#700143]/80 cursor-ew-resize flex items-center justify-center"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className={`bg-[#700143] rounded-full h-12 w-12 flex items-center justify-center shadow-lg transition-all duration-200 border-2 border-[#f8edaa] ${
            isDragging ? "scale-110 shadow-xl" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f8edaa"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12H3M9 6l-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </div>
  );
};
