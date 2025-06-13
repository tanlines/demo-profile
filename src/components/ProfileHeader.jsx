import { Box, Avatar, Typography } from '@mui/material';
import profilePic from '../assets/react.svg';

function ProfileHeader() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
      <Avatar src={profilePic} alt="John Smith" sx={{ width: 120, height: 120, mb: 2 }} />
      <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
        Vincent Tan
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        Professional Resume
      </Typography>
    </Box>
  );
}

export default ProfileHeader; 