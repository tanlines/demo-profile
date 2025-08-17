import React from 'react';
import { Box, useTheme } from '@mui/material';
import WhyWebsiteSection from './WhyWebsiteSection';
import ContactSection from './ContactSection';

const sections = [
  {
    component: WhyWebsiteSection,
    gradient: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"
  },
  {
    component: ContactSection,
    gradient: "linear-gradient(45deg, #E91E63 30%, #9C27B0 90%)"
  }
];

function ScrollSections() {
  const theme = useTheme();



  return (
    <Box sx={{ position: 'relative' }}>
      {/* Progress Bar */}

      {sections.map((section, index) => (
        <Box
          key={index}
          sx={{
            height: '150vh', // All sections are now 150vh for longer scrolling
            position: 'relative',
            overflow: 'hidden'
          }}
        />
      ))}

      {/* Fixed Content Container */}
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
        {sections.map((section, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              opacity: 1,
              transition: 'opacity 0.5s ease-in-out',
              pointerEvents: 'none'
            }}
          >
            {/* Background Image with Gradient Fallback */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundImage: section.image ? `url(${section.image})` : section.gradient,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
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
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'auto',
                overflow: 'hidden',
                boxSizing: 'border-box'
              }}
            >
              <section.component />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ScrollSections; 
