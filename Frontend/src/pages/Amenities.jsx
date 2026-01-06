import React from 'react';
import { FaSwimmingPool, FaUmbrellaBeach, FaChild, FaWifi, FaParking, FaTv } from 'react-icons/fa';

const Amenities = () => {
    const amenities = [
        { icon: FaSwimmingPool, title: "Private Pool", desc: "Temperature controlled water with mushroom fountain." },
        { icon: FaUmbrellaBeach, title: "Outdoor Lounge", desc: "Private patio for evening relaxation." },
        { icon: FaChild, title: "Kids Play Area", desc: "Safe and secure zone for children." },
        { icon: FaWifi, title: "High Speed WiFi", desc: "Stay connected across the property." },
        { icon: FaParking, title: "Private Parking", desc: "Secure parking for multiple vehicles." },
        { icon: FaTv, title: "Entertainment", desc: "Smart TVs in all major rooms." },
    ];

    return (
        <div className="bg-bg-light pt-32 pb-24">
            <div className="container mx-auto px-6 text-center mb-20">
                <h1 className="text-5xl font-heading text-primary mb-6">World Class Amenities</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    We have curated a list of premium facilities to ensure your stay is comfortable, convenient, and truly luxurious.
                </p>
            </div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {amenities.map((item, i) => (
                        <div key={i} className="bg-white p-10 rounded-sm shadow-sm hover:shadow-xl transition-shadow text-center group border border-transparent hover:border-accent">
                            <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-primary text-2xl group-hover:bg-accent group-hover:text-white transition-colors">
                                <item.icon />
                            </div>
                            <h3 className="text-2xl font-heading text-primary mb-4">{item.title}</h3>
                            <p className="text-gray-500">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Amenities;
