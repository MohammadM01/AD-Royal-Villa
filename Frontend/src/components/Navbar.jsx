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
        { name: 'Amenities', path: '/stay' },
        { name: 'Pool & Activities', path: '/activities' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Contact', path: '/contact' },
    ];

    // Dynamic Text Color Helper
    // Dynamic Text Color Helper
    const getTextColor = (isActive) => {
        if (!isScrolled) {
            // Top: Always White (or Gold Active) with Shadow for better contrast on images
            // using !important to override any global anchor styles
            return isActive
                ? '!text-[#00b4d8] scale-110 font-bold drop-shadow-md'
                : '!text-white hover:!text-[#00b4d8] drop-shadow-md';
        }
        // Scrolled: Dark(Navy/Maroon) in Light Mode, White/Gold in Dark Mode
        if (theme === 'dark') {
            return isActive
                ? '!text-[#00b4d8] scale-110 font-bold'
                : '!text-[#EAEAEA] hover:!text-[#00b4d8]';
        }
        return isActive
            ? '!text-[#00b4d8] scale-110 font-bold'
            : '!text-[#002147] hover:!text-[#00b4d8]';
    };

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
                ? `${theme === 'dark' ? 'bg-black/90 border-[#00b4d8]/10' : 'bg-white/90 border-[#00b4d8]/10'} backdrop-blur-md shadow-lg py-2 border-b`
                : 'bg-gradient-to-b from-black/60 to-transparent py-2'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center space-x-2 z-50">
                        <img
                            src="/New/logo/logo.png"
                            alt="AD Royal Villa"
                            className={`h-10 w-auto object-contain transition-all duration-300 hover:scale-105 ${!isScrolled || theme === 'dark'
                                ? 'brightness-0 invert'
                                : 'brightness-0'
                                }`}
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-medium transition-all duration-300 relative group font-heading tracking-wider uppercase ${getTextColor(location.pathname === link.path)}`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full 
                                    ${!isScrolled ? 'bg-white' : (theme === 'dark' ? 'bg-[#00b4d8]' : 'bg-[#00b4d8]')}
                                    ${location.pathname === link.path ? 'w-full' : ''}
                                `} />
                            </Link>
                        ))}

                        {/* Theme Toggle Button */}
                        <div className={`${!isScrolled ? 'text-white' : (theme === 'dark' ? 'text-white' : 'text-[#002147]')}`}>
                            <ThemeToggle />
                        </div>

                        <a
                            href="https://wa.me/91XXXXXXXXXX"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-6 py-2 rounded-full font-medium hover:opacity-90 transition-all shadow-md hover:shadow-lg uppercase text-[10px] tracking-[0.2em] transform hover:scale-105
                                ${!isScrolled
                                    ? 'bg-white text-[#002147] hover:bg-[#F9F4E8] shadow-lg'
                                    : `${theme === 'dark' ? 'bg-[#00b4d8] text-black' : 'bg-[#00b4d8] text-[#F9F4E8]'}`
                                }
                            `}
                        >
                            Book Now
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4 z-50">
                        <div className={`scale-75 origin-right ${!isScrolled ? 'text-white' : (theme === 'dark' ? 'text-white' : 'text-[#002147]')}`}>
                            <ThemeToggle />
                        </div>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`transition-colors p-2 rounded-full backdrop-blur-sm border
                                ${!isScrolled
                                    ? 'text-white bg-white/10 border-white/20 hover:bg-white/20'
                                    : `${theme === 'dark' ? 'text-[#EAEAEA] border-transparent hover:text-[#00b4d8]' : 'text-[#002147] border-transparent hover:text-[#00b4d8]'}`
                                }
                            `}
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
                        className={`fixed top-0 left-0 w-full h-screen backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-6 md:hidden
                            ${theme === 'dark' ? 'bg-[#121212]/95' : 'bg-[#F9F4E8]/95'}
                        `}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`text-lg font-heading font-medium tracking-wider uppercase 
                                    ${theme === 'dark'
                                        ? (location.pathname === link.path ? 'text-[#00b4d8]' : 'text-[#EAEAEA]')
                                        : (location.pathname === link.path ? 'text-[#00b4d8]' : 'text-[#002147]')
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <a
                            href="https://wa.me/91XXXXXXXXXX"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-6 py-2 rounded-full font-medium uppercase tracking-[0.2em] text-sm
                                ${theme === 'dark' ? 'bg-[#00b4d8] text-black' : 'bg-[#00b4d8] text-[#F9F4E8]'}
                            `}
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
