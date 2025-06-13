import { Box, Typography, Grid, Chip, Tooltip } from '@mui/material';
import { useHighlight } from '../context/HighlightContext';
import { extractSkillsFromExperiences } from '../utils/skills';
import { experiences } from '../data/experiences';

function SkillsSection() {
  const { setHighlightedSkill } = useHighlight();
  const skills = extractSkillsFromExperiences(experiences);

  const handleSkillHover = (skill) => {
    setHighlightedSkill(skill);
  };

  const handleSkillLeave = () => {
    setHighlightedSkill(null);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navBarHeight = 64 * 2; // Standard MUI AppBar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navBarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box mb={4}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Skills
      </Typography>
      <Grid container spacing={1}>
        {skills.map(skill => (
          <Grid item key={skill.name}>
            <Tooltip 
              title={`Click to view ${skill.name} experience`}
              placement="top"
            >
              <Chip
                label={skill.name}
                color="primary"
                variant="outlined"
                sx={{ 
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 2
                  }
                }}
                onMouseEnter={() => handleSkillHover(skill)}
                onMouseLeave={handleSkillLeave}
                onClick={() => scrollToSection(skill.relatedSections[0].toLowerCase().replace(/\s+/g, '-'))}
              />
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SkillsSection; 