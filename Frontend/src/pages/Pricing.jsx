import React from 'react';
import ImageGalleryLayout from '../components/ImageGalleryLayout';

const pricingItems = [
    {
        src: '/Assets/outdoor_lounge_canopy.jpg', // Abstract-ish image
        title: 'Weekday Escape',
        description: 'Mon-Thu: ₹12,000 per night for up to 15 guests.'
    },
    {
        src: '/Assets/Activites and pool/pool_villa_exterior_day.jpg',
        title: 'Weekend Indulgence',
        description: 'Fri-Sun: ₹25,000 per night. Ultimate luxury.'
    },
    {
        src: '/Assets/Activites and pool/bbq1.jpeg',
        title: 'Meal Packages',
        description: 'Authentic home-cooked meals starting at ₹800/head.'
    },
    {
        src: '/Assets/villa_entrance_facade.jpg',
        title: 'Events & Parties',
        description: 'Custom packages available for weddings and corporate retreats.'
    }
];

const Pricing = () => {
    return (
        <ImageGalleryLayout
            title="Pricing"
            subtitle="Transparent rates for priceless memories. Book your private villa today."
            items={pricingItems}
        />
    );
};

export default Pricing;
