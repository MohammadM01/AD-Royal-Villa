import React from 'react'
import ContactDetails from '../components/contact/ContactDetails'

const Contact = () => {
    return (
        <div className="pt-20">
            <div className="bg-primary/5 py-24 text-center text-text">
                <h1 className="text-5xl md:text-7xl font-heading font-bold text-primary">Plan Your Escape</h1>
                <p className="text-primary-light mt-6 tracking-[0.2em] uppercase text-sm">Ideal for families, gatherings & peaceful stays</p>
            </div>
            <ContactDetails />
        </div>
    )
}

export default Contact
