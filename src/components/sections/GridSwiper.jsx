import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import { Box, Typography } from "@mui/material";
// import required modules
import { Grid, Pagination } from "swiper/modules";

export default function GridSwiper() {
  return (
    <>
      <Swiper
        style={{ height: 1200 }}
        slidesPerView={4}
        grid={{
          rows: 3,
        }}
        spaceBetween={12}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Pagination]}
        className="mySwiper"
      >
        {[...Array(20)].map((x, i) =>
            <SwiperSlide key={i}>
                <Box sx={{ width: '100%', height: '100%' }}>
                    <Typography>Slide {i}</Typography>
                </Box>
            </SwiperSlide>
        )}
      </Swiper>
    </>
  );
}
