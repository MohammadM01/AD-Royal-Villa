import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'

const LocationTeaser = () => {
    return (
        <section className="relative h-[500px] w-full mt-12 bg-gray-900 group overflow-hidden">
            {/* Background Image */}
            <img
                src="/Assets/villa_entrance_facade.webp"
                alt="Villa Location"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 to-transparent flex items-center">
                <div className="container mx-auto px-6">
                    <div className="max-w-xl space-y-6">
                        <div className="flex items-center space-x-2 text-primary">
                            <FaMapMarkerAlt size={24} />
                            <span className="uppercase tracking-widest font-bold">Prime Location</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight">
                            Just 1 Hour from <br /> Mumbai & Thane
                        </h2>
                        <p className="text-gray-300 text-lg font-light leading-relaxed">
                            Located near Coral School, adjacent to Auto Fleet Petrol Pump in Padgha.
                            Easily accessible via Khadavli Station.
                        </p>
                        <a
                            href="https://maps.app.goo.gl/H8ZdTKRGpAki1t3a6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-white text-text px-8 py-3 rounded-full font-medium hover:bg-primary hover:text-white transition-all duration-300 mt-4 uppercase tracking-wider text-sm"
                        >
                            View on Google Maps
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LocationTeaser
