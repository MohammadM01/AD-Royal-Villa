import React from 'react'
import Hero from '../components/home/Hero'
import Intro from '../components/home/Intro'
import AmenitiesPreview from '../components/home/AmenitiesPreview'

const Home = () => {
  return (
    <div className="bg-[#F9F9F4]">
      <Hero />
      <Intro />
      <AmenitiesPreview />
    </div>
  )
}

export default Home
