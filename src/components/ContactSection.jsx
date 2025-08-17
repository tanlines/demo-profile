import React, { useState } from 'react';
import { Box, Typography, IconButton, TextField, Button, Alert, useTheme } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import useDiscordWebhook from '../hooks/useDiscordWebhook';

const ContactSection = () => {
  const theme = useTheme();
  const [anonymousMessage, setAnonymousMessage] = useState('');
  
  // Use the custom Discord webhook hook
  const { sendMessage, sending, messageSent, error } = useDiscordWebhook();

  // Clear message input after successful sending
  React.useEffect(() => {
    if (messageSent) {
      setAnonymousMessage('');
    }
  }, [messageSent]);

  return (
    <Box
      sx={{
        position: 'relative',
        color: 'white',
        textAlign: 'center',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: { xs: 2, sm: 3, md: 4 },
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 4,
          color: theme.palette.grey[100],
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
          lineHeight: 1.2,
          wordWrap: 'break-word',
          overflowWrap: 'break-word'
        }}
      >
        Contact Me
      </Typography>

      <Box sx={{ zIndex: 2 }}>
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            color: theme.palette.grey[100],
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            lineHeight: 1.5,
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            hyphens: 'auto',
            textAlign: 'center',
            maxWidth: '100%',
            px: { xs: 1, sm: 2 }
          }}
        >
          If you're interested in getting to know me better
        </Typography>
        
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            color: theme.palette.grey[100],
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            lineHeight: 1.5,
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            hyphens: 'auto',
            textAlign: 'center',
            maxWidth: '100%',
            px: { xs: 1, sm: 2 }
          }}
        >
          feel free to reach out on Instagram
        </Typography>
        
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            color: theme.palette.grey[100],
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            lineHeight: 1.5,
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            hyphens: 'auto',
            textAlign: 'center',
            maxWidth: '100%',
            px: { xs: 1, sm: 2 }
          }}
        >
          or leave an anonymous message below
        </Typography>
      </Box>

      {/* Contact Information */}
      <Box
        sx={{
          zIndex: 1,
          mt: 4
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <InstagramIcon 
            sx={{ 
              fontSize: 40, 
              color: '#E91E63',
              mr: 2,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
            }} 
          />
          <Typography
            component="a"
            href="https://instagram.com/vi_ce_t"
            target="_blank"
            rel="noopener noreferrer"
            variant="h5"
            sx={{
              color: '#E91E63',
              fontWeight: 'bold',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
              lineHeight: 1.2,
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              '&:hover': {
                color: '#C2185B',
                transform: 'scale(1.05)',
                textShadow: '0 4px 8px rgba(233, 30, 99, 0.5)',
              }
            }}
          >
            @vi_ce_t
          </Typography>
        </Box>

        {/* Anonymous Message Section */}
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.grey[200],
              mb: 2,
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              lineHeight: 1.4,
              wordWrap: 'break-word',
              overflowWrap: 'break-word'
            }}
          >
            💌 Send me an anonymous message
          </Typography>
          
          {!messageSent ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <TextField
                multiline
                rows={2}
                placeholder="Type your message here (max 100 characters)..."
                value={anonymousMessage}
                onChange={(e) => setAnonymousMessage(e.target.value)}
                disabled={sending}
                inputProps={{ maxLength: 100 }}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    color: theme.palette.grey[100],
                    '& fieldset': {
                      borderColor: theme.palette.grey[600],
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.grey[500],
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#E91E63',
                    },
                  },
                  '& .MuiInputBase-input': {
                    '&::placeholder': {
                      color: theme.palette.grey[400],
                      opacity: 1,
                    },
                  },
                }}
              />
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.grey[400],
                    fontSize: '0.75rem'
                  }}
                >
                  {anonymousMessage.length}/100
                </Typography>
              </Box>
              
              <Button
                variant="contained"
                onClick={() => sendMessage(`💌 **Anonymous Message:** ${anonymousMessage}`)}
                disabled={!anonymousMessage.trim() || anonymousMessage.length > 100 || sending}
                sx={{
                  px: 3,
                  py: 1.5,
                  fontSize: '1rem',
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  '&:hover': {
                    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`
                  }
                }}
              >
                {sending ? 'Sending...' : 'Send Message'}
              </Button>
              
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mt: 1, 
                    width: '100%',
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    color: '#f44336',
                    border: '1px solid rgba(244, 67, 54, 0.3)'
                  }}
                >
                  {error}
                </Alert>
              )}
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <Alert 
                severity="success" 
                sx={{ 
                  width: '100%',
                  mx: 'auto',
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  color: '#4caf50',
                  border: '1px solid rgba(76, 175, 80, 0.3)'
                }}
              >
                ✅ Message sent successfully!
              </Alert>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ContactSection; 