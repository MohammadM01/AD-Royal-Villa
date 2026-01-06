import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-primary text-white pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-heading font-black tracking-widest text-accent">AD ROYAL VILLA</h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            A sanctuary of luxury located in the heart of nature. We offer a premium experience with world-class amenities and personalized service.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-accent hover:border-accent transition-all text-gray-400 hover:text-white"><FaInstagram /></a>
                            <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-accent hover:border-accent transition-all text-gray-400 hover:text-white"><FaFacebook /></a>
                            <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-accent hover:border-accent transition-all text-gray-400 hover:text-white"><FaWhatsapp /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-heading font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
                            <li><Link to="/about" className="hover:text-accent transition-colors">Our Story</Link></li>
                            <li><Link to="/amenities" className="hover:text-accent transition-colors">Amenities</Link></li>
                            <li><Link to="/gallery" className="hover:text-accent transition-colors">Gallery</Link></li>
                            <li><Link to="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-heading font-bold mb-6">Contact</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li>123 Royal Lane, Nature District</li>
                            <li>Phone: +91 98765 43210</li>
                            <li>Email: reservations@adroyalvilla.com</li>
                            <li>Open 24/7</li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-heading font-bold mb-6">Newsletter</h4>
                        <p className="text-gray-400 text-sm mb-4">Subscribe for exclusive offers and updates.</p>
                        <form className="flex">
                            <input type="email" placeholder="Your Email" className="bg-transparent border-b border-gray-600 py-2 w-full outline-none focus:border-accent text-sm" />
                            <button className="text-accent uppercase text-xs font-bold tracking-widest ml-2">Send</button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} AD Royal Villa. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
