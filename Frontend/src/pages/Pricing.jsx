import React from 'react'
import RateCards from '../components/pricing/RateCards'
import Terms from '../components/pricing/Terms'

const Pricing = () => {
    return (
        <div className="pt-20">
            <div className="bg-primary/5 py-24 text-center text-text">
                <h1 className="text-5xl md:text-7xl font-heading font-bold text-primary">Simple & Transparent</h1>
                <p className="text-primary-light mt-6 tracking-[0.2em] uppercase text-sm">Trustworthy • Affordable • Direct Booking</p>
            </div>
            <RateCards />
            <Terms />
        </div>
    )
}

export default Pricing
