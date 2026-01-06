import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Amenities', path: '/amenities' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 shadow-md py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="z-50">
                    <h1 className="text-3xl font-heading font-medium italic text-transparent bg-clip-text bg-gradient-to-r from-[#F5E6D3] via-[#D4AF37] to-[#F5E6D3]">
                        AD Royal Villa
                    </h1>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {['Home', 'Amenities', 'Activities', 'Pricing', 'Contact'].map((item) => (
                        <Link
                            key={item}
                            to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                            className={`text-base font-medium transition-colors ${location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`)
                                ? 'text-[#F5E6D3]'
                                : 'text-[#D4AF37] hover:text-[#F5E6D3]'
                                }`}
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Icons */}
                <div className="hidden md:flex items-center space-x-6 text-[#D4AF37]">
                    <a href="mailto:info@adroyalvilla.com" className="hover:text-[#F5E6D3] transition-colors">
                        <FaEnvelope size={20} />
                    </a>
                    <a href="tel:+1234567890" className="hover:text-[#F5E6D3] transition-colors">
                        <FaPhoneAlt size={20} />
                    </a>
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden z-50">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`${scrolled || mobileMenuOpen ? 'text-primary' : 'text-white'} text-2xl`}>
                        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl font-heading font-bold text-primary hover:text-accent uppercase tracking-widest"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
