import React from 'react';

const Contact = () => {
    return (
        <div className="bg-[#1a1a1a] min-h-screen pt-32 pb-24">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-heading font-medium text-[#D4AF37] mb-6">Get In Touch</h1>
                    <p className="text-gray-400 text-xl font-light">We are always here to assist you with your booking.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 bg-white/5 p-10 md:p-20 border border-white/10 rounded-2xl backdrop-blur-sm">
                    {/* Info */}
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-2xl font-heading text-[#D4AF37] mb-4">Address</h3>
                            <p className="text-gray-300 text-lg font-light leading-relaxed">
                                Royal Private Villa,<br />
                                Next to AD Farms,<br />
                                Nature Valley, India
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-heading text-[#D4AF37] mb-4">Contact</h3>
                            <p className="text-gray-300 text-lg font-light">+91 98765 43210</p>
                            <p className="text-gray-300 text-lg font-light">reservations@adroyalvilla.com</p>
                        </div>
                        <div className="w-full h-64 bg-[#2a2a2a] mt-8 rounded-xl overflow-hidden relative border border-white/10">
                            {/* Map Placeholder */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                                <span className="text-3xl mb-2">🗺️</span>
                                <span>Google Maps Integration</span>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="space-y-8">
                        <div className="flex flex-col">
                            <label className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] mb-3">Name</label>
                            <input
                                type="text"
                                className="bg-black/20 border border-white/10 text-white p-4 rounded-lg outline-none focus:border-[#D4AF37] transition-colors"
                                placeholder="Your Name"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] mb-3">Email</label>
                            <input
                                type="email"
                                className="bg-black/20 border border-white/10 text-white p-4 rounded-lg outline-none focus:border-[#D4AF37] transition-colors"
                                placeholder="Your Email"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] mb-3">Message</label>
                            <textarea
                                rows="5"
                                className="bg-black/20 border border-white/10 text-white p-4 rounded-lg outline-none focus:border-[#D4AF37] transition-colors"
                                placeholder="How can we help you?"
                            ></textarea>
                        </div>
                        <button className="w-full py-4 bg-[#D4AF37] text-black uppercase tracking-widest font-bold rounded-lg hover:bg-white transition-colors duration-300">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
