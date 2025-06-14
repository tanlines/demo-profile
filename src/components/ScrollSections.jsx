import { Box, Typography, useTheme } from '@mui/material';
import { useEffect, useState, useRef } from 'react';

const sections = [
  {
    title: "Website details",
    image: "",
    gradient: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    text: [
      "Developed using Cursor IDE with AI-assisted coding",
      "Static frontend written in React.js and built with Vite",
      "MUI for UI components and Motion for animations",
      "Hosted on Cloudflare Pages for global performance and CI/CD",
    ]
  },
//   {
//     title: "Backend Development",
//     image: "",
//     gradient: "linear-gradient(45deg, #FF9800 30%, #FFC107 90%)",
//     text: [
//       "Designing robust server architectures",
//       "Building scalable APIs and services",
//       "Implementing secure authentication",
//       "Optimizing database performance"
//     ]
//   },
//   {
//     title: "Problem Solving",
//     image: "",
//     gradient: "linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)",
//     text: [
//       "Breaking down complex challenges",
//       "Finding elegant solutions",
//       "Writing clean, maintainable code",
//       "Collaborating with teams effectively"
//     ]
//   }
];

function ScrollSections() {
  const theme = useTheme();
  const [activeSection, setActiveSection] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
  const sectionRefs = useRef(sections.map(() => null));

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sectionHeight = window.innerHeight;
      const totalSectionHeight = sectionHeight; // 100vh
      
      // Find which section is currently in view
      const currentSection = Math.floor(scrollPosition / totalSectionHeight);
      
      if (currentSection >= 0 && currentSection < sections.length) {
        setActiveSection(currentSection);

        // Calculate progress within the current section
        const sectionStart = currentSection * totalSectionHeight;
        const progress = (scrollPosition - sectionStart) / totalSectionHeight;
        
        // Clamp progress between 0 and 1
        const clampedProgress = Math.max(0, Math.min(1, progress));
        setSectionProgress(clampedProgress);
        
        // Adjust the timing of text appearance
        const textProgress = Math.min(
          Math.max((clampedProgress - 0.1) / 0.3, 0), // Start at 10%, complete by 40%
          1
        );
        
        const linesToShow = Math.floor(textProgress * sections[currentSection].text.length);
        setVisibleLines(Math.min(linesToShow, sections[currentSection].text.length));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Progress Bar */}
      <Box
        sx={{
          position: 'fixed',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '2px',
          height: '200px',
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.2)' 
            : 'rgba(0, 0, 0, 0.2)',
          zIndex: 2,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${sectionProgress * 100}%`,
            backgroundColor: theme.palette.mode === 'dark' 
              ? theme.palette.primary.light 
              : theme.palette.primary.main,
            transition: 'height 0.1s ease-out'
          }
        }}
      />

      {sections.map((section, index) => (
        <Box
          key={section.title}
          ref={el => sectionRefs.current[index] = el}
          sx={{
            height: index === sections.length - 1 ? '150vh' : '100vh', // Half height for all sections
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
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
        }}
      >
        {sections.map((section, index) => (
          <Box
            key={section.title}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: activeSection === index ? 1 : 0,
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
                right: 0,
                bottom: 0,
                backgroundImage: section.image ? `url(${section.image})` : section.gradient,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
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
                color: theme.palette.mode === 'dark' 
                  ? theme.palette.common.white 
                  : theme.palette.common.white,
                textAlign: 'center',
                maxWidth: '800px',
                mx: 'auto',
                px: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                pointerEvents: 'auto'
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  mb: 4,
                  opacity: 1,
                  transform: 'translateY(0)',
                  transition: 'all 0.5s ease-in-out',
                  color: theme.palette.mode === 'dark' 
                    ? theme.palette.grey[100] 
                    : theme.palette.grey[50]
                }}
              >
                {section.title}
              </Typography>

              <Box>
                {section.text.map((line, lineIndex) => (
                  <Typography
                    key={line}
                    variant="h5"
                    sx={{
                      mb: 2,
                      opacity: lineIndex < visibleLines ? 1 : 0,
                      transform: `translateY(${lineIndex < visibleLines ? '0' : '20px'})`,
                      transition: 'all 0.6s ease-in-out',
                      transitionDelay: `${lineIndex * 0.1}s`,
                      color: theme.palette.mode === 'dark' 
                        ? theme.palette.grey[100] 
                        : theme.palette.grey[50]
                    }}
                  >
                    {line}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ScrollSections; 
