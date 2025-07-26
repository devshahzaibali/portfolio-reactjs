import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Track page view
export const trackPageView = async (path, title) => {
  try {
    await axios.post(`${API_URL}/analytics/track`, {
      type: 'pageview',
      path,
      title,
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
};

// Track custom event
export const trackEvent = async (eventName, properties = {}) => {
  try {
    await axios.post(`${API_URL}/analytics/track`, {
      type: 'event',
      eventName,
      properties,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};

// Track contact form submission
export const trackContactForm = async (formData) => {
  try {
    await trackEvent('contact_form_submit', {
      projectType: formData.projectType,
      budget: formData.budget,
      timeline: formData.timeline,
    });
  } catch (error) {
    console.error('Failed to track contact form:', error);
  }
};

// Track project view
export const trackProjectView = async (projectId, projectTitle) => {
  try {
    await trackEvent('project_view', {
      projectId,
      projectTitle,
    });
  } catch (error) {
    console.error('Failed to track project view:', error);
  }
};

// Track blog post view
export const trackBlogView = async (slug, title) => {
  try {
    await trackEvent('blog_view', {
      slug,
      title,
    });
  } catch (error) {
    console.error('Failed to track blog view:', error);
  }
};

// Get device info
export const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;
  let device = 'Unknown';
  
  if (/Mobile|Android|iPhone|iPad/.test(userAgent)) {
    device = 'Mobile';
  } else if (/Tablet|iPad/.test(userAgent)) {
    device = 'Tablet';
  } else {
    device = 'Desktop';
  }
  
  return {
    device,
    userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenResolution: `${screen.width}x${screen.height}`,
    viewportSize: `${window.innerWidth}x${window.innerHeight}`,
  };
};

// Get browser info
export const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  let browser = 'Unknown';
  
  if (userAgent.includes('Chrome')) {
    browser = 'Chrome';
  } else if (userAgent.includes('Firefox')) {
    browser = 'Firefox';
  } else if (userAgent.includes('Safari')) {
    browser = 'Safari';
  } else if (userAgent.includes('Edge')) {
    browser = 'Edge';
  }
  
  return browser;
};

// Track scroll depth
export const trackScrollDepth = (depth) => {
  const milestones = [25, 50, 75, 100];
  const milestone = milestones.find(m => depth >= m && depth < m + 5);
  
  if (milestone) {
    trackEvent('scroll_depth', { depth: milestone });
  }
};

// Track time on page
let startTime = Date.now();

export const trackTimeOnPage = () => {
  const timeSpent = Math.floor((Date.now() - startTime) / 1000);
  
  if (timeSpent > 10) { // Only track if user spent more than 10 seconds
    trackEvent('time_on_page', { 
      seconds: timeSpent,
      path: window.location.pathname 
    });
  }
};

// Initialize analytics
export const initAnalytics = () => {
  // Track page load
  trackPageView(window.location.pathname, document.title);
  
  // Track scroll depth
  let maxScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      trackScrollDepth(scrollPercent);
    }
  });
  
  // Track time on page when leaving
  window.addEventListener('beforeunload', trackTimeOnPage);
  
  // Track visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      trackTimeOnPage();
    } else {
      startTime = Date.now(); // Reset timer when page becomes visible again
    }
  });
};