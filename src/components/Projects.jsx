import { motion } from 'framer-motion';
import { useState } from 'react';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const projects = [
    {
      title: "Bank Website",
      description: "A modern banking platform with secure authentication, transaction management, and real-time account monitoring. Features include fund transfers, bill payments, and investment tracking.",
      image: "🏦",
      color: "from-blue-500 to-blue-600",
      features: ["Secure Authentication", "Transaction Management", "Real-time Updates", "Mobile Responsive"],
      technologies: ["React", "Node.js", "MongoDB", "JWT", "Socket.io"],
      github: "https://github.com/devshahzaibali/bank-website",
      live: "https://devshahzaibali.online/projects"
    },
    {
      title: "E-commerce Site",
      description: "A full-featured e-commerce platform with product catalog, shopping cart, payment processing, and order management. Includes admin dashboard and inventory management.",
      image: "🛒",
      color: "from-green-500 to-green-600",
      features: ["Product Catalog", "Shopping Cart", "Payment Processing", "Admin Dashboard"],
      technologies: ["Next.js", "Stripe", "PostgreSQL", "Redux", "Tailwind CSS"],
      github: "https://github.com/devshahzaibali/ecommerce-site",
      live: "https://devshahzaibali.online/projects"
    },
    {
      title: "Social Media Platform",
      description: "A social networking platform with user profiles, posts, comments, likes, and real-time messaging. Features include friend requests, notifications, and content sharing.",
      image: "📱",
      color: "from-purple-500 to-purple-600",
      features: ["User Profiles", "Real-time Chat", "Content Sharing", "Notifications"],
      technologies: ["React", "Firebase", "Socket.io", "Cloud Storage", "PWA"],
      github: "https://github.com/devshahzaibali/social-platform",
      live: "https://devshahzaibali.online/projects"
    },
    {
      title: "Todo App",
      description: "A productivity app with task management, categories, reminders, and progress tracking. Features dark mode, drag-and-drop, and data persistence.",
      image: "✅",
      color: "from-orange-500 to-orange-600",
      features: ["Task Management", "Categories", "Reminders", "Progress Tracking"],
      technologies: ["React", "LocalStorage", "CSS3", "JavaScript"],
      github: "https://github.com/devshahzaibali/todo-app",
      live: "https://devshahzaibali.online/projects"
    },
    {
      title: "Calculator",
      description: "A feature-rich calculator with scientific functions, history tracking, and unit conversions. Includes memory functions and keyboard support.",
      image: "🧮",
      color: "from-gray-500 to-gray-600",
      features: ["Scientific Functions", "History Tracking", "Unit Conversions", "Memory Functions"],
      technologies: ["JavaScript", "CSS3", "HTML5", "Math.js"],
      github: "https://github.com/devshahzaibali/calculator",
      live: "https://devshahzaibali.online/projects"
    },
    {
      title: "Weather Widget",
      description: "A weather application with current conditions, forecasts, location detection, and weather alerts. Features beautiful animations and detailed weather data.",
      image: "🌤️",
      color: "from-cyan-500 to-cyan-600",
      features: ["Current Weather", "Forecasts", "Location Detection", "Weather Alerts"],
      technologies: ["React", "Weather API", "Geolocation", "Chart.js"],
      github: "https://github.com/devshahzaibali/weather-widget",
      live: "https://devshahzaibali.online/projects"
    }
  ];

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6 border border-blue-200 dark:border-blue-800/50 shadow-sm">
            My Work
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Projects</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Here are some of my recent projects showcasing different skills and technologies. Each project demonstrates my expertise in modern web development.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={project.title}
              className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                scale: 1.02
              }}
              onHoverStart={() => setHoveredProject(index)}
              onHoverEnd={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className="relative h-48 sm:h-64 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${project.color} flex items-center justify-center text-6xl sm:text-8xl text-white`}>
                  <span>{project.image}</span>
                </div>
                {/* Overlay with project image */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-xl">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-lg flex items-center justify-center text-4xl sm:text-6xl">
                      {project.image}
                    </div>
                  </div>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-lg sm:text-2xl font-bold mb-2">View Project</div>
                    <div className="text-xs sm:text-sm opacity-90">Click to see details</div>
                  </div>
                </div>
              </div>

              {/* Project content */}
              <div className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-5">
                  {project.description}
                </p>
                  
                {/* Features */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 sm:mb-3">
                    Key Features
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.features.map((feature) => (
                      <span 
                        key={feature}
                        className="px-2 sm:px-3 py-1 text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-400 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Technologies */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 sm:mb-3">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 sm:px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-center transition-colors duration-200 flex items-center justify-center gap-1.5 sm:gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Project
                  </motion.a>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center gap-1.5 sm:gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Code
                  </motion.a>
                </div>
              </div>

              {/* Hover overlay */}
              {hoveredProject === index && (
                <motion.div 
                  className="absolute inset-0 bg-black/5 dark:bg-white/5 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://github.com/devshahzaibali"
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-medium shadow-xl transition-all duration-300 group inline-flex items-center gap-3"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              View All Projects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <motion.span 
              className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0 }}
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;