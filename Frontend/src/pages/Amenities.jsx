import React from 'react';
import ImageGalleryLayout from '../components/ImageGalleryLayout';

const amenityItems = [
    {
        src: '/Assets/Activites and pool/pool_villa_exterior_day.jpg',
        title: '80ft Lap Pool',
        description: 'Crystal clear waters with rain dance and slides.'
    },
    {
        src: '/Assets/kids_play_slide_seesaw.jpg',
        title: 'Kids Play Zone',
        description: 'Safe swings, slides, and merry-go-rounds.'
    },
    {
        src: '/Assets/Activites and pool/bbq1.jpeg',
        title: 'Poolside BBQ',
        description: 'Grill and chill under the open sky.'
    },
    {
        src: '/Assets/Activites and pool/kids_swings_garden.jpg',
        title: 'Lush Gardens',
        description: 'Perfect for morning yoga or evening strolls.'
    },
    {
        src: '/Assets/villa_entrance_facade.jpg',
        title: 'Secure Parking',
        description: 'Ample space for all your vehicles.'
    },
];

const Amenities = () => {
    return (
        <ImageGalleryLayout
            title="Amenities"
            subtitle="Experience the joy of abundance. Everything you need, right here."
            items={amenityItems}
        />
    );
};

export default Amenities;
