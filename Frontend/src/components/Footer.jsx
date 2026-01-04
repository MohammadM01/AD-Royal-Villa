import React from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaPhone, FaInstagram, FaFacebook } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="bg-text text-white py-16">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Brand Section */}
                <div className="space-y-6">
                    <h3 className="text-3xl font-heading font-bold text-primary">AD Royal Private Villa</h3>
                    <p className="text-gray-400 font-light leading-relaxed">
                        Experience the essence of Indian hospitality in our luxury 4BHK farmhouse.
                        A perfect getaway for families, friends, and corporate retreats.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-white hover:text-primary transition-colors">
                            <FaInstagram size={24} />
                        </a>
                        <a href="#" className="text-white hover:text-primary transition-colors">
                            <FaFacebook size={24} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-6">
                    <h4 className="text-xl font-heading font-semibold text-primary">Quick Links</h4>
                    <ul className="space-y-4 text-gray-400 font-light">
                        <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                        <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link to="/stay" className="hover:text-white transition-colors">Stay & Rooms</Link></li>
                        <li><Link to="/amenities" className="hover:text-white transition-colors">Pool & Amenities</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="space-y-6">
                    <h4 className="text-xl font-heading font-semibold text-primary">Contact Us</h4>
                    <div className="space-y-4 text-gray-400 font-light">
                        <div className="flex items-start space-x-4">
                            <FaMapMarkerAlt size={24} className="text-primary mt-1 shrink-0" />
                            <p>
                                Near Coral School, Next to Auto Fleet Petrol Pump,<br />
                                Padgha – 421101, 32 km from Thane
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <FaPhone size={24} className="text-primary shrink-0" />
                            <p>+91 XXXXX XXXXX</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} AD Farms & Resorts. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
