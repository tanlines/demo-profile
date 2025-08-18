import { useState, useEffect, useRef } from 'react';
import { Avatar, useTheme, Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

function ProfilePicture() {
  const theme = useTheme();
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);
  
  const avatarImages = [
    '/avatar/avatar0.jpg',
    '/avatar/avatar1.jpg'
  ];

  const totalAvatars = avatarImages.length;

  const changeAvatar = (direction = 'next') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentAvatarIndex((prev) => (prev + 1) % totalAvatars);
      } else {
        setCurrentAvatarIndex((prev) => (prev - 1 + totalAvatars) % totalAvatars);
      }
      
      // Reset transition state after fade completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 50); // Half of 300ms for smooth transition
  };

  const handleAvatarClick = () => {
    changeAvatar('next');
  };

  const handlePrevious = () => {
    changeAvatar('prev');
  };

  const handleNext = () => {
    changeAvatar('next');
  };

  // Auto-rotate every 5 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      changeAvatar('next');
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTransitioning]);

  // Reset interval when manually changing avatar
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        changeAvatar('next');
      }, 5000);
    }
  }, [currentAvatarIndex]);

  return (
    <Box sx={{ position: 'relative', width: 250, height: 250, mb: 3 }}>
      {/* Gradient background */}
      <Box
        sx={{
          position: 'absolute',
          top: -8,
          left: -8,
          right: -8,
          bottom: -8,
          background: `linear-gradient(135deg, 
            ${theme.palette.primary.main} 0%, 
            #646cff 25%, 
            #61dafb 50%, 
            ${theme.palette.primary.light || '#90caf9'} 75%, 
            ${theme.palette.primary.main} 100%)`,
          borderRadius: '12px',
          zIndex: -1,

          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, 
              ${theme.palette.primary.main} 0%, 
              #646cff 25%, 
              #61dafb 50%, 
              ${theme.palette.primary.light || '#90caf9'} 75%, 
              ${theme.palette.primary.main} 100%)`,
            borderRadius: '12px',
            filter: 'blur(8px)',
            opacity: 0.7,
            zIndex: -2,
          }
        }}
      />
      
      <Avatar
        src={avatarImages[currentAvatarIndex]}
        alt="Profile"
        onClick={handleAvatarClick}
        sx={{
          width: '100%',
          height: '100%',
          border: `4px solid ${theme.palette.primary.main}`,
          borderRadius: '12px',
          boxShadow: theme.shadows[4],
          cursor: 'pointer',
          position: 'relative',
          zIndex: 1,
          transform: isTransitioning ? 'scale(0.95)' : 'scale(1)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: isTransitioning ? 'scale(0.95)' : 'scale(1.02)',
            transition: 'transform 0.2s ease-in-out',
          }
        }}
      />

      {/* Previous button */}
      <IconButton
        onClick={handlePrevious}
        sx={{
          position: 'absolute',
          left: -50,
          top: '50%',
          transform: 'translateY(-50%)',
          color: theme.palette.primary.main,
          '&:hover': {
            color: theme.palette.primary.light,
            transform: 'translateY(-50%) scale(1.1)',
          },
          zIndex: 3,
        }}
      >
        <ChevronLeft />
      </IconButton>

      {/* Next button */}
      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: -50,
          top: '50%',
          transform: 'translateY(-50%)',
          color: theme.palette.primary.main,
          '&:hover': {
            color: theme.palette.primary.light,
            transform: 'translateY(-50%) scale(1.1)',
          },
          zIndex: 3,
        }}
      >
        <ChevronRight />
      </IconButton>
      
      {/* Black overlay for fade effect */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'black',
          opacity: isTransitioning ? 0.1 : 0,
          transition: 'opacity 0.1s linear',
          pointerEvents: 'none',
          borderRadius: '12px',
          zIndex: 2,
        }}
      />
      

    </Box>
  );
}

export default ProfilePicture; 