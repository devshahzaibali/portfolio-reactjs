import { motion } from 'framer-motion';
import { useState } from 'react';

const Blog = () => {
  const [hoveredPost, setHoveredPost] = useState(null);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
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

  const blogPosts = [
    {
      title: 'Mastering React Hooks in 2024',
      excerpt: 'A deep dive into modern React patterns with hooks, covering useState, useEffect, useReducer, and custom hooks with practical examples.',
      category: 'React',
      date: 'May 15, 2024',
      readTime: '8 min read',
      image: '⚛️',
      tags: ['React', 'Hooks', 'Frontend'],
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'The Complete Guide to Tailwind CSS',
      excerpt: 'Learn how to build beautiful, responsive interfaces faster than ever with Tailwind CSS, including advanced techniques and plugin development.',
      category: 'CSS',
      date: 'May 10, 2024',
      readTime: '10 min read',
      image: '🎨',
      tags: ['CSS', 'Tailwind', 'Design'],
      color: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Next.js 14: What You Need to Know',
      excerpt: 'Explore the latest features in Next.js 14 including Server Actions, Partial Prerendering, and enhanced developer experience.',
      category: 'Next.js',
      date: 'May 5, 2024',
      readTime: '12 min read',
      image: '⏭️',
      tags: ['Next.js', 'React', 'Performance'],
      color: 'from-gray-500 to-gray-800'
    },
    {
      title: 'State Management in 2024',
      excerpt: 'Comparing modern state management solutions including Zustand, Jotai, and the new React Context patterns for optimal performance.',
      category: 'JavaScript',
      date: 'April 28, 2024',
      readTime: '15 min read',
      image: '🧠',
      tags: ['State', 'React', 'Performance'],
      color: 'from-purple-500 to-fuchsia-600'
    }
  ];

  return (
    <section id="blog" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6 border border-blue-200 dark:border-blue-800/50 shadow-sm">
            Insights & Tutorials
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Latest <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Articles</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Sharing my knowledge and experiences with modern web development, design patterns, and emerging technologies.
          </p>
        </motion.div>

        {/* Blog Posts */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {blogPosts.map((post, index) => (
            <motion.article 
              key={post.title}
              className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                scale: 1.02
              }}
              onHoverStart={() => setHoveredPost(index)}
              onHoverEnd={() => setHoveredPost(null)}
            >
              {/* Post image/icon */}
              <div className={`h-32 sm:h-40 bg-gradient-to-r ${post.color} flex items-center justify-center text-4xl sm:text-6xl text-white`}>
                {post.image}
              </div>

              {/* Post content */}
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="px-2 sm:px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-medium">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {post.date} • {post.readTime}
                  </span>
                </div>
                
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-5">
                  {post.excerpt}
                </p>
                
                {/* Tags */}
                <div className="mb-4 sm:mb-6">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 sm:px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Read More button */}
                <motion.button
                  className="flex items-center gap-1.5 sm:gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200 text-sm sm:text-base"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read full article
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>

              {/* Hover overlay */}
              {hoveredPost === index && (
                <motion.div 
                  className="absolute inset-0 bg-black/5 dark:bg-white/5 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.article>
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
          <motion.button
            className="relative overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-medium shadow-xl transition-all duration-300 group"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              View All Articles
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <motion.span 
              className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;