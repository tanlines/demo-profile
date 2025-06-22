import { Container, Box } from '@mui/material';
import LeadershipPrinciplesSection from '../components/LeadershipPrinciplesSection';
import SituationsSection from '../components/SituationsSection';
import SectionNavigation from '../components/SectionNavigation';
import { HighlightProvider } from '../context/HighlightContext';

function Star() {
  return (
    <HighlightProvider>
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <SectionNavigation />
          <Box id="leadership-principles">
            <LeadershipPrinciplesSection />
          </Box>
          <Box id="situations">
            <SituationsSection />
          </Box>
        </Box>
      </Container>
    </HighlightProvider>
  );
}

export default Star; 