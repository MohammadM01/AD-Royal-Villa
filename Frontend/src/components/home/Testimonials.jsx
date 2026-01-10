import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Star, Quote } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        name: "Zoya & Farhan",
        role: "Family Vacation",
        text: "The pool slides were an absolute hit with the kids! We spent hours in the water. The villa is luxurious and the staff is incredibly helpful. Best weekend getaway ever!",
        rating: 5,
        color: "bg-orange-500"
    },
    {
        name: "Aarav Sharma",
        role: "Anniversary Celebration",
        text: "We booked the villa for our anniversary and it was magical. The private pool, the BBQ night, and the serene vibes were just what we needed. Highly recommended!",
        rating: 5,
        color: "bg-pink-500"
    },
    {
        name: "Ibrahim Sheikh",
        role: "Corporate Retreat",
        text: "Hosted our team outing here. The cricket ground and huge lawn were perfect for activities. The rooms are spacious and the food was delicious. A+ experience.",
        rating: 5,
        color: "bg-teal-500"
    },
    {
        name: "Sana Khan",
        role: "Friends Reunion",
        text: "The rain dance was the highlight of our trip! Music, water, and great company. The villa has so many activities, we never felt bored for a second.",
        rating: 5,
        color: "bg-violet-500"
    },
    {
        name: "Rohan Das",
        role: "Chill Weekend",
        text: "Just wanted to relax and this place was perfect. The mushroom fountain sound is so soothing. Waking up to that view was refreshing.",
        rating: 4,
        color: "bg-cyan-500"
    },
    {
        name: "Yusuf Malik",
        role: "Birthday Bash",
        text: "Celebrated my son's birthday here. The kids play zone is safe and huge. The staff even helped organize a small surprise. Thank you AD Royal Villa!",
        rating: 5,
        color: "bg-lime-500"
    }
];

const Testimonials = () => {
    const containerRef = useRef(null);
    const { theme } = useTheme();

    useGSAP(() => {
        gsap.from('.testimonial-card', {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className={`py-24 transition-colors duration-300 relative overflow-hidden ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-2 block">Voices of Joy</span>
                    <h2 className="text-4xl md:text-6xl font-heading text-[#002147] dark:text-white mb-4">
                        What Our Guests Say
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div key={index} className="testimonial-card relative group">
                            <div className="absolute inset-0 bg-gray-100 dark:bg-[#111] rounded-2xl transform transition-transform duration-300 group-hover:rotate-2 group-hover:scale-[1.02]"></div>
                            <div className="relative bg-white dark:bg-[#1a1a1a] p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden h-full flex flex-col">
                                {/* Accent Line */}
                                <div className={`absolute top-0 left-0 w-full h-1 ${item.color}`}></div>

                                <Quote className={`w-10 h-10 ${item.color.replace('bg-', 'text-')} opacity-20 mb-4`} />

                                <p className="text-gray-600 dark:text-gray-300 font-body leading-relaxed mb-6 flex-grow italic">
                                    "{item.text}"
                                </p>

                                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-6 mt-auto">
                                    <div>
                                        <h4 className="font-heading text-lg text-[#002147] dark:text-white">{item.name}</h4>
                                        <span className="text-xs text-gray-400 uppercase tracking-wider">{item.role}</span>
                                    </div>
                                    <div className="flex gap-1">
                                        {[...Array(item.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
