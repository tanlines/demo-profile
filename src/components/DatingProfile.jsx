import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import MovieQuotesSwiper from './sections/MovieQuotesSwiper';
import Recipes from './sections/Recipes';
// Profile Header Section Component

function DatingProfile() {
  const theme = useTheme();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Section configuration array
  const sections = [
    {
      component: <Recipes />,
      color1: "rgb(50, 150, 255)",
      color2: "rgb(100, 200, 255)"
    },
  ];

  // Function to render component with active prop
  const renderComponentWithActive = (component, index) => {
    if (!React.isValidElement(component)) return component;
    
    return React.cloneElement(component, { 
      active: index === activeSlideIndex 
    });
  };

  return (
    <Swiper
      direction="vertical"
      scrollbar={{
        hide: true,
      }}
      modules={[Scrollbar]}
      className="mySwiper"
      style={{ height: '100vh' }}
      onSlideChange={(swiper) => setActiveSlideIndex(swiper.activeIndex)}
      initialSlide={0}
    >
      {sections.map((section, index) => (
        <SwiperSlide key={index}>
          <Box
            sx={{
              width: '100vw',
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              backgroundImage: `linear-gradient(45deg, ${section.color1} 30%, ${section.color2} 90%)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(0, 0, 0, 0.7)' 
                  : 'rgba(0, 0, 0, 0.5)'
              }
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2
              }}
            >
              {renderComponentWithActive(section.component, index)}
            </Box>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default DatingProfile; 