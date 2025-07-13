import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Performance monitoring
const startTime = performance.now();

// Lazy load components for better performance
const root = ReactDOM.createRoot(document.getElementById('root'))

// Performance optimization: Use React.StrictMode in development only
const AppWrapper = () => {
  if (import.meta.env.DEV) {
    return (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  }
  return <App />
}

root.render(<AppWrapper />)

// Performance monitoring
window.addEventListener('load', () => {
  const loadTime = performance.now() - startTime;
  console.log(`🚀 App loaded in ${loadTime.toFixed(2)}ms`);
  
  // Report to analytics if available
  if (window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: 'load',
      value: Math.round(loadTime)
    });
  }
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
