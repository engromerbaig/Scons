import { motion } from "framer-motion";
import Heading from "../Heading/Heading";
import AnimatedHeading from "./AnimatedHeading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";
import logoData from "./modules/logoData";
import './index.css';
import Button from "../Button/Button";
import SplideCarousel from "../SplideCarousel/SplideCarousel";
import FadeWrapper from "../../utilities/Animations/FadeWrapper";
import { useVhVariable } from "../../utilities/useVhVariable";
import React, { useRef } from 'react';


const Hero = () => {

  const heroRef = useRef(null);
  useVhVariable(heroRef);


  // Extract image URLs from logoData
  const logoImages = logoData.map((logoItem) => logoItem.image);

  return (
    <div ref={heroRef} className="w-full min-h-screen flex flex-col shadow-custom-bottom bg-white relative">
      
      {/* Background Image */}
      <div 
        className="absolute bottom-0 left-0 w-full h-full bg-no-repeat bg-bottom bg-cover pointer-events-none z-0"
        style={{ 
          backgroundImage: `url(/iso.webp)`,
          opacity: 0.04
        }}
      />

      {/* Globe Image above background */}
      <img
        src="/globe.svg"
        alt="Globe Background"
        className="hidden lg:block absolute top-0 right-[-20%] h-full w-auto opacity-15 object-contain pointer-events-none z-10 svg-neon"
        loading="lazy"
      />

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex flex-col">
        <div
          className={`${theme.layoutPages.paddingHorizontal} w-full flex-1 flex items-center justify-center relative`}
        >
          <div className="w-full max-w-4xl text-left relative z-30">
            <FadeWrapper order={1}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="mb-4">
                  <AnimatedHeading
                    prefixText="We are"
                    animatedWords={["Software", "Web", "App", "IT", "AI"]}
                    suffixText="Development Experts"
                    color="text-black"
                    fontWeight="font-black"
                    className="leading-none"
                    centered={false}
                  />
                </div>
              </motion.div>
            </FadeWrapper>

            <div>
              <BodyText
                text="Scons Tech is a modern software company, built on over a decade of engineering experience at Econs. We craft scalable websites, web apps, and digital platforms for startups and growing businesses."
                centered={false}
                color="text-black"
                className="max-w-2xl"
              />
            </div>

            <FadeWrapper order={2}>
              <div className="flex items-center gap-x-2 xl:gap-x-6 mt-4 relative z-40">
                <Button
                  name="Free Consultation"
                  fontSize="text-sm xl:text-base"
                  textColor="black"
                  bgColor="bg-neon"
                  className="mt-4"
                  link="/schedule-a-meeting"
                />

                <Button
                  name="Our Projects"
                  fontSize="text-sm xl:text-base"
                  textColor="black"
                  fontWeight="font-black"
                  bgColor="bg-transparent"
                  hoverBgColor="bg-transparent"
                  hoverTextColor="black"
                  className="mt-4 px-4 py-2 border-b-4 border-neon rounded-none shadow-none"
                  onClick={() => {
                    const el = document.getElementById("projects");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  shadow="shadow-none"
                />
              </div>
            </FadeWrapper>
          </div>
        </div>

        {/* Bottom Clients Carousel */}
        <div className="absolute bottom-0 left-0 w-full h-[15vh] flex flex-col lg:flex-row items-center z-30">
          <div className="w-full h-full flex flex-col gap-y-6">
            <div className="flex items-center gap-2 pl-2">
              <span className="w-2 h-2 rounded-full bg-neon" />
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

            <FadeWrapper order={3}>
              <SplideCarousel
                images={logoImages}
                direction="ltr"
                speed={1}
                perPage={5}
                height="35px"
                gap="1rem"
                pauseOnHover={false}
                className="w-full h-[35px] overflow-hidden"
                haveBorder={false}
                objectFit="contain"
                imageRound="rounded-none"
                mobilePerPage={2}
                showLoader={false}
              />
            </FadeWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
