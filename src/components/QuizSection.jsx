import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Paper, Button, useTheme } from '@mui/material';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

  
const questions = [
  { title: "Winter", emoji: "❄️" },
  { title: "Cat", emoji: "🐱" },
  { title: "Sushi", emoji: "🍣" },
  { title: "Tea", emoji: "🍵" },
  { title: "Sunset", emoji: "🌅" }
];

// Array for result messages based on yesCount for better readability
const resultMessages = [
  "We were never meant to be 💔",
  "Better than nothing 🤷‍♂️",
  "We can make it work 🤝",
  "Let's be friends 🤝",
  "No one's perfect ✨",
  "You are the one 💕"
];
const QuizSection = () => {
  const theme = useTheme();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Create separate motion values for each question
  const motionValues = questions.map(() => ({
    x: useMotionValue(0),
    rotate: useTransform(useMotionValue(0), [-200, 200], [-30, 30]),
    opacity: useTransform(useMotionValue(0), [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])
  }));

  const handleDragEnd = (event, info, questionIndex) => {
    const threshold = 5;
    
    if (info.offset.x > threshold) {
      // Swiped right - Yes
      handleAnswer(true);
    } else if (info.offset.x < -threshold) {
      // Swiped left - No
      handleAnswer(false);
    }
    
    // Reset position immediately for smooth transition
    motionValues[questionIndex].x.set(0);
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleButtonClick = (answer) => {
    handleAnswer(answer);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsCompleted(false);
    motionValues.forEach(mv => mv.x.set(0));
  };

  if (isCompleted) {
    const yesCount = answers.filter(answer => answer).length;
    const noCount = answers.filter(answer => !answer).length;
  
    
    return (
      <
      >
        <Paper
          elevation={8}
          sx={{
            p: 6,
            textAlign: 'center',
            maxWidth: 600,
            width: '100%',
            background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
            border: `1px solid ${theme.palette.primary.main}30`
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 4 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" sx={{ color: 'error.main' }}>
                {noCount}
              </Typography>
              <Typography variant="body1">No Answers</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" sx={{ color: 'success.main' }}>
                {yesCount}
              </Typography>
              <Typography variant="body1">Yes Answers</Typography>
            </Box>
          </Box>
          
          {/* Final dramatic message based on yes count */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h5" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
            {resultMessages[yesCount]}
          </Typography>
          </Box>
          
          <Button
            variant="contained"
            size="large"
            onClick={resetQuiz}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              '&:hover': {
                background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`
              }
            }}
          >
            Take Quiz Again
          </Button>
        </Paper>
      </>
    );
  }

  return (
    <
    >
      
      <Typography variant="body1" sx={{ textAlign: 'center', mb: 4, opacity: 0.8 }}>
        Question {currentQuestionIndex + 1} of {questions.length}
      </Typography>
      
      {/* Map over questions array and generate a component for each */}
      {questions.map((question, index) => (
        <Box
          key={index}
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 400,
            height: 200,
            display: index === currentQuestionIndex ? 'block' : 'none'
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: index === currentQuestionIndex ? 1 : 0,
              scale: index === currentQuestionIndex ? 1 : 0.8,
              y: index === currentQuestionIndex ? 0 : 20
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%'
            }}
          >
            <motion.div
              style={{
                x: index === currentQuestionIndex ? motionValues[index].x : 0,
                rotate: index === currentQuestionIndex ? motionValues[index].rotate : 0,
                opacity: index === currentQuestionIndex ? motionValues[index].opacity : 1,
                cursor: index === currentQuestionIndex ? 'grab' : 'default',
                width: '100%',
                height: '100%'
              }}
              drag={index === currentQuestionIndex ? "x" : false}
              dragConstraints={index === currentQuestionIndex ? { left: -200, right: 200 } : undefined}
              onDragEnd={index === currentQuestionIndex ? (event, info) => handleDragEnd(event, info, index) : undefined}
              whileDrag={index === currentQuestionIndex ? { cursor: 'grabbing' } : undefined}
            >
              <Paper
                elevation={8}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
                  border: `1px solid ${theme.palette.primary.main}30`,
                  userSelect: 'none',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="h1" component="div" sx={{ mb: 2, fontSize: '3rem' }}>
                  {question.emoji}
                </Typography>
                
                <Typography variant="h5" component="h3" gutterBottom>
                  {question.title}
                </Typography>
                
                <Typography variant="body2" sx={{ opacity: 0.7, mt: 2 }}>
                  Swipe or drag left for No, right for Yes
                </Typography>
              </Paper>
            </motion.div>
          </motion.div>
        </Box>
      ))}
      
      {/* Swipe indicators as clickable buttons */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: 400,
          mx: 'auto',
          mt: 4,
          opacity: 0.8
        }}
      >
        <Button
          variant="text"
          color="error"
          onClick={() => handleButtonClick(false)}
          sx={{
            minWidth: 'auto',
            px: 2,
            py: 1,
            '&:hover': {
              backgroundColor: 'error.main',
              color: 'white'
            }
          }}
        >
          <Typography variant="h6" sx={{ color: 'inherit' }}>
            ← No
          </Typography>
        </Button>
        <Button
          variant="text"
          color="success"
          onClick={() => handleButtonClick(true)}
          sx={{
            minWidth: 'auto',
            px: 2,
            py: 1,
            '&:hover': {
              backgroundColor: 'success.main',
              color: 'white'
            }
          }}
        >
          <Typography variant="h6" sx={{ color: 'inherit' }}>
            Yes →
          </Typography>
        </Button>
      </Box>
      
    </>
  );
};

export default QuizSection; 