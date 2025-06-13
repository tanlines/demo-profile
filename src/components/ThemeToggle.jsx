import { useState } from 'react';
import { 
  IconButton, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText,
  Tooltip
} from '@mui/material';
import {
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
  SettingsBrightness as SystemIcon,
  Palette as ThemeIcon
} from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { mode, toggleTheme } = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (newMode) => {
    toggleTheme(newMode);
    handleClose();
  };

  const getCurrentIcon = () => {
    switch (mode) {
      case 'dark':
        return <DarkIcon />;
      case 'light':
        return <LightIcon />;
      default:
        return <SystemIcon />;
    }
  };

  return (
    <>
      <Tooltip title="Change theme">
        <IconButton
          color="inherit"
          onClick={handleClick}
          sx={{ ml: 1 }}
        >
          {getCurrentIcon()}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleThemeChange('light')}>
          <ListItemIcon>
            <LightIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Light</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleThemeChange('dark')}>
          <ListItemIcon>
            <DarkIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Dark</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleThemeChange('system')}>
          <ListItemIcon>
            <SystemIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>System</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

export default ThemeToggle; 