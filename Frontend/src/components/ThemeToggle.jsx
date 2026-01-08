import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div
            className={`w-20 h-10 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-500 border border-black/10 dark:border-white/10 shadow-inner ${isDark ? 'bg-gray-800 justify-end' : 'bg-[#E0E0E0] justify-start'
                }`}
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            role="button"
            tabIndex={0}
        >
            <motion.div
                className="w-8 h-8 rounded-full shadow-lg flex items-center justify-center relative"
                layout
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                }}
                style={{
                    backgroundColor: isDark ? "#EAEAEA" : "#FFD700", // Moon color / Sun color
                }}
            >
                <AnimatePresence mode='wait'>
                    {isDark ? (
                        <motion.div
                            key="moon"
                            initial={{ scale: 0, rotate: -90, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            exit={{ scale: 0, rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute"
                        >
                            <Moon size={18} className="text-gray-900" fill="currentColor" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="sun"
                            initial={{ scale: 0, rotate: 90, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            exit={{ scale: 0, rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute"
                        >
                            <Sun size={18} className="text-orange-700" fill="currentColor" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default ThemeToggle;
