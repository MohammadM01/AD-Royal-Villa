import React from 'react';
import LiquidRevealImage from './LiquidRevealImage';

const ImageGalleryLayout = ({ title, subtitle, items = [] }) => {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12 min-h-screen transition-colors duration-300">
            {/* Header Section */}
            <div className="text-center mb-16 space-y-4 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-heading text-primary tracking-tight">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>
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
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 p-4 space-y-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="break-inside-avoid relative"
                        style={{
                            // Create collapsing/overlapping effect
                            marginTop: index === 0 ? '0' : '-3rem',
                            // Slight horizontal offset for random look
                            marginLeft: index % 2 === 0 ? '0' : '1rem',
                            zIndex: index
                        }}
                    >
                        <LiquidRevealImage
                            src={item.src}
                            alt={item.title}
                            title={item.title}
                            description={item.description}
                            index={index}
                            className="w-full object-cover shadow-2xl rounded-2xl"
                        />
                    </div>
                ))}
            </div>

            {/* Decorative localized liquid elements could go here */}
        </div>
    );
};

export default ImageGalleryLayout;
