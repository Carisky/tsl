"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from "react";

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
    <div className="p-4">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      <Carousel
        responsive={responsive}
        infinite={true}
        containerClass="custom-carousel"
        itemClass="flex justify-center items-center"
      >
        {images.map((img, index) => (
          <div key={index} className="flex justify-center items-center">
            <div className="aspect-square w-full max-w-[400px] max-h-[400px] md:w-[400px] md:h-[400px]">
              <img
                src={img.image.url}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
