import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 800); // Allow exit animation to likely finish
        }, 2000); // Show logo for 2 seconds

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F9F4E8] dark:bg-[#121212]"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative"
                    >
                        <img
                            src="/New/logo/logo.png"
                            alt="AD Royal Villa"
                            className="w-48 md:w-64 h-auto object-contain drop-shadow-2xl"
                        />
                        {/* Optional Glow for Dark Mode */}
                        <div className="absolute inset-0 bg-yellow-500/20 blur-3xl -z-10 rounded-full dark:block hidden" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
