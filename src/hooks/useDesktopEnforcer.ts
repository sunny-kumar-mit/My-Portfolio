import { useState, useEffect } from 'react';

export const useDesktopEnforcer = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            // Enhanced mobile detection
            // We check screen width which doesn't change when we modify the viewport meta tag
            const isMobileDevice =
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                (window.screen.width < 768 || window.screen.availWidth < 768);

            setIsMobile(isMobileDevice);

            if (isMobileDevice) {
                const hasSeenModal = sessionStorage.getItem('desktop_mode_modal_seen');
                if (!hasSeenModal) {
                    setShowModal(true);
                }
            } else {
                setShowModal(false);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        window.addEventListener('orientationchange', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('orientationchange', checkMobile);
        };
    }, []);

    // Effect to handle Viewport changes based on state
    useEffect(() => {
        const updateViewport = () => {
            let viewport = document.querySelector('meta[name="viewport"]');
            if (!viewport) {
                viewport = document.createElement('meta');
                viewport.setAttribute('name', 'viewport');
                document.head.appendChild(viewport);
            }

            if (isMobile && !showModal) {
                // FORCE DESKTOP VIEW (Only after modal is dismissed)
                const width = window.innerWidth; // Current window width (might be small)
                const minimalDesktopWidth = 1200;

                // We use screen.width for calculation to ensure stable scaling
                const screenWidth = window.screen.width;

                viewport.setAttribute('content', `width=${minimalDesktopWidth}, initial-scale=${screenWidth / minimalDesktopWidth}, maximum-scale=1.0, user-scalable=yes`);
                document.body.classList.add('force-desktop');
            } else {
                // SHOW NORMAL MOBILE VIEW (While modal is open OR if it's desktop)
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
                document.body.classList.remove('force-desktop');
            }
        };

        updateViewport();
    }, [isMobile, showModal]);

    const dismissModal = () => {
        sessionStorage.setItem('desktop_mode_modal_seen', 'true');
        setShowModal(false);
    };

    return { isMobile, showModal, dismissModal };
};
