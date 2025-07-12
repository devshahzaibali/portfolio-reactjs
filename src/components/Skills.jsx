import { motion } from 'framer-motion';

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (custom) => ({
      width: `${custom}%`,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        delay: 0.5
      }
    })
  };

  const skills = [
    { name: 'React', icon: '⚛️', level: 90, color: 'from-cyan-500 to-blue-600' },
    { name: 'Tailwind CSS', icon: '🎨', level: 85, color: 'from-emerald-500 to-teal-600' },
    { name: 'JavaScript', icon: '💻', level: 88, color: 'from-yellow-400 to-amber-500' },
    { name: 'TypeScript', icon: '📘', level: 80, color: 'from-blue-500 to-indigo-600' },
    { name: 'Node.js', icon: '🟢', level: 82, color: 'from-green-500 to-lime-600' },
    { name: 'Python', icon: '🐍', level: 75, color: 'from-blue-400 to-sky-600' },
    { name: 'Next.js', icon: '⏭️', level: 85, color: 'from-gray-500 to-gray-800' },
    { name: 'GraphQL', icon: '📊', level: 78, color: 'from-pink-500 to-rose-600' },
    { name: 'MongoDB', icon: '🍃', level: 80, color: 'from-green-400 to-emerald-600' },
    { name: 'Docker', icon: '🐳', level: 75, color: 'from-blue-400 to-sky-600' },
    { name: 'AWS', icon: '☁️', level: 70, color: 'from-amber-500 to-orange-600' },
    { name: 'Figma', icon: '✏️', level: 85, color: 'from-purple-500 to-fuchsia-600' }
  ];

  return (
    <section id="skills" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
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
            Technical Proficiency
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            My <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Skills</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I've worked with a wide range of technologies in web development. Here are the tools I'm most proficient with.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skills.map((skill, index) => (
            <motion.div 
              key={skill.name}
              className="group relative bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-600"
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                scale: 1.03,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }}
              custom={index}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl overflow-hidden z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-600/10 dark:to-purple-600/10"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{skill.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {skill.name}
                  </h3>
                </div>
                
                <div className="mb-2 flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Proficiency</span>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{skill.level}%</span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 overflow-hidden">
                  <motion.div 
                    className={`h-2.5 rounded-full bg-gradient-to-r ${skill.color}`}
                    variants={progressVariants}
                    custom={skill.level}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  />
                </div>
                
                <div className="mt-6 flex justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Beginner</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Expert</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 text-sm font-medium border border-blue-100 dark:border-gray-600">
            <span className="mr-2">🚀</span>
            Currently learning: Three.js & WebGL
            <span className="ml-2 w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;