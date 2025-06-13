import { Container, Box } from '@mui/material';
import SkillsSection from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';
import EducationSection from '../components/EducationSection';
import SectionNavigation from '../components/SectionNavigation';
import { HighlightProvider } from '../context/HighlightContext';

function Resume() {
  return (
    <HighlightProvider>

      <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <SectionNavigation />
        <Box id="skills">
          <SkillsSection />
        </Box>
        <Box id="experience">
          <ExperienceSection />
        </Box>
        <Box id="education">
          <EducationSection />
        </Box>
      </Box>
    </Container>
    </HighlightProvider>
  );
}

export default Resume; 