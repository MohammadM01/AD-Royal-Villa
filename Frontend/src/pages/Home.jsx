import React, { useEffect } from 'react';
import HeroCircular from '../components/home/HeroCircular';
import PoolZigZag from '../components/home/PoolZigZag';
import VillaVerticalTour from '../components/home/VillaVerticalTour';
import CustomerVideos from '../components/home/CustomerVideos';

const Home = () => {
  // Reset scroll on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* 1. Circular Reveal Hero */}
      <HeroCircular />

      {/* 2. Zig-Zag Pool Section */}
      <PoolZigZag />

      {/* 3. Vertical Magnify Tour */}
      <VillaVerticalTour />

      {/* 4. Smart Video Grid */}
      <CustomerVideos />

      {/* 5. Feature/Ending Section */}
      <div className="py-24 bg-[#fada7b] text-[#0077b6] text-center">
        <h2 className="text-4xl font-heading mb-6 !text-[#0077b6]">Ready for your escape?</h2>
        <button className="px-8 py-4 bg-[#0077b6] text-white font-bold rounded-full hover:scale-105 transition-transform">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Home;
