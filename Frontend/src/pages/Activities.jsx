import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Internal Components ---

const ImageSlideshow = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl border-4 border-white dark:border-[#2A2A2A]">
            {images.map((src, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                    <img
                        src={src}
                        alt={`Slide ${index}`}
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        </div>
    );
};

const VideoPlayer = ({ src }) => {
    return (
        <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl border-4 border-white dark:border-[#2A2A2A]">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
            >
                <source src={src} type="video/mp4" />
            </video>
        </div>
    );
};

const ContentSection = ({ title, subtitle, desc, mediaType, mediaSrc, reverse }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.anim-text',
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
                }
            );
            gsap.fromTo('.anim-media',
                { x: reverse ? 50 : -50, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, [reverse]);

    return (
        <div ref={sectionRef} className="container mx-auto px-6 py-24 md:py-32">
            <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${reverse ? 'lg:flex-row-reverse' : ''}`}>

                {/* Media Side (Left or Right) */}
                <div className="w-full lg:w-1/2 h-[400px] md:h-[500px] anim-media">
                    {mediaType === 'video' ? (
                        <VideoPlayer src={mediaSrc} />
                    ) : (
                        <ImageSlideshow images={Array.isArray(mediaSrc) ? mediaSrc : [mediaSrc]} />
                    )}
                </div>

                {/* Text Side */}
                <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                    <span className="anim-text inline-block text-[#800000] dark:text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] border-b-2 border-[#D4AF37] pb-1">
                        {subtitle}
                    </span>
                    <h2 className="anim-text font-heading text-5xl md:text-6xl text-[#002147] dark:text-[#EAEAEA] leading-tight">
                        {title}
                    </h2>
                    <p className="anim-text font-body text-lg text-[#1a1a1a] dark:text-[#CCCCCC] leading-relaxed max-w-xl mx-auto lg:mx-0">
                        {desc}
                    </p>
                    <div className="anim-text pt-4">
                        <button className="px-8 py-3 bg-[#002147] text-white dark:bg-[#D4AF37] dark:text-black font-heading uppercase tracking-widest text-xs hover:scale-105 transition-transform duration-300 shadow-lg">
                            Explore More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

import { useTheme } from '../context/ThemeContext';

// --- Main Page Component ---

const Activities = () => {
    const { theme } = useTheme();

    return (
        <div className={`overflow-x-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-black text-[#EAEAEA]' : 'bg-white text-[#1a1a1a]'}`}>

            {/* --- HERO --- */}
            <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
                    <video autoPlay muted loop playsInline className="w-full h-full object-cover filter brightness-[0.4]">
                        <source src="/Assets/villa_walkthrough_hero.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="relative z-10 text-center px-4 mix-blend-screen">
                    <h1 className="font-heading text-6xl md:text-8xl text-white mb-4 animate-fade-in-up drop-shadow-2xl">
                        Royal <span className="text-[#D4AF37] italic font-serif">Activities</span>
                    </h1>
                    <p className="font-body text-sm md:text-base text-stone-200 tracking-[0.4em] uppercase animate-fade-in-up delay-300">
                        Experience The Extraordinary
                    </p>
                </div>
            </section>

            {/* --- 1. BBQ Section (Slideshow Left, Text Right) --- */}
            <ContentSection
                subtitle="Gourmet Experience"
                title="Live BBQ Nights"
                desc="Indulge in a culinary journey under the stars. Our live BBQ station allows you to grill your favorites while enjoying the cool evening breeze. Perfect for family gatherings and late-night conversations."
                mediaType="image"
                mediaSrc={['/Assets/Activites and pool/bbq1.jpeg', '/Assets/Activites and pool/bbq2.png']}
                reverse={false}
            />

            {/* --- 2. Tipping Bucket (Text Left, Video Right) --- */}
            <ContentSection
                subtitle="Aquatic Thrills"
                title="The Tipping Bucket"
                desc="Feel the anticipation rise as the giant bucket fills up, only to unleash a massive splash of refreshing water. A favorite attraction for both kids and adults seeking a fun way to cool off."
                mediaType="video"
                mediaSrc="/Assets/Activites and pool/xtipiing water bucket.mp4"
                reverse={true}
            />

            {/* --- 3. Kids Zone (Slideshow Left, Text Right) --- */}
            <ContentSection
                subtitle="Safe & Fun"
                title="Kids Adventure Park"
                desc="A dedicated paradise for our younger guests. Featuring safe rubberized flooring, garden swings, and open play areas where imagination runs wild in a secure, lush green environment."
                mediaType="image"
                mediaSrc={['/Assets/Activites and pool/kids_swings_garden.jpg', '/Assets/Activites and pool/evekidsplay.png']}
                reverse={false}
            />

            {/* --- 4. Pool Slides (Text Left, Slideshow Right) --- */}
            <ContentSection
                subtitle="Poolside Fun"
                title="Twisting Slides"
                desc="Glide into our crystal-clear waters through our exciting twisting slides. Whether you're racing friends or just enjoying the splash, our pool arena offers endless entertainment."
                mediaType="image"
                mediaSrc={['/Assets/Activites and pool/pool_slides_aerial_view.jpg']}
                reverse={true}
            />

            {/* --- 5. Rain Dance (Video Left, Text Right) --- */}
            {/* Note: User asked for Rain Dance "Video Left", putting it last in chain */}
            <ContentSection
                subtitle="Feel The Rhythm"
                title="Rain Dance Arena"
                desc="Dance your heart out! Combine high-fidelity sound with rhythmically synced mist and water jets. It's the ultimate party experience right within the resort."
                mediaType="video"
                mediaSrc="/Assets/Activites and pool/raindancex.mp4"
                reverse={false}
            />

        </div>
    );
};

export default Activities;
