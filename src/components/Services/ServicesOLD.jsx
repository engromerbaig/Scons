import React from 'react';
import { motion } from "framer-motion";
import Heading from "../Heading/Heading";
import Container from "./modules/Container";
import AnimatedBackground from "../../utilities/AnimatedBackground/AnimatedBackground";
import slideInContainerVariants from "../../utilities/Animations/slideInContainer";
import { servicesHeading, descriptorText, services } from "./servicesData";
import { theme } from '../../theme';
import ScrollToTopLink from '../../utilities/ScrollToTopLink';
import BodyText from '../BodyText/BodyText';

const ServicesOld = () => {
  // Map services to include iconRows (based on your earlier setup for mobile and md+)
  const updatedServices = services.map((service) => {
    const iconRows = service.iconRows.map(row => ({
      icons: row.icons,
    }));
    return { ...service, iconRows };
  });

  return (
    <div className={` ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} bg-black/80 flex flex-col items-center min-h-screen`}>
      
      {/* Heading and Descriptor in one row with extreme left and right alignment */}
      <div className={`flex flex-row justify-between items-center w-full `}>
        <Heading
          text={servicesHeading.text}
          spanText={servicesHeading.spanText}
          centered={false}
          color='text-white'
          spanColor='text-white'
        />
        <BodyText
          text={descriptorText}
          color='text-white'
          className="max-w-lg text-right"
        />
      </div>

      {/* Slide-in Animation for Containers */}
      <motion.div
        className="container-wrapper w-full"
        variants={slideInContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {updatedServices.map((service, index) => (
          <ScrollToTopLink key={index} to={`/service/${service.slug}`}>
            <div>
              <Container
                heading={service.heading}
                number={service.number}
                services={service.services}
                iconRows={service.iconRows}
                link={service.slug}
              />
            </div>
          </ScrollToTopLink>
        ))}
      </motion.div>
    </div>
  );
};

export default ServicesOld;
