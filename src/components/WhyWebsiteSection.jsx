import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const WhyWebsiteSection = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        color: 'white',
        textAlign: 'center',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: { xs: 2, sm: 3, md: 4 },
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 4,
          color: theme.palette.grey[100],
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
          lineHeight: 1.2,
          wordWrap: 'break-word',
          overflowWrap: 'break-word'
        }}
      >
        Why I made this website
      </Typography>

      <Box sx={{ zIndex: 2 }}>
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            color: theme.palette.grey[100],
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
          This website is a combination of my interest in web development, tool for self-reflection and desire for a relationship
        </Typography>
        
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            color: theme.palette.grey[100],
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
          If nothing else, I hope you at least find my take of a dating profile interesting
        </Typography>
        
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            color: theme.palette.grey[100],
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
          If you're also looking for a relationship, I wish you all the best and hope you find what you're looking for
        </Typography>
      </Box>
    </Box>
  );
};

export default WhyWebsiteSection; 