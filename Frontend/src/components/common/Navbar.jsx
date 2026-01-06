import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'Amenities', 'Activities', 'Pricing', 'Contact'];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled ? 'bg-black/90 shadow-lg py-4' : 'bg-transparent py-6'}
      `}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="z-50">
          <h1 className="text-3xl font-heading italic font-medium
            text-transparent bg-clip-text
            bg-gradient-to-r from-[#F5E6D3] via-[#D4AF37] to-[#F5E6D3]"
          >
            AD Royal Villa
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => {
            const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
            const isActive = location.pathname === path;

            return (
              <Link
                key={item}
                to={path}
                className={`relative text-sm uppercase tracking-widest font-medium
                  transition-all duration-300
                  ${
                    isActive
                      ? 'text-[#D4AF37]'
                      : scrolled
                        ? 'text-white/90 hover:text-[#D4AF37]'
                        : 'text-[#F5E6D3] hover:text-[#D4AF37] drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]'
                  }
                `}
              >
                {item}

                {/* Active underline */}
                {isActive && (
                  <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#D4AF37]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Icons */}
        <div className="hidden md:flex items-center space-x-6 text-[#D4AF37]">
          <a
            href="mailto:info@adroyalvilla.com"
            className="hover:text-[#F5E6D3] transition-colors"
            aria-label="Email"
          >
            <FaEnvelope size={18} />
          </a>
          <a
            href="tel:+1234567890"
            className="hover:text-[#F5E6D3] transition-colors"
            aria-label="Phone"
          >
            <FaPhoneAlt size={18} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden z-50">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`text-2xl transition-colors
              ${scrolled || mobileMenuOpen ? 'text-white' : 'text-[#F5E6D3]'}
            `}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center space-y-10"
          >
            {navItems.map((item) => {
              const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
              return (
                <Link
                  key={item}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl uppercase tracking-widest font-heading
                    text-[#F5E6D3] hover:text-[#D4AF37] transition-colors"
                >
                  {item}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
