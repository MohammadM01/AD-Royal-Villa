import React, { useEffect, useRef, useState } from 'react';

const slides = [
    {
        id: 1,
        title: '4 Luxury Bedrooms',
        desc: 'Experience unparalleled comfort in our spacious, fully furnished bedrooms. Each room is designed to provide a restful retreat after a day of fun, featuring premium bedding and modern amenities.',
        features: [
            'King-size Beds',
            'Fully Air-Conditioned',
            'Pool-view Balconies',
            '32" Smart TVs',
            'Wardrobes & Storage',
            'Attached Washrooms',
        ],
        image: '/Assets/ameneties/luxury_bedroom_king_tv.jpg',
    },
    {
        id: 2,
        title: 'Spacious Living Room',
        desc: 'Relax and unwind in our grand living area, perfect for family gatherings and group activities. Designed with luxury and comfort in mind.',
        features: [
            'Plush Seating',
            'Large Flat-screen TV',
            'Ambient Lighting',
            'Open Layout',
        ],
        image: '/Assets/ameneties/spacious%20living%20room.png',
    },
    {
        id: 3,
        title: 'Exquisite Dining',
        desc: 'Enjoy your meals in a sophisticated dining setting. Whether it’s a quick breakfast or a grand dinner, our dining area sets the perfect mood.',
        features: [
            '8-Seater Dining Table',
            'Poolside View',
            'Modern Tableware',
            'Elegant Decor',
        ],
        image: '/Assets/ameneties/dinningexp.png',
    },
    {
        id: 4,
        title: 'Poolside Patio',
        desc: 'Step out onto the patio for a breath of fresh air. It is the ideal spot for your morning coffee or evening cocktails by the pool.',
        features: [
            'Outdoor Seating',
            'Pool Access',
            'Evening Lighting',
            'Scenic Views',
        ],
        image: '/Assets/ameneties/poolside_patio_dining.jpg',
    },
    {
        id: 5,
        title: 'Comfort & Style',
        desc: 'Every corner of the villa is crafted to offer a blend of style and homeliness, ensuring you feel right at home while enjoying luxury.',
        features: [
            'Cozy Corners',
            'Artistic Interiors',
            'Premium Upholstery',
            'Natural Lighting',
        ],
        image: '/Assets/ameneties/comfort_bedroom_interior.jpg',
    },
    {
        id: 6,
        title: 'Evening Ambiance',
        desc: 'As the sun sets, the villa transforms into a magical space with warm lighting and a serene atmosphere, perfect for making memories.',
        features: [
            'Mood Lighting',
            'Peaceful Surroundings',
            'Starry Skies',
            'Night Swimming',
        ],
        image: '/Assets/ameneties/pool_rooms_evening_glow.jpg',
    },
];

const Timeline = () => {
    const containerRef = useRef(null);
    const [activeSlide, setActiveSlide] = useState(1);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const { top, height } = containerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            const scrollableDistance = height - viewportHeight;
            const scrolled = -top;

            let newProgress = scrolled / scrollableDistance;
            newProgress = Math.max(0, Math.min(1, newProgress));

            setProgress(newProgress);

            const currentSlideIndex = Math.floor((scrolled + viewportHeight / 2) / viewportHeight);
            const safeIndex = Math.max(0, Math.min(slides.length - 1, currentSlideIndex));
            setActiveSlide(safeIndex + 1);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative bg-background text-[#4A4A4A] dark:bg-neutral-900 dark:text-neutral-200">

            {/* Sticky Header with Progress Line */}
            <div className="sticky top-0 z-50 bg-background/90 dark:bg-neutral-900/90 backdrop-blur-sm pt-20 pb-4 px-6 border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
                <div className="max-w-7xl mx-auto flex flex-col items-center">
                    <h2 className="text-xl md:text-2xl font-serif text-center mb-4">Stay & Comfort</h2>
                    {/* Progress Line Container */}
                    <div className="w-full max-w-sm h-0.5 bg-neutral-300 dark:bg-neutral-700 relative overflow-hidden rounded-full">
                        <div
                            className="absolute left-0 top-0 h-full bg-[#8B7E66] dark:bg-[#C2B280] transition-all duration-100 ease-out"
                            style={{ width: `${(Math.max(0.16, progress) * 100)}%` }}
                        />
                    </div>
                </div>
            </div>

            <div ref={containerRef} className="relative">

                {/* Sticky Center Line & Box */}
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-40 flex justify-center items-center">
                    <div className="relative h-[60vh] w-px bg-neutral-300 dark:bg-neutral-600 mt-20">
                        <div
                            className="absolute left-1/2 -translate-x-1/2 bg-[#6D634C] dark:bg-[#C2B280] text-white dark:text-black text-xs font-medium px-3 py-1 rounded-full shadow-lg transition-all duration-100 ease-linear"
                            style={{ top: `${progress * 100}%` }}
                        >
                            {activeSlide}/6
                        </div>
                    </div>
                </div>

                {/* Content Slides */}
                {slides.map((slide, index) => (
                    <section
                        key={slide.id}
                        className="h-screen w-full flex items-center justify-center relative px-6 md:px-12 py-20"
                    >
                        <div className={`container max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'
                            }`}>
                            {/* Image Side */}
                            <div className={`relative group ${index % 2 !== 0 && 'md:order-2'}`}>
                                <div className="overflow-hidden rounded-3xl shadow-2xl aspect-[4/3] relative">
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                                </div>
                            </div>

                            {/* Text Side */}
                            <div className={`space-y-6 ${index % 2 !== 0 && 'md:order-1'}`}>
                                <div className="w-12 h-1 bg-[#8B7E66] dark:bg-[#C2B280]" />
                                <h3 className="text-3xl md:text-4xl font-serif text-[#2C2C2C] dark:text-[#EAEAEA]">
                                    {slide.title}
                                </h3>
                                <p className="text-lg leading-relaxed font-light text-neutral-600 dark:text-neutral-400">
                                    {slide.desc}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                    {slide.features.map((feature, i) => (
                                        <div key={i} className="flex items-center space-x-2 text-sm font-medium text-[#6D634C] dark:text-[#C2B280]">
                                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
