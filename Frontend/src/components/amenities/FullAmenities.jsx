import React from 'react'
import { FaCheck } from 'react-icons/fa'

const FullAmenities = () => {
    const amenityList = [
        'Private Pool (80x20 ft)',
        'Rain Dance System',
        'Music System',
        'Barbeque Station',
        'Fully Furnished 4BHK',
        '6 Washrooms',
        '9 Extra Mattresses (Free)',
        'Mineral Water (20L Jar)',
        'Hot & Cold Water',
        'Power Backup (Inverter/Gen)',
        'Secure Parking (6-8 Cars)',
        'Caretaker on Site',
        'Pet Friendly (Conditions Apply)',
        'Kitchen for Re-heating'
    ]

    return (
        <section className="py-20 bg-text text-white">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12 text-primary">All Property Amenities</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {amenityList.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors border border-white/10">
                            <FaCheck size={20} className="text-primary shrink-0" />
                            <span className="text-sm tracking-wide font-light">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FullAmenities
