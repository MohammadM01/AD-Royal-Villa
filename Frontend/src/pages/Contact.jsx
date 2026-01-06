import React from 'react';
import ImageGalleryLayout from '../components/ImageGalleryLayout';

const contactItems = [
    {
        src: '/Assets/villa_entrance_facade.jpg',
        title: 'Visit Us',
        description: 'Near Coral School, Padgha, Thane 421101.'
    },
    {
        src: '/Assets/outdoor_lounge_canopy.jpg',
        title: 'Call Us',
        description: '+91 98000 98000. Available 24/7.'
    },
    {
        src: '/Assets/Activites and pool/pool_slides_aerial_view.jpg',
        title: 'Email Us',
        description: 'bookings@adroyalvilla.com'
    },
];

const Contact = () => {
    return (
        <div className="relative">
            <ImageGalleryLayout
                title="Contact"
                subtitle="We are here to assist you. Reach out to plan your perfect stay."
                items={contactItems}
            />
            {/* Optional Form Section embedded below gallery if needed, but keeping it pure gallery for now as requested */}
        </div>
    );
};

export default Contact;
