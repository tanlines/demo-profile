import React, { useState } from 'react';
import { Box, Typography, Chip, Stack, Paper, useTheme } from '@mui/material';
import { profileChips } from '../data/profileChips';

function ProfileChipsSection({ selectedCategory = null }) {
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
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0,0,0,0.7)'
        }}
      >
        {categoryData.title}
      </Typography>
      
      <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" sx={{ mb: 2}}>
        {categoryData.chips.map((chip, index) => (
          <Chip 
            key={`${chip.text}-${index}`}
            label={`${chip.emoji} ${chip.text}`}
            variant={selectedChip?.text === chip.text ? "filled" : "outlined"}
            onClick={() => handleChipClick(chip)}
            sx={{ 
              borderColor: 'white',
              color: selectedChip?.text === chip.text ? 'white' : 'white',
              backgroundColor: selectedChip?.text === chip.text ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                backgroundColor: selectedChip?.text === chip.text ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)',
                transform: 'scale(1.05)',
                transition: 'all 0.2s ease-in-out'
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
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 2,
            mx: 'auto',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}
        >
          <Typography variant="h6" sx={{ mb: 1, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.7)' }}>
            {selectedChip.emoji} {selectedChip.text}
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: selectedChip.image ? 2 : 0, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
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

  // Filter categories based on selectedCategory parameter
  const categoriesToRender = selectedCategory 
    ? { [selectedCategory]: profileChips[selectedCategory] }
    : profileChips;

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {!selectedChip && (
        <Typography
          variant="body1"
          sx={{
            mb: 5,
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            maxWidth: 500,
            fontStyle: 'italic',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)'
          }}
        >
          💡 Click on any chip below to learn more about me
        </Typography>
      )}
      
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {Object.entries(categoriesToRender).map(([categoryKey, categoryData]) => 
          renderCategory(categoryKey, categoryData)
        )}
      </Box>
    </Box>
  );
}

export default ProfileChipsSection; 