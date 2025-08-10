import { Box } from '@mui/material';

import React from 'react';
import ProfileSection from '../components/ProfileSection';
import ScrollSections from '../components/ScrollSections';
import QuizSection from '../components/QuizSection';

const Home = () => {
  return (
    <>
      <ProfileSection />
      <ScrollSections />
    </>
  );
};

export default Home; 