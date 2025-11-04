import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import OrganicFarmers from '../components/OrganicFarmers'
import Services from '../components/Services'
import Reviews from '../components/Reviews'

const Home = () => {
  return (
    <div>
        <Hero />
        <Features />
        <OrganicFarmers />
        <Services />
        <Reviews />
    </div>
  )
}

export default Home