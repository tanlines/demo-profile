import { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';

const DateSpinner = () => {
  const theme = useTheme();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [activity, setActivity] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayDate, setDisplayDate] = useState('');
  const [displayTime, setDisplayTime] = useState('');
  const [displayActivity, setDisplayActivity] = useState('');

  // Initialize display values
  useEffect(() => {
    setDisplayDate(date);
    setDisplayTime(time);
    setDisplayActivity(activity);
  }, [date, time, activity]);

  // Day activities (10am - 5pm)
  const dayActivities = [
    'Coffee date ☕',
    'Lunch date 🍽️',
    'Visit a museum 🏛️',
    'Walk in the park 🌳',
    'Shopping 🛍️',
    'Art gallery 🎨',
    'Book store 📚',
    'Botanical garden 🌸',
    'Cooking class 👨‍🍳',
    'Bouldering 🧗‍♂️',
    'Pottery making 🏺',
    'Escape room 🚪',
    'Mini golf ⛳',
    'Ferry ride 🚢'
  ];

  // Evening activities (6pm - 7pm)
  const eveningActivities = [
    'Dinner date 🍷',
    'Movie night 🎬',
    'Sunset walk 🌅',
    'Walk in the park 🌳',
    'Night drive 🚗',
    'Dance class 💃',
    'Bubble tea date 🧋',
  ];

  const generateRandomDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const randomTime = tomorrow.getTime() + Math.random() * (nextWeek.getTime() - tomorrow.getTime());
    const randomDate = new Date(randomTime);
    
    return {
      formatted: randomDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
      }),
      isWeekday: randomDate.getDay() >= 1 && randomDate.getDay() <= 5 // Monday = 1, Friday = 5
    };
  };

  const generateRandomTime = (isWeekday = false) => {
    let minHour, maxHour;
    
    if (isWeekday) {
      // Weekdays: only 5pm (17) to 7pm (19)
      minHour = 17;
      maxHour = 19;
    } else {
      // Weekends: 10am (10) to 7pm (19)
      minHour = 10;
      maxHour = 19;
    }
    
    const hours = Math.floor(Math.random() * (maxHour - minHour + 1)) + minHour;
    const minutes = Math.floor(Math.random() * 2) * 30; // Only 0 or 30 minutes (on the hour or half hour)
    
    const timeString = new Date(2000, 0, 1, hours, minutes).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    
    return timeString;
  };

  const generateRandomActivity = (selectedTime) => {
    const timeHour = parseInt(selectedTime.split(':')[0]);
    const isPM = selectedTime.includes('PM');
    const hour24 = isPM && timeHour !== 12 ? timeHour + 12 : timeHour;
    
    if (hour24 >= 18) { // 6pm or later
      return eveningActivities[Math.floor(Math.random() * eveningActivities.length)];
    } else {
      return dayActivities[Math.floor(Math.random() * dayActivities.length)];
    }
  };

  const animateValues = (finalDate, finalTime, finalActivity) => {
    setIsSpinning(true);
    
    // Generate random values for animation
    const generateRandomDisplayDate = () => {
      const randomDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const randomMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return `${randomDays[Math.floor(Math.random() * randomDays.length)]}, ${randomMonths[Math.floor(Math.random() * randomMonths.length)]} ${Math.floor(Math.random() * 28) + 1}`;
    };

    const generateRandomDisplayTime = () => {
      const hours = Math.floor(Math.random() * 12) + 1;
      const minutes = Math.random() < 0.5 ? '00' : '30';
      const ampm = Math.random() < 0.5 ? 'AM' : 'PM';
      return `${hours}:${minutes} ${ampm}`;
    };

    const generateRandomDisplayActivity = () => {
      const allActivities = [...dayActivities, ...eveningActivities];
      return allActivities[Math.floor(Math.random() * allActivities.length)];
    };

    // Create a sequence of random values for smooth animation
    const randomDates = Array.from({ length: 5 }, () => generateRandomDisplayDate());
    const randomTimes = Array.from({ length: 5 }, () => generateRandomDisplayTime());
    const randomActivities = Array.from({ length: 5 }, () => generateRandomDisplayActivity());

    // Add final values at the end
    randomDates.push(finalDate);
    randomTimes.push(finalTime);
    randomActivities.push(finalActivity);

    // Animate through the sequence
    let currentIndex = 0;
    const animationInterval = setInterval(() => {
      if (currentIndex < randomDates.length) {
        setDisplayDate(randomDates[currentIndex]);
        setDisplayTime(randomTimes[currentIndex]);
        setDisplayActivity(randomActivities[currentIndex]);
        currentIndex++;
      } else {
        setIsSpinning(false);
        clearInterval(animationInterval);
      }
    }, 150); // Slightly slower for better visual effect
  };

  const handleSpin = () => {
    const dateInfo = generateRandomDate();
    const newTime = generateRandomTime(dateInfo.isWeekday);
    const newActivity = generateRandomActivity(newTime);
    
    setDate(dateInfo.formatted);
    setTime(newTime);
    setActivity(newActivity);
    
    // Start animation
    animateValues(dateInfo.formatted, newTime, newActivity);
  };

  return (
    <motion.div
      animate={isSpinning ? { scale: [1, 1.02, 1] } : {}}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          maxWidth: 800, 
          minWidth: 500,
          mx: 'auto',
          background: `linear-gradient(135deg, ${theme.palette.primary.light}15, ${theme.palette.secondary.light}15)`,
          border: `2px solid ${theme.palette.primary.main}20`
        }}
      >
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            mb: 3, 
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          🎯 Date Generator
        </Typography>

        <Stack spacing={3} sx={{ mb: 4 }}>
          {/* Date Section */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 1, color: theme.palette.text.secondary }}>
              📅 Date
            </Typography>
            <Paper 
              elevation={1} 
              sx={{ 
                p: 2, 
                minHeight: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.primary.main}30`,
                overflow: 'hidden'
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayDate || 'empty'}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ 
                    duration: 0.1,
                    ease: isSpinning ? "linear" : "easeOut"
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'center'
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: displayDate ? theme.palette.primary.main : theme.palette.text.disabled,
                      fontWeight: 'medium'
                    }}
                  >
                    {displayDate || 'Click spin to generate'}
                  </Typography>
                </motion.div>
              </AnimatePresence>
            </Paper>
          </Box>

          {/* Time Section */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 1, color: theme.palette.text.secondary }}>
              🕐 Time
            </Typography>
            <Paper 
              elevation={1} 
              sx={{ 
                p: 2, 
                minHeight: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.primary.main}30`,
                overflow: 'hidden'
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayTime || 'empty'}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ 
                    duration: 0.1,
                    ease: isSpinning ? "linear" : "easeOut"
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'center'
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: displayTime ? theme.palette.primary.main : theme.palette.text.disabled,
                      fontWeight: 'medium'
                    }}
                  >
                    {displayTime || 'Click spin to generate'}
                  </Typography>
                </motion.div>
              </AnimatePresence>
            </Paper>
          </Box>

          {/* Activity Section */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 1, color: theme.palette.text.secondary }}>
              🎉 Activity
            </Typography>
            <Paper 
              elevation={1} 
              sx={{ 
                p: 2, 
                minHeight: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.primary.main}30`,
                overflow: 'hidden'
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayActivity || 'empty'}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ 
                    duration: 0.1,
                    ease: isSpinning ? "linear" : "easeOut"
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'center'
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: displayActivity ? theme.palette.primary.main : theme.palette.text.disabled,
                      fontWeight: 'medium',
                      textAlign: 'center'
                    }}
                  >
                    {displayActivity || 'Click spin to generate'}
                  </Typography>
                </motion.div>
              </AnimatePresence>
            </Paper>
          </Box>
        </Stack>

        <motion.div
          whileHover={{ scale: isSpinning ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={handleSpin}
            disabled={isSpinning}
            sx={{
              width: '100%',
              py: 2,
              fontSize: '1.2rem',
              fontWeight: 'bold',
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              opacity: isSpinning ? 0.7 : 1,
              '&:hover': {
                background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`
              }
            }}
          >
            {isSpinning ? '🎰 SPINNING...' : '🎲 SPIN FOR DATE!'}
          </Button>
        </motion.div>
      </Paper>
    </motion.div>
  );
};

export default DateSpinner; 