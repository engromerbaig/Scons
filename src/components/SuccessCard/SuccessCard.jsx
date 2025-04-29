import React from "react";
import { Link } from "react-router-dom";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";

const SuccessCard = ({ image, logo, heading, bodyText, link }) => {
  return (
    <Link to={link || "#"} className="group">
      <div className="flex flex-col items-start p-4">
        <img
          src={image}
          alt="success"
          className="rounded-3xl w-full h-[450px] object-cover mb-4"
        />
        <img src={logo} className="w-1/4 mb-4" alt="success logo" />
        <Heading
          text={heading}
          size="text-35px"
          fontWeight="font-semibold"
          centered={false}
          className="group-hover:underline" // Added underline on hover
        />
        <BodyText text={bodyText} size="text-25px" centered={false} />
      </div>
    </Link>
  );
};

export default SuccessCard;
