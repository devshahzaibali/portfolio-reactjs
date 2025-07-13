import { useState, useEffect } from 'react';

export const useResponsive = () => {
    const [screenSize, setScreenSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });

    const [breakpoint, setBreakpoint] = useState('');

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            setScreenSize({ width, height });

            // Determine breakpoint
            if (width < 640) {
                setBreakpoint('xs');
            } else if (width < 768) {
                setBreakpoint('sm');
            } else if (width < 1024) {
                setBreakpoint('md');
            } else if (width < 1280) {
                setBreakpoint('lg');
            } else if (width < 1536) {
                setBreakpoint('xl');
            } else {
                setBreakpoint('2xl');
            }
        };

        // Set initial size
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = breakpoint === 'xs' || breakpoint === 'sm';
    const isTablet = breakpoint === 'md';
    const isDesktop = breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl';
    const isLargeScreen = breakpoint === 'xl' || breakpoint === '2xl';

    return {
        screenSize,
        breakpoint,
        isMobile,
        isTablet,
        isDesktop,
        isLargeScreen,
    };
};

export const useViewport = () => {
    const [viewport, setViewport] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });

    useEffect(() => {
        const handleResize = () => {
            setViewport({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return viewport;
};

export const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.pageYOffset);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return scrollPosition;
};

export const useIntersectionObserver = (options = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [ref, setRef] = useState(null);

    useEffect(() => {
        if (!ref) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        }, {
            threshold: 0.1,
            rootMargin: '-50px',
            ...options,
        });

        observer.observe(ref);

        return () => {
            if (ref) {
                observer.unobserve(ref);
            }
        };
    }, [ref, options]);

    return [setRef, isIntersecting];
};