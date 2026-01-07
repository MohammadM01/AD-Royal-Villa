import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Activities = () => {
    // Refs for scroll animations
    const panelsRef = useRef([]);

    useEffect(() => {
        // Reduced Intensity Parallax
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.parallax-layer').forEach(layer => {
                gsap.to(layer, {
                    y: -50, // Reduced from -100 for subtler effect
                    ease: "none",
                    scrollTrigger: {
                        trigger: layer.parentElement,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });
        });

        return () => ctx.revert();
    }, []);

    const addToRefs = (el) => {
        if (el && !panelsRef.current.includes(el)) {
            panelsRef.current.push(el);
        }
    };

    return (
        <div className="bg-background text-text overflow-x-hidden pt-20"> {/* Added pt-20 for navbar space */}

            {/* --- HERO: Cinematic Video --- */}
            <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden z-5">
                <div className="absolute inset-0 w-full h-full">
                    <video autoPlay muted loop playsInline className="w-full h-full object-cover filter brightness-[0.5]">
                        <source src="/Assets/pool_highlight_4.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="font-heading text-4xl md:text-6xl text-white mb-2 animate-fade-in-up">
                        The Royal<br /><span className="text-accent italic">Escape</span>
                    </h1>
                    <p className="font-body text-sm md:text-base text-stone-200 tracking-widest uppercase animate-fade-in-up delay-300">
                        Where Luxury Meets Adventure
                    </p>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
                    <span className="text-white text-[10px] tracking-widest uppercase mb-2">Scroll</span>
                    <div className="w-px h-12 bg-white/50"></div>
                </div>
            </section>

            {/* --- SECTION 1: The Grand Pool --- */}
            <section className="relative py-20 z-4 bg-background">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 parallax-layer">
                        <span className="inline-block px-3 py-1 border border-primary text-primary text-[10px] uppercase tracking-[0.2em] rounded-full">
                            Aquatic Bliss
                        </span>
                        <h2 className="font-heading text-4xl md:text-5xl text-primary leading-tight">
                            Largest Private <br /> <span className="text-accent italic">Pool Arena</span>
                        </h2>
                        <p className="font-body text-sm text-gray-700 leading-relaxed max-w-md">
                            Immerse yourself in our massive 40ft x 20ft crystal clear pool. Featuring a thrilling
                            <span className="text-primary font-bold"> Tipping Bucket</span> drop and twisting slides,
                            it's not just a pool—it's an experience.
                        </p>
                    </div>
                    <div className="relative h-[500px] w-full group perspective-1000">
                        {/* Video Card */}
                        <div className="absolute top-0 right-0 w-3/4 h-3/4 rounded-xl overflow-hidden shadow-2xl transform rotate-2 group-hover:rotate-0 transition-all duration-700 z-20 border-2 border-white">
                            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                                <source src="/Assets/Activites and pool/xtipiing water bucket.mp4" type="video/mp4" />
                            </video>
                            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-md text-primary text-[10px] font-bold uppercase tracking-wider">
                                Tipping Bucket Action
                            </div>
                        </div>
                        {/* Image Card Back */}
                        <div className="absolute bottom-0 left-0 w-3/4 h-3/4 rounded-xl overflow-hidden shadow-xl transform -rotate-2 group-hover:-rotate-1 transition-all duration-700 z-10 brightness-75 group-hover:brightness-100">
                            <img
                                src="/Assets/Activites and pool/pool_slides_aerial_view.jpg"
                                alt="Pool Slides"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 2: Rain Dance --- */}
            <section className="relative py-20 flex items-center justify-center overflow-hidden z-3 bg-black min-h-[70vh]">
                {/* Full Screen Video Background */}
                <div className="absolute inset-0 opacity-40">
                    <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                        <source src="/Assets/Activites and pool/raindancex.mp4" type="video/mp4" />
                    </video>
                </div>

                <div className="relative z-10 container mx-auto px-6 text-center">
                    <h2 className="font-heading text-6xl md:text-9xl text-transparent bg-clip-text bg-linear-to-br from-white via-gray-400 to-gray-600 opacity-20 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 whitespace-nowrap pointer-events-none">
                        RAIN DANCE
                    </h2>
                    <div className="relative z-10">
                        <h3 className="font-heading text-4xl md:text-6xl text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                            Feel the <span className="text-blue-400 italic">Rhythm</span>
                        </h3>
                        <p className="font-body text-base text-stone-300 max-w-xl mx-auto mb-8 border-l-2 border-blue-500 pl-4 text-left">
                            State-of-the-art sound systems meeting high-pressure mist jets.
                            Dance under the open sky with your loved ones in our dedicated Rain Dance Arena.
                        </p>
                        <button className="px-6 py-2 bg-white text-black font-heading uppercase tracking-widest text-xs hover:bg-blue-500 hover:text-white transition-all duration-300">
                            View Gallery
                        </button>
                    </div>
                </div>
            </section>

            {/* --- SECTION 3: Kids Zone --- */}
            <section className="relative py-20 z-2 bg-background">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <span className="text-accent text-[10px] font-bold tracking-[0.3em] uppercase">For the Little Ones</span>
                        <h2 className="font-heading text-primary text-4xl md:text-5xl mt-2">Kids Adventure Park</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { img: "/Assets/Activites and pool/kids_play_zone_overview.jpg", title: "Safe Play Zone", desc: "Rubberized flooring for safety." },
                            { img: "/Assets/Activites and pool/kids_swings_garden.jpg", title: "Garden Swings", desc: "Amidst lush greenery." },
                            { img: "/Assets/Activites and pool/bbq1.jpeg", title: "Family Fun", desc: "Enjoy moments together." }
                        ].map((item, i) => (
                            <div key={i} className="group relative h-[400px] overflow-hidden rounded-xl cursor-pointer">
                                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute bottom-0 left-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-white font-heading text-2xl mb-1">{item.title}</h3>
                                    <p className="text-stone-300 font-body text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECTION 4: Leisure & BBQ --- */}
            <section className="relative py-20 z-1 bg-white">
                <div className="absolute right-0 top-0 h-full w-1/2 bg-[#f8f5e6] hidden lg:block"></div>
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="order-2 lg:order-1 relative">
                        <div className="grid grid-cols-2 gap-4">
                            <img src="/Assets/Activites and pool/bbq1.jpeg" className="w-full h-48 object-cover rounded-xl shadow-lg mt-8" alt="BBQ" />
                            <img src="/Assets/outdoor_lounge_canopy.jpg" className="w-full h-48 object-cover rounded-xl shadow-lg" alt="Lounge" />
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 space-y-6">
                        <h2 className="font-heading text-5xl text-primary">
                            Gourmet & <br /><span className="text-accent">Leisure</span>
                        </h2>
                        <div className="h-0.5 w-16 bg-primary"></div>
                        <p className="font-body text-sm text-gray-600 leading-relaxed">
                            After a swim, relax in our outdoor gazebos or fire up the grill at our dedicated <span className="font-bold text-primary">BBQ Station</span>.
                            Perfect for evening parties and family dinners under the stars.
                        </p>
                        <ul className="space-y-3 font-heading text-sm text-gray-800">
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> Live BBQ Setup
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> Outdoor Music System
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> Late Night Bonfire
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Activities;
