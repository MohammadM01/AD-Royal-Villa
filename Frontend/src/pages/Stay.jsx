import React from 'react';
import Timeline from '../components/stay/Timeline';
import FullAmenities from '../components/amenities/FullAmenities';

import { motion } from 'framer-motion';

const Stay = () => {
  return (
    <div className="w-full min-h-screen relative">
      {/* Hero Section Wrapper with Clipping & Separator Line */}
      <div className="relative w-full overflow-hidden pb-16 mb-30">
        {/* Background Blur using Custom CSS Class from index.css */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="amenities-blur-circle absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none z-[1] transition-colors duration-500"
        />

        {/* Header Section */}
        <div className="text-center pt-32 space-y-4 max-w-4xl mx-auto relative z-10">
          <span className="text-primary dark:text-accent tracking-widest text-sm font-bold uppercase block mb-2">
            AMENITIES
          </span>
          <h1 className="text-5xl md:text-7xl font-heading text-primary dark:text-accent tracking-tight">
            Stay & Comfort
          </h1>
          <div className="amenities-royal-text text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Experience the height of luxury living.
          </div>

          <div className="amenities-royal-text mt-8 space-y-2 text-base md:text-lg italic max-w-3xl mx-auto">
            <p>Where every moment is crafted for your absolute comfort.</p>
            <p>Indulge in a retreat that redefines the art of relaxation.</p>
          </div>
        </div>

        {/* Faded Gradient Separator Line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-400/50 to-transparent"></div>
      </div>

      <Timeline />
      <div className="relative z-20">
        <FullAmenities />
      </div>
    </div>
  );
};

export default Stay;
