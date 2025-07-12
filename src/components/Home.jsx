import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeGlow, setActiveGlow] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);
  const [isExploreHovered, setIsExploreHovered] = useState(false);
  const controls = useAnimation();

  // Glow effect rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGlow((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Background particles
  const particles = Array(30).fill().map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5
  }));

  const features = [
    {
      title: "Full Stack Development",
      description: "End-to-end web solutions with modern technologies",
      icon: "🚀",
      color: "from-purple-500 to-indigo-600"
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications",
      icon: "📱",
      color: "from-amber-500 to-orange-600"
    },
    {
      title: "SEO Optimization",
      description: "Search engine optimization and digital marketing",
      icon: "🎯",
      color: "from-emerald-500 to-teal-600"
    }
  ];

  const handleResumeDownload = async () => {
    if (isDownloading) return; // Prevent multiple downloads
    
    setIsDownloading(true);
    
    try {
      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.download = 'Shahzaibali_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success animation
      await controls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 0.3 }
      });
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      // Reset after a delay to prevent rapid clicking
      setTimeout(() => setIsDownloading(false), 2000);
    }
  };

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreClick = () => {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative w-full min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center transition-colors duration-500">
      {/* Cosmic Background */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gray-400 dark:bg-white opacity-20 dark:opacity-10"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0.1, 0.6, 0.1]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              delay: particle.delay,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
        ))}
      </div>

      {/* Animated Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className={`absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-gradient-to-br from-purple-500/20 to-transparent dark:from-purple-500/10 rounded-full blur-3xl ${
            activeGlow === 0 ? 'opacity-30 dark:opacity-20' : 'opacity-0'
          } transition-opacity duration-1000`}
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className={`absolute -top-1/3 -right-1/3 w-[150%] h-[150%] bg-gradient-to-br from-blue-500/20 to-transparent dark:from-blue-500/10 rounded-full blur-3xl ${
            activeGlow === 1 ? 'opacity-30 dark:opacity-20' : 'opacity-0'
          } transition-opacity duration-1000`}
          animate={{
            rotate: [360, 0]
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className={`absolute bottom-0 left-1/4 w-[120%] h-[120%] bg-gradient-to-t from-emerald-500/20 to-transparent dark:from-emerald-500/10 rounded-full blur-3xl ${
            activeGlow === 2 ? 'opacity-30 dark:opacity-20' : 'opacity-0'
          } transition-opacity duration-1000`}
          animate={{
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block px-6 py-2 rounded-full bg-gray-100/80 dark:bg-white/10 backdrop-blur-md border border-gray-200/50 dark:border-white/20 mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-blue-600 dark:text-blue-400">✨ Welcome to the Future</span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="block text-gray-900 dark:text-white">Hi, I'm Shahzaib Ali</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">
              Full Stack Developer
            </span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Passionate about creating innovative digital experiences. I specialize in web development, 
            mobile app development, and SEO optimization to bring your ideas to life.
          </motion.p>

          {/* Personal Info Section */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-blue-500/20 dark:border-blue-400/20">
                <img 
                  src="/profile.jpg" 
                  alt="Shahzaib Ali" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Shahzaib Ali</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Web Developer & Full Stack Engineer</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Pakistan
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Available for Work
              </span>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <motion.button
              className="relative overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold shadow-xl group"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(99, 102, 241, 0.6)'
              }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              onClick={handleContactClick}
            >
              <span className="relative z-10 flex items-center gap-3">
                Begin Your Journey
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              {isHovered && (
                <motion.span 
                  className="absolute inset-0 bg-white/10 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>

            <motion.button
              onClick={handleResumeDownload}
              disabled={isDownloading}
              className={`px-8 py-4 bg-transparent border-2 border-gray-300 dark:border-white/30 hover:border-gray-400 dark:hover:border-white/50 text-gray-700 dark:text-white rounded-full font-bold backdrop-blur-sm transition-all group ${
                isDownloading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              whileHover={!isDownloading ? { scale: 1.05 } : {}}
              whileTap={!isDownloading ? { scale: 0.95 } : {}}
              animate={controls}
            >
              <span className="flex items-center gap-3">
                <motion.svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={isDownloading ? { rotate: 360 } : {}}
                  transition={{ duration: 1, repeat: isDownloading ? Infinity : 0 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </motion.svg>
                {isDownloading ? 'Downloading...' : 'Download Resume'}
              </span>
            </motion.button>

            <motion.button
              className="px-8 py-4 bg-transparent border-2 border-gray-300 dark:border-white/30 hover:border-gray-400 dark:hover:border-white/50 text-gray-700 dark:text-white rounded-full font-bold backdrop-blur-sm transition-all group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setIsExploreHovered(true)}
              onHoverEnd={() => setIsExploreHovered(false)}
              onClick={handleExploreClick}
            >
              <span className="flex items-center gap-3">
                Explore My Universe
                <motion.svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={isExploreHovered ? { x: [0, 5, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </span>
            </motion.button>
          </motion.div>

          {/* Skills Tags */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {['Web Development', 'Mobile Apps', 'Full Stack', 'SEO', 'React', 'Node.js', 'Next.js', 'MongoDB'].map((skill, index) => (
              <motion.span
                key={skill}
                className="px-4 py-2 bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating Features */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`bg-gradient-to-br ${feature.color} p-0.5 rounded-2xl shadow-2xl`}
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-6 rounded-2xl h-full border border-gray-200/50 dark:border-gray-700/50">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Begin Exploration</span>
          <motion.div
            animate={{
              y: [0, 10, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;