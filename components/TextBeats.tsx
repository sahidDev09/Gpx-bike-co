'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';

interface TextBeatsProps {
  scrollYProgress: MotionValue<number>;
}

export default function TextBeats({ scrollYProgress }: TextBeatsProps) {
  // 0% Scroll: Hero Intro (Centered)
  const opacityIntro = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const yIntro = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  // 30% Scroll: Engineering Begins (Left) -> Appears at 0.2, Fades at 0.4
  const opacityEng = useTransform(scrollYProgress, [0.2, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
  const xEng = useTransform(scrollYProgress, [0.2, 0.3], [-50, 0]);

  // 60% Scroll: Full Reveal (Right) -> Appears at 0.5, Fades at 0.75
  const opacityPerf = useTransform(scrollYProgress, [0.5, 0.55, 0.7, 0.75], [0, 1, 1, 0]);
  const xPerf = useTransform(scrollYProgress, [0.5, 0.6], [50, 0]);

  // 90% Scroll: Final Statement (Centered) -> Appears at 0.85
  const opacityFinal = useTransform(scrollYProgress, [0.85, 0.9, 1], [0, 1, 1]);
  const scaleFinal = useTransform(scrollYProgress, [0.85, 1], [0.9, 1]);

  return (
    <div className="absolute inset-0 pointer-events-none w-full h-full">
      
      {/* 0% - Hero */}
      <motion.div 
        style={{ opacity: opacityIntro, y: yIntro }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20 w-full px-6 md:px-12"
      >
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white/90 mb-4 drop-shadow-2xl">
          GPX Demon GR250
        </h1>
        <p className="text-xl md:text-2xl text-white/60 tracking-[0.2em] font-light uppercase">
          Pure Street Power
        </p>
      </motion.div>

      {/* 30% - Precision Engineering */}
      <motion.div 
        style={{ opacity: opacityEng, x: xEng }}
        className="absolute top-1/3 left-6 md:left-12 lg:left-24 max-w-md z-20"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white/90 leading-tight">
          Precision<br/>Engineering
        </h2>
        <div className="w-12 h-1 bg-red-600 mt-6 mb-4" />
        <p className="text-white/60 text-lg leading-relaxed">
          Aerodynamic bodywork meets a lightweight chassis. 
          Designed for total control.
        </p>
      </motion.div>

      {/* 60% - Engine Reveal */}
      <motion.div 
        style={{ opacity: opacityPerf, x: xPerf }}
        className="absolute top-1/3 right-6 md:right-12 lg:right-24 max-w-md text-right z-20 flex flex-col items-end"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white/90 leading-tight">
          Liquid-Cooled<br/>Performance
        </h2>
        <div className="w-12 h-1 bg-red-600 mt-6 mb-4" />
        <p className="text-white/60 text-lg leading-relaxed">
          High-torque engine tuned for rapid acceleration 
          and superior top-end power.
        </p>
      </motion.div>

      {/* 90% - Final CTA */}
      <motion.div 
        style={{ opacity: opacityFinal, scale: scaleFinal }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center z-20 w-full px-6 md:px-12"
      >
        <h2 className="text-6xl md:text-9xl font-black text-white px-4">
          RIDE EVERYTHING.
        </h2>
        <button className="mt-8 px-8 py-4 bg-white text-black font-bold text-lg tracking-wider rounded-full hover:bg-red-600 hover:text-white transition-colors duration-300 pointer-events-auto">
          PRE-ORDER NOW
        </button>
      </motion.div>

    </div>
  );
}
