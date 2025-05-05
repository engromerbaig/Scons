import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";

const SuccessCard = ({ image, logo, heading, bodyText, link }) => {
  const imageRef = useRef(null);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const currentScrollY = window.scrollY;
        const isScrollingDown = currentScrollY > lastScrollY.current;

        // Update last scroll position
        lastScrollY.current = currentScrollY;

        // Check if the image is in the viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
          // Calculate scroll progress within the viewport (0 to 1)
          const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
          // Base translation: 0px to -30px (more noticeable slide up)
          let translateY = -100 * scrollProgress;

          if (isScrollingDown) {
            translateY = Math.max(translateY, -100); // Cap at -60px (up)
          } else {
            translateY = Math.min(0, translateY + 30); // Cap at 0px (down), smoother slide
          }
          

          // Apply smooth transform
          imageRef.current.style.transform = `translateY(${translateY}px)`;
          imageRef.current.style.transition = 'transform 0.15s ease-out'; // Smooth transition
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Link to={link || "#"} className="group">
      <div className="flex flex-col items-start p-4">
        <div className="relative w-full h-[600px] overflow-hidden rounded-3xl mb-4">
          <img
            ref={imageRef}
            src={image}
            alt="success"
            className="w-full h-[115%] object-cover absolute top-0 left-0"
          />
        </div>
        <img src={logo} className="w-1/4 mb-4" alt="success logo" />
        <Heading
          text={heading}
          size="text-35px"
          fontWeight="font-semibold"
          centered={false}
          className="group-hover:underline"
        />
        <BodyText text={bodyText} size="text-25px" centered={false} lineHeight="leading-loose" />
      </div>
    </Link>
  );
};

export default SuccessCard;