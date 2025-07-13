import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', href: '#home', icon: '🏠' },
  { name: 'Skills', href: '#skills', icon: '🛠️' },
  { name: 'Projects', href: '#projects', icon: '💻' },
  { name: 'Blog', href: '#blog', icon: '✍️' },
  { name: 'Contact', href: '#contact', icon: '📧' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // Start as false to avoid SSR issues
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [hasMounted, setHasMounted] = useState(false);
  const menuRef = useRef(null);

  // Client-side mounting detection
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Responsive detection - only after mount
  useEffect(() => {
    if (!hasMounted) return;
    
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile(); // Set on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [hasMounted]);

  // Scroll detection for sticky nav and active link
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      // Active link detection
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
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

  // Close menu on outside click
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
        document.body.style.overflow = 'auto';
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isMenuOpen]);

  // Dark mode toggle
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

  // Hamburger menu toggle
  const toggleMenu = () => {
    setIsMenuOpen((open) => {
      document.body.style.overflow = !open ? 'hidden' : 'auto';
      return !open;
    });
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Animation variants
  const menuVariants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } },
    exit: { x: '100%', transition: { ease: 'easeInOut', duration: 0.3 } },
  };
  const linkVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: (i) => ({ x: 0, opacity: 1, transition: { delay: i * 0.1, type: 'spring', stiffness: 200 } })
  };

  // Prevent SSR hydration issues
  if (!hasMounted) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg dark:bg-gray-900/90 py-0' : 'bg-transparent py-2'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
              <a href="#home" className="flex items-center">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2 border-2 border-blue-500">
                  <img src="/profile.jpg" alt="Shahzaibali" className="w-full h-full object-cover" />
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-transparent">
                  Shahzaibali
                </h1>
              </a>
            </motion.div>

            {/* Desktop Nav */}
            {!isMobile && (
              <div className="flex items-center space-x-2">
                <div className="flex items-baseline space-x-1">
                  {NAV_LINKS.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeLink === link.name ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg' : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'}`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveLink(link.name)}
                    >
                      {link.name}
                      {activeLink === link.name && (
                        <motion.span layoutId="activeLink" className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 -z-10" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                      )}
                    </motion.a>
                  ))}
                </div>
                <motion.button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                  aria-label="Toggle dark mode"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isDark ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                  )}
                </motion.button>
                <motion.button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '#contact'}
                >
                  Hire Me <span className="ml-2">👉</span>
                </motion.button>
              </div>
            )}

            {/* Mobile Hamburger */}
            {isMobile && (
              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                  aria-label="Toggle dark mode"
                  whileTap={{ scale: 0.9 }}
                >
                  {isDark ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                  )}
                </motion.button>
                <motion.button
                  onClick={toggleMenu}
                  className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                  aria-label="Toggle menu"
                  whileTap={{ scale: 0.9 }}
                >
                  {isMenuOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                  )}
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={closeMenu} />
            <motion.div ref={menuRef} initial="hidden" animate="visible" exit="exit" variants={menuVariants} className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white dark:bg-gray-900 shadow-2xl z-50 p-6">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 text-transparent">Shahzaibali</h2>
                  <button onClick={closeMenu} className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200" aria-label="Close menu">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                <nav className="flex-1">
                  <ul className="space-y-4">
                    {NAV_LINKS.map((link, index) => (
                      <motion.li key={link.name} custom={index} initial="hidden" animate="visible" variants={linkVariants}>
                        <a href={link.href} onClick={() => { setActiveLink(link.name); closeMenu(); }} className={`flex items-center p-4 rounded-xl text-lg font-medium transition-colors duration-300 ${activeLink === link.name ? 'bg-blue-100 text-blue-600 dark:bg-gray-800 dark:text-blue-400' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}>
                          <span className="mr-3 text-xl">{link.icon}</span>
                          {link.name}
                          {activeLink === link.name && (<span className="ml-auto text-blue-500">•</span>)}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
                <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
                  <motion.button onClick={toggleDarkMode} className="flex items-center justify-between w-full p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 mb-4" whileTap={{ scale: 0.98 }}>
                    <span className="flex items-center">
                      {isDark ? (<><svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>Light Mode</>) : (<><svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>Dark Mode</>)}
                    </span>
                    <span className="text-sm px-2 py-1 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300">{isDark ? '🌞' : '🌙'}</span>
                  </motion.button>
                  <motion.button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl text-lg font-medium shadow-lg transition-colors duration-300 flex items-center justify-center" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { window.location.href = '#contact'; closeMenu(); }}>
                    Hire Me <span className="ml-2 animate-pulse">🚀</span>
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