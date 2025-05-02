import React from "react";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";
import TestimonialBox from "./TestimonialBox";
import testimonials from "./testimonialsData";

const Testimonials = () => {
  return (
    <div className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} bg-black flex flex-col items-center min-h-screen`}>
      <div className="flex flex-col justify-center items-start w-full mb-8">
        <Heading text="What Our Clients Say" color="text-white" centered={false} />
        <BodyText
          text="Discover how our innovative solutions have transformed businesses and empowered growth."
          centered={false}
          color="text-white"
        />
      </div>
      {/* Testimonials Section */}
      <div className="w-full flex flex-col gap-8 items-center transition-all duration-300 ease-in-out" style={{ minHeight: "500px" }}>
        {testimonials.map((t, i) => (
          <TestimonialBox key={i} {...t} />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
