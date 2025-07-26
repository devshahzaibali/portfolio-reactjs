import express from 'express';

const router = express.Router();

// Simple in-memory analytics storage (in production, use MongoDB)
let analyticsData = {
  pageViews: {
    total: 15420,
    today: 89,
    thisWeek: 634,
    thisMonth: 2847
  },
  uniqueVisitors: {
    total: 8934,
    today: 67,
    thisWeek: 445,
    thisMonth: 1823
  },
  contactForms: {
    total: 234,
    today: 3,
    thisWeek: 18,
    thisMonth: 67
  },
  projectViews: {
    total: 5672,
    today: 34,
    thisWeek: 289,
    thisMonth: 1245
  },
  blogViews: {
    total: 3456,
    today: 23,
    thisWeek: 167,
    thisMonth: 789
  },
  topPages: [
    { path: '/', views: 4567, title: 'Home' },
    { path: '/projects', views: 2134, title: 'Projects' },
    { path: '/blog', views: 1876, title: 'Blog' },
    { path: '/contact', views: 1234, title: 'Contact' },
    { path: '/skills', views: 987, title: 'Skills' }
  ],
  topProjects: [
    { id: '1', title: 'E-Commerce Mobile App', views: 456 },
    { id: '2', title: 'Social Media Dashboard', views: 389 },
    { id: '3', title: 'Food Delivery App', views: 234 },
    { id: '4', title: 'Fitness Tracker', views: 198 }
  ],
  topBlogPosts: [
    { slug: 'react-native-performance-optimization', title: 'React Native Performance', views: 1250 },
    { slug: 'scalable-mobile-apps-firebase', title: 'Firebase BaaS Guide', views: 1456 },
    { slug: 'flutter-to-react-native-journey', title: 'Flutter to React Native', views: 892 },
    { slug: 'mobile-development-trends-2025', title: 'Mobile Trends 2025', views: 743 }
  ],
  deviceTypes: [
    { type: 'Desktop', count: 6789, percentage: 58.2 },
    { type: 'Mobile', count: 3456, percentage: 29.6 },
    { type: 'Tablet', count: 1423, percentage: 12.2 }
  ],
  browsers: [
    { name: 'Chrome', count: 7890, percentage: 67.8 },
    { name: 'Safari', count: 2345, percentage: 20.1 },
    { name: 'Firefox', count: 1234, percentage: 10.6 },
    { name: 'Edge', count: 198, percentage: 1.7 }
  ],
  countries: [
    { name: 'Pakistan', count: 4567, percentage: 39.2 },
    { name: 'United States', count: 2345, percentage: 20.1 },
    { name: 'United Kingdom', count: 1234, percentage: 10.6 },
    { name: 'Canada', count: 987, percentage: 8.5 },
    { name: 'India', count: 765, percentage: 6.6 },
    { name: 'Others', count: 1770, percentage: 15.2 }
  ],
  trafficSources: [
    { source: 'Direct', count: 5432, percentage: 46.7 },
    { source: 'LinkedIn', count: 2345, percentage: 20.1 },
    { source: 'Google Search', count: 1876, percentage: 16.1 },
    { source: 'GitHub', count: 987, percentage: 8.5 },
    { source: 'Referrals', count: 543, percentage: 4.7 },
    { source: 'Social Media', count: 485, percentage: 4.2 }
  ],
  monthlyData: [
    { month: 'Jan', pageViews: 1234, visitors: 567, contacts: 12 },
    { month: 'Feb', pageViews: 1456, visitors: 634, contacts: 15 },
    { month: 'Mar', pageViews: 1678, visitors: 723, contacts: 18 },
    { month: 'Apr', pageViews: 1345, visitors: 598, contacts: 14 },
    { month: 'May', pageViews: 1567, visitors: 687, contacts: 21 },
    { month: 'Jun', pageViews: 1789, visitors: 798, contacts: 24 },
    { month: 'Jul', pageViews: 1923, visitors: 856, contacts: 28 },
    { month: 'Aug', pageViews: 1654, visitors: 734, contacts: 19 },
    { month: 'Sep', pageViews: 1876, visitors: 823, contacts: 26 },
    { month: 'Oct', pageViews: 2134, visitors: 945, contacts: 32 },
    { month: 'Nov', pageViews: 1987, visitors: 887, contacts: 29 },
    { month: 'Dec', pageViews: 2345, visitors: 1023, contacts: 38 }
  ]
};

