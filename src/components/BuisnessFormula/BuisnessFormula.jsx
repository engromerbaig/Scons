import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BusinessFormulaDesktop from "./BusinessFormulaDesktop";
import BusinessFormulaMobile from "./BusinessFormulaMobile";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const BusinessFormula = () => {
  const isMobile = useMediaQuery({ maxWidth: 1024 });

  return (
    <>
      {isMobile ? <BusinessFormulaMobile /> : <BusinessFormulaDesktop />}
    </>
  );
};

export default BusinessFormula;
