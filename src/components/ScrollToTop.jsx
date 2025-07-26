import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = document.documentElement.scrollTop;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      
      setScrollProgress(progress);
      setIsVisible(scrolled > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 180 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={scrollToTop}
            className="relative group w-14 h-14 bg-dark-800/80 backdrop-blur-md border border-primary-500/30 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-primary-500/20 hover:border-primary-400 hover:shadow-glow-md"
          >
            {/* Progress ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 56 56"
            >
              <circle
                cx="28"
                cy="28"
                r="26"
                fill="none"
                stroke="rgba(59, 130, 246, 0.2)"
                strokeWidth="2"
              />
              <motion.circle
                cx="28"
                cy="28"
                r="26"
                fill="none"
                stroke="rgba(59, 130, 246, 0.8)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={163.36} // 2 * π * 26
                strokeDashoffset={163.36 - (163.36 * scrollProgress) / 100}
                transition={{ duration: 0.1 }}
              />
            </svg>

            {/* Arrow icon */}
            <motion.div
              className="text-primary-400 group-hover:text-white transition-colors duration-300"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <FaChevronUp size={20} />
            </motion.div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
            
            {/* Pulse animation */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary-500/50"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </button>

          {/* Tooltip */}
          <motion.div
            className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-dark-800/90 text-white text-sm rounded-lg border border-primary-500/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
            initial={{ y: 10 }}
            animate={{ y: 0 }}
          >
            Back to top
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-dark-800/90" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;