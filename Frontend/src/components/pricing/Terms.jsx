import React from 'react'
import { FaClock, FaExclamationCircle, FaRupeeSign } from 'react-icons/fa'

const Terms = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6 max-w-5xl">
                <h2 className="text-3xl font-heading font-bold mb-12 text-center">House Rules & Policies</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Timings */}
                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <FaClock size={32} className="text-primary shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold text-text mb-2">Check-in & Checkout</h3>
                                <p className="text-gray-600">Check-in: <span className="font-semibold">1:00 PM</span></p>
                                <p className="text-gray-600">Check-out: <span className="font-semibold">11:00 AM</span></p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <FaClock size={32} className="text-primary shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold text-text mb-2">Pool Timings</h3>
                                <p className="text-gray-600">Access Available: <span className="font-semibold">1:00 PM – 12:00 AM</span></p>
                                <p className="text-gray-500 text-sm mt-1">Pool closed for maintenance outside these hours.</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment & Deposit */}
                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <FaRupeeSign size={32} className="text-primary shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold text-text mb-2">Payment Policy</h3>
                                <p className="text-gray-600">50% Advance payment required to confirm booking.</p>
                                <p className="text-gray-600">Remaining Balance to be paid at Check-in.</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <FaExclamationCircle size={32} className="text-primary shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold text-text mb-2">Important Notes</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-1">
                                    <li>Capacity up to 20 Guests</li>
                                    <li>Security Deposit may apply</li>
                                    <li>Carry Valid ID Proofs</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Terms
