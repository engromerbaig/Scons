import React, { useEffect } from "react";
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
  // Debug: Log perPage and viewport width
  useEffect(() => {
    const logOptions = () => {
      console.log(`SplideCarousel perPage: ${perPage}`);
      console.log(`Viewport width: ${window.innerWidth}px`);
    };
    logOptions();
    window.addEventListener("resize", logOptions);
    return () => window.removeEventListener("resize", logOptions);
  }, [perPage]);

  return (
    <div className={`py-10 ${className}`}>
      <style>
        {`
          @media (max-width: 640px) {
            .splide__slide {
              width: 100% !important;
            }
            .splide__list {
              display: flex;
              flex-wrap: nowrap;
            }
          }
        `}
      </style>
      <Splide
        options={{
          type: "loop",
          perPage,
          perMove: 1,
          arrows: false,
          pagination: false,
          gap,
          direction: "ltr", // Always ltr for consistency
          autoScroll: {
            speed, // Pass speed directly (positive = left, negative = right)
            pauseOnHover,
            autoStart: true,
          },
          breakpoints: {
            640: {
              perPage: 1, // 1 image per page on mobile (below 640px)
            },
            768: {
              perPage: 1, // Ensure 1 image for slightly larger mobile screens
            },
            1024: {
              perPage: 2, // Explicitly set 2 for larger screens
            },
          },
        }}
        extensions={{ AutoScroll }}
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