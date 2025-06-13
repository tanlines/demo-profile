import { Box, Typography, Avatar, useTheme } from '@mui/material';

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
        src="/profile.jpg"
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
          mx: 'auto'
        }}
      >
        Created using Cursor AI
      </Typography>
    </Box>
  );
}

export default ProfileSection; 