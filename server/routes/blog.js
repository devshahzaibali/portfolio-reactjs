import express from 'express';

const router = express.Router();

// Sample blog data (in a real app, this would come from MongoDB)
const blogPosts = [
  {
    id: '1',
    title: 'Mastering React Native Performance: Advanced Optimization Techniques',
    slug: 'react-native-performance-optimization',
    excerpt: 'Learn advanced techniques to optimize your React Native apps for better performance, including memory management, bundle optimization, and native module integration.',
    content: `
      <p>Performance optimization in React Native is crucial for creating smooth, responsive mobile applications. In this comprehensive guide, we'll explore advanced techniques that I've learned through my experience at EmporionSoft and working on various client projects.</p>
      
      <h2>1. Memory Management & Leak Prevention</h2>
      <p>One of the most critical aspects of React Native performance is proper memory management...</p>
      
      <h2>2. Bundle Size Optimization</h2>
      <p>Reducing your app's bundle size directly impacts startup time and overall performance...</p>
      
      <h2>3. Native Module Integration</h2>
      <p>Sometimes JavaScript isn't enough, and you need to leverage native code for optimal performance...</p>
    `,
    author: 'Muhammad Iqbal Khan',
    publishedAt: '2024-12-15T10:00:00Z',
    updatedAt: '2024-12-15T10:00:00Z',
    tags: ['React Native', 'Performance', 'Mobile Development', 'Optimization'],
    category: 'Technical',
    readTime: 8,
    featured: true,
    image: '/images/blog/react-native-performance.jpg',
    views: 1250,
    likes: 89
  },
  {
    id: '2',
    title: 'From Flutter to React Native: My Development Journey',
    slug: 'flutter-to-react-native-journey',
    excerpt: 'A personal account of transitioning from Flutter to React Native development, including challenges faced, lessons learned, and why I made the switch.',
    content: `
      <p>When I started my mobile development journey in 10th grade, I chose Flutter as my first framework. The decision was based on Google's backing and the promise of truly cross-platform development...</p>
      
      <h2>Why I Started with Flutter</h2>
      <p>Flutter attracted me because of its single codebase approach and the beautiful UI capabilities...</p>
      
      <h2>The Transition Decision</h2>
      <p>After working with Flutter for several years, I decided to transition to React Native. Here's why...</p>
      
      <h2>Lessons Learned</h2>
      <p>The transition wasn't easy, but it taught me valuable lessons about adaptability in tech...</p>
    `,
    author: 'Muhammad Iqbal Khan',
    publishedAt: '2024-12-10T14:30:00Z',
    updatedAt: '2024-12-10T14:30:00Z',
    tags: ['Flutter', 'React Native', 'Career', 'Personal Journey'],
    category: 'Personal',
    readTime: 6,
    featured: false,
    image: '/images/blog/flutter-to-react-native.jpg',
    views: 892,
    likes: 67
  },
  {
    id: '3',
    title: 'Building Scalable Mobile Apps with Firebase BaaS',
    slug: 'scalable-mobile-apps-firebase',
    excerpt: 'Complete guide to building scalable mobile applications using Firebase Backend as a Service, covering authentication, real-time database, cloud functions, and more.',
    content: `
      <p>Firebase has revolutionized how we build mobile applications by providing a comprehensive Backend as a Service (BaaS) solution...</p>
      
      <h2>Setting Up Firebase Architecture</h2>
      <p>The foundation of any scalable Firebase app starts with proper architecture planning...</p>
      
      <h2>Authentication Strategies</h2>
      <p>Firebase Auth provides multiple authentication methods, but choosing the right one is crucial...</p>
      
      <h2>Real-time Data Management</h2>
      <p>Firestore vs Realtime Database - when to use which and how to structure your data...</p>
    `,
    author: 'Muhammad Iqbal Khan',
    publishedAt: '2024-12-05T09:15:00Z',
    updatedAt: '2024-12-05T09:15:00Z',
    tags: ['Firebase', 'BaaS', 'Mobile Development', 'Scalability'],
    category: 'Technical',
    readTime: 10,
    featured: true,
    image: '/images/blog/firebase-baas.jpg',
    views: 1456,
    likes: 112
  },
  {
    id: '4',
    title: 'The Future of Mobile Development: Trends to Watch in 2025',
    slug: 'mobile-development-trends-2025',
    excerpt: 'Exploring the emerging trends in mobile development for 2025, including AI integration, cross-platform evolution, and new development paradigms.',
    content: `
      <p>As we approach 2025, the mobile development landscape continues to evolve rapidly. Based on my experience in the industry and current market trends...</p>
      
      <h2>AI-Powered Mobile Apps</h2>
      <p>Artificial Intelligence is no longer a luxury feature but becoming a necessity...</p>
      
      <h2>Cross-Platform Evolution</h2>
      <p>The battle between React Native, Flutter, and new frameworks continues...</p>
      
      <h2>Edge Computing in Mobile</h2>
      <p>Processing data closer to the user is becoming increasingly important...</p>
    `,
    author: 'Muhammad Iqbal Khan',
    publishedAt: '2024-12-01T16:45:00Z',
    updatedAt: '2024-12-01T16:45:00Z',
    tags: ['Mobile Development', 'Trends', 'AI', 'Future Tech'],
    category: 'Industry',
    readTime: 7,
    featured: false,
    image: '/images/blog/mobile-trends-2025.jpg',
    views: 743,
    likes: 54
  }
];

