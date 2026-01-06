import React from 'react';

const Gallery = () => {
    const media = [
        { type: 'video', src: '/Assets/pool_highlight_4.mp4' },
        { type: 'image', src: '/Assets/villa_entrance_facade.jpg' },
        { type: 'image', src: '/Assets/outdoor_lounge_canopy.jpg' },
        { type: 'video', src: '/Assets/mushroom water fountain.mp4' },
        { type: 'video', src: '/Assets/homepage2video.mp4' },
        { type: 'image', src: '/Assets/kids_play_zone_overview.jpg' },
    ];

    return (
        <div className="bg-bg-light pt-32 pb-24">
            <div className="container mx-auto px-6 text-center mb-16">
                <h1 className="text-5xl font-heading text-primary">Gallery</h1>
                <p className="text-gray-600 mt-4">A glimpse into the royal life.</p>
            </div>

            <div className="container mx-auto px-6">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {media.map((item, i) => (
                        <div key={i} className="break-inside-avoid shadow-lg rounded-sm overflow-hidden group">
                            {item.type === 'video' ? (
                                <video src={item.src} className="w-full h-auto" autoPlay loop muted playsInline />
                            ) : (
                                <img src={item.src} className="w-full h-auto group-hover:scale-105 transition-transform duration-700" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gallery;
