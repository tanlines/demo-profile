import React, { useState, useEffect, useRef } from 'react';
import { Box, useTheme } from '@mui/material';

function FadeScrollSection({ children, height = '100vh', fadeInThreshold = 0, fadeOutThreshold = 0.95, color1 = "rgb(151, 23, 215)", color2 = "rgb(204, 9, 172)", sectionNumber = null }) {
    const theme = useTheme();

    // Calculate initial values once
    const isFirstSection = sectionNumber === 1;
    const initialOpacity = isFirstSection ? 1 : 0;
    const initialTransform = isFirstSection ? 'translateY(0px)' : 'translateY(20px)';

    const [previousSectionsHeight, setPreviousSectionsHeight] = useState(0);
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const backgroundRef = useRef(null);
    const progressRef = useRef(null);
    const [isActive, setIsActive] = useState(isFirstSection);
    const isActiveRef = useRef(isFirstSection);

    // Calculate heights of previous scroll sections
    useEffect(() => {
        if (isFirstSection) return;

        const calculatePreviousSectionsHeight = () => {
            let totalHeight = 0;

            // Get heights of all scroll sections with numbers less than current section
            for (let i = 1; i < sectionNumber; i++) {
                const scrollSection = document.querySelector(`[data-scroll-section-${i}]`);
                if (scrollSection) {
                    totalHeight += scrollSection.offsetHeight;
                }
            }
            setPreviousSectionsHeight(totalHeight);
        };

        // Initial calculation
        calculatePreviousSectionsHeight();

        // Re-calculate on window resize
        window.addEventListener('resize', calculatePreviousSectionsHeight);

        // Use ResizeObserver for more accurate measurements
        const resizeObserver = new ResizeObserver(calculatePreviousSectionsHeight);

        // Observe all previous scroll sections
        for (let i = 1; i < sectionNumber; i++) {
            const scrollSection = document.querySelector(`[data-scroll-section-${i}]`);
            if (scrollSection) {
                resizeObserver.observe(scrollSection);
            }
        }

        return () => {
            window.removeEventListener('resize', calculatePreviousSectionsHeight);
            resizeObserver.disconnect();
        };
    }, [sectionNumber]);



    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    if (!sectionRef.current) return;

                    const scrollPosition = window.scrollY;

                    // Calculate progress within this section
                    const sectionHeightPx = window.innerHeight * 1.5; // 150vh
                    const adjustedScrollPosition = isFirstSection ? scrollPosition : scrollPosition - previousSectionsHeight;
                    const currentProgress = Math.max(0, Math.min(1, adjustedScrollPosition / sectionHeightPx));

                    // Update progress bar using CSS transforms for better performance
                    if (progressRef.current) {
                        const progressValue = Math.max(0, Math.min(1, currentProgress * 1.2));
                        progressRef.current.style.setProperty('--progress-transform', `scaleX(${progressValue})`);
                    }

                    const withinView = currentProgress >= fadeInThreshold && (isFirstSection || scrollPosition >= previousSectionsHeight);
                    if (isActiveRef.current !== withinView) {
                        isActiveRef.current = withinView;
                        setIsActive(withinView);
                    }

                    // Content is immediately visible when section starts
                    if (withinView) {
                        // Fade out effect only
                        if (currentProgress > fadeOutThreshold) {
                            const fadeOutProgress = Math.max(0, (1 - currentProgress) / (1 - fadeOutThreshold));

                            // Apply CSS transforms directly
                            if (contentRef.current) {
                                contentRef.current.style.setProperty('--opacity', fadeOutProgress);
                                contentRef.current.style.setProperty('--transform', `translateY(${20 - (fadeOutProgress * 20)}px)`);
                                contentRef.current.style.setProperty('--pointer-events', 'none');
                            }
                            if (backgroundRef.current) {
                                backgroundRef.current.style.setProperty('--opacity', fadeOutProgress);
                            }
                            if (progressRef.current) {
                                progressRef.current.style.setProperty('--opacity', fadeOutProgress);
                            }
                        } else {
                            // Keep content fully visible
                            if (contentRef.current) {
                                contentRef.current.style.setProperty('--opacity', 1);
                                contentRef.current.style.setProperty('--transform', 'translateY(0px)');
                                contentRef.current.style.setProperty('--pointer-events', 'auto');
                            }
                            if (backgroundRef.current) {
                                backgroundRef.current.style.setProperty('--opacity', 1);
                            }
                            if (progressRef.current) {
                                progressRef.current.style.setProperty('--opacity', 1);
                            }
                        }
                    } else {
                        // Before section starts, content is hidden
                        if (contentRef.current) {
                            contentRef.current.style.setProperty('--opacity', 0);
                            contentRef.current.style.setProperty('--transform', 'translateY(20px)');
                            contentRef.current.style.setProperty('--pointer-events', 'none');
                        }
                        if (backgroundRef.current) {
                            backgroundRef.current.style.setProperty('--opacity', 0);
                        }
                        if (progressRef.current) {
                            progressRef.current.style.setProperty('--opacity', 0);
                        }
                    }

                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [fadeInThreshold, fadeOutThreshold, previousSectionsHeight]);

    const enhancedChildren = React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, { scrollActive: isActive });
    });

    return (
        <Box sx={{ position: 'relative' }} {...{ [`data-scroll-section-${sectionNumber}`]: true }}>
            {/* Scroll spacer */}
            <Box
                ref={sectionRef}
                sx={{
                    height: height,
                    position: 'relative',
                    overflow: 'hidden'
                }}
            />

            {/* Fixed content container */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                    zIndex: 1
                }}
            >
                {/* Background with gradient */}
                <Box
                    ref={backgroundRef}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundImage: `linear-gradient(45deg, ${color1} 30%, ${color2} 90%)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 'var(--opacity, 1)',
                        transition: 'opacity 0.6s ease-in-out',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: theme.palette.mode === 'dark'
                                ? 'rgba(0, 0, 0, 0.7)'
                                : 'rgba(0, 0, 0, 0.5)'
                        }
                    }}
                    style={{
                        '--opacity': initialOpacity
                    }}
                />

                {/* Content */}
                <Box
                    ref={contentRef}
                    sx={{
                        position: 'relative',
                        opacity: 'var(--opacity, 1)',
                        transform: 'var(--transform, translateY(0px))',
                        transition: 'all 0.6s ease-in-out',
                        pointerEvents: 'var(--pointer-events, auto)',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2
                    }}
                    style={{
                        '--opacity': initialOpacity,
                        '--transform': initialTransform,
                        '--pointer-events': isFirstSection ? 'auto' : 'none'
                    }}
                >
                    {enhancedChildren}
                </Box>

                {/* Progress Bar */}
                <Box
                    ref={progressRef}
                    sx={{
                        position: 'absolute',
                        opacity: 'var(--opacity, 1)',
                        bottom: 40,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '60%',
                        height: '3px',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        zIndex: 3,
                        borderRadius: '2px',
                        overflow: 'hidden'
                    }}
                    style={{
                        '--opacity': initialOpacity
                    }}
                >
                    <Box
                        sx={{
                            height: '100%',
                            width: '100%',
                            background: "white",
                            transform: 'var(--progress-transform, scaleX(0))',
                            transformOrigin: 'left',
                            transition: 'transform 0.3s ease-out',
                            zIndex: 4,
                            borderRadius: '2px'
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default FadeScrollSection; 