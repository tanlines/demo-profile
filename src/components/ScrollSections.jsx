import { Box, Typography, useTheme, IconButton, TextField, Button, Alert } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';

const sections = [
  {
    title: "Why I made this website",
    image: "",
    gradient: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    text: [
      "This website is a combination of my interest in web development, tool for self-reflection and desire for a relationship",
      "If nothing else, I hope you at least find my take of a dating profile interesting",
      "I wish you all the best and hope you find what you're looking for"
    ]
  },
  {
    title: "Contact Me",
    image: "",
    gradient: "linear-gradient(45deg, #E91E63 30%, #9C27B0 90%)",
    text: [
      "If you're interested in getting to know me better",
      "Feel free to reach out on Instagram",
      "Or leave an anonymous message below"
    ],
    contactInfo: {
      instagram: "vi_ce_t",
      email: "vincent@example.com"
    }
  }
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
  const [profileSectionHeight, setProfileSectionHeight] = useState(0);
  const [anonymousMessage, setAnonymousMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const sectionRefs = useRef(sections.map(() => null));
  const profileSectionRef = useRef(null);

  const sendAnonymousMessage = async () => {
    if (!anonymousMessage.trim() || anonymousMessage.length > 100) return;
    
    setSending(true);
    setError('');
    
    try {
      const response = await fetch('https://discord.com/api/webhooks/1403719689456320603/QtPOgoai6d1jafWzBmSlyOr_mUeU1MrIdmr7VHpyWtUKeqeLSilXtq7VXofq-S9iUmfP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: `💌 **Anonymous Message:** ${anonymousMessage}`,
          username: 'Dating Profile Visitor'
        })
      });
      
      if (response.ok) {
        setMessageSent(true);
        setAnonymousMessage('');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    // Get ProfileSection height dynamically
    const getProfileSectionHeight = () => {
      const profileSection = document.querySelector('[data-profile-section]');
      if (profileSection) {
        const height = profileSection.offsetHeight;
        setProfileSectionHeight(height*0.6);
      }
    };

    // Initial measurement
    getProfileSectionHeight();

    // Re-measure on window resize
    window.addEventListener('resize', getProfileSectionHeight);
    
    // Use ResizeObserver for more accurate measurements
    const resizeObserver = new ResizeObserver(getProfileSectionHeight);
    const profileSection = document.querySelector('[data-profile-section]');
    if (profileSection) {
      resizeObserver.observe(profileSection);
    }

    return () => {
      window.removeEventListener('resize', getProfileSectionHeight);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sectionHeight = window.innerHeight;
      const totalSectionHeight = sectionHeight; // 100vh
      
      // Use dynamically measured ProfileSection height
      const adjustedScrollPosition = scrollPosition - profileSectionHeight;
      const currentSection = Math.floor(adjustedScrollPosition / totalSectionHeight);
            
      if (currentSection >= 0 && currentSection < sections.length) {
        setActiveSection(currentSection);

        // Calculate progress within the current section
        const sectionStart = currentSection * totalSectionHeight;
        const progress = (adjustedScrollPosition - sectionStart) / totalSectionHeight;
        
        // Clamp progress between 0 and 1
        const clampedProgress = Math.max(0, Math.min(1, progress));
        setSectionProgress(clampedProgress);
        
        // Adjust the timing of text appearance
        const textProgress = Math.min(
          Math.max((clampedProgress - 0.1) / 0.3, 0), // Start at 10%, complete by 40%
          1
        );
        
        // Make text disappear quickly when section is almost finished
        // For all sections except the final one, fade out at 90%
        // For the final section, keep text visible until the end
        const isFinalSection = currentSection === sections.length - 1;
        const fadeOutProgress = isFinalSection 
          ? 1 // Keep text visible for final section
          : Math.max(0, Math.min(1, (0.9 - clampedProgress) / 0.1)); // Start fading at 90%, completely gone by 100%
        const finalTextProgress = Math.min(textProgress, fadeOutProgress);
        
        const linesToShow = Math.floor(finalTextProgress * sections[currentSection].text.length);
        setVisibleLines(Math.min(linesToShow, sections[currentSection].text.length));
      } else if (adjustedScrollPosition < 0) {
        // Before ProfileSection is fully scrolled past
        setActiveSection(-1);
        setVisibleLines(0);
        setSectionProgress(0);
      }
    };

    // Only add scroll listener if we have a valid ProfileSection height
    if (profileSectionHeight > 0) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [profileSectionHeight]);

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Progress Bar */}

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
            key={section.title}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
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
                color: theme.palette.mode === 'dark' 
                  ? theme.palette.common.white 
                  : theme.palette.common.white,
                textAlign: 'center',
                width: '100vw',
                maxWidth: '100vw',
                mx: 'auto',
                px: { xs: 2, sm: 3, md: 4 },
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                pointerEvents: 'auto',
                overflow: 'hidden',
                boxSizing: 'border-box'
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  mb: 4,
                  opacity: 1,
                  transform: 'translateY(0)',
                  transition: 'all 0.5s ease-in-out',
                  color: theme.palette.mode === 'dark' 
                    ? theme.palette.grey[100] 
                    : theme.palette.grey[50],
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                  lineHeight: 1.2,
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word'
                }}
              >
                {section.title}
              </Typography>

              <Box sx={{ zIndex: 2 }}>
                {section.text.map((line, lineIndex) => (
                  <Typography
                    key={line}
                    variant="body1"
                    sx={{
                      mb: 2,
                      opacity: lineIndex < visibleLines ? 1 : 0,
                      transform: `translateY(${lineIndex < visibleLines ? '0' : '20px'})`,
                      transition: 'all 0.6s ease-in-out',
                      transitionDelay: `${lineIndex * 0.1}s`,
                      color: theme.palette.mode === 'dark' 
                        ? theme.palette.grey[100] 
                        : theme.palette.grey[50],
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      lineHeight: 1.5,
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      hyphens: 'auto',
                      textAlign: 'center',
                      maxWidth: '100%',
                      px: { xs: 1, sm: 2 }
                    }}
                  >
                    {line}
                  </Typography>
                ))}
              </Box>

              {/* Contact Information */}
              {section.contactInfo && (
                <Box
                  sx={{
                    zIndex: 1,
                    mt: 4,
                    opacity: visibleLines >= section.text.length ? 1 : 0,
                    transform: `translateY(${visibleLines >= section.text.length ? '0' : '20px'})`,
                    transition: 'all 0.6s ease-in-out',
                    transitionDelay: '0.4s',
                    pointerEvents: visibleLines >= section.text.length ? 'auto' : 'none'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <InstagramIcon 
                      sx={{ 
                        fontSize: 40, 
                        color: '#E91E63',
                        mr: 2,
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                      }} 
                    />
                    <Typography
                      component="a"
                      href={`https://instagram.com/${section.contactInfo.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="h5"
                      sx={{
                        color: '#E91E63',
                        fontWeight: 'bold',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
                        lineHeight: 1.2,
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        '&:hover': {
                          color: '#C2185B',
                          transform: 'scale(1.05)',
                          textShadow: '0 4px 8px rgba(233, 30, 99, 0.5)',
                        }
                      }}
                    >
                      @{section.contactInfo.instagram}
                    </Typography>
                  </Box>

                  {/* Anonymous Message Section */}
                  <Box
                    sx={{
                      mt: 4,
                      opacity: visibleLines >= section.text.length ? 1 : 0,
                      transform: `translateY(${visibleLines >= section.text.length ? '0' : '20px'})`,
                      transition: 'all 0.6s ease-in-out',
                      transitionDelay: '0.6s',
                      pointerEvents: visibleLines >= section.text.length ? 'auto' : 'none'
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.mode === 'dark' 
                          ? theme.palette.grey[200] 
                          : theme.palette.grey[100],
                        mb: 2,
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                        lineHeight: 1.4,
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word'
                      }}
                    >
                      💌 Send me an anonymous message
                    </Typography>
                    
                    {!messageSent ? (
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <TextField
                          multiline
                          rows={2}
                          placeholder="Type your message here (max 100 characters)..."
                          value={anonymousMessage}
                          onChange={(e) => setAnonymousMessage(e.target.value)}
                          disabled={sending}
                          inputProps={{ maxLength: 100 }}
                          sx={{
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                              color: theme.palette.mode === 'dark' 
                                ? theme.palette.grey[100] 
                                : theme.palette.grey[50],
                              '& fieldset': {
                                borderColor: theme.palette.mode === 'dark' 
                                  ? theme.palette.grey[600] 
                                  : theme.palette.grey[400],
                              },
                              '&:hover fieldset': {
                                borderColor: theme.palette.mode === 'dark' 
                                  ? theme.palette.grey[500] 
                                  : theme.palette.grey[300],
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#E91E63',
                              },
                            },
                            '& .MuiInputBase-input': {
                              '&::placeholder': {
                                color: theme.palette.mode === 'dark' 
                                  ? theme.palette.grey[400] 
                                  : theme.palette.grey[300],
                                opacity: 1,
                              },
                            },
                          }}
                        />
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.palette.mode === 'dark' 
                                ? theme.palette.grey[400] 
                                : theme.palette.grey[300],
                              fontSize: '0.75rem'
                            }}
                          >
                            {anonymousMessage.length}/100
                          </Typography>
                        </Box>
                        
                        <Button
                          variant="contained"
                          onClick={sendAnonymousMessage}
                          disabled={!anonymousMessage.trim() || anonymousMessage.length > 100 || sending}
                          sx={{
                            backgroundColor: '#E91E63',
                            color: 'white',
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 8px rgba(233, 30, 99, 0.3)',
                            '&:hover': {
                              backgroundColor: '#C2185B',
                              boxShadow: '0 6px 12px rgba(233, 30, 99, 0.4)',
                            },
                            '&:disabled': {
                              backgroundColor: theme.palette.mode === 'dark' 
                                ? theme.palette.grey[700] 
                                : theme.palette.grey[400],
                              color: theme.palette.mode === 'dark' 
                                ? theme.palette.grey[500] 
                                : theme.palette.grey[600],
                            }
                          }}
                        >
                          {sending ? 'Sending...' : 'Send Message'}
                        </Button>
                        
                        {error && (
                          <Alert 
                            severity="error" 
                            sx={{ 
                              mt: 1, 
                              width: '100%',
                              backgroundColor: 'rgba(244, 67, 54, 0.1)',
                              color: '#f44336',
                              border: '1px solid rgba(244, 67, 54, 0.3)'
                            }}
                          >
                            {error}
                          </Alert>
                        )}
                      </Box>
                    ) : (
                      <Box sx={{ textAlign: 'center' }}>
                        <Alert 
                          severity="success" 
                          sx={{ 
                            width: '100%',
                            mx: 'auto',
                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            color: '#4caf50',
                            border: '1px solid rgba(76, 175, 80, 0.3)'
                          }}
                        >
                          ✅ Message sent successfully!
                        </Alert>
                      </Box>
                    )}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ScrollSections; 
