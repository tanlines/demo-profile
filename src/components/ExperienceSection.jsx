import { Box, Typography, Chip, Stack, Collapse, Button } from '@mui/material';
import { useState } from 'react';
import { useHighlight } from '../context/HighlightContext';
import { experiences } from '../data/experiences';

function ExperienceSection() {
  const { highlightedSkill } = useHighlight();
  const [expandedItems, setExpandedItems] = useState({});

  const isHighlighted = (experience) => {
    if (!highlightedSkill) return false;
    return experience.technologies.some(tech => 
      tech.toLowerCase() === highlightedSkill.name.toLowerCase()
    );
  };

  const handleExpandClick = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const renderDetailsSection = (details) => {
    if (!details || !Array.isArray(details)) return null;

    return (
      <Box mt={2}>
        {details.map((section, sectionIndex) => (
          <Box key={sectionIndex} mb={2}>
            <Typography variant="subtitle2" color="primary" fontWeight={600} gutterBottom>
              {section.title}:
            </Typography>
            {section.items.map((item, itemIndex) => (
              <Typography key={itemIndex} variant="body2" sx={{ ml: 2, mb: 0.5 }}>
                • {item}
              </Typography>
            ))}
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box mb={4}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Experience
      </Typography>
      {experiences.map((exp, index) => (
        <Box 
          key={exp.title}
          mb={2}
          id={exp.title.toLowerCase().replace(/\s+/g, '-')}
          sx={{
            p: 2,
            borderRadius: 1,
            transition: 'all 0.3s ease-in-out',
            bgcolor: isHighlighted(exp) ? 'action.hover' : 'transparent',
            transform: isHighlighted(exp) ? 'scale(1.02)' : 'scale(1)',
            boxShadow: isHighlighted(exp) ? 2 : 0
          }}
        >
          <Typography variant="h6">{exp.title}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {exp.company} | {exp.period}
          </Typography>
          
          <Typography variant="body1" mt={1}>
            {exp.description.map((item, i) => (
              <Box key={i} component="span" display="block">
                - {item}
              </Box>
            ))}
          </Typography>
          
          <Collapse in={expandedItems[index]} timeout="auto" unmountOnExit>
            {renderDetailsSection(exp.details)}
          </Collapse>
          
          <Box mt={2}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Technologies Used:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {exp.technologies.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  size="small"
                  variant="outlined"
                  sx={{ 
                    m: 0.5,
                    bgcolor: isHighlighted(exp) && tech.toLowerCase() === highlightedSkill?.name.toLowerCase()
                      ? 'primary.main'
                      : 'transparent',
                    color: isHighlighted(exp) && tech.toLowerCase() === highlightedSkill?.name.toLowerCase()
                      ? 'primary.contrastText'
                      : 'inherit'
                  }}
                />
              ))}
            </Stack>
          </Box>
          
          {exp.details && (
            <Box mt={2} display="flex" justifyContent="flex-start">
              <Button
                onClick={() => handleExpandClick(index)}
                variant="text"
                size="small"
                sx={{ 
                  textTransform: 'none',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText'
                  }
                }}
              >
                {expandedItems[index] ? "See less" : "See more"}
              </Button>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}

export default ExperienceSection; 