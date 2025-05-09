// Project: Splide Carousel Component
import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/react-splide/css";

const SplideCarousel = ({
  images = [],
  direction = "ltr", // Default: left to right
  speed = 1, // Default scroll speed
  perPage = 2, // Default: show 2 images at a time
  height = "400px", // Default image height
  gap = "1rem", // Default gap between slides
  pauseOnHover = false, // Default: no pause on hover
  className = "", // Additional wrapper classes
}) => {
  return (
    <div className={`py-10 ${className}`}>
      <Splide
        options={{
          type: "loop", // Infinite loop
          perPage, // Number of images to show
          perMove: 1, // Move one image at a time
          arrows: false, // Hide navigation arrows
          pagination: false, // Hide pagination dots
          gap, // Space between slides
          direction, // Text direction (ltr or rtl)
          autoScroll: {
            speed: direction === "rtl" ? -speed : speed, // Reverse speed for right-to-left
            pauseOnHover, // Pause on hover
            autoStart: true, // Start scrolling automatically
          },
        }}
        extensions={{ AutoScroll }} // Register AutoScroll extension
        aria-label="Project Images Carousel"
      >
        {images.map((image, index) => (
          <SplideSlide key={index}>
            <img
              src={image}
              alt={`Carousel image ${index + 1}`}
              className={`w-full h-[${height}] object-cover rounded-3xl border-4 border-black`}
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default SplideCarousel;
