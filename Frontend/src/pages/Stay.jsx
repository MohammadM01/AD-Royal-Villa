import React from 'react';
import ImageGalleryLayout from '../components/ImageGalleryLayout';

const stayItems = [
  {
    src: '/Assets/nice_bedroom_interior.jpg', // Placeholder functionality, referencing a likely asset or generic. 
    // Let's use valid ones from list or repeatable ones. 
    // Using '/Assets/villa_entrance_facade.jpg' multiple times is better than broken links.
    // I'll reuse known good images for now with different titles.
    src: '/Assets/outdoor_lounge_canopy.jpg',
    title: '4 Luxury Bedrooms',
    description: 'Fully air-conditioned, king-size beds, and attached washrooms.'
  },
  {
    src: '/Assets/Activites and pool/bbq1.jpeg',
    title: 'Private Living Hall',
    description: '700 sq.ft. of exclusive indoor space for your group.'
  },
  {
    src: '/Assets/Activites and pool/pool_slides_aerial_view.jpg',
    title: 'Modern Amenities',
    description: 'WiFi, Smart TVs, and premium sound systems at your fingertips.'
  },
  {
    src: '/Assets/kids_play_zone_overview.jpg',
    title: 'Total Privacy',
    description: 'The entire villa is yours. No strangers, just serenity.'
  },
];

const Stay = () => {
  return (
    <ImageGalleryLayout
      title="Accommodation"
      subtitle="Rest in absolute comfort. Every detail curated for your relaxation."
      items={stayItems}
    />
  );
};

export default Stay;
