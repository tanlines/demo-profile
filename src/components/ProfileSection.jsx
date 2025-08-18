import { Box, Typography, useTheme, Stack } from '@mui/material';
import QuizSection from './QuizSection';
import QuoteBox from './QuoteBox';
import ProfilePicture from './ProfilePicture';
import DateGenerator from './DateGenerator';
import FadeScrollSection from './FadeScrollSection';
import ProfileChipsSection from './ProfileChipsSection';
import WhyWebsiteSection from './WhyWebsiteSection';
import ContactSection from './ContactSection';
import VariableWordFlow from "./VariableWordFlow";
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
          Hello World!
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
          Scroll for more stuff
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
    
      <FadeScrollSection sectionNumber={2}
       color1="rgb(0, 0, 0)" color2="rgb(103, 103, 103)"
      >
          <VariableWordFlow
              text="are you upset with me did I do something wrong I just want to know we’re okay I feel like you’re pulling away can you please just tell me what you’re thinking I hate when I don’t hear from you I keep checking my phone I don’t want to bother you but I need to feel close to you I know I can be too much I just want to feel reassured I’m scared you’ll leave I don’t know if you still want me I feel like I’m not enough I don’t want to lose you I just need to know you still careare you mad at me did I say something wrong I feel like you are far away I just want to be close to you I keep thinking you might leave me I need to know we are okay I feel anxious when you do not reply I wonder if you still care about me I do not know what you are feeling I wish you would talk to me I feel like I am not important to you I am scared you will lose interest I just want to feel safe with you I cannot stop worrying about us I feel like I am chasing you I do not know where I stand with you I keep overthinking everything you say I just want some reassurance from you"
              minFontRem={0.6}
              maxFontRem={3.0}
              packedUnitPx={1}   // 1 = tightest packing
              packedXGapPx={0}
              packedYGapPx={0}
          />
      </FadeScrollSection>
      
      {/* Profile Chips Section */}
      {/* <FadeScrollSection sectionNumber={3}
        color1="rgb(24, 190, 223)"
        color2="rgb(26, 83, 225)"
      >
        <ProfileChipsSection selectedCategory={"interests"}/>
      </FadeScrollSection> */}
      {/* <FadeScrollSection sectionNumber={9}
        color1="rgb(193, 0, 0)"
        color2="rgb(203, 0, 132)"
      >
        <ContactSection/>
      </FadeScrollSection> */}
    </Box>
  );
}

export default ProfileSection; 