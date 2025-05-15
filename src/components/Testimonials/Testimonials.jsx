import React, { useEffect, useState } from "react";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";
import TestimonialBox from "./TestimonialBox";
import testimonials from "./testimonialsData";
import clutchLogo from "../../assets/icons/reviews/1.svg";
import trustLogo from "../../assets/icons/reviews/2.svg";

const getRandomTestimonials = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [randomTestimonials, setRandomTestimonials] = useState([]);

  useEffect(() => {
    setRandomTestimonials(getRandomTestimonials(testimonials, 4));
  }, []);

  return (
    <div
      className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} bg-black flex flex-col items-center min-h-screen`}
    >
      <div className="flex flex-col justify-center items-center w-full mb-8">
        <Heading text="What Our Clients Say" color="text-white" centered={false} />
        <BodyText
          text="Discover how our innovative solutions have transformed businesses and empowered growth."
          centered={false}
          color="text-white"
        />
      </div>

      <div className="flex flex-row justify-center items-center gap-10 w-full mb-8">
        <img src={clutchLogo} alt="clutch logo" className="w-[8%]" loading='lazy' />
        <img src={trustLogo} alt="trust logo" className="w-[10%]" loading='lazy' />
      </div>

      <div
        className="w-full flex flex-col gap-8 items-center transition-all duration-300 ease-in-out"
        style={{ minHeight: "500px" }}
      >
        {randomTestimonials.map((t, i) => (
          <TestimonialBox
            key={i}
            {...t}
            index={i}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
