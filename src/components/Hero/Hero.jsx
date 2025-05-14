import React, { useState } from "react";
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

const Hero = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  // Extract image URLs from logoData
  const logoImages = logoData.map((logoItem) => logoItem.image);

  return (
    <div className="w-full min-h-screen flex flex-col shadow-custom-bottom bg-white relative">
      {/* Hero Section (100vh) */}
      <div 
        className="relative w-full h-screen overflow-hidden bg-repeat"
        style={{ 
          backgroundImage: `url(${patternImage})`,
          backgroundSize: '100px 100px' // Adjust size to ensure seamless repeating
        }}
      >
        {/* Globe Image */}
        <img
          src={GlobeImage}
          alt="Globe Background"
          className="absolute top-0 right-[-20%] h-full w-auto opacity-15 object-right object-contain pointer-events-none z-10"
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
          {/* Left Half: BodyText */}
          <div className=" w-full lg:w-1/2 h-full flex items-center pl-2 xl:pl-20">
            <BodyText
              text="SOME OF OUR CLIENTS"
              size="text-sm"
              fontWeight="font-medium"
              color="text-black"
              className="leading-none"
            />
          </div>
          {/* Right Half: SplideCarousel */}
          <div className="w-full lg:w-1/2  h-full flex flex-col gap-y-6">
          <div className="flex items-center gap-2">
  {/* Neon bullet */}
  <span className="w-2 h-2 rounded-full bg-neon " />

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
              perPage={3}
              height="30px"
              gap="1rem"
              pauseOnHover={false}
              className="w-full h-full"
              haveBorder={false}
              objectFit="contain"
              imageRound="rounded-none"
              mobilePerPage={3}
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