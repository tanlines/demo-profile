import { Box, Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const sections = [
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' }
];

function SectionNavigation() {
  const theme = useTheme();

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
    <Box 
      sx={{ 
        position: 'sticky',
        top: 64, // AppBar height
        zIndex: theme.zIndex.appBar - 1,
        backgroundColor: theme.palette.background.paper,
        borderBottom: 1,
        borderColor: 'divider',
        py: 1,
        mb: 3
      }}
    >
      <Stack 
        direction="row" 
        spacing={2} 
        justifyContent="center"
        sx={{ maxWidth: '100%', overflowX: 'auto', px: 2 }}
      >
        {sections.map((section) => (
          <Button
            key={section.id}
            variant="text"
            onClick={() => scrollToSection(section.id)}
            sx={{
              whiteSpace: 'nowrap',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                transform: 'translateY(-1px)',
                transition: 'transform 0.2s ease-in-out'
              }
            }}
          >
            {section.label}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}

export default SectionNavigation; 