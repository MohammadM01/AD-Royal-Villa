import React from 'react'
import PoolFeatures from '../components/amenities/PoolFeatures'
import KidsZone from '../components/amenities/KidsZone'
import FullAmenities from '../components/amenities/FullAmenities'

const Amenities = () => {
    return (
        <div className="pt-20">
            <div className="bg-text py-20 text-center text-white">
                <h1 className="text-4xl md:text-6xl font-heading font-bold">Pool & Activities</h1>
                <p className="text-primary mt-4 tracking-widest uppercase text-sm">Entertainment for All Ages</p>
            </div>
            <PoolFeatures />
            <KidsZone />
            <FullAmenities />
        </div>
    )
}

export default Amenities
