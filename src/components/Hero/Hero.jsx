import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Heading from "../Heading/Heading";
import AnimatedHeading from "./AnimatedHeading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";
import logoData from "./modules/logoData";
import ChatModal from "../ChatModal/ChatModal";
import './index.css';
import GlobeImage from "../../assets/images/globe.svg";
import Button from "../Button/Button";
import patternImage from "../../assets/images/cube.png";
import SplideCarousel from "../SplideCarousel/SplideCarousel";
import rocketImage from "../../assets/icons/rocket.svg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const rocketRef = useRef(null); // Reference to the rocket image

  // Extract image URLs from logoData
  const logoImages = logoData.map((logoItem) => logoItem.image);

  useEffect(() => {
    const rocket = rocketRef.current;

    if (rocket) {
      gsap.fromTo(
        rocket,
        {
          x: 0,
          y: 0,
          opacity: 0.9,
        },
        {
          x: 300, // Move 200px to the right
          y: -150, // Move 100px upwards
          opacity: 0, // Fade out completely
          ease: "power2.out",
          scrollTrigger: {
            trigger: rocket,
            start: "top bottom", // Start animation when rocket enters viewport
            end: "bottom top", // End when rocket leaves viewport
            scrub: 1, // Smoothly tie animation Greer to scroll
            markers: false, // Set to true for debugging
          },
        }
      );
    }

    // Cleanup ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col shadow-custom-bottom bg-white relative">
      {/* Hero Section (100vh) */}
      <div 
        className="relative w-full h-screen overflow-hidden bg-repeat"
        style={{ 
          backgroundImage: `url(${patternImage})`,
          backgroundSize: '100px 100px', // Adjust size to ensure seamless repeating
          loading:"eager"
        }}
      >
        {/* Globe Image */}
        <img
          src={GlobeImage}
          alt="Globe Background"
          className="absolute top-0 right-[-20%] h-full w-auto opacity-15 object-right object-contain pointer-events-none z-10 "
                          loading="lazy"  // Changed from eager to lazy

        />

        {/* Content */}
        <div
          className={`${theme.layoutPages.paddingHorizontal} w-full h-full flex items-center justify-center relative z-20`}
        >
          {/* Centered text container */}
          <div className="w-full max-w-4xl text-left">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <div className="mb-4">
                <AnimatedHeading
                  prefixText="We are a"
                  animatedWords={["Software", "App", "IT", "Web", "AI"]}
                  suffixText="Development Company"
                  color="text-black"
                  fontWeight="font-black"
                  className="leading-none"
                  centered={false}
                />
              </div>

              <div>
                <BodyText
                  text="We are your trusted development partner with just one goal in focus - to build products that generate a lasting, profitable impact."
                  centered={false}
                  color="text-black"
                />
              </div>

              <div className="flex items-center gap-x-4 xl:gap-x-6 mt-4">
                <Button
                  name="Contact Us"
                  size="text-sm"
                  textColor="black"
                  fontWeight="font-bold"
                  bgColor="bg-neon"
                  className="mt-4 px-6 py-2"
                  onClick={() => setModalOpen(true)}
                />

                <Button
                  name="Our Projects"
                  size="text-sm"
                  textColor="black"
                  fontWeight="font-black"
                  bgColor="bg-transparent"
                  hoverBgColor="bg-transparent"
                  hoverTextColor="black"
                  className="mt-4 px-4 py-2 border-b-4 border-neon rounded-none shadow-none"
                  onClick={() => setModalOpen(true)}
                />
              </div>  
            </motion.div>
          </div>
        </div>

        {/* Bottom Section (Absolutely Positioned) */}
        <div className="absolute bottom-0 w-full h-[15vh] flex flex-col lg:flex-row items-center z-30">
          {/* Left Half: BodyText with Rocket Image */}
      
          {/* Right Half: SplideCarousel */}
          <div className="w-full  h-full flex flex-col gap-y-6">
            <div className="flex items-center gap-2 pl-2">
              {/* Neon bullet */}
              <span className="w-2 h-2 rounded-full bg-neon" />

              {/* Heading component */}
              <Heading
                text="Clients served by Econs Family."
                spanText="Econs"
                spanColor="text-neon"
                color="text-black"
                fontWeight="font-bold"
                size="text-sm"
                className="leading-none"
                centered={false}
              />
            </div>

            <SplideCarousel
              images={logoImages}
              direction="ltr"
              speed={1}
              perPage={5}
              height="35px"
              gap="1rem"
              pauseOnHover={false}
              className="w-full h-full"
              haveBorder={false}
              objectFit="contain"
              imageRound="rounded-none"
              mobilePerPage={2}
            />
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      <ChatModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Hero;