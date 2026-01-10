import React from 'react'
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'

const ContactDetails = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Info */}
                    <div className="space-y-8">
                        <h2 className="text-4xl font-heading font-bold text-text">Get in Touch</h2>
                        <p className="text-gray-600 text-lg">
                            Have any questions or want to check availability? Reach out to us directly via phone or WhatsApp.
                        </p>

                        <div className="space-y-6 pt-4">
                            <div className="flex items-start space-x-4">
                                <FaMapMarkerAlt size={24} className="text-primary mt-1 shrink-0" />
                                <div>
                                    <h3 className="font-bold text-lg">Address</h3>
                                    <a href="https://maps.app.goo.gl/H8ZdTKRGpAki1t3a6" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors block">
                                        Near Coral School, Next to Auto Fleet Petrol Pump,<br />
                                        Padgha – 421101<br />
                                        (32 km from Thane, Nearest Station: Khadavli)
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <FaPhone size={24} className="text-primary shrink-0" />
                                <div>
                                    <h3 className="font-bold text-lg">Phone</h3>
                                    <a href="https://wa.me/919890205767" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 font-body hover:text-primary transition-colors">
                                        +91 98902 05767
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <FaEnvelope size={24} className="text-primary shrink-0" />
                                <div>
                                    <h3 className="font-bold text-lg">Email</h3>
                                    <p className="text-gray-600">bookings@adroyalvilla.com</p>
                                </div>
                            </div>
                        </div>

                        <a
                            href="https://wa.me/919890205767"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-primary text-white px-8 py-3 rounded-full font-medium uppercase tracking-widest mt-6 hover:bg-text transition-colors"
                        >
                            Chat on WhatsApp
                        </a>
                    </div>

                    {/* Map */}
                    <div className="h-[400px] w-full bg-gray-200 rounded-3xl overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d235.24038456316205!2d73.18901408163966!3d19.37581310955166!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be79b001952baa9%3A0x418716515562f3fa!2sAD%20Royal%20Private%20Villa!5e0!3m2!1sen!2sin!4v1768051284565!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title="Google Maps Location"
                        ></iframe>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default ContactDetails
