import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Loader from './components/Loader'
import { motion, AnimatePresence } from 'framer-motion'

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

            {!loading && (
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <AnimatePresence mode='wait'>
                        <motion.main
                            key={location.pathname}
                            className="grow min-h-screen"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Outlet />
                        </motion.main>
                    </AnimatePresence>
                    <WhatsAppButton />
                    <Footer />
                </div>
            )}
        </>
    )
}

export default Layout
