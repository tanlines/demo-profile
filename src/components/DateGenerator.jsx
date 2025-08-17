import { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';

const DateGenerator = () => {
  const theme = useTheme();
  const [timeOfDay, setTimeOfDay] = useState('');
  const [food, setFood] = useState('');
  const [dress, setDress] = useState('');
  const [state, setState] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayTimeOfDay, setDisplayTimeOfDay] = useState('');
  const [displayFood, setDisplayFood] = useState('');
  const [displayDress, setDisplayDress] = useState('');
  const [displayState, setDisplayState] = useState('');
  const [dateSentence, setDateSentence] = useState('');

  // Initialize display values
  useEffect(() => {
    setDisplayTimeOfDay(timeOfDay);
    setDisplayFood(food);
    setDisplayDress(dress);
    setDisplayState(state);
  }, [timeOfDay, food, dress, state]);

  // Time of day options
  const timeOfDayOptions = [
    'Morning 🌅',
    'Afternoon ☀️',
    'Evening 🌆',
    'Night 🌙',
    'Late Night 🌃',
    'Early Morning 🌄',
    'Midday 🌞',
    'Sunset 🌅',
    'Dawn 🌅',
    'Dusk 🌆'
  ];

  // Food adjectives and cuisines
  const foodAdjectives = [
    'Spicy',
    'Sweet',
    'Savoury',
    'Tangy',
    'Smoky',
    'Mild',
    'Zesty',
    'Bitter',
    'Umami',
    'Peppery',
    'Grilled',
    'Roasted',
    'Fried',
    'Steamed',
    'Baked',
    'Raw',
    'Slow-cooked',
    'Braised',
    'Stir-fried',
    'Smoked',
    'Seafood',
    'Vegetarian',
    'Vegan',
    'Dairy-free',
    'Gluten-free',
    'Plant-based'
  ];

  const foodStyleAdjectives = [
    'Authentic',
    'Gourmet',
    'Rustic',
    'Street',
    'Traditional',
    'Modern',
    'Artisanal',
    'Fusion',
    'Premium',
    'Homestyle',
    'Northern',
    'Southern',
    'Coastal',
    'Mountain',
    'Rural',
    'Urban'
  ];

  const foodCuisines = [
    'Italian 🍝',
    'Chinese 🥡',
    'Mexican 🌮',
    'Japanese 🍱',
    'Indian 🍛',
    'Thai 🍜',
    'French 🥐',
    'Greek 🥙',
    'Korean 🍲',
    'Vietnamese 🍜',
    'Spanish 🥘',
    'Mediterranean 🥗',
    'American 🍔',
    'Lebanese 🥙',
    'Turkish 🥙',
    'Moroccan 🥘',
    'Brazilian 🥩',
    'Peruvian 🥘',
    'Ethiopian 🍛',
    'Caribbean 🥘'
  ];

  // Dress options
  const dressOptions = [
    'Formal 👔',
    'Casual 👕',
    'Business Casual 👔',
    'Streetwear 👟',
    'Vintage 👗',
    'Gothic 🖤',
    'Bohemian 🌸',
    'Sporty 🏃‍♂️',
    'Elegant 💎',
    'Punk 🖤',
    'Hippie 🌺',
    'Preppy 🎓',
    'Rockstar 🎸',
    'Artist 🎨',
    'Chef 👨‍🍳',
    'Doctor 👩‍⚕️',
    'Pirate 🏴‍☠️',
    'Superhero 🦸‍♂️',
    'Princess 👑'
  ];

  const dressMaterialAdjectives = [
    'Cotton',
    'Linen',
    'Silk',
    'Velvet',
    'Denim',
    'Leather',
    'Wool',
    'Satin',
    'Lace',
    'Sequined',
    'Slim-fit',
    'Oversized',
    'Tailored',
    'Loose',
    'Cropped',
    'Floor-length',
    'Midi',
    'Mini',
    'Flared',
    'Bodycon',
    'Bright',
    'Pastel',
    'Dark',
    'Monochrome',
    'Neon',
    'Earth-toned',
    'Jewel-toned',
    'Metallic',
    'Muted',
    'Bold',
    'Striped',
    'Polka-dot',
    'Floral',
    'Plaid',
    'Animal-print',
    'Embroidered',
    'Distressed',
    'Studded',
    'Ruffled',
    'Tie-dye'
  ];

  const dressStyleAdjectives = [
    'Summer',
    'Winter',
    'Evening',
    'Daytime',
    'Party',
    'Festival',
    'Travel',
    'Wedding',
    'Work',
    'Lounge',
    'Modern',
    'Retro',
    'Minimalist',
    'Glamorous',
    'Edgy',
    'Chic',
    'Playful',
    'Romantic',
    'Grunge',
    'Futuristic'
  ];

  // State options
  const stateOptions = [
    'Drunk 🍺',
    'Sweaty 💦',
    'Sober 🧠',
    'Tired 😴',
    'Energetic ⚡',
    'Hungry 🍽️',
    'Full 😋',
    'Excited 🎉',
    'Calm 😌',
    'Stressed 😰',
    'Relaxed 😎',
    'Hyper 🚀',
    'Sleepy 😴',
    'Awake 👀',
    'Confused 🤔',
    'Focused 🎯',
    'Distracted 🤪',
    'Motivated 💪',
    'Lazy 😴',
    'Wild 🦁'
  ];

  const generateRandomTimeOfDay = () => {
    return timeOfDayOptions[Math.floor(Math.random() * timeOfDayOptions.length)];
  };

  const generateRandomFood = () => {
    const firstAdjective = foodAdjectives[Math.floor(Math.random() * foodAdjectives.length)];
    const secondAdjective = foodStyleAdjectives[Math.floor(Math.random() * foodStyleAdjectives.length)];
    const cuisine = foodCuisines[Math.floor(Math.random() * foodCuisines.length)];
    
    // Randomly decide whether to use 1 or 2 adjectives (70% chance for 2, 30% chance for 1)
    const useTwoAdjectives = Math.random() < 0.7;
    
    if (useTwoAdjectives) {
      return `${firstAdjective} ${secondAdjective} ${cuisine}`;
    } else {
      // Randomly choose which adjective to use
      const useFirst = Math.random() < 0.5;
      return useFirst ? `${firstAdjective} ${cuisine}` : `${secondAdjective} ${cuisine}`;
    }
  };

  const generateRandomDress = () => {
    const materialAdjective = dressMaterialAdjectives[Math.floor(Math.random() * dressMaterialAdjectives.length)];
    const styleAdjective = dressStyleAdjectives[Math.floor(Math.random() * dressStyleAdjectives.length)];
    const dressStyle = dressOptions[Math.floor(Math.random() * dressOptions.length)];
    
    // Randomly decide whether to use 1 or 2 adjectives (70% chance for 2, 30% chance for 1)
    const useTwoAdjectives = Math.random() < 0.7;
    
    if (useTwoAdjectives) {
      return `${materialAdjective} ${styleAdjective} ${dressStyle}`;
    } else {
      // Randomly choose which adjective to use
      const useMaterial = Math.random() < 0.5;
      return useMaterial ? `${materialAdjective} ${dressStyle}` : `${styleAdjective} ${dressStyle}`;
    }
  };

  const generateRandomState = () => {
    return stateOptions[Math.floor(Math.random() * stateOptions.length)];
  };

  const generateDateSentence = (timeOfDay, food, dress, state) => {
    const timePhrases = {
      'Morning 🌅': 'in the morning',
      'Afternoon ☀️': 'in the afternoon',
      'Evening 🌆': 'in the evening',
      'Night 🌙': 'at night',
      'Late Night 🌃': 'late at night',
      'Early Morning 🌄': 'early in the morning',
      'Midday 🌞': 'at midday',
      'Sunset 🌅': 'at sunset',
      'Dawn 🌅': 'at dawn',
      'Dusk 🌆': 'at dusk'
    };

    const dressPhrases = {
      'Formal 👔': 'dressed formally',
      'Casual 👕': 'dressed casually',
      'Business Casual 👔': 'dressed business casual',
      'Streetwear 👟': 'wearing streetwear',
      'Vintage 👗': 'wearing vintage clothes',
      'Gothic 🖤': 'dressed in gothic style',
      'Bohemian 🌸': 'dressed bohemian style',
      'Sporty 🏃‍♂️': 'dressed sporty',
      'Elegant 💎': 'dressed elegantly',
      'Punk 🖤': 'dressed punk style',
      'Hippie 🌺': 'dressed hippie style',
      'Preppy 🎓': 'dressed preppy',
      'Rockstar 🎸': 'dressed like a rockstar',
      'Artist 🎨': 'dressed like an artist',
      'Chef 👨‍🍳': 'dressed like a chef',
      'Doctor 👩‍⚕️': 'dressed like a doctor',
      'Pirate 🏴‍☠️': 'dressed like a pirate',
      'Superhero 🦸‍♂️': 'dressed like a superhero',
      'Princess 👑': 'dressed like a princess'
    };

    // Helper function to extract the base dress style from the two-adjective format
    const getBaseDressStyle = (fullDressDescription) => {
      const parts = fullDressDescription.split(' ');
      if (parts.length >= 3) {
        // Return the last part (the base dress style with emoji)
        return parts[parts.length - 1];
      }
      return fullDressDescription;
    };

    // Helper function to get the dress phrase, handling both old and new formats
    const getDressPhrase = (dressDescription) => {
      const baseStyle = getBaseDressStyle(dressDescription);
      return dressPhrases[baseStyle] || `wearing ${dressDescription.toLowerCase()}`;
    };

    const statePhrases = {
      'Drunk 🍺': 'feeling a bit tipsy',
      'Sweaty 💦': 'feeling sweaty',
      'Sober 🧠': 'feeling completely sober',
      'Tired 😴': 'feeling tired',
      'Energetic ⚡': 'feeling energetic',
      'Hungry 🍽️': 'feeling hungry',
      'Full 😋': 'feeling full',
      'Excited 🎉': 'feeling excited',
      'Calm 😌': 'feeling calm',
      'Stressed 😰': 'feeling stressed',
      'Relaxed 😎': 'feeling relaxed',
      'Hyper 🚀': 'feeling hyper',
      'Sleepy 😴': 'feeling sleepy',
      'Awake 👀': 'feeling wide awake',
      'Confused 🤔': 'feeling confused',
      'Focused 🎯': 'feeling focused',
      'Distracted 🤪': 'feeling distracted',
      'Motivated 💪': 'feeling motivated',
      'Lazy 😴': 'feeling lazy',
      'Wild 🦁': 'feeling wild'
    };

    const templates = [
      `Let's go on a date ${timePhrases[timeOfDay]} and have some ${food.toLowerCase()}, ${getDressPhrase(dress)}, while ${statePhrases[state]}! 💕`,
      `I'm thinking we should go out ${timePhrases[timeOfDay]} for ${food.toLowerCase()}, ${getDressPhrase(dress)}, and just ${statePhrases[state]} together! ✨`,
      `How about a date ${timePhrases[timeOfDay]}? We'll get ${food.toLowerCase()}, ${getDressPhrase(dress)}, while ${statePhrases[state]}! 🎭`,
      `Perfect date idea: ${timePhrases[timeOfDay]} we'll grab ${food.toLowerCase()}, ${getDressPhrase(dress)}, and we'll be ${statePhrases[state]}! 🌟`,
      `Let's make it a date ${timePhrases[timeOfDay]}! ${food} sounds perfect, ${getDressPhrase(dress)}, while ${statePhrases[state]}! 💫`
    ];

    return templates[Math.floor(Math.random() * templates.length)];
  };

  const animateValues = (finalTimeOfDay, finalFood, finalDress, finalState) => {
    setIsSpinning(true);
    
    // Clear the date sentence during animation
    setDateSentence('');
    
    // Generate random values for animation
    const generateRandomDisplayTimeOfDay = () => {
      return timeOfDayOptions[Math.floor(Math.random() * timeOfDayOptions.length)];
    };

    const generateRandomDisplayFood = () => {
      const firstAdjective = foodAdjectives[Math.floor(Math.random() * foodAdjectives.length)];
      const secondAdjective = foodStyleAdjectives[Math.floor(Math.random() * foodStyleAdjectives.length)];
      const cuisine = foodCuisines[Math.floor(Math.random() * foodCuisines.length)];
      
      // Randomly decide whether to use 1 or 2 adjectives (70% chance for 2, 30% chance for 1)
      const useTwoAdjectives = Math.random() < 0.7;
      
      if (useTwoAdjectives) {
        return `${firstAdjective} ${secondAdjective} ${cuisine}`;
      } else {
        // Randomly choose which adjective to use
        const useFirst = Math.random() < 0.5;
        return useFirst ? `${firstAdjective} ${cuisine}` : `${secondAdjective} ${cuisine}`;
      }
    };

    const generateRandomDisplayDress = () => {
      const materialAdjective = dressMaterialAdjectives[Math.floor(Math.random() * dressMaterialAdjectives.length)];
      const styleAdjective = dressStyleAdjectives[Math.floor(Math.random() * dressStyleAdjectives.length)];
      const dressStyle = dressOptions[Math.floor(Math.random() * dressOptions.length)];
      
      // Randomly decide whether to use 1 or 2 adjectives (70% chance for 2, 30% chance for 1)
      const useTwoAdjectives = Math.random() < 0.7;
      
      if (useTwoAdjectives) {
        return `${materialAdjective} ${styleAdjective} ${dressStyle}`;
      } else {
        // Randomly choose which adjective to use
        const useMaterial = Math.random() < 0.5;
        return useMaterial ? `${materialAdjective} ${dressStyle}` : `${styleAdjective} ${dressStyle}`;
      }
    };

    const generateRandomDisplayState = () => {
      return stateOptions[Math.floor(Math.random() * stateOptions.length)];
    };

    // Create a sequence of random values for smooth animation
    const randomTimeOfDays = Array.from({ length: 5 }, () => generateRandomDisplayTimeOfDay());
    const randomFoods = Array.from({ length: 5 }, () => generateRandomDisplayFood());
    const randomDresses = Array.from({ length: 5 }, () => generateRandomDisplayDress());
    const randomStates = Array.from({ length: 5 }, () => generateRandomDisplayState());

    // Add final values at the end
    randomTimeOfDays.push(finalTimeOfDay);
    randomFoods.push(finalFood);
    randomDresses.push(finalDress);
    randomStates.push(finalState);

    // Animate through the sequence
    let currentIndex = 0;
    const animationInterval = setInterval(() => {
      if (currentIndex < randomTimeOfDays.length) {
        setDisplayTimeOfDay(randomTimeOfDays[currentIndex]);
        setDisplayFood(randomFoods[currentIndex]);
        setDisplayDress(randomDresses[currentIndex]);
        setDisplayState(randomStates[currentIndex]);
        currentIndex++;
      } else {
        setIsSpinning(false);
        clearInterval(animationInterval);
        
        // Generate and display the date sentence after animation completes
        const finalDateSentence = generateDateSentence(finalTimeOfDay, finalFood, finalDress, finalState);
        setDateSentence(finalDateSentence);
      }
    }, 150); // Slightly slower for better visual effect
  };

  const handleSpin = () => {
    const newTimeOfDay = generateRandomTimeOfDay();
    const newFood = generateRandomFood();
    const newDress = generateRandomDress();
    const newState = generateRandomState();
    
    setTimeOfDay(newTimeOfDay);
    setFood(newFood);
    setDress(newDress);
    setState(newState);
    
    // Start animation (date sentence will be generated after animation completes)
    animateValues(newTimeOfDay, newFood, newDress, newState);
  };

  return (
    <motion.div
      animate={isSpinning ? { scale: [1, 1.02, 1] } : {}}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          maxWidth: 600, 
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
          👩🏻‍❤️‍👨🏻 Date Generator
        </Typography>

        {/* 2x2 Grid Layout */}
        <Box sx={{ mb: 4 }}>
          {/* First Row */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            {/* Time of Day Section */}
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ mb: 1, color: theme.palette.text.secondary, fontSize: '0.9rem' }}>
                ⏰ Time of Day
              </Typography>
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 1.5, 
                  minHeight: 100,
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
                    key={displayTimeOfDay || 'empty'}
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
                      variant="h6" 
                      sx={{ 
                        color: displayTimeOfDay ? theme.palette.primary.main : theme.palette.text.disabled,
                        fontWeight: 'medium',
                        fontSize: '0.9rem'
                      }}
                    >
                      {displayTimeOfDay || 'Click spin to generate'}
                    </Typography>
                  </motion.div>
                </AnimatePresence>
              </Paper>
            </Box>

            {/* Food Section */}
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ mb: 1, color: theme.palette.text.secondary, fontSize: '0.9rem' }}>
                🍽️ Food
              </Typography>
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 1.5, 
                  minHeight: 100,
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
                    key={displayFood || 'empty'}
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
                      variant="h6" 
                      sx={{ 
                        color: displayFood ? theme.palette.primary.main : theme.palette.text.disabled,
                        fontWeight: 'medium',
                        fontSize: '0.9rem'
                      }}
                    >
                      {displayFood || 'Click spin to generate'}
                    </Typography>
                  </motion.div>
                </AnimatePresence>
              </Paper>
            </Box>
          </Box>

          {/* Second Row */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Dress Section */}
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ mb: 1, color: theme.palette.text.secondary, fontSize: '0.9rem' }}>
                👗 Dress
              </Typography>
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 1.5, 
                  minHeight: 100,
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
                    key={displayDress || 'empty'}
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
                      variant="h6" 
                      sx={{ 
                        color: displayDress ? theme.palette.primary.main : theme.palette.text.disabled,
                        fontWeight: 'medium',
                        fontSize: '0.9rem'
                      }}
                    >
                      {displayDress || 'Click spin to generate'}
                    </Typography>
                  </motion.div>
                </AnimatePresence>
              </Paper>
            </Box>

            {/* State Section */}
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ mb: 1, color: theme.palette.text.secondary, fontSize: '0.9rem' }}>
                🎭 Mood
              </Typography>
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 1.5, 
                  minHeight: 100,
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
                    key={displayState || 'empty'}
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
                      variant="h6" 
                      sx={{ 
                        color: displayState ? theme.palette.primary.main : theme.palette.text.disabled,
                        fontWeight: 'medium',
                        fontSize: '0.9rem',
                        textAlign: 'center'
                      }}
                    >
                      {displayState || 'Click spin to generate'}
                    </Typography>
                  </motion.div>
                </AnimatePresence>
              </Paper>
            </Box>
          </Box>
        </Box>

        {/* Date Sentence Display */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              background: `linear-gradient(135deg, ${theme.palette.secondary.light}20, ${theme.palette.primary.light}20)`,
              border: `2px solid ${theme.palette.secondary.main}30`,
              borderRadius: 3,
              minHeight: 200
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                color: theme.palette.secondary.main,
                fontWeight: 'medium',
                fontStyle: 'italic',
                lineHeight: 1.4
              }}
            >
              {isSpinning ? (
                <>
                  🎰 <span style={{ opacity: 0.8 }}>Spinning up the perfect date...</span> 🎰
                  <br />
                  <span style={{ fontSize: '0.9rem', opacity: 0.6 }}>
                    {(() => {
                      const funnyPlaceholders = [
                        "Consulting the dating gods...",
                        "Asking the universe for romance...",
                        "Channeling my inner cupid...",
                        "Summoning date inspiration...",
                        "Rolling the dice of love...",
                        "Consulting the ancient texts of romance...",
                        "Asking Siri for dating advice...",
                        "Channeling my grandmother's wisdom...",
                        "Summoning the spirit of romance...",
                        "Rolling for charisma..."
                      ];
                      return funnyPlaceholders[Math.floor(Math.random() * funnyPlaceholders.length)];
                    })()}
                  </span>
                </>
              ) : (
                dateSentence || "Click 'GENERATE DATE!' to create your perfect date scenario! ✨"
              )}
            </Typography>
          </Paper>
        </Box>

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
            {isSpinning ? '🎰 SPINNING...' : '🎲 GENERATE DATE!'}
          </Button>
        </motion.div>
      </Paper>
    </motion.div>
  );
};

export default DateGenerator; 