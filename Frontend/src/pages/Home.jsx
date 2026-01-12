import React, { useEffect } from 'react';
import HeroCircular from '../components/home/HeroCircular';
import PoolZigZag from '../components/home/PoolZigZag';
import VillaVerticalTour from '../components/home/VillaVerticalTour';
import CustomerVideos from '../components/home/CustomerVideos';
import Testimonials from '../components/home/Testimonials';
import AboutUs from '../components/home/AboutUs';
import AmenitiesShowcase from '../components/home/AmenitiesShowcase';

const Home = () => {
  // Reset scroll on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* 1. Circular Reveal Hero */}
      <HeroCircular />

      {/* 1.5 About Us Section */}
      <AboutUs />

      {/* 2. Zig-Zag Pool Section */}
      <PoolZigZag />

      {/* 3. Vertical Magnify Tour */}
      <VillaVerticalTour />

      {/* 4. Amenities Showcase */}
      <AmenitiesShowcase />

      {/* 5. Smart Video Grid */}
      <CustomerVideos />

      {/* 6. Testimonials */}
      <Testimonials />

      {/* 7. Feature/Ending Section */}
      <div className="py-24 bg-primary/5 dark:bg-white/5 text-center transition-colors duration-300">
        <h2 className="text-4xl font-heading mb-8 text-primary dark:text-white drop-shadow-sm">Ready for your escape?</h2>
        <a
          href="https://wa.me/919890205767"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white !text-white font-heading uppercase tracking-[0.2em] text-sm rounded-full shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-transparent hover:border-white/20"
        >
          Book Now
        </a>
      </div>
    </div>
  );
};

export default Home;
