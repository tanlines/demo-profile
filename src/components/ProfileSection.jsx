import { Box, Typography, Avatar, useTheme, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function ProfileSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: "translateY(-8%)",
        backgroundColor: theme.palette.background.default,
        position: 'relative',
        zIndex: 10
      }}
    >
      <Avatar
        src="https://i.imgur.com/Waw8gNZ.jpeg"
        alt="Profile"
        sx={{
          width: 200,
          height: 200,
          mb: 4,
          border: `4px solid ${theme.palette.primary.main}`,
          boxShadow: theme.shadows[4]
        }}
      />
      <Typography
        variant="h1"
        sx={{
          mb: 2,
          color: theme.palette.text.primary,
          textAlign: 'center',
          fontWeight: 'bold'
        }}
      >
        Vincent Tan
      </Typography>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          color: theme.palette.text.secondary,
          textAlign: 'center'
        }}
      >
        Full Stack Developer
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: theme.palette.text.secondary,
          textAlign: 'center',
          fontStyle: 'italic',
          maxWidth: '600px',
          mx: 'auto',
          mb: 4
        }}
      >
        Site created using Cursor AI
      </Typography>
      <Button
        component={Link}
        to="/resume"
        variant="contained"
        size="large"
        sx={{
          px: 4,
          py: 1.5,
          fontSize: '1.1rem',
          textTransform: 'none',
          borderRadius: 2,
          boxShadow: theme.shadows[4],
          '&:hover': {
            boxShadow: theme.shadows[8],
            transform: 'translateY(-2px)',
            transition: 'all 0.2s ease-in-out'
          }
        }}
      >
        View Resume
      </Button>
    </Box>
  );
}

export default ProfileSection; 