// GET /api/blog - Get all blog posts
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      featured, 
      tag,
      page = 1, 
      limit = 6,
      sort = '-publishedAt'
    } = req.query;

    let filteredPosts = [...blogPosts];

    // Apply filters
    if (category) {
      filteredPosts = filteredPosts.filter(post => 
        post.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (featured !== undefined) {
      filteredPosts = filteredPosts.filter(post => 
        post.featured === (featured === 'true')
      );
    }

    if (tag) {
      filteredPosts = filteredPosts.filter(post =>
        post.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
      );
    }

    // Apply sorting
    if (sort === '-publishedAt') {
      filteredPosts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    } else if (sort === '-views') {
      filteredPosts.sort((a, b) => b.views - a.views);
    } else if (sort === '-likes') {
      filteredPosts.sort((a, b) => b.likes - a.likes);
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    res.json({
      success: true,
      posts: paginatedPosts,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(filteredPosts.length / limit),
        total: filteredPosts.length,
        hasNext: endIndex < filteredPosts.length,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get blog posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog posts'
    });
  }
});

// GET /api/blog/featured - Get featured blog posts
router.get('/featured', async (req, res) => {
  try {
    const featuredPosts = blogPosts
      .filter(post => post.featured)
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, 3);

    res.json({
      success: true,
      posts: featuredPosts
    });
  } catch (error) {
    console.error('Get featured posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured posts'
    });
  }
});

// GET /api/blog/categories - Get all categories with post counts
router.get('/categories', async (req, res) => {
  try {
    const categories = blogPosts.reduce((acc, post) => {
      const category = post.category;
      if (!acc[category]) {
        acc[category] = { name: category, count: 0, posts: [] };
      }
      acc[category].count++;
      acc[category].posts.push({
        id: post.id,
        title: post.title,
        slug: post.slug,
        publishedAt: post.publishedAt
      });
      return acc;
    }, {});

    res.json({
      success: true,
      categories: Object.values(categories)
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories'
    });
  }
});

// GET /api/blog/tags - Get all tags with usage counts
router.get('/tags', async (req, res) => {
  try {
    const tagCounts = {};
    
    blogPosts.forEach(post => {
      post.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    const tags = Object.entries(tagCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    res.json({
      success: true,
      tags
    });
  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tags'
    });
  }
});

// GET /api/blog/:slug - Get single blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    const post = blogPosts.find(p => p.slug === req.params.slug);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Increment view count (in a real app, you'd update the database)
    post.views += 1;

    // Get related posts
    const relatedPosts = blogPosts
      .filter(p => 
        p.id !== post.id && 
        (p.category === post.category || 
         p.tags.some(tag => post.tags.includes(tag)))
      )
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, 3);

    res.json({
      success: true,
      post,
      relatedPosts
    });
  } catch (error) {
    console.error('Get blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog post'
    });
  }
});

// POST /api/blog/:slug/like - Like a blog post
router.post('/:slug/like', async (req, res) => {
  try {
    const post = blogPosts.find(p => p.slug === req.params.slug);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    post.likes += 1;

    res.json({
      success: true,
      message: 'Post liked successfully',
      likes: post.likes
    });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to like post'
    });
  }
});

// GET /api/blog/search/:query - Search blog posts
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { page = 1, limit = 6 } = req.query;

    const searchResults = blogPosts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
      post.category.toLowerCase().includes(query.toLowerCase())
    );

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedResults = searchResults.slice(startIndex, endIndex);

    res.json({
      success: true,
      posts: paginatedResults,
      query,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(searchResults.length / limit),
        total: searchResults.length
      }
    });
  } catch (error) {
    console.error('Search blog posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search blog posts'
    });
  }
});

export default router;