import { Box, Typography, useTheme, Stack } from '@mui/material';
import QuizSection from './QuizSection';
import QuoteBox from './QuoteBox';
import ProfilePicture from './ProfilePicture';
import DateGenerator from './DateGenerator';
import FadeScrollSection from './FadeScrollSection';
import ProfileChipsSection from './ProfileChipsSection';
import WhyWebsiteSection from './WhyWebsiteSection';
import ContactSection from './ContactSection';
// Profile Header Section Component
function ProfileHeaderSection() {
  const theme = useTheme();
  
  return (
      <Stack alignItems="center" width="100%">
        <ProfilePicture />
        <Typography
          variant="h3"
          sx={{
            mb: 1,
            color: 'white',
            textAlign: 'center',
            fontWeight: 300,
            fontFamily: '"Playfair Display", "Georgia", serif',
            fontStyle: 'italic',
            fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.2rem' },
            lineHeight: 1.4,
            position: 'relative',
            px: { xs: 2, sm: 3, md: 4 },
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            '&::before': {
              content: '"',
              fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
              color: 'rgba(255, 255, 255, 0.8)',
              position: 'absolute',
              left: { xs: '-10px', sm: '-15px', md: '0px' },
              top: { xs: '-5px', sm: '-8px', md: '-10px' },
              fontFamily: '"Playfair Display", "Georgia", serif'
            },
            '&::after': {
              content: '"',
              fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
              color: 'rgba(255, 255, 255, 0.8)',
              position: 'absolute',
              right: { xs: '-10px', sm: '-15px', md: '0px' },
              bottom: { xs: '-10px', sm: '-15px', md: '-20px' },
              fontFamily: '"Playfair Display", "Georgia", serif'
            }
          }}
        >
          Dating apps put us in a box. <br/>
          I'd rather make my own box.
        </Typography>
        
        <Typography
          variant="body1"
          sx={{
            mb: 3,
            color: 'white',
            textAlign: 'center',
            maxWidth: 500,
            fontStyle: 'italic',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            px: { xs: 2, sm: 3, md: 0 }
          }}
        >
          This is me without swipes, filters, or word limits
        </Typography>
      </Stack>
  );
}



function ProfileSection() {
  const theme = useTheme();

  return (
    <Box
      data-profile-section
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: theme.palette.background.default,
        position: 'relative',
        zIndex: 10,
        py: 4,
        flexGrow: 1,
        width: '100%'
      }}
    >
      {/* Profile Header Section */}
    <FadeScrollSection sectionNumber={1} color1="rgb(151, 23, 215)" color2="rgb(204, 9, 172)">
      <ProfileHeaderSection />
    </FadeScrollSection>
      
      {/* Profile Chips Section */}
      <FadeScrollSection sectionNumber={2}
        color1="rgb(24, 190, 223)"
        color2="rgb(26, 83, 225)"
      >
        <ProfileChipsSection selectedCategory={"interests"}/>
      </FadeScrollSection>
      
      <FadeScrollSection sectionNumber={3}
        color1="rgb(233, 0, 0)"
        color2="rgb(194, 119, 7)"
      >
        <DateGenerator/>
      </FadeScrollSection>
      
      <FadeScrollSection sectionNumber={4}
        color1="rgb(24, 190, 223)"
        color2="rgb(26, 83, 225)"
      >
        <ProfileChipsSection selectedCategory={"lookingFor"}/>
      </FadeScrollSection>
      
      <FadeScrollSection sectionNumber={5}
        color1="rgb(0, 207, 28)"
        color2="rgb(203, 200, 0)"
      >
        <QuizSection/>
      </FadeScrollSection>
      
      
      <FadeScrollSection sectionNumber={6}
        color1="rgb(207, 21, 0)"
        color2="rgb(203, 200, 0)"
      >
        <ProfileChipsSection selectedCategory={"otherInfo"}/>
      </FadeScrollSection>
      
      <FadeScrollSection sectionNumber={7}
        color1="rgb(0, 97, 207)"
        color2="rgb(108, 0, 203)"
      >
        <QuoteBox/>
      </FadeScrollSection>
      
      <FadeScrollSection sectionNumber={8}
        color1="rgb(0, 229, 225)"
        color2="rgb(0, 189, 19)"
      >
        <WhyWebsiteSection/>
      </FadeScrollSection>
      
      <FadeScrollSection sectionNumber={9}
        color1="rgb(193, 0, 0)"
        color2="rgb(203, 0, 132)"
      >
        <ContactSection/>
      </FadeScrollSection>
    </Box>
  );
}

export default ProfileSection; 