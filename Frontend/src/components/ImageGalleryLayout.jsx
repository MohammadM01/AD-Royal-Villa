import React from 'react';
import { motion } from 'framer-motion';
import LiquidRevealImage from './LiquidRevealImage';

const ImageGalleryLayout = ({ title, subtitle, eyebrow, items = [] }) => {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12 min-h-screen transition-colors duration-300 relative">
            {/* Burgundy Blur for Light Theme - Positioning it behind content */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#800000]/20 dark:bg-[#D4AF37]/20 rounded-full blur-[100px] pointer-events-none -z-10 transition-colors duration-500"
            />

            {/* Header Section */}
            <div className="text-center mb-16 space-y-4 max-w-4xl mx-auto">
                {eyebrow && (
                    <span className="text-primary dark:text-accent tracking-widest text-sm font-bold uppercase block mb-2">
                        {eyebrow}
                    </span>
                )}
                <h1 className="text-5xl md:text-7xl font-heading text-primary dark:text-accent tracking-tight">
                    {title}
                </h1>
                {subtitle && (
                    <div className="text-lg md:text-xl text-black dark:text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
                        {subtitle}
                    </div>
                )}
            </div>

            {/* Gallery Grid - Asymmetric Masonry-style Layout */}
            {/* 
         We use CSS Columns for true Masonry, or a Grid with manual offsets.
         For "Floating image collage... Asymmetrically (not a strict grid)",
         CSS columns is easiest for vertical stacking of varying heights.
         But if images are same aspect ratio, we need manual offsets.
         Let's assume images might vary.
         Current assets are mixed videos/images? LiquidRevealImage handles 'img'.
         We will treat videos as images for now or I need to update LiquidRevealImage to support video.
         The prompt specifically says "Image reveals...". I'll assume images.
      */}
            {/* Gallery Grid - Collapsing/Overlapping Layout */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-2 p-4 space-y-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`break-inside-avoid relative ${index % 2 !== 0 ? 'md:ml-4' : ''}`}
                        style={{
                            // Create collapsing/overlapping effect
                            marginTop: index === 0 ? '0' : '-1.5rem',
                            zIndex: index
                        }}
                    >
                        <LiquidRevealImage
                            src={item.src}
                            alt={item.title}
                            title={item.title}
                            description={item.description}
                            index={index}
                            className="w-full object-cover shadow-2xl rounded-2xl border-2 border-primary/20 dark:border-white/10"
                        />
                    </div>
                ))}
            </div>

            {/* Decorative localized liquid elements could go here */}
        </div>
    );
};

export default ImageGalleryLayout;
