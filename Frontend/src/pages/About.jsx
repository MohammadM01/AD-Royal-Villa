import React from 'react'
import Story from '../components/about/Story'
import Mission from '../components/about/Mission'

const About = () => {
    return (
        <div className="pt-20">
            {/* Page Header */}
            <div className="bg-primary/5 py-32 text-center text-text relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[url('/Assets/villa_entrance_facade.jpg')] bg-cover bg-center"></div>
                <h1 className="text-5xl md:text-7xl font-heading font-bold text-primary relative z-10">About Our Realm</h1>
                <p className="text-primary-light mt-6 tracking-[0.2em] uppercase text-sm font-medium relative z-10">Where Privacy Meets Peace</p>
                <div className="w-24 h-1 bg-accent mx-auto mt-8 rounded-full relative z-10"></div>
            </div>
            <Story />
            <Mission />
        </div>
    )
}

export default About
