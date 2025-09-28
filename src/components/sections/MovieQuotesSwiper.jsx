import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { motion } from 'framer-motion';

// {
//     quote: <>
//       {"May the "}
//       <motion.span
//         style={{ display: 'inline-block' }}
//         animate={{ y: [0, -6, 0] }}
//         transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
//       >
//         Force
//       </motion.span>
//       {" be with you."}
//     </>,
//     background: "moviememe/force.jpg"
//   },
const quotes = [
  {
    quote: "Stop trying. Take long walks. Look at the scenery. Doze off at noon. Don't even think about flying. And then, pretty soon you'll be flying again",
    background: "moviememe/kiki.webp",
    name: "Kiki's Delivery Service",

  },
  {
    quote: "Whoo! Sign me up for the next war.",
    background: "moviememe/mulan.webp",
    name: "Mulan"
  },
  {
    quote: "Death isn't the only goodbye in this life",
    background: "moviememe/frieren.webp",
    name: "Frieren: Beyond Journey's End"
  },
  {
    quote: "Get busy living, or get busy dying",
    background: "moviememe/shawshank.webp",
    name: "Shawshank Redemption"
  },
  {
    quote: "Once an idea has taken hold of the brain, it's almost impossible to eradicate",
    background: "moviememe/inception.webp",
    name: "Inception"
  }
];

function MovieQuotesSwiper({ height = '60vh' }) {
  const theme = useTheme();
  if (!Array.isArray(quotes) || quotes.length === 0) {
    return null;
  }

  return (
    <Swiper
      direction="horizontal"
      scrollbar={{ hide: true }}
      modules={[Scrollbar]}
      style={{ width: '100%', height: '100%' }}
    >
      {quotes.map((item, index) => (
        <SwiperSlide key={index}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              backgroundImage: item.background ? `url(${item.background})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              '&::before': item.background ? {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                zIndex: 1
              } : {}
            }}
          >
            <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
              <Typography
                variant="h4"
                align="center"
                sx={{
                  color: theme.palette.mode === 'dark' ? 'white' : 'black',
                  fontStyle: 'italic',
                  maxWidth: 900,
                  whiteSpace: 'pre-wrap',
                  overflowWrap: 'anywhere',
                  wordBreak: 'normal',
                  mx: 3,
                  textShadow: item.background ? '2px 2px 4px rgba(0,0,0,0.8)' : 'none',
                  mb: 2
                }}
              >
                {item.quote}
              </Typography>
              {item.name && (
                <Typography
                  variant="h6"
                  align="center"
                  sx={{
                    color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
                    fontSize: '1rem',
                    fontWeight: 400,
                    textShadow: item.background ? '1px 1px 2px rgba(0,0,0,0.8)' : 'none'
                  }}
                >
                  — {item.name}
                </Typography>
              )}
            </Box>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MovieQuotesSwiper;


