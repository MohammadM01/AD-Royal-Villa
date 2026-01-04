import React from 'react'
import ContactDetails from '../components/contact/ContactDetails'

const Contact = () => {
    return (
        <div className="pt-20">
            <div className="bg-text py-20 text-center text-white">
                <h1 className="text-4xl md:text-6xl font-heading font-bold">Contact Us</h1>
                <p className="text-primary mt-4 tracking-widest uppercase text-sm">We'd love to hear from you</p>
            </div>
            <ContactDetails />
        </div>
    )
}

export default Contact
