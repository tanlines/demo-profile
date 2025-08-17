import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
  "Read the news to stay informed, not live in fear",
  "Money isn't everything but it makes everything else easier",
  "A healthy man wants a thousand things, but a sick man only wants one",
  "If you want to go fast, go alone. If you want to go far, go together.",
  "With about 100 productive hours a week, every hour is 1% of your life if that same week is repeated over and over",
  "How would you live if you were the last person on earth?",
  "What would you do if you never had to work again?",
  "What situation brings out the worst in you?",
  "Would the way you live have more or less meaning if you were the last person on Earth?"
];

const QuoteBox = () => {
  const theme = useTheme();
  const [currentQuote, setCurrentQuote] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  // Set initial quote
  useEffect(() => {
    setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const handleQuoteClick = () => {
    setIsVisible(false);
    
    // After animation completes, show new quote
    setTimeout(() => {
      let newQuote;
      do {
        newQuote = quotes[Math.floor(Math.random() * quotes.length)];
      } while (newQuote === currentQuote && quotes.length > 1); // Ensure different quote
      
      setCurrentQuote(newQuote);
      setIsVisible(true);
    }, 300); // Match animation duration
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
        p: 3,
        cursor: 'pointer'
      }}
      onClick={handleQuoteClick}
    >
              <Paper
          elevation={8}
          sx={{
            p: 4,
            maxWidth: '600px',
            minHeight: '400px', // Fixed height for 5 lines of text
            textAlign: 'center',
            background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
            border: `2px solid ${theme.palette.primary.main}30`,
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: theme.shadows[12],
              transition: 'all 0.3s ease'
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
            }
          }}
        >
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              key={currentQuote}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontStyle: 'italic',
                  color: theme.palette.text.primary,
                  mb: 2,
                  lineHeight: 1.6,
                  fontWeight: 300
                }}
              >
                "{currentQuote.split(' - ')[0]}"
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 500,
                  opacity: 0.8
                }}
              >
                — {currentQuote.split(' - ')[1]}
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
        
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mt: 2,
            color: theme.palette.text.disabled,
            fontStyle: 'italic'
          }}
        >
          Click for another quote/random thought
        </Typography>
      </Paper>
    </Box>
  );
};

export default QuoteBox; 