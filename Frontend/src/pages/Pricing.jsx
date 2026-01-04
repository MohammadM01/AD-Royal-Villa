import React from 'react'
import RateCards from '../components/pricing/RateCards'
import Terms from '../components/pricing/Terms'

const Pricing = () => {
    return (
        <div className="pt-20">
            <div className="bg-text py-20 text-center text-white">
                <h1 className="text-4xl md:text-6xl font-heading font-bold">Rates & Terms</h1>
                <p className="text-primary mt-4 tracking-widest uppercase text-sm">Clear Pricing, No Hidden Charges</p>
            </div>
            <RateCards />
            <Terms />
        </div>
    )
}

export default Pricing
