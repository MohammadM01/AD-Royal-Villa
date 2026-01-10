import React from 'react';
import ImageGalleryLayout from '../components/ImageGalleryLayout';
import FullAmenities from '../components/amenities/FullAmenities';

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
        <div className="min-h-screen bg-white dark:bg-[#0F172A] transition-colors duration-300">
            <ImageGalleryLayout
                title="Amenities"
                subtitle={
                    <span>
                        <strong className="block text-2xl mb-4 text-primary font-heading">Aquatic Paradise</strong>
                        Experience the joy of abundance with our world-class facilities.
                        From the crystal-clear waters of our lap pool to the laughter-filled kids' zone,
                        every corner is designed for your ultimate relaxation and pleasure.
                        Immerse yourself in luxury that knows no bounds.
                    </span>
                }
                items={amenityItems}
            />
            <div className="relative z-20">
                <FullAmenities />
            </div>
        </div>
    );
};

export default Amenities;
