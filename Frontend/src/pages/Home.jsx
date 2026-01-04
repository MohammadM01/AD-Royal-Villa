import React from 'react'
import PoolHero from '../components/home/PoolHero'
import PoolShowcase from '../components/home/PoolShowcase'
import PoolVideoGallery from '../components/home/PoolVideoGallery'
import PoolVibe from '../components/home/PoolVibe'

const Home = () => {
  return (
    <div className="bg-text">
      <PoolHero />
      <PoolVideoGallery />
      <PoolShowcase />
      <PoolVibe />
    </div>
  )
}

export default Home
