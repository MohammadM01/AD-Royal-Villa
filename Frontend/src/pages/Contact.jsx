import React from 'react';

const Contact = () => {
    return (
        <div className="bg-bg-light pt-32 pb-24">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-heading text-primary mb-6">Get In Touch</h1>
                    <p className="text-gray-600">We are always here to assist you with your booking.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 bg-white p-10 md:p-20 shadow-xl rounded-sm">
                    {/* Info */}
                    <div className="space-y-10">
                        <div>
                            <h3 className="text-2xl font-heading text-primary mb-4">Address</h3>
                            <p className="text-gray-600 text-lg">123 Royal Lane, Resort District,<br />Nature Valley, India</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-heading text-primary mb-4">Contact</h3>
                            <p className="text-gray-600 text-lg">+91 98765 43210</p>
                            <p className="text-gray-600 text-lg">reservations@adroyalvilla.com</p>
                        </div>
                        <div className="w-full h-64 bg-gray-200 mt-8 rounded-lg overflow-hidden relative">
                            {/* Map Placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500">Maps Integration Coming Soon</div>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="space-y-8">
                        <div className="flex flex-col">
                            <label className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Name</label>
                            <input type="text" className="border border-gray-300 p-4 outline-none focus:border-accent" placeholder="Your Name" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Email</label>
                            <input type="email" className="border border-gray-300 p-4 outline-none focus:border-accent" placeholder="Your Email" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Message</label>
                            <textarea rows="5" className="border border-gray-300 p-4 outline-none focus:border-accent" placeholder="How can we help you?"></textarea>
                        </div>
                        <button className="w-full py-4 bg-primary text-white uppercase tracking-widest font-bold hover:bg-accent transition-colors">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
