import React from 'react';
import ImageGalleryLayout from '../components/ImageGalleryLayout';

const aboutItems = [
    {
        src: '/Assets/villa_entrance_facade.webp',
        title: 'Welcome Home',
        description: 'A sanctuary designed for peace and privacy.'
    },
    {
        src: '/Assets/outdoor_lounge_canopy.webp',
        title: 'Philosophy',
        description: 'Atithi Devo Bhava - Guest is God. Experience true Indian hospitality.'
    },
    {
        src: '/Assets/Activites and pool/pool_villa_exterior_day.webp',
        title: 'The Estate',
        description: 'Sprawling lawns and pristine waters in a private gated realm.'
    },
    {
        src: '/Assets/kids_play_zone_overview.webp',
        title: 'Family First',
        description: 'Created to reconnect loved ones away from digital distractions.'
    },
];

const About = () => {
    return (
        <ImageGalleryLayout
            title="Our Story"
            subtitle="Where luxury meets legacy. Discover the heart of our hospitality."
            items={aboutItems}
        />
    );
};

export default About;
