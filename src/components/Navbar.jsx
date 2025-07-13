import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', href: '#home', icon: '🏠' },
  { name: 'Skills', href: '#skills', icon: '🛠️' },
  { name: 'Projects', href: '#projects', icon: '💻' },
  { name: 'Blog', href: '#blog', icon: '✍️' },
  { name: 'Contact', href: '#contact', icon: '📧' },
];

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
          current = section.getAttribute('id');
        }
      });
      if (current) {
        setActiveLink(NAV_LINKS.find(link => link.href === `#${current}`)?.name || 'Home');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', newMode);
  };
  
  useEffect(() => {
    const saved = localStorage.getItem('darkMode') === 'true';
    if (saved) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Smooth scroll function
  const smoothScrollTo = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Handle navigation click
  const handleNavClick = (linkName, href) => {
    setActiveLink(linkName);
    smoothScrollTo(href);
    setIsMobileMenuOpen(false);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event, linkName, href) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleNavClick(linkName, href);
    }
  };

  if (!hasMounted) return null;

  return (
    <>
      {/* Fixed Sticky Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full max-w-full overflow-hidden ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg dark:bg-gray-900/95 py-0 border-b border-gray-200/20 dark:border-gray-700/20' 
            : 'bg-white/90 backdrop-blur-md dark:bg-gray-900/90 py-2 shadow-sm'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="flex justify-between items-center h-16 w-full">
            {/* Logo - Left Side */}
            <div className="flex-shrink-0 min-w-0">
              <a 
                href="#home" 
                className="flex items-center group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-1"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('Home', '#home');
                }}
                onKeyDown={(e) => handleKeyDown(e, 'Home', '#home')}
                tabIndex={0}
                aria-label="Go to home section"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden mr-2 md:mr-3 border-2 border-blue-500 group-hover:border-purple-500 transition-colors duration-300 shadow-lg flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-600">
                  <img 
                    src="/profile.jpg" 
                    alt="Shahzaib Ali - Full Stack Developer" 
                    className="w-full h-full object-cover" 
                    loading="eager"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs md:text-sm" style={{ display: 'none' }}>
                    SA
                  </div>
                </div>
                <h1 className="text-lg md:text-xl lg:text-2xl font-bold bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent group-hover:from-purple-600 group-hover:via-pink-600 group-hover:to-blue-600 transition-all duration-300 truncate">
                  Shahzaib Ali
                </h1>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-3 flex-shrink-0">
              <nav className="flex items-baseline space-x-2" role="navigation" aria-label="Main navigation">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap ${
                      activeLink === link.name 
                        ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg' 
                        : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.name, link.href);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, link.name, link.href)}
                    tabIndex={0}
                    aria-current={activeLink === link.name ? 'page' : undefined}
                  >
                    {link.name}
                    {activeLink === link.name && (
                      <span 
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 -z-10" 
                      />
                    )}
                  </a>
                ))}
              </nav>
              
              {/* Desktop Dark Mode Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                className="relative p-2.5 rounded-xl bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 hover:from-blue-100 hover:via-purple-100 hover:to-pink-100 dark:hover:from-blue-800 dark:hover:via-purple-800 dark:hover:to-pink-800 transition-all duration-500 shadow-lg border-2 border-gray-200/50 dark:border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0 overflow-hidden group"
                aria-label="Toggle dark mode"
                tabIndex={0}
                whileHover={{ scale: 1.05, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                />
                
                {/* Toggle switch container */}
                <div className="relative w-5 h-5 flex items-center justify-center">
                  {/* Sun icon - shown in dark mode to switch to light */}
                  <motion.svg
                    className="absolute w-4 h-4 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    animate={isDark ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </motion.svg>
                  
                  {/* Moon icon - shown in light mode to switch to dark */}
                  <motion.svg
                    className="absolute w-4 h-4 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    animate={isDark ? { opacity: 0, scale: 0, rotate: -90 } : { opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </motion.svg>
                </div>
                
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/20 to-blue-400/20"
                  animate={isDark ? { opacity: 0.3 } : { opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              
              <button
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap"
                onClick={() => handleNavClick('Contact', '#contact')}
                onKeyDown={(e) => handleKeyDown(e, 'Contact', '#contact')}
                tabIndex={0}
                aria-label="Hire me - go to contact section"
              >
                Hire Me <span className="ml-2">🚀</span>
              </button>
            </div>

            {/* Mobile Navigation - Right Side: Dark Mode + Hamburger */}
            <div className="flex md:hidden items-center space-x-2 flex-shrink-0">
              {/* New Modern Dark Mode Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                className="relative p-3 rounded-2xl bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 hover:from-blue-100 hover:via-purple-100 hover:to-pink-100 dark:hover:from-blue-800 dark:hover:via-purple-800 dark:hover:to-pink-800 transition-all duration-500 shadow-lg border-2 border-gray-200/50 dark:border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0 overflow-hidden group"
                aria-label="Toggle dark mode"
                tabIndex={0}
                whileHover={{ scale: 1.05, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                />
                
                {/* Toggle switch container */}
                <div className="relative w-6 h-6 flex items-center justify-center">
                  {/* Sun icon - shown in dark mode to switch to light */}
                  <motion.svg
                    className="absolute w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    animate={isDark ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </motion.svg>
                  
                  {/* Moon icon - shown in light mode to switch to dark */}
                  <motion.svg
                    className="absolute w-5 h-5 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    animate={isDark ? { opacity: 0, scale: 0, rotate: -90 } : { opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </motion.svg>
                </div>
                
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 to-blue-400/20"
                  animate={isDark ? { opacity: 0.3 } : { opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              {/* New Modern Hamburger Menu */}
              <motion.button
                onClick={toggleMobileMenu}
                className="relative p-3 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-lg border-2 border-white/20 dark:border-gray-800/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0 overflow-hidden group"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                tabIndex={0}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={isMobileMenuOpen ? { opacity: 1 } : { opacity: 0 }}
                />
                
                {/* Hamburger lines with morphing animation */}
                <div className="relative w-6 h-6 flex flex-col justify-center items-center">
                  <motion.span
                    animate={isMobileMenuOpen ? { rotate: 45, y: 0, width: '100%' } : { rotate: 0, y: -4, width: '100%' }}
                    className="absolute h-0.5 bg-white rounded-full origin-center transition-all duration-300"
                    style={{ width: '100%' }}
                  />
                  <motion.span
                    animate={isMobileMenuOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                    className="absolute h-0.5 bg-white rounded-full transition-all duration-300"
                    style={{ width: '80%' }}
                  />
                  <motion.span
                    animate={isMobileMenuOpen ? { rotate: -45, y: 0, width: '100%' } : { rotate: 0, y: 4, width: '100%' }}
                    className="absolute h-0.5 bg-white rounded-full origin-center transition-all duration-300"
                    style={{ width: '100%' }}
                  />
                </div>
                
                {/* Pulse effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-white/30"
                  animate={isMobileMenuOpen ? { scale: 1.2, opacity: 0 } : { scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, repeat: isMobileMenuOpen ? 0 : Infinity, repeatType: 'reverse' }}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-md z-40"
              onClick={toggleMobileMenu}
            />
            
            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden fixed top-0 right-0 h-full w-80 bg-gradient-to-br from-white/95 via-gray-50/95 to-white/95 dark:from-gray-900/95 dark:via-gray-800/95 dark:to-gray-900/95 backdrop-blur-xl shadow-2xl z-50 border-l border-gray-200/20 dark:border-gray-700/20"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200/30 dark:border-gray-700/30">
                  <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-transparent"
                  >
                    Menu
                  </motion.h2>
                  <motion.button
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 hover:from-red-100 hover:to-pink-100 dark:hover:from-red-800 dark:hover:to-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close mobile menu"
                    tabIndex={0}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-6" role="navigation" aria-label="Mobile navigation">
                  <div className="space-y-3">
                    {NAV_LINKS.map((link, index) => (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          activeLink === link.name 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-800 dark:hover:to-gray-700'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(link.name, link.href);
                        }}
                        onKeyDown={(e) => handleKeyDown(e, link.name, link.href)}
                        tabIndex={0}
                        aria-current={activeLink === link.name ? 'page' : undefined}
                      >
                        <span className="text-2xl" aria-hidden="true">{link.icon}</span>
                        <span className="text-lg font-medium">{link.name}</span>
                        {activeLink === link.name && (
                          <motion.div
                            layoutId="mobileActive"
                            className="absolute right-4 w-2 h-2 bg-white rounded-full"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                      </motion.a>
                    ))}
                  </div>
                </nav>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200/30 dark:border-gray-700/30">
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white py-4 px-6 rounded-xl text-lg font-medium shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavClick('Contact', '#contact')}
                    onKeyDown={(e) => handleKeyDown(e, 'Contact', '#contact')}
                    tabIndex={0}
                    aria-label="Hire me - go to contact section"
                  >
                    Hire Me <span className="ml-2" aria-hidden="true">🚀</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}