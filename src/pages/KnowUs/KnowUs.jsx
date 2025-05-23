import React, { useRef, useEffect, useState, lazy } from "react";


// Lazy load all components
const Heading = lazy(() => import("../../components/Heading/Heading"));
const BodyText = lazy(() => import("../../components/BodyText/BodyText"));
const Vision = lazy(() => import("../../components/Vision/Vision"));
const Collage = lazy(() => import("../../components/Collage/Collage"));
const InnerHero = lazy(() => import("../../components/InnerHero/InnerHero"));
const AnimatedBackground = lazy(() => import("../../utilities/AnimatedBackground/AnimatedBackground"));
const GreenBelt = lazy(() => import("../../components/GreenBelt/GreenBelt"));
const StartProjectBelt = lazy(() => import("../../components/StartProjectBelt/StartProjectBelt"));
const Highlights = lazy(() => import("../../components/UniqueApproach/modules/Highlights"));
const HeadingWithText = lazy(() => import("../../utilities/HeadingWithText"));
const MessageBox = lazy(() => import("../../components/MessageBox/MessageBox"));
const Industries = lazy(() => import("../../components/Industries/Industries"));
const Locations = lazy(() => import("../../components/Locations/Locations"));
const Testimonials = lazy(() => import("../../components/Testimonials/Testimonials"));
const Technologies = lazy(() => import("../../components/Technologies/Technologies"));
const FadeInSection = lazy(() => import("../../utilities/Animations/FadeInSection"));

// Static imports for non-component data
import logoImage from "../../assets/icons/inner/trustpilot.svg"
import officeImage from "../../assets/images/about/office.webp";
import aboutUsImage from "../../assets/images/about/about.svg";
import ceoImage from "../../assets/images/about/ceo.webp";
import { theme } from "../../theme";
import SkeletonLoader from "../../utilities/SkeletonLoader";

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
      <FadeInSection>
        <InnerHero
          logoImages={[logoImage]} // <-- plural and array
          headingText="About Scons & The Journey So Far"
          spanText="Scons"
          bodyText="Scons is a dynamic tech powerhouse, delivering innovative software solutions worldwide."
          showBottomShadow={true}
          illustrationImage={aboutUsImage}
          illustrationImageWidth="w-3/4"
          showCarousel={false}
        />
      </FadeInSection>

      <FadeInSection>
        <div
          className={`${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal} `}
        >
          {/* Image container - centers image */}
          {/* main image */}
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
      </FadeInSection>

      <MessageBox
        Message={`We are a team of passionate individuals who believe in the power of technology to transform lives. Our transition from the electrical to the IT domain has been nothing short of sensational, fueled by our rapidly growing client base.`}
        Name="Mr. Faraz"
        Designation="Co-Founder, Scons"
        ProfileDisplay={ceoImage}
      />

      <FadeInSection>
        <Industries />
      </FadeInSection>

      <Technologies />

      <FadeInSection>
        <Vision />
      </FadeInSection>

      <Locations />
      <StartProjectBelt />

      <Testimonials />
    </>
  );
};

export default KnowUs;