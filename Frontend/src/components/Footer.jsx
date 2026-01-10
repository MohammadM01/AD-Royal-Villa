import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaPhone, FaInstagram, FaFacebook } from 'react-icons/fa'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useLeaf } from '../context/LeafContext'

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const { setTarget } = useLeaf();
    const footerRef = useRef(null);

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: footerRef.current,
            start: "top bottom-=100", // When footer peeks in
            onEnter: () => setTarget(footerRef.current, { anchor: 'top-right' }),
            onEnterBack: () => setTarget(footerRef.current, { anchor: 'top-right' })
        });
    }, { scope: footerRef });

    return (
        <footer ref={footerRef} className="bg-[#2B3D5C] text-white py-8 md:py-10 relative">
            <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 ">
                {/* Brand Section */}
                <div className="space-y-6">
                    <h3 className="text-3xl font-heading font-bold" style={{ color: '#ffffff' }}>AD Royal Private Villa</h3>
                    <p className="text-gray-400 font-light leading-relaxed">
                        Your exclusive private sanctuary. Experience 100% privacy, luxury, and nature in our fully enclosed 4BHK farmhouse.
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
                    <h4 className="text-xl font-heading font-semibold" style={{ color: '#ffffff' }}>Quick Links</h4>
                    <ul className="space-y-4 text-gray-400 font-light">
                        <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                        <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link to="/stay" className="hover:text-white transition-colors">Stay & Amenities</Link></li>
                        <li><Link to="/amenities" className="hover:text-white transition-colors">Pool & Activities</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="space-y-6">
                    <h4 className="text-xl font-heading font-semibold" style={{ color: '#ffffff' }}>Contact Us</h4>
                    <div className="space-y-4 text-gray-400 font-light">
                        <div className="flex items-start space-x-4">
                            <FaMapMarkerAlt size={24} className="text-primary mt-1 shrink-0" />
                            <a href="https://maps.app.goo.gl/H8ZdTKRGpAki1t3a6" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-left">
                                Near Coral School, Next to Auto Fleet Petrol Pump,<br />
                                Padgha – 421101, 32 km from Thane
                            </a>
                        </div>
                        <div className="flex items-center space-x-4">
                            <FaPhone size={24} className="text-primary shrink-0" />
                            <a href="https://wa.me/919890205767" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                +91 9890205767
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 mt-6 pt-4 text-gray-500 text-sm flex flex-row md:flex-row justify-center  items-center gap-4">
                <p>&copy; {new Date().getFullYear()} AD Farms & Resorts. All rights reserved.</p>
                <p>Website designed & developed by <a href="https://datamatex.in/" target="_blank" rel="noopener noreferrer" className='text-white hover:text-primary transition-colors font-bold'>Datamatex Technologies</a></p>
            </div>
        </footer>
    )
}

export default Footer
