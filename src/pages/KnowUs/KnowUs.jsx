import React, { useRef, useEffect, useState } from "react";

import Heading from "../../components/Heading/Heading";
import BodyText from "../../components/BodyText/BodyText";
import Vision from "../../components/Vision/Vision";
import { visionMissionData } from "../../components/Vision/visionMissionData";

import Collage from "../../components/Collage/Collage";
import InnerHero from "../../components/InnerHero/InnerHero";
import AnimatedBackground from "../../utilities/AnimatedBackground/AnimatedBackground";
import { visionData } from "./visionData";
import GreenBelt from "../../components/GreenBelt/GreenBelt";

import handImage from "../../assets/images/about/hand.webp";
import ballImage from "../../assets/images/about/ball.webp";
import logoImage from "../../assets/images/about/logo.svg";
import officeImage from "../../assets/images/about/office.webp";

import heroImage from "../../assets/images/about/about.png";

import StartProjectBelt from "../../components/StartProjectBelt/StartProjectBelt";

import ceoImage from "../../assets/images/about/ceo.jpeg";

import { theme } from "../../theme";
import Highlights from "../../components/UniqueApproach/modules/Highlights";

import HeadingWithText from "../../utilities/HeadingWithText";
import MessageBox from "../../components/MessageBox/MessageBox";

import Industries from "../../components/Industries/Industries";
import Locations from "../../components/Locations/Locations";
import Testimonials from "../../components/Testimonials/Testimonials";
import Technologies from "../../components/Technologies/Technologies";

import knowUsMarqueeItems from "./knowUsMarquee";

const KnowUs = () => {
  // Ref and state for intersection observer
  const officeImgRef = useRef(null);
  const [isScaled, setIsScaled] = useState(false);

  useEffect(() => {
    const img = officeImgRef.current;
    if (!img) return;

    let timeout = null;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5) {
          // Scale up immediately
          if (timeout) clearTimeout(timeout);
          setIsScaled(true);
        } else {
          // Add a slight delay before unscaling for smoothness
          timeout = setTimeout(() => setIsScaled(false), 120);
        }
      },
      {
        threshold: [0, 0.5, 1],
      }
    );

    observer.observe(img);

    return () => {
      observer.disconnect();
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {/* Inner Hero Section */}
      <InnerHero
        logoImage={logoImage}
        headingText="About Scons & The Journey So Far"
        spanText="Scons"
        bodyText="Scons is a dynamic tech powerhouse, delivering innovative software solutions worldwide."
        logoIsWhite={true}
        showBottomShadow={true}

        showCarousel={false}
      />

      <div
        className={`${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal} `}
      >
        {/* Image container - centers image */}
        <div className="flex justify-center mb-6">
          <img
            ref={officeImgRef}
            src={officeImage}
            alt="Office"
            className="w-full rounded-3xl"
            style={{
              transform: isScaled ? "scale(1.1)" : "scale(1)",
              transition:
                "transform 1.2s cubic-bezier(0.22, 0.61, 0.36, 1)",
              willChange: "transform",
            }}
          />
        </div>

        {/* Text container - left aligned */}
        <div className="flex flex-col items-start gap-y-6 pt-10">
          <HeadingWithText
            heading="Building software for global leaders"
            body="At Scons, we envision a world where technology seamlessly integrates into every aspect of life, empowering individuals and businesses to achieve their fullest potential. We strive to be at the forefront of innovation, creating solutions that not only meet the needs of today but also anticipate the challenges of tomorrow."
          />

          <Highlights />
        </div>
      </div>

      <MessageBox
        Message="We are a team of passionate individuals who believe in the power of technology to transform lives. Our mission is to create innovative solutions that make a difference."
        Name="Seth Faraz"
        Designation="CEO, Scons Tech"
        ProfileDisplay={ceoImage}
      />

      <Industries />
      <Technologies />

      <Vision />

      <Locations />
      <StartProjectBelt />

      <Testimonials />
    </>
  );
};

export default KnowUs;
