import React from "react";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";

const SuccessCard = ({ image, logo, heading, bodyText }) => {
  return (
    <div className="flex flex-col items-start p-4">
      <img src={image} alt="success" className="rounded-3xl  mb-4" />
      <img src={logo} className="w-1/4 mb-4" alt="success logo" />
      <Heading text={heading} size="text-35px" fontWeight="font-semibold" centered={false} />
      <BodyText text={bodyText} size="text-25px" centered={false} />
    </div>
  );
};

export default SuccessCard;