// GET /api/analytics/overview - Get analytics overview
router.get('/overview', async (req, res) => {
  try {
    const overview = {
      pageViews: analyticsData.pageViews,
      uniqueVisitors: analyticsData.uniqueVisitors,
      contactForms: analyticsData.contactForms,
      projectViews: analyticsData.projectViews,
      blogViews: analyticsData.blogViews
    };

    res.json({
      success: true,
      data: overview
    });
  } catch (error) {
    console.error('Get analytics overview error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics overview'
    });
  }
});

// GET /api/analytics/traffic - Get traffic analytics
router.get('/traffic', async (req, res) => {
  try {
    const traffic = {
      topPages: analyticsData.topPages,
      deviceTypes: analyticsData.deviceTypes,
      browsers: analyticsData.browsers,
      countries: analyticsData.countries,
      trafficSources: analyticsData.trafficSources
    };

    res.json({
      success: true,
      data: traffic
    });
  } catch (error) {
    console.error('Get traffic analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch traffic analytics'
    });
  }
});

// GET /api/analytics/content - Get content performance analytics
router.get('/content', async (req, res) => {
  try {
    const content = {
      topProjects: analyticsData.topProjects,
      topBlogPosts: analyticsData.topBlogPosts,
      projectViews: analyticsData.projectViews,
      blogViews: analyticsData.blogViews
    };

    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Get content analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch content analytics'
    });
  }
});

// GET /api/analytics/trends - Get trending data
router.get('/trends', async (req, res) => {
  try {
    const trends = {
      monthlyData: analyticsData.monthlyData,
      growth: {
        pageViews: '+23.5%',
        visitors: '+18.7%',
        contacts: '+45.2%',
        engagement: '+12.8%'
      }
    };

    res.json({
      success: true,
      data: trends
    });
  } catch (error) {
    console.error('Get trends analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trends analytics'
    });
  }
});

// POST /api/analytics/track - Track page view or event
router.post('/track', async (req, res) => {
  try {
    const { 
      type, 
      path, 
      title, 
      userAgent, 
      referrer,
      country,
      device 
    } = req.body;

    // In a real app, you'd save this to MongoDB
    // For now, just increment counters
    if (type === 'pageview') {
      analyticsData.pageViews.total += 1;
      analyticsData.pageViews.today += 1;
      analyticsData.uniqueVisitors.total += 1;
      analyticsData.uniqueVisitors.today += 1;

      // Update top pages
      const existingPage = analyticsData.topPages.find(p => p.path === path);
      if (existingPage) {
        existingPage.views += 1;
      } else if (analyticsData.topPages.length < 10) {
        analyticsData.topPages.push({ path, views: 1, title });
      }
    }

    res.json({
      success: true,
      message: 'Event tracked successfully'
    });
  } catch (error) {
    console.error('Track analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to track event'
    });
  }
});

// GET /api/analytics/realtime - Get real-time analytics
router.get('/realtime', async (req, res) => {
  try {
    // Simulate real-time data
    const realtime = {
      activeUsers: Math.floor(Math.random() * 50) + 10,
      currentPageViews: Math.floor(Math.random() * 20) + 5,
      topActivePages: [
        { path: '/', users: Math.floor(Math.random() * 15) + 3 },
        { path: '/projects', users: Math.floor(Math.random() * 10) + 2 },
        { path: '/blog', users: Math.floor(Math.random() * 8) + 1 },
        { path: '/contact', users: Math.floor(Math.random() * 5) + 1 }
      ],
      recentEvents: [
        { type: 'pageview', path: '/projects', timestamp: new Date() },
        { type: 'contact', path: '/contact', timestamp: new Date(Date.now() - 60000) },
        { type: 'pageview', path: '/blog', timestamp: new Date(Date.now() - 120000) }
      ]
    };

    res.json({
      success: true,
      data: realtime
    });
  } catch (error) {
    console.error('Get realtime analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch realtime analytics'
    });
  }
});

export default router;