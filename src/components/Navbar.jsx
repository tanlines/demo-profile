import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import useScrollToTop from '../hooks/useScrollToTop';

function Navbar() {
  useScrollToTop();

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 700,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Vincent Tan
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            component={RouterLink}
            to="/"
            color="inherit"
            sx={{ mx: 1 }}
          >
            Home
          </Button>
          <Button
            component={RouterLink}
            to="/resume"
            color="inherit"
            sx={{ mx: 1 }}
          >
            Resume
          </Button>
          <Button
            component={RouterLink}
            to="/star"
            color="inherit"
            sx={{ mx: 1 }}
          >
            STAR
          </Button>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 