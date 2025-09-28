import { Box } from '@mui/material';

import React, { useEffect, useRef } from 'react';
import DatingProfile from '../components/DatingProfile';
import useDiscordWebhook from '../hooks/useDiscordWebhook';

const Home = () => {
  // Use the Discord webhook hook for page load message
  const { sendMessage } = useDiscordWebhook();

  // Ref to track if the message has already been sent
  const messageSentRef = useRef(false);

  // Send a message once when the page is loaded
  useEffect(() => {
    // Check if URL has "me" parameter
    const urlParams = new URLSearchParams(window.location.search);
    const hasMeParam = urlParams.has('me');
    
    // Only send if we haven't sent already, we're not in development mode, and no "me" parameter
    if (messageSentRef.current || import.meta.env.DEV || hasMeParam) return;

    const sendPageLoadMessage = async () => {
      try {
        await sendMessage('🌐 Someone visited the dating profile!');
        messageSentRef.current = true; // Mark as sent
      } catch (error) {
        console.log('Failed to send page load message:', error);
      }
    };

    // Send message after a short delay to ensure page is fully loaded
    const timer = setTimeout(sendPageLoadMessage, 2000);
    
    return () => clearTimeout(timer);
  }, [sendMessage]);

  return (
    <>
      <DatingProfile />
    </>
  );
};

export default Home; 