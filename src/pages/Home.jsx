import { Box } from '@mui/material';

import React, { useEffect, useRef } from 'react';
import ProfileSection from '../components/ProfileSection';
import ScrollSections from '../components/ScrollSections';
import QuizSection from '../components/QuizSection';
import useDiscordWebhook from '../hooks/useDiscordWebhook';

const Home = () => {
  // Use the Discord webhook hook for page load message
  const { sendMessage } = useDiscordWebhook();

  // Ref to track if the message has already been sent
  const messageSentRef = useRef(false);

  // Send a message once when the page is loaded
  useEffect(() => {
    // Only send if we haven't sent already
    if (messageSentRef.current) return;

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
      <ProfileSection />
      <ScrollSections />
      <QuizSection />
    </>
  );
};

export default Home; 