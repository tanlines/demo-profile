import React, { useState, useEffect, useRef } from 'react';
import { Box, useTheme } from '@mui/material';

function FadeScrollSection({ children, height = '100vh', fadeInThreshold = 0, fadeOutThreshold = 0.95, color1 = "rgb(151, 23, 215)", color2 = "rgb(204, 9, 172)", sectionNumber = null }) {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [opacity, setOpacity] = useState(sectionNumber !== 1 ? 0 : 1);
  const [transform, setTransform] = useState('translateY(20px)');
  const [gradientAngle, setGradientAngle] = useState(45);
  const [previousSectionsHeight, setPreviousSectionsHeight] = useState(0);
  const sectionRef = useRef(null);

  // Calculate heights of previous scroll sections
  useEffect(() => {
    if (sectionNumber === 1) return;

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

  // Animate gradient angle over time
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientAngle(prev => (prev + 2) % 360);
    }, 20); // Update every 20ms for faster animation

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollPosition = window.scrollY;
      
      // Calculate progress within this section
      const sectionHeightPx = window.innerHeight * 1.5; // 150vh
      const adjustedScrollPosition = sectionNumber !== 1 ? scrollPosition - previousSectionsHeight : scrollPosition;
      const progress = Math.max(0, Math.min(1, adjustedScrollPosition / sectionHeightPx));
      // Content is immediately visible when section starts
      if (progress >= fadeInThreshold && scrollPosition >= previousSectionsHeight
      )  {
        // Fade out effect only
        if (progress > fadeOutThreshold) {
          const fadeOutProgress = Math.max(0, (1 - progress) / (1 - fadeOutThreshold));
          setOpacity(fadeOutProgress);
          setTransform(`translateY(${20 - (fadeOutProgress * 20)}px)`);
          if (fadeOutProgress === 0) {
            setIsVisible(false);
          }
        } else {
          // Keep content fully visible
          setOpacity(1);
          setTransform('translateY(0px)');
          setIsVisible(true);
        }
      } else {
        // Before section starts, content is hidden
        setOpacity(0);
        setTransform('translateY(20px)');
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fadeInThreshold, fadeOutThreshold, previousSectionsHeight]);

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
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundImage: `linear-gradient(${gradientAngle}deg, ${color1} 30%, ${color2} 90%)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: opacity,
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
        />

        {/* Content */}
        <Box
          sx={{
            position: 'relative',
            opacity: opacity,
            transform: transform,
            transition: 'all 0.6s ease-in-out',
            pointerEvents: isVisible ? 'auto' : 'none',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default FadeScrollSection; 