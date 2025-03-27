"use client";

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box, Divider, Typography } from "@mui/material";

type Image = {
  image: { url: string };
};

type ImageSliderProps = {
  title: string;
  images: Image[];
};

export default function ImageSlider({ title, images }: ImageSliderProps) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1240 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1240, min: 868 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 868, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <Box sx={{ p: 2 }}>
      {title && (
        <>
        <Divider sx={{height:"2px",backgroundColor:"#029270"}}/>
        <Typography variant="h5" sx={{ mt:2, mb: 2, textAlign:"center", fontWeight: "bold" }}>
          {title}
        </Typography>
        <Divider sx={{height:"2px",backgroundColor:"#029270"}}/>
        </>
      )}
      <Carousel responsive={responsive} infinite containerClass="" itemClass="">
        {images.map((img, index) => (
          <Box
            key={index}
            sx={{
              mt:2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 400,
                aspectRatio: "1 / 1", // сохраняет соотношение сторон 1:1 без растягивания
                overflow: "hidden",
                borderRadius: 2,
              }}
            >
              <Box
                component="img"
                src={img.image.url}
                alt={`Slide ${index + 1}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}
