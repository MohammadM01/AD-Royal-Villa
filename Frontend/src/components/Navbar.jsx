import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Stay & Amenities', path: '/stay' },
        { name: 'Pool & Activities', path: '/activities' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Contact', path: '/contact' },
    ]

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
                ? 'bg-[#F9F4E8]/80 dark:bg-black/80 backdrop-blur-md shadow-lg py-2 border-b border-[#800000]/10 dark:border-[#D4AF37]/10'
                : 'bg-transparent py-4'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center space-x-2 z-50">
                        <img
                            src="/New/logo/logo.png"
                            alt="AD Royal Villa"
                            className="h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-medium transition-colors duration-300 relative group font-heading tracking-wider uppercase ${location.pathname === link.path
                                    ? 'text-[#800000] dark:text-[#D4AF37]'
                                    : 'text-[#002147] dark:text-[#EAEAEA] hover:text-[#800000] dark:hover:text-[#D4AF37]'
                                    }`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#800000] dark:bg-[#D4AF37] transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''
                                    }`} />
                            </Link>
                        ))}

                        {/* Theme Toggle Button */}
                        <ThemeToggle />

                        <a
                            href="https://wa.me/91XXXXXXXXXX"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#800000] dark:bg-[#D4AF37] text-[#F9F4E8] dark:text-black px-6 py-2 rounded-full font-medium hover:opacity-90 transition-all shadow-md hover:shadow-lg uppercase text-[10px] tracking-[0.2em]"
                        >
                            Book Now
                        </a>
                    </div>

                    {/* Mobile Menu Button - Fixed Z-index to trigger correctly */}
                    <div className="md:hidden flex items-center space-x-4 z-50">
                        <div className="scale-75 origin-right">
                            <ThemeToggle />
                        </div>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-[#002147] dark:text-[#EAEAEA] hover:text-[#800000] dark:hover:text-[#D4AF37] transition-colors p-2 bg-white/10 backdrop-blur-sm rounded-full"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-0 left-0 w-full h-screen bg-[#F9F4E8] dark:bg-[#121212] z-40 flex flex-col items-center justify-center space-y-8 md:hidden"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`text-xl font-heading font-medium tracking-wider uppercase ${location.pathname === link.path
                                    ? 'text-[#800000] dark:text-[#D4AF37]'
                                    : 'text-[#002147] dark:text-[#EAEAEA]'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <a
                            href="https://wa.me/91XXXXXXXXXX"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#800000] dark:bg-[#D4AF37] text-[#F9F4E8] dark:text-black px-8 py-3 rounded-full font-medium uppercase tracking-[0.2em]"
                        >
                            Book Now
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
