import React from 'react'
import RoomSection from '../components/stay/RoomSection'

const Stay = () => {
  return (
    <div className="pt-20 bg-[#F9F9F4]">
      <div className="bg-primary/5 py-24 text-center text-text">
        <h1 className="text-5xl md:text-7xl font-heading font-bold text-primary">Stay & Amenities</h1>
        <p className="text-primary-light mt-6 tracking-[0.2em] uppercase text-sm">Comfort • Safety • Privacy</p>
      </div>

      <RoomSection
        title="4 Luxury Private Bedrooms"
        description="Retreat into absolute comfort. Our 4 spacious, fully air-conditioned bedrooms ensure your family's privacy and rest. Clean, sanitized, and designed for a peaceful night's sleep."
        features={[
          'King-size Comfort',
          'Fully Air Conditioned',
          'Private Balconies',
          '32” Smart TVs',
          'Wardrobes & Storage',
          'Luxury Attached Washrooms'
        ]}
        image="/Assets/luxury_bedroom_king_tv.jpg"
      />

      <RoomSection
        title="Royal Private Living & Dining"
        description="A massive 700 sq. ft. living area exclusively for your group. No shared spaces, no interruptions. Enjoy family meals or endless conversations in a secure, homelike environment."
        features={[
          '700 sq. ft. Exclusive Hall',
          '65” Smart WiFi TV',
          'Royal Dining (8 Pax)',
          'Plush Sofa Seating',
          '6 Washrooms Total',
          'Sound System Ready'
        ]}
        image="/Assets/poolside_patio_dining.jpg"
        reversed={true}
      />

      <RoomSection
        title="Modern Comforts & Hygiene"
        description="We prioritize your safety and convenience. From daily housekeeping to power backup, everything is managed so you can focus on connecting with your loved ones."
        features={[
          '9 Extra Mattresses (Free)',
          'Daily Housekeeping',
          '24/7 Hot & Cold Water',
          'Power Backup',
          'Mineral Water Provided',
          'Hygiene & Safety Kits'
        ]}
        image="/Assets/comfort_bedroom_interior.jpg"
      />
    </div>
  )
}

export default Stay
