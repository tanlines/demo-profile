import { useState, useEffect, useRef } from 'react';
import { Avatar, useTheme, Box } from '@mui/material';

function ProfilePicture() {
  const theme = useTheme();
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);
  
  const avatarImages = [
    '/avatar/avatar0.jpg',
    '/avatar/avatar1.jpg',
    '/avatar/avatar2.jpg',
    '/avatar/avatar3.jpg',
    '/avatar/avatar4.jpg'
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
    <Box sx={{ position: 'relative', width: 200, height: 200, mb: 3 }}>
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
          borderRadius: '50%',
          zIndex: -1,
          animation: 'gradient-rotate 8s ease-in-out infinite',
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
            borderRadius: '50%',
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
          borderRadius: '50%',
          zIndex: 2,
        }}
      />
      
      {/* CSS Animation for gradient rotation */}
      <style>
        {`
          @keyframes gradient-rotate {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(180deg); }
          }
        `}
      </style>
    </Box>
  );
}

export default ProfilePicture; 