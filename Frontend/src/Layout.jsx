import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import LiquidFilters from './components/LiquidFilters'
import { motion, AnimatePresence } from 'framer-motion'
import BackgroundMusic from './components/BackgroundMusic'
import BackgroundLeaves from './components/BackgroundLeaves'

const Layout = () => {
    const location = useLocation()

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    return (
        <>
            {/* Invisible SVG Filters for Liquid Effects */}
            <LiquidFilters />

            {/* Background Floating Leaves */}
            <BackgroundLeaves />

            <div className="flex flex-col min-h-screen relative z-10">
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
        </>
    )
}

export default Layout
