import React from 'react'

const FullAmenities = () => {
    const inventory = [
        'Private Pool (80x20 ft)', 'Rain Dance System', 'Hi-Fi Music System', 'Pro Barbeque Station',
        'Luxury 4BHK Villa', '6 Premium Washrooms', '9 Extra Comfort Mattresses', 'Comp. Mineral Water',
        '24/7 Hot & Cold Water', '100% Power Backup', 'Secure Parking (8 Cars)', 'Dedicated Caretaker',
        'Pet Friendly Stays', 'Re-heating Kitchenette', 'Safe Kids Pool (3ft)', 'Deep Adult Pool (5ft)',
        'Family Mega Slide', 'Adrenaline Single Slide', 'Mushroom Waterfall', '65" Smart TVs',
        'Grand Living Hall', 'Royal 8-Seater Dining', 'Lush Outdoor Lawns', 'Indoor Games Arena'
    ];

    return (
        <section className="relative z-20 py-20 bg-[#0F172A] border-t border-white/10">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-16">
                    <span className="text-amber-400 uppercase tracking-[0.2em] text-sm font-bold mb-3 block">
                        Everything You Need For A Perfect Stay
                    </span>
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white">
                        Complete Royal <span className="text-accent">Inventory</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {inventory.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-accent/30 hover:bg-white/10 transition-all duration-300 group">
                            <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-accent group-hover:text-[#0F172A]" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-gray-300 font-body text-sm tracking-wide group-hover:text-white transition-colors duration-300">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FullAmenities
