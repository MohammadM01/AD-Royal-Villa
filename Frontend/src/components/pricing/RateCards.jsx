import React from 'react'
import { FaCheck } from 'react-icons/fa'

const RateCards = () => {
    const plans = [
        {
            title: 'Weekdays',
            subtitle: 'Mon - Fri',
            price: '₹18,000',
            duration: '/ Night',
            features: ['Up to 20 Guests', 'Whole Villa Access', 'Private Pool', 'Kitchen Facilities']
        },
        {
            title: 'Weekends',
            subtitle: 'Sat - Sun',
            price: '₹20,000',
            duration: '/ Night',
            features: ['Top Priority', 'Event Ready', 'Late Checkout Options', 'Full Amenities']
        }
    ]

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {plans.map((plan, index) => (
                        <div key={index} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:border-primary/50 transition-all duration-300 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full group-hover:bg-primary/10 transition-colors"></div>

                            <h3 className="text-2xl font-bold text-text">{plan.title}</h3>
                            <p className="text-gray-500 text-sm mt-1">{plan.subtitle}</p>

                            <div className="my-8">
                                <span className="text-5xl font-heading font-bold text-primary">{plan.price}</span>
                                <span className="text-gray-400 font-light">{plan.duration}</span>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center space-x-3 text-gray-700">
                                        <FaCheck size={18} className="text-green-500" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="https://wa.me/91XXXXXXXXXX"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full text-center bg-text text-white py-3 rounded-full font-medium hover:bg-primary transition-colors"
                            >
                                Book Now
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default RateCards
