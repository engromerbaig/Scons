import React from "react";
import { motion } from "framer-motion";
import Heading from "../Heading/Heading";
import AnimatedHeading from "./AnimatedHeading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";
import logoData from "./modules/logoData";
import './index.css';
import GlobeImage from "../../assets/images/globe.svg";
import Button from "../Button/Button";
import patternImage from "../../assets/images/cube.png";
import SplideCarousel from "../SplideCarousel/SplideCarousel";

const Hero = () => {
  // Extract image URLs from logoData
  const logoImages = logoData.map((logoItem) => logoItem.image);

  return (
    <div className="w-full min-h-screen flex flex-col shadow-custom-bottom bg-white relative">
      {/* Background Layer */}
      <div 
        className="absolute bottom-0 left-0 w-full h-full bg-no-repeat bg-bottom bg-cover pointer-events-none z-0 opacity-100"
        style={{ 
          backgroundImage: `url(${patternImage})`,
          loading: "eager"
        }}
      >
        {/* Globe Image */}
        <img
          src={GlobeImage}
          alt="Globe Background"
          className="absolute top-0 right-[-20%] h-full w-auto opacity-15 object-right object-contain pointer-events-none z-10"
          loading="lazy"
        />
      </div>

      {/* Interactive Content Layer */}
      <div className="relative z-100 min-h-screen flex flex-col">
        {/* Main Content */}
        <div
          className={`${theme.layoutPages.paddingHorizontal} w-full flex-1 flex items-center justify-center relative`}
        >
          {/* Centered text container */}
          <div className="w-full max-w-4xl text-left relative z-110">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <div className="mb-4">
                <AnimatedHeading
                  prefixText="We are"
                  animatedWords={["Software", "Web", "App", "IT", "AI"]}
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

              <div className="flex items-center gap-x-4 xl:gap-x-6 mt-4 relative z-120">
                <Button
                  name="Contact Us"
                  textColor="black"
                  bgColor="bg-neon"
                  className="mt-4"
                  openModal={true}
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
                  onClick={() => {
                    const el = document.getElementById("projects");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  shadow="shadow-none"
                />
              </div>  
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 w-full h-[15vh] flex flex-col lg:flex-row items-center z-100">
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
