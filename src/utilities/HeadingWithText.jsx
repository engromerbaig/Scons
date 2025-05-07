// components/HeadingWithText.jsx

import React from "react";
import Heading from "../components/Heading/Heading";
import BodyText from "../components/BodyText/BodyText";

const textAlignMap = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const itemsAlignMap = {
  left: "items-start",
  center: "items-center",
  right: "items-end",
};

const HeadingWithText = ({
  heading,
  body,
  children,
  gap = "gap-y-4",
  align = "left",
  headingClassName = "",
  bodyClassName = "",
  className = "",
  ...props
}) => {
  return (
    <div
      className={`flex flex-col ${itemsAlignMap[align]} ${gap} ${className}`}
      {...props}
    >
      <Heading
        text={heading}
        className={`${textAlignMap[align]} ${headingClassName}`}
        centered={false}
      />
      <BodyText
        text={body}
        className={`${textAlignMap[align]} ${bodyClassName}`}
        centered={false}

      />
      {children}
    </div>
  );
};

export default HeadingWithText;
