"use client";

import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box, Divider, Typography, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Image = {
  image: { url: string };
};

type ImageSliderProps = {
  title: string;
  images: Image[];
};

export default function ImageSlider({ title, images }: ImageSliderProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
          <Divider sx={{ height: "2px", backgroundColor: "#029270" }} />
          <Typography variant="h5" sx={{ mt: 2, mb: 2, textAlign: "center", fontWeight: "bold" }}>
            {title}
          </Typography>
          <Divider sx={{ height: "2px", backgroundColor: "#029270" }} />
        </>
      )}
      <Carousel responsive={responsive} infinite containerClass="" itemClass="">
        {images.map((img, index) => (
          <Box
            key={index}
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 400,
                aspectRatio: "1 / 1",
                overflow: "hidden",
                borderRadius: 2,
                cursor: "pointer",
              }}
              onClick={() => setSelectedImage(img.image.url)}
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
      <Modal
        open={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Внешний контейнер - клик по нему закрывает модальное окно */}
        <Box
          onClick={() => setSelectedImage(null)}
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(0, 0, 0, 0.8)",
          }}
        >
          {/* Внутренний контейнер с изображением - клик не закрывает окно */}
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{ position: "relative", outline: "none" }}
          >
            <IconButton
              
              onClick={() => setSelectedImage(null)}
              sx={{ backgroundColor:"#000000", position: "absolute", top: 8, right: 8, zIndex: 1, color: "#fff" }}
            >
              <CloseIcon />
            </IconButton>
            <Box
              component="img"
              src={selectedImage || ""}
              alt="Selected"
              sx={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                objectFit: "contain",
                display: "block",
              }}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
