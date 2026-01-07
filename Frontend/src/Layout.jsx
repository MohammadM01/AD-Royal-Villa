import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Loader from './components/Loader'
import LiquidFilters from './components/LiquidFilters'
import { motion, AnimatePresence } from 'framer-motion'

import BackgroundMusic from './components/BackgroundMusic'

const Layout = () => {
    const [loading, setLoading] = useState(true)
    const location = useLocation()

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    return (
        <>
            <AnimatePresence>
                {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
            </AnimatePresence>

            {/* Invisible SVG Filters for Liquid Effects */}
            <LiquidFilters />
            {!loading && (
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <AnimatePresence mode='wait'>
                        <motion.main
                            key={location.pathname}
                            className="grow min-h-screen"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Outlet />
                        </motion.main>
                    </AnimatePresence>
                    <WhatsAppButton />
                    {/* Background Music Player */}
                    <BackgroundMusic />
                    <Footer />
                </div>
            )}
        </>
    )
}

export default Layout
