import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaMapMarkerAlt, FaPhoneAlt, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const headerRef = useRef(null);
    const infoRef = useRef(null);
    const formRef = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Header Animation
        tl.fromTo(headerRef.current.children,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power3.out" }
        );

        // Split Section Animation
        gsap.fromTo(infoRef.current,
            { x: -50, opacity: 0 },
            {
                x: 0, opacity: 1, duration: 1, ease: "power3.out",
                scrollTrigger: { trigger: infoRef.current, start: "top 80%" }
            }
        );

        gsap.fromTo(formRef.current,
            { x: 50, opacity: 0 },
            {
                x: 0, opacity: 1, duration: 1, ease: "power3.out",
                scrollTrigger: { trigger: formRef.current, start: "top 80%" }
            }
        );

        // Map Animation
        gsap.fromTo(mapRef.current,
            { scale: 0.9, opacity: 0, y: 50 },
            {
                scale: 1, opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
                scrollTrigger: { trigger: mapRef.current, start: "top 85%" }
            }
        );

    }, []);

    return (
        <div className="min-h-screen pt-24 pb-12 overflow-hidden transition-colors duration-300">

            {/* Header Section */}
            <div ref={headerRef} className="text-center mb-10 px-4">
                <span className="inline-block px-4 py-1 mb-3 border border-primary text-primary font-body tracking-[0.2em] rounded-full text-xs uppercase">
                    Connect With Us
                </span>
                <h1 className="font-heading text-4xl md:text-5xl text-primary mb-4">
                    Get In Touch
                </h1>
                <p className="font-body text-gray-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                    We are here to assist you with your booking. Experience the royal treatment.
                </p>
                <div className="h-[2px] w-16 bg-accent mx-auto mt-6"></div>
            </div>

            {/* Split Content Section */}
            <div className="container mx-auto px-4 lg:px-24 mb-16">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">

                    {/* LEFT: Contact Info (More Compact) */}
                    <div ref={infoRef} className="lg:w-1/2 space-y-6">

                        <div className="group flex items-start gap-5 p-4 rounded-xl hover:bg-primary/5 transition-colors duration-300">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-lg group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                                <FaMapMarkerAlt />
                            </div>
                            <div>
                                <h3 className="font-heading text-xl text-primary mb-1">Our Location</h3>
                                <a href="https://maps.app.goo.gl/H8ZdTKRGpAki1t3a6" target="_blank" rel="noopener noreferrer" className="font-body text-gray-500 text-sm leading-relaxed hover:text-primary transition-colors block">
                                    Near Coral School, Padgha - 421101.<br />
                                    <span className="text-xs text-accent font-bold mt-1 block tracking-wider uppercase">32 Kms from Thane</span>
                                </a>
                            </div>
                        </div>

                        <div className="group flex items-start gap-5 p-4 rounded-xl hover:bg-primary/5 transition-colors duration-300">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-lg group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                                <FaPhoneAlt />
                            </div>
                            <div>
                                <h3 className="font-heading text-xl text-primary mb-1">Call Us</h3>
                                <p className="font-body text-gray-500 text-sm">
                                    <a href="https://wa.me/919890205767" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                        +91 9890205767
                                    </a>
                                    <br />
                                    <span className="text-xs text-gray-400">Available 24/7</span>
                                </p>
                            </div>
                        </div>



                        {/* Social Icons */}
                        <div className="pl-5 pt-2">
                            <h4 className="font-heading text-lg text-primary mb-3">Follow Us</h4>
                            <div className="flex gap-3">
                                {[FaFacebookF, FaInstagram, FaXTwitter].map((Icon, i) => (
                                    <a key={i} href="#" className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:border-primary hover:bg-primary hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm text-sm">
                                        <Icon />
                                    </a>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* RIGHT: Contact Form (Professional & Compact) */}
                    <div ref={formRef} className="lg:w-1/2 w-full">
                        <div className="bg-[#0f172a] text-white p-6 md:p-8 rounded-3xl shadow-xl relative overflow-hidden group">
                            {/* Decorative Blur */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-accent/30 transition-all duration-700"></div>

                            <h3 className="font-heading text-2xl mb-6 relative z-10 text-white">Send a Message</h3>

                            <form className="space-y-4 relative z-10" onSubmit={(e) => {
                                e.preventDefault();
                                const text = `*New Inquiry from Website*%0A%0A*Name:* ${e.target.name.value}%0A*Mobile:* ${e.target.mobile.value}%0A*Message:* ${e.target.message.value}`;
                                window.open(`https://wa.me/919890205767?text=${text}`, '_blank');
                            }}>
                                <div className="space-y-1">
                                    <label className="text-xs tracking-widest uppercase text-gray-400">Name</label>
                                    <input name="name" type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-accent focus:bg-white/10 transition-all text-white placeholder-gray-600" required />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs tracking-widest uppercase text-gray-400">Mobile No</label>
                                    <input name="mobile" type="tel" placeholder="+91" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-accent focus:bg-white/10 transition-all text-white placeholder-gray-600" required />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs tracking-widest uppercase text-gray-400">Message</label>
                                    <textarea name="message" rows="3" placeholder="How can we help?" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 md:px-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-accent focus:bg-white/10 transition-all text-white placeholder-gray-600 resize-none" required></textarea>
                                </div>

                                <button type="submit" className="w-full bg-gradient-to-r from-primary via-primary-light to-primary text-white font-heading font-medium text-base py-4 md:py-3 rounded-lg shadow-md hover:shadow-accent/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 mt-2 uppercase tracking-wide">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Section - Original Colors */}
            <div ref={mapRef} className="container mx-auto px-4 mb-8">
                <div className="w-full h-[350px] rounded-3xl overflow-hidden shadow-lg border-2 border-white">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d235.24038456316205!2d73.18901408163966!3d19.37581310955166!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be79b001952baa9%3A0x418716515562f3fa!2sAD%20Royal%20Private%20Villa!5e0!3m2!1sen!2sin!4v1768051284565!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                    ></iframe>
                </div>
            </div>

        </div>
    );
};

export default Contact;
