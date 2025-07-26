import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Components
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import ParticleBackground from './components/ParticleBackground';
import ScrollToTop from './components/ScrollToTop';
import CursorFollower from './components/CursorFollower';

// Utils
import { trackPageView } from './utils/analytics';

import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });

    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Track initial page view
    trackPageView(window.location.pathname, document.title);

    // Set dark mode as default
    document.documentElement.classList.add('dark');

    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className={`App min-h-screen bg-dark-950 text-white overflow-x-hidden ${darkMode ? 'dark' : ''}`}>
        {/* Particle Background */}
        <ParticleBackground />
        
        {/* Cursor Follower */}
        <CursorFollower />
        
        {/* Navigation */}
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.main 
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={
                <>
                  <Home />
                  <About />
                  <Skills />
                  <Projects />
                  <Blog />
                  <Contact />
                </>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </motion.main>
        </AnimatePresence>
        
        {/* Footer */}
        <Footer />
        
        {/* Scroll to Top */}
        <ScrollToTop />
        
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(15, 23, 42, 0.95)',
              color: '#ffffff',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              backdropFilter: 'blur(10px)',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#ffffff',
              },
            },
          }}
        />
        
        {/* Ambient Lighting Effects */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Top ambient light */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-radial from-primary-500/20 via-primary-600/10 to-transparent rounded-full blur-3xl" />
          
          {/* Bottom ambient light */}
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-radial from-accent-500/15 via-accent-600/8 to-transparent rounded-full blur-3xl" />
          
          {/* Side ambient lights */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-64 h-64 bg-gradient-radial from-neon-blue/10 via-neon-blue/5 to-transparent rounded-full blur-2xl" />
          <div className="absolute top-1/3 right-0 w-64 h-64 bg-gradient-radial from-neon-purple/10 via-neon-purple/5 to-transparent rounded-full blur-2xl" />
        </div>
        
        {/* Grid Pattern Overlay */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]">
          <div className="w-full h-full bg-cyber-grid bg-grid" />
        </div>
      </div>
    </Router>
  );
}

export default App;