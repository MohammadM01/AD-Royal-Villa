import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="bg-bg-light pt-20">
            {/* Page Header */}
            <div className="h-[50vh] bg-primary relative flex items-center justify-center overflow-hidden">
                <img src="/Assets/villa_entrance_facade.jpg" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                <div className="relative z-10 text-center text-white">
                    <h1 className="text-6xl font-heading mb-4">Our Story</h1>
                    <p className="text-accent uppercase tracking-widest text-sm">Since 2018</p>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-6 py-24">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    <div className="md:w-1/2">
                        <h2 className="text-4xl font-heading text-primary mb-6">A Vision of Elegance</h2>
                        <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                            AD Royal Villa started with a dream to bring world-class hospitality to our hometown. We wanted to create a space that feels like a home but treats you like royalty.
                        </p>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Every corner of our property, from the shimmering pool tiles to the hand-picked garden flora, tells a story of passion and dedication. We invite you to be part of our story.
                        </p>
                    </div>
                    <div className="md:w-1/2">
                        <div className="grid grid-cols-2 gap-4">
                            <img src="/Assets/outdoor_lounge_canopy.jpg" className="rounded-lg shadow-lg mt-8" />
                            <img src="/Assets/kids_play_zone_overview.jpg" className="rounded-lg shadow-lg" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats / Team */}
            <div className="bg-white py-24">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-heading text-primary mb-16">The People Behind The Brand</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="w-48 h-48 bg-gray-200 rounded-full mb-6 overflow-hidden">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} className="w-full h-full object-cover" />
                                </div>
                                <h4 className="text-xl font-heading font-bold text-primary">Team Member {i}</h4>
                                <p className="text-gray-500 uppercase text-xs tracking-widest mt-2">Hospitality Manager</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
    