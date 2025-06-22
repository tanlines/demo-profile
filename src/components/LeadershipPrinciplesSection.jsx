import { Box, Typography, Grid, Chip, Tooltip } from '@mui/material';
import { useHighlight } from '../context/HighlightContext';
import { situations } from '../data/situations';

const leadershipPrinciples = [
  'Customer Obsession',
  'Ownership',
  'Invent and Simplify',
  'Are Right A Lot',
  'Learn and Be Curious',
  'Hire and Develop the Best',
  'Insist on the Highest Standards',
  'Think Big',
  'Bias for Action',
  'Frugality',
  'Earn Trust',
  'Dive Deep',
  'Have Backbone; Disagree and Commit',
  'Deliver Results',
  'Strive to be Earth\'s Best Employer',
  'Success and Scale Bring Broad Responsibility'
];

function LeadershipPrinciplesSection() {
  const { setHighlightedPrinciple } = useHighlight();

  // Calculate count for each principle
  const getPrincipleCount = (principle) => {
    return situations.reduce((count, situation) => {
      return count + (situation.principles.some(p => p.toLowerCase() === principle.toLowerCase()) ? 1 : 0);
    }, 0);
  };

  // Create array with principles and their counts, then sort by count
  const principlesWithCounts = leadershipPrinciples
    .map(principle => ({
      name: principle,
      count: getPrincipleCount(principle)
    }))
    .sort((a, b) => b.count - a.count); // Sort by count descending

  const handlePrincipleHover = (principle) => {
    setHighlightedPrinciple(principle);
  };

  const handlePrincipleLeave = () => {
    setHighlightedPrinciple(null);
  };

  const scrollToSection = (principle) => {
    // Find the first situation that contains this principle
    const matchingSituationIndex = situations.findIndex(situation => 
      situation.principles.some(p => p.toLowerCase() === principle.toLowerCase())
    );

    if (matchingSituationIndex !== -1) {
      // Scroll to the specific situation
      const situationElement = document.getElementById(`situation-${matchingSituationIndex}`);
      if (situationElement) {
        const navBarHeight = 64 * 2; // Standard MUI AppBar height
        const elementPosition = situationElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navBarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }

      // Set the highlighted principle to trigger the highlighting effect
      setHighlightedPrinciple(principle);
      
      // Add a small delay to ensure the scroll completes before highlighting
      setTimeout(() => {
        setHighlightedPrinciple(principle);
      }, 500);
    }
  };

  return (
    <Box mb={4}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Leadership Principles
      </Typography>
      <Grid container spacing={1}>
        {principlesWithCounts.map(({ name, count }) => {
          const isDisabled = count === 0;
          
          return (
            <Grid item key={name}>
              <Tooltip 
                title={isDisabled 
                  ? `${name} (no situations available)` 
                  : `Click to view ${name} situations (${count} situation${count !== 1 ? 's' : ''})`
                }
                placement="top"
              >
                <Chip
                  label={`${name} (${count})`}
                  color="primary"
                  variant="outlined"
                  disabled={isDisabled}
                  sx={{ 
                    cursor: isDisabled ? 'default' : 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    opacity: isDisabled ? 0.5 : 1,
                    '&:hover': {
                      transform: isDisabled ? 'none' : 'translateY(-2px)',
                      boxShadow: isDisabled ? 0 : 2
                    }
                  }}
                  onMouseEnter={() => !isDisabled && handlePrincipleHover(name)}
                  onMouseLeave={() => !isDisabled && handlePrincipleLeave()}
                  onClick={() => !isDisabled && scrollToSection(name)}
                />
              </Tooltip>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default LeadershipPrinciplesSection; 