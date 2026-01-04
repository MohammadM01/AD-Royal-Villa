import React from 'react'
import Story from '../components/about/Story'
import Mission from '../components/about/Mission'

const About = () => {
    return (
        <div className="pt-20">
            {/* Page Header */}
            <div className="bg-text py-20 text-center text-white">
                <h1 className="text-4xl md:text-6xl font-heading font-bold">About Us</h1>
                <p className="text-primary mt-4 tracking-widest uppercase text-sm">Our Story & Values</p>
            </div>
            <Story />
            <Mission />
        </div>
    )
}

export default About
