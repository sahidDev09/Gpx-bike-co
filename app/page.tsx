'use client';

import { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';
import Lenis from 'lenis'; // Correct standard import for lenis v1+
import BikeScroller from '@/components/BikeScroller';
import TextBeats from '@/components/TextBeats';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use Framer Motion's useScroll hooked into the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-[#050505] min-h-screen text-white">
      {/* 
        Scroll Container 
        Total Height = 500vh gives us plenty of room to "scrub" the timeline.
      */}
      <div ref={containerRef} className="h-[500vh] relative">
        
        {/* Sticky Viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
          
          {/* Main Visuals & Content */}
          <BikeScroller scrollYProgress={scrollYProgress} />
          <TextBeats scrollYProgress={scrollYProgress} />

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-pulse">
            <span className="text-xs tracking-widest uppercase">Scroll to Explore</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
          </div>

        </div>

      </div>
      
      {/* Footer / Next Section Placeholder */}
      <section className="h-screen flex items-center justify-center bg-zinc-900 border-t border-zinc-800">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Specifications</h2>
          <p className="text-zinc-500">More details below...</p>
        </div>
      </section>
    </main>
  );
}
