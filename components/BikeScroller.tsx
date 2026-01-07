'use client';

import { MotionValue, useMotionValueEvent } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface BikeScrollerProps {
  scrollYProgress: MotionValue<number>;
}

const FRAME_COUNT = 40;

export default function BikeScroller({ scrollYProgress }: BikeScrollerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload Images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const onImageLoad = () => {
      loadedCount++;
      if (loadedCount === FRAME_COUNT) {
        setImages(loadedImages);
        setImagesLoaded(true);
      }
    };

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const frameIndex = i.toString().padStart(3, '0');
      img.src = `/bike-sequence/ezgif-frame-${frameIndex}.jpg`;
      img.onload = onImageLoad;
      loadedImages.push(img);
    }
  }, []);

  // Draw Frame
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !imagesLoaded || !images[index]) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[index];
    
    // Set canvas dimensions to match image aspect ratio if not set
    if (canvas.width !== img.width) canvas.width = img.width;
    if (canvas.height !== img.height) canvas.height = img.height;

    // Clear and Draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };

  // Sync Scroll to Frames
  // 0.0 - 0.5: Forward 0 -> 39
  // 0.5 - 1.0: Backward 39 -> 0
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!imagesLoaded) return;

    let frameIndex = 0;
    if (latest <= 0.5) {
      // 0 -> 0.5 maps to 0 -> 39
      const progress = latest / 0.5;
      frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(progress * FRAME_COUNT)
      );
    } else {
      // 0.5 -> 1.0 maps to 39 -> 0
      const progress = (latest - 0.5) / 0.5;
      frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor((1 - progress) * FRAME_COUNT)
      );
    }
    
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  // Initial render when loaded
  useEffect(() => {
    if (imagesLoaded) {
      renderFrame(0);
    }
  }, [imagesLoaded]);

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none">
      <div className="relative w-full max-w-[1400px] aspect-[16/9] flex items-center justify-center">
        {!imagesLoaded && (
          <div className="text-white/20 text-sm font-mono animate-pulse">
            LOADING SEQUENCE...
          </div>
        )}
        <canvas
          ref={canvasRef}
          className={`object-contain w-full h-full transition-opacity duration-500 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Cinematic Glow/Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] opacity-20" />
      </div>
    </div>
  );
}
