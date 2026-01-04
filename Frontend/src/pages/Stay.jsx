import React from 'react'
import RoomSection from '../components/stay/RoomSection'

const Stay = () => {
  return (
    <div className="pt-20">
      <div className="bg-text py-20 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-heading font-bold">Stay & Comfort</h1>
        <p className="text-primary mt-4 tracking-widest uppercase text-sm">Luxury AC Bedrooms & Living Spaces</p>
      </div>

      <RoomSection
        title="4 Luxury Bedrooms"
        description="Experience unparalleled comfort in our spacious, fully furnished bedrooms. Each room is designed to provide a restful retreat after a day of fun, featuring premium bedding and modern amenities."
        features={[
          'King-size Beds',
          'Fully Air Conditioned',
          'Pool-view Balconies',
          '32” Smart TVs',
          'Wardrobes & Storage',
          'Attached Washrooms'
        ]}
        image="/Assets/luxury_bedroom_king_tv.jpg"
      />

      <RoomSection
        title="Royal Living & Dining"
        description="The heart of the villa is our expansive 700 sq. ft. living room, perfect for gathering the whole family. Enjoy meals together at our royal dining table or relax on the large sofa while watching your favorite shows."
        features={[
          '700 sq. ft. Living Area',
          '65” Smart WiFi TV',
          'Royal Dining Table (8 Pax)',
          'Large Comfortable Sofa',
          '6 Washrooms (Indian + Western)',
          'Sound System Ready'
        ]}
        image="/Assets/poolside_patio_dining.jpg"
        reversed={true}
      />

      <RoomSection
        title="Modern Comforts"
        description="Every corner of AD Royal Private Villa is crafted for your convenience. From extra mattresses for large groups to spotless hygiene standards, we ensure your stay is hassle-free."
        features={[
          '9 Extra Mattresses (Free)',
          'Daily Housekeeping',
          'Hot & Cold Water',
          'Power Backup',
          'Mineral Water (20L provided)',
          'Hygiene Kits'
        ]}
        image="/Assets/comfort_bedroom_interior.jpg"
      />
    </div>
  )
}

export default Stay
