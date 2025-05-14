import React, { useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/react-splide/css";

const HorizontalListView = ({
  children,
  className = "",
  autoPlay = false,
  loop = false,
  perPage = 3, // Default: show 3 items at a time
  gap = "1.5rem", // Default gap between slides
  height = "auto", // Default height (auto for flexible content)
  pauseOnHover = false, // Default: no pause on hover
}) => {
  // Debug: Log Splide options
  useEffect(() => {
    const logOptions = () => {
      console.log(`HorizontalListView perPage: ${perPage}`);
      console.log(`Viewport width: ${window.innerWidth}px`);
      console.log(`autoPlay: ${autoPlay}, loop: ${loop}`);
    };
    logOptions();
    window.addEventListener("resize", logOptions);
    return () => window.removeEventListener("resize", logOptions);
  }, [perPage, autoPlay, loop]);

  // Convert children to an array and ensure each has a unique key
  const slides = React.Children.toArray(children);

  return (
    <div className={`w-full pb-8 ${className}`}>
      <style>
        {`
          .splide__track {
            overflow: hidden;
          }
          .splide__slide {
            height: ${height};
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .splide__list {
            display: flex;
            flex-wrap: nowrap;
          }
          .splide__slide > * {
            width: 100%;
            height: 100%;
          }
          @media (max-width: 640px) {
            .splide__slide {
              width: 100% !important;
            }
          }
        `}
      </style>
      <Splide
        options={{
          type: loop ? "loop" : "slide", // 'loop' or 'slide' based on prop
          perPage,
          perMove: 1,
          gap,
          height,
          arrows: false, // No arrows by default
          pagination: false, // No pagination dots
          drag: true, // Enable drag-to-scroll
          autoScroll: autoPlay
            ? {
                speed: 1, // Positive for left-to-right
                pauseOnHover,
                autoStart: true,
              }
            : undefined, // Only enable autoScroll if autoPlay is true
          breakpoints: {
            640: {
              perPage: 2, // 1 item on mobile
            },
            768: {
              perPage: Math.min(2, perPage), // Up to 2 items on tablets
            },
            1024: {
              perPage, // Use prop-defined perPage on desktop
            },
          },
        }}
        extensions={autoPlay ? { AutoScroll } : undefined} // Only load AutoScroll if autoPlay is enabled
        aria-label="Horizontal List View"
      >
        {slides.map((child, index) => (
          <SplideSlide key={index}>
            {child}
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default HorizontalListView;