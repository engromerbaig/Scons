import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";
import videoBg from "../../assets/videos/1.mp4";
import logoData from "./modules/logoData";
import InfiniteMarquee from "../InfiniteMarquee/InfiniteMarquee";
import ChatModal from "../ChatModal/ChatModal";
import './index.css';
import GlobeImage from "../../assets/images/globe.svg";
import Button from "../Button/Button";

const Hero = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const btnRef = useRef(null);
  const MAX_OFFSET = 30;

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    let diffX = e.clientX - centerX;
    let diffY = e.clientY - centerY;
    diffX = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, diffX));
    diffY = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, diffY));
    setOffset({ x: diffX, y: diffY });
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div className="w-full min-h-screen flex flex-col border-b-2 border-gray-200">
      {/* Hero Section (90vh) */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        {/* Assuming video background is implemented here */}
        
        {/* Globe Image */}
        <img
          src={GlobeImage}
          alt="Globe Background"
          className="absolute top-0 right-[-20%] h-full w-auto opacity-15 object-right object-contain pointer-events-none z-10"
        />

        {/* Overlay */}
        {/* Add overlay if needed to ensure text readability */}
        
        {/* Content */}
        <div
          className={`${theme.layoutPages.paddingHorizontal} w-full h-full flex items-center justify-center relative z-20`}
        >
          {/* Centered text container */}
          <div className="w-full max-w-4xl text-left">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <div className="mb-4">
                <Heading
                  text="We are a Custom Software Development Company"
                  spanText="Software Development Company"
                  spanColor="text-neon"
                  fontWeight="font-black"
                  spanFontWeight="font-black"
                  size="text-90px"
                  color="text-black"
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
  textColor = "black"
  fontWeight="font-bold"
                bgColor="bg-neon"
                className="mt-4 px-6 py-2"
                onClick={() => setModalOpen(true)}
              />

              <Button
                name="Our Projects"
                size="text-sm"
  textColor = "black"
  fontWeight="font-black"
                bgColor="bg-white"
                hoverBgColor="bg-white"
                hoverTextColor="black"
                className="mt-4 px-4 py-2 border-b-4 border-neon rounded-none shadow-none"
                onClick={() => setModalOpen(true)}
              />
              </div>  
              
            </motion.div>
          </div>

          {/* Interactive Neon Circle Button */}
       
        </div>

        <div className="absolute bottom-4 left-2 xl:left-20 z-20">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-neon rounded-full" />
            <BodyText
              text="Clients served by Econs family"
              size="text-sm"
              fontWeight="font-medium"
              color="text-black"
              className="leading-none"
            />
          </div>
        </div>
      </div>

      {/* Carousel Section (10vh) */}
      {/* Add InfiniteMarquee or other carousel component here if needed */}

      {/* Chat Modal */}
      <ChatModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Hero;