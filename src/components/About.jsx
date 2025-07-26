import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaCode, 
  FaMobile, 
  FaReact, 
  FaGraduationCap, 
  FaBriefcase,
  FaAward,
  FaUsers,
  FaRocket
} from 'react-icons/fa';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { icon: FaCode, label: 'Projects Completed', value: '50+', color: 'text-neon-blue' },
    { icon: FaMobile, label: 'Apps Developed', value: '25+', color: 'text-accent-500' },
    { icon: FaUsers, label: 'Happy Clients', value: '30+', color: 'text-neon-green' },
    { icon: FaAward, label: 'Years Experience', value: '3+', color: 'text-neon-purple' },
  ];

  const journey = [
    {
      year: '2021',
      title: 'Started Programming Journey',
      description: 'Began learning programming in 10th grade with Dart and C++',
      icon: FaCode,
    },
    {
      year: '2022',
      title: 'Flutter Development',
      description: 'Mastered Flutter framework and built several mobile applications',
      icon: FaMobile,
    },
    {
      year: '2023',
      title: 'React Native Transition',
      description: 'Switched to React Native to align with modern industry demands',
      icon: FaReact,
    },
    {
      year: '2024',
      title: 'Professional Developer',
      description: 'Joined EmporionSoft as Junior Software Engineer, leading projects',
      icon: FaBriefcase,
    },
  ];

  return (
    <section id="about" className="section-padding bg-dark-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 via-transparent to-accent-900/10" />
      
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2
              className="text-5xl md:text-7xl font-bold text-gradient mb-6 font-display"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              About Me
            </motion.h2>
            <motion.p
              className="text-xl text-gray-400 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Passionate Mobile App Developer specializing in React Native, with a journey from Flutter to modern cross-platform development
            </motion.p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            {/* Personal Story */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="glass p-8 rounded-2xl border border-primary-500/20">
                <h3 className="text-3xl font-bold text-white mb-6 font-display">
                  My Story
                </h3>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    I am <span className="text-gradient font-semibold">Muhammad Iqbal Khan</span>, 
                    a professional Mobile App Developer specializing in React Native. Currently working 
                    as a Junior Software Engineer at EmporionSoft Pvt Ltd, I have successfully 
                    transitioned from Flutter to React Native to stay aligned with modern industry demands.
                  </p>
                  <p>
                    My programming journey began in 10th grade with Dart and C++, later mastering 
                    Flutter before making the strategic switch to React Native. Through working on 
                    real-world projects, I've deepened my expertise in mobile app development and 
                    built a strong portfolio.
                  </p>
                  <p>
                    Beyond development, I have experience in digital marketing, particularly SEO, 
                    to support online business growth. My strengths include team leadership, 
                    effective communication, and event coordination. I'm passionate about building 
                    clean, scalable apps and collaborating with forward-thinking teams.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Skills & Expertise */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="glass p-8 rounded-2xl border border-accent-500/20">
                <h3 className="text-3xl font-bold text-white mb-6 font-display">
                  Core Expertise
                </h3>
                <div className="space-y-4">
                  {[
                    'React Native Development',
                    'State Management (Redux, Context API)',
                    'Firebase BaaS Integration',
                    'RESTful API Integration',
                    'Performance Optimization',
                    'App Store Deployment',
                    'Digital Marketing & SEO',
                    'Team Leadership'
                  ].map((skill, index) => (
                    <motion.div
                      key={skill}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
                      <span className="text-gray-300">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass p-6 rounded-xl border border-primary-500/20 text-center group hover:border-primary-400/40 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
              >
                <stat.icon className={`text-4xl ${stat.color} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`} />
                <div className="text-3xl font-bold text-white mb-2 font-display">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Journey Timeline */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <h3 className="text-4xl font-bold text-center text-gradient mb-12 font-display">
              My Journey
            </h3>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-500 to-accent-500 rounded-full" />
              
              <div className="space-y-12">
                {journey.map((item, index) => (
                  <motion.div
                    key={item.year}
                    className={`flex items-center ${
                      index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1.8 + index * 0.2, duration: 0.8 }}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                      <div className="glass p-6 rounded-xl border border-primary-500/20 hover:border-primary-400/40 transition-all duration-300">
                        <div className="text-2xl font-bold text-primary-400 mb-2 font-display">
                          {item.year}
                        </div>
                        <h4 className="text-xl font-semibold text-white mb-3">
                          {item.title}
                        </h4>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                    </div>
                    
                    {/* Timeline Node */}
                    <div className="relative z-10 w-16 h-16 bg-dark-950 border-4 border-primary-500 rounded-full flex items-center justify-center">
                      <item.icon className="text-primary-400 text-xl" />
                    </div>
                    
                    <div className="w-1/2" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2.4, duration: 0.8 }}
          >
            <div className="glass p-8 rounded-2xl border border-primary-500/20 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4 font-display">
                Let's Build Something Amazing Together
              </h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                I'm passionate about creating impactful mobile experiences and always excited 
                to collaborate with forward-thinking teams. Let's connect and turn your ideas into reality.
              </p>
              <motion.a
                href="#contact"
                className="btn-cyber inline-flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaRocket />
                <span>Start a Project</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;