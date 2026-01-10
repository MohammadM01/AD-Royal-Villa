import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTheme } from '../../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
    const { theme } = useTheme();
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const contentRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "bottom 60%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(contentRef.current.children, {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        })
            .from(imageRef.current, {
                x: 50,
                opacity: 0,
                duration: 1.2,
                ease: "power2.out"
            }, "-=0.8");

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className={`py-24 overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-black' : 'bg-[#F9F4E8]'}`}>
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Content Side - Wider column for text */}
                    <div ref={contentRef} className="space-y-8 order-2 md:order-1 md:col-span-7 lg:col-span-8">
                        <div>
                            <span className={`uppercase tracking-[0.2em] text-sm font-bold mb-2 block ${theme === 'dark' ? 'text-[#00b4d8]' : 'text-primary/80'}`}>
                                Discover AD Royal
                            </span>
                            <h2 className={`text-xl md:text-3xl lg:text-4xl xl:text-5xl font-heading leading-tight whitespace-nowrap ${theme === 'dark' ? 'text-white' : 'text-primary'}`}>
                                Where Privacy Meets <span className={`italic ${theme === 'dark' ? 'text-[#00b4d8]' : 'text-accent'}`}>Fun and Luxury</span>
                            </h2>
                        </div>

                        <div className={`text-lg leading-relaxed space-y-6 font-light ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            <p>
                                Welcome to a world crafted for your absolute comfort. AD Royal Private Villa is more than just a getaway; it is a sanctuary designed for those who seek the perfect balance of nature and luxury.
                            </p>
                            <p>
                                Our exclusive 4BHK fully furnished farmhouse offers a pristine aquatic paradise, lush green landscapes, and modern amenities, ensuring your stay is nothing short of extraordinary. Whether you're splashing in our grand pool or unwinding in our elegantly appointed rooms, privacy is our promise.
                            </p>
                            <p className={`font-medium ${theme === 'dark' ? 'text-[#00b4d8]' : 'text-primary'}`}>
                                Experience the warmth of a home with the grandeur of a resort.
                            </p>
                        </div>

                        <button className="relative overflow-hidden group bg-primary text-white px-8 py-3 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105">
                            <span className="relative z-10 font-bold tracking-wider uppercase text-sm">Read Our Story</span>
                            <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-accent/20"></div>
                        </button>
                    </div>

                    {/* Image Side - Narrower column */}
                    <div ref={imageRef} className="relative order-1 md:order-2 md:col-span-5 lg:col-span-4">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-square group">
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                            <img
                                src="/New/Home/home-views/front-view.png"
                                alt="AD Royal Villa Front View"
                                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                        {/* Decorative Element */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl z-0"></div>
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl z-0"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
