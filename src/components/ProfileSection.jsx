import { Box, Typography, Avatar, useTheme, Button, Chip, Stack, Paper } from '@mui/material';
import { Link } from 'react-router-dom';  
import { profileChips } from '../data/profileChips';
import { useState } from 'react';
import QuizSection from './QuizSection';
import QuoteBox from './QuoteBox';

function ProfileSection() {
  const theme = useTheme();
  const [selectedChip, setSelectedChip] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [loadingImages, setLoadingImages] = useState(new Set());

  // Create audio element for bubblewrap popping sound
  const bubblePopSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
  
  // Fallback to a simple beep if the base64 audio doesn't work
  const playPopSound = () => {
    try {
      bubblePopSound.currentTime = 0;
      bubblePopSound.play().catch(() => {
        // Fallback: create a simple beep sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      });
    } catch (error) {
      console.log('Audio playback not supported');
    }
  };

  const handleChipClick = (chip) => {
    // Play bubblewrap popping sound
    playPopSound();
    
    // If this chip has an image, mark it for loading
    if (chip.image && !loadedImages.has(chip.image)) {
      setLoadedImages(prev => new Set(prev).add(chip.image));
      setLoadingImages(prev => new Set(prev).add(chip.image));
    }
    
    setSelectedChip(selectedChip?.text === chip.text ? null : chip);
  };

  const handleImageLoad = (imageSrc) => {
    setLoadingImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(imageSrc);
      return newSet;
    });
  };

  const renderCategory = (categoryKey, categoryData) => (
    <Box key={categoryKey} sx={{ mb: 4, width: '100%', maxWidth: 800 }}>
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 2, 
          color: theme.palette.primary.main,
          textAlign: 'center',
          fontWeight: 'bold'
        }}
      >
        {categoryData.title}
      </Typography>
      
      <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" sx={{ mb: 2 }}>
        {categoryData.chips.map((chip, index) => (
          <Chip 
            key={`${chip.text}-${index}`}
            label={`${chip.emoji} ${chip.text}`}
            variant={selectedChip?.text === chip.text ? "filled" : "outlined"}
            onClick={() => handleChipClick(chip)}
            sx={{ 
              borderColor: theme.palette.primary.main,
              color: selectedChip?.text === chip.text ? theme.palette.primary.contrastText : theme.palette.primary.main,
              backgroundColor: selectedChip?.text === chip.text ? theme.palette.primary.main : 'transparent',
              mb: 1.5,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: selectedChip?.text === chip.text ? theme.palette.primary.dark : theme.palette.primary.light,
                color: selectedChip?.text === chip.text ? theme.palette.primary.contrastText : theme.palette.primary.main,
              }
            }} 
          />
        ))}
      </Stack>

      {selectedChip && categoryData.chips.some(chip => chip.text === selectedChip.text) && (
        <Paper
          elevation={2}
          sx={{
            p: 3,
            maxWidth: 500,
            textAlign: 'center',
            backgroundColor: theme.palette.background.paper,
            border: `2px solid ${theme.palette.primary.main}`,
            borderRadius: 2,
            mx: 'auto'
          }}
        >
          <Typography variant="h6" sx={{ mb: 1, color: theme.palette.primary.main }}>
            {selectedChip.emoji} {selectedChip.text}
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: selectedChip.image ? 2 : 0 }}>
            {selectedChip.description}
          </Typography>
          
          {/* Optional image display */}
          {selectedChip.image && loadedImages.has(selectedChip.image) && (
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              {loadingImages.has(selectedChip.image) && (
                <Box
                  sx={{
                    width: '300px',
                    height: '300px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: theme.palette.grey[100],
                    borderRadius: '8px',
                    border: `2px dashed ${theme.palette.grey[300]}`,
                    color: theme.palette.grey[500],
                    fontSize: '1.2rem',
                    fontStyle: 'italic'
                  }}
                >
                  Loading image...
                </Box>
              )}
              <img
                src={selectedChip.image}
                alt={`${selectedChip.text} illustration`}
                onLoad={() => handleImageLoad(selectedChip.image)}
                style={{
                  maxWidth: '100%',
                  maxHeight: '300px',
                  borderRadius: '8px',
                  boxShadow: theme.shadows[2],
                  objectFit: 'cover',
                  display: loadingImages.has(selectedChip.image) ? 'none' : 'block'
                }}
              />
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );

  return (
    <Box
      data-profile-section
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: theme.palette.background.default,
        position: 'relative',
        zIndex: 10,
        py: 4,
        flexGrow: 1,
        width: '100%'
      }}
    >
      <Avatar
        src="https://i.imgur.com/Waw8gNZ.jpeg"
        alt="Profile"
        sx={{
          width: 200,
          height: 200,
          mb: 3,
          border: `4px solid ${theme.palette.primary.main}`,
          boxShadow: theme.shadows[4]
        }}
      />
      <Typography
        variant="h2"
        sx={{
          mb: 3,
          color: theme.palette.text.primary,
          textAlign: 'center',
          fontWeight: 'bold'
        }}
      >
        Vincent, 28
      </Typography>
      
      {!selectedChip && (
        <Typography
          variant="body1"
          sx={{
            mb: 5,
            color: theme.palette.text.secondary,
            textAlign: 'center',
            maxWidth: 500,
            fontStyle: 'italic'
          }}
        >
          💡 Click on any chip below to learn more about me
        </Typography>
      )}
      
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {Object.entries(profileChips).map(([categoryKey, categoryData]) => 
          renderCategory(categoryKey, categoryData)
        )}
      </Box>
      <QuizSection/>
      <QuoteBox/>
    </Box>
  );
}

export default ProfileSection; 