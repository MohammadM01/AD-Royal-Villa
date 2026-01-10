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
        <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-2xl border-4 border-white dark:border-[#2A2A2A] group">
            {images.map((src, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                >
                    <img
                        src={src}
                        alt={`Slide ${index}`}
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
        </div>
    );
};

const VideoPlayer = ({ src }) => {
    return (
        <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-2xl border-4 border-white dark:border-[#2A2A2A] group">
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

const ContentSection = ({ title, subtitle, desc, mediaType, mediaSrc, reverse, buttonText = "Explore More", gradient }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.anim-text',
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
                }
            );
            gsap.fromTo('.anim-media',
                { x: reverse ? 100 : -100, opacity: 0, scale: 0.95 },
                {
                    x: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, [reverse]);

    return (
        <div ref={sectionRef} className="container mx-auto px-6 py-24 md:py-32 border-b border-gray-100 dark:border-gray-800 last:border-0">
            <div className={`flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 ${reverse ? 'lg:flex-row-reverse' : ''}`}>

                {/* Media Side (Left or Right) */}
                <div className="w-full lg:w-5/12 h-[350px] md:h-[450px] lg:h-[500px] anim-media">
                    {mediaType === 'video' ? (
                        <VideoPlayer src={mediaSrc} />
                    ) : (
                        <ImageSlideshow images={Array.isArray(mediaSrc) ? mediaSrc : [mediaSrc]} />
                    )}
                </div>

                {/* Text Side */}
                <div className="w-full lg:w-6/12 space-y-8 text-center lg:text-left flex flex-col justify-center">
                    <div className="anim-text">
                        <span className="inline-block text-[#00b4d8] dark:text-[#00b4d8] text-sm font-bold uppercase tracking-[0.3em] mb-2">
                            {subtitle}
                        </span>
                        <div className="h-0.5 w-12 bg-[#00b4d8] mx-auto lg:mx-0 mt-2"></div>
                    </div>

                    <h2 className={`anim-text font-heading text-5xl md:text-6xl lg:text-7xl bg-linear-to-r ${gradient || 'from-cyan-400 via-blue-500 to-purple-600'} bg-clip-text text-transparent leading-none drop-shadow-sm pb-2`}>
                        {title}
                    </h2>

                    <p className="anim-text font-body text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                        {desc}
                    </p>

                    <div className="anim-text pt-4">
                        <button className="group relative px-8 py-3 bg-[#002147] text-white dark:bg-[#00b4d8] dark:text-black font-heading uppercase tracking-widest text-xs overflow-hidden shadow-lg transition-all hover:scale-105 active:scale-95">
                            <span className="relative z-10 group-hover:text-[#00b4d8] dark:group-hover:text-white transition-colors">{buttonText}</span>
                            <div className="absolute inset-0 bg-white dark:bg-[#002147] transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></div>
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
                        Royal <span className="text-[#00b4d8] italic font-serif">Activities</span>
                    </h1>
                    <p className="font-body text-sm md:text-base text-stone-200 tracking-[0.4em] uppercase animate-fade-in-up delay-300">
                        Experience The Extraordinary
                    </p>
                </div>
            </section>

            {/* --- 1. BBQ Section (Slideshow Left, Text Right) --- */}
            <ContentSection
                gradient="from-orange-500 via-red-500 to-yellow-500"
                subtitle="Gourmet Experience"
                title="Live BBQ Nights"
                desc="Indulge in a culinary journey under the stars. Our live BBQ station allows you to grill your favorites while enjoying the cool evening breeze. Perfect for family gatherings and late-night conversations."
                mediaType="image"
                mediaSrc={['/Assets/Activites and pool/bbq1.jpeg', '/Assets/Activites and pool/bbq2.png']}
                reverse={false}
                buttonText="Grill & Chill"
            />

            {/* --- 2. Tipping Bucket (Text Left, Video Right) --- */}
            <ContentSection
                gradient="from-blue-400 via-cyan-500 to-teal-400"
                subtitle="Aquatic Thrills"
                title="The Tipping Bucket"
                desc="Feel the anticipation rise as the giant bucket fills up, only to unleash a massive splash of refreshing water. A favorite attraction for both kids and adults seeking a fun way to cool off."
                mediaType="video"
                mediaSrc="/Assets/Activites and pool/xtipiing water bucket.mp4"
                reverse={true}
                buttonText="Feel the Splash"
            />

            {/* --- 3. Kids Zone (Slideshow Left, Text Right) --- */}
            <ContentSection
                gradient="from-green-400 via-lime-500 to-yellow-400"
                subtitle="Safe & Fun"
                title="Kids Adventure Park"
                desc="A dedicated paradise for our younger guests. Featuring safe rubberized flooring, garden swings, and open play areas where imagination runs wild in a secure, lush green environment."
                mediaType="image"
                mediaSrc={['/Assets/Activites and pool/kids_swings_garden.jpg', '/Assets/Activites and pool/evekidsplay.png']}
                reverse={false}
                buttonText="Fun & Frolic"
            />

            {/* --- 4. Pool Slides (Text Left, Slideshow Right) --- */}
            <ContentSection
                gradient="from-indigo-400 via-purple-500 to-pink-500"
                subtitle="Poolside Fun"
                title="Twisting Slides"
                desc="Glide into our crystal-clear waters through our exciting twisting slides. Whether you're racing friends or just enjoying the splash, our pool arena offers endless entertainment."
                mediaType="image"
                mediaSrc={['/Assets/Activites and pool/pool_slides_aerial_view.jpg']}
                reverse={true}
                buttonText="Take the Plunge"
            />

            {/* --- 5. Rain Dance (Video Left, Text Right) --- */}
            {/* Note: User asked for Rain Dance "Video Left", putting it last in chain */}
            <ContentSection
                gradient="from-fuchsia-500 via-pink-500 to-rose-500"
                subtitle="Feel The Rhythm"
                title="Rain Dance Arena"
                desc="Dance your heart out! Combine high-fidelity sound with rhythmically synced mist and water jets. It's the ultimate party experience right within the resort."
                mediaType="video"
                mediaSrc="/Assets/Activites and pool/raindancex.mp4"
                reverse={false}
                buttonText="Dance & Drench"
            />

            {/* --- 6. Mushroom Fountain (Text Left, Video Right) --- */}
            <ContentSection
                gradient="from-teal-400 via-emerald-500 to-cyan-500"
                subtitle="Playful Splashes"
                title="Mushroom Fountain"
                desc="Enjoy the whimsical charm of our Mushroom Water Fountain. A perfect spot for kids to splash around or for a soothing aquatic backdrop to your poolside relaxation."
                mediaType="video"
                mediaSrc="/Assets/mushroom water fountain.mp4"
                reverse={true}
                buttonText="Magical Mist"
            />

            {/* --- 7. Indoor Games (Slideshow Left, Text Right) --- */}
            <ContentSection
                gradient="from-amber-400 via-orange-500 to-red-500"
                subtitle="Fun For Everyone"
                title="Indoor Games Arena"
                desc="Step inside our fully equipped game zone. From table tennis to carrom, challenge your friends and family to exciting matches regardless of the weather outside."
                mediaType="image"
                mediaSrc={['/New/Pool and activities/indoor-games-2.png']}
                reverse={false}
                buttonText="Game On"
            />

            {/* --- 8. Outdoor Sports (Text Left, Slideshow Right) --- */}
            <ContentSection
                gradient="from-lime-500 via-green-600 to-emerald-700"
                subtitle="Outdoor Thrills"
                title="Cricket & Sports"
                desc="Embrace the open air with a game of cricket on our spacious grounds. Perfect for team bonding and energetic matches under the sun or stars."
                mediaType="image"
                mediaSrc={['/New/Pool and activities/cricket.jpg']}
                reverse={true}
                buttonText="Hit a Six"
            />

            {/* --- 9. Pool Games (Slideshow Left, Text Right) --- */}
            <ContentSection
                gradient="from-sky-400 via-blue-500 to-indigo-600"
                subtitle="Splash & Play"
                title="Pool Water Games"
                desc="Jump in for some high-energy fun! Perfect for families and groups, our pool is spacious enough for a friendly game of catch, water volleyball, or simply tossing a ball around while cooling off."
                mediaType="image"
                mediaSrc={['/New/Pool and activities/ball.png']}
                reverse={false}
                buttonText="Make a Splash"
            />

        </div>
    );
};

export default Activities;
