import React, { useEffect, useMemo } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/react-splide/css";

const SplideCarousel = ({
  images = [],
  direction = "ltr",
  speed = 1,
  perPage = 2, // Default for desktop
  mobilePerPage = 1, // Default for mobile
  height = "400px",
  gap = "1rem",
  pauseOnHover = false,
  className = "",
  haveBorder = true,
  objectFit = "cover",
  imageRound = "rounded-3xl",
  imageSize = "w-full h-full",
}) => {
  const uniqueId = useMemo(
    () => `splide-carousel-${Math.random().toString(36).substring(2, 9)}`,
    []
  );

  useEffect(() => {
    const logOptions = () => {
      const width = window.innerWidth;
      let activePerPage = width <= 768 ? mobilePerPage : perPage;
      console.log(`Viewport width: ${width}px`);
      console.log(`Active perPage: ${activePerPage}`);
    };
    logOptions();
    window.addEventListener("resize", logOptions);
    return () => window.removeEventListener("resize", logOptions);
  }, [perPage, mobilePerPage]);

  return (
    <div className={`pb-10 xl:pb-20 ${className} ${uniqueId}`}>
      <style>
        {`
          .${uniqueId} .splide__track {
            overflow: visible;
          }
          .${uniqueId} .splide__slide {
            height: ${height};
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .${uniqueId} .splide__slide img {
            width: 100%;
            height: 100%;
            object-fit: ${objectFit};
            ${haveBorder ? "border: 4px solid #26292D;" : ""}
          }
          @media (max-width: 768px) {
            .${uniqueId} .splide__slide {
              height: ${height};
            }
          }
        `}
      </style>
      <Splide
        options={{
          type: "loop",
          perPage: perPage,
          perMove: 1,
          arrows: false,
          pagination: false,
          gap: gap,
          direction: direction,
          autoScroll: {
            speed: speed,
            pauseOnHover: pauseOnHover,
            autoStart: true,
          },
          autoWidth: false,
          height: height,
          breakpoints: {
            768: {
              perPage: mobilePerPage,
              gap: "1rem", // Adjusted gap for mobile
            },
          },
          focus: "center",
        }}
        extensions={{ AutoScroll }}
        aria-label="Project Images Carousel"
      >
        {images.map((image, index) => (
          <SplideSlide key={index}>
            <div style={{ height, width: "100%" }}>
              <img
                src={image}
                alt={`Carousel image ${index + 1}`}
                className={`${imageSize} ${imageRound}`}
                style={{ objectFit }}
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default SplideCarousel;