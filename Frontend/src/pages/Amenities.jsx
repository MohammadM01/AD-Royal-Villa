import React from 'react'
import PoolFeatures from '../components/amenities/PoolFeatures'
import KidsZone from '../components/amenities/KidsZone'
import FullAmenities from '../components/amenities/FullAmenities'

const Amenities = () => {
    return (
        <div className="pt-20">
            <div className="bg-primary/5 py-24 text-center text-text">
                <h1 className="text-5xl md:text-7xl font-heading font-bold text-primary">Pool & Activities</h1>
                <p className="text-primary-light mt-6 tracking-[0.2em] uppercase text-sm">Private Pool • Kids Zone • Relaxation</p>
            </div>
            <PoolFeatures />
            <KidsZone />
            <FullAmenities />
        </div>
    )
}

export default Amenities
