import React, { useState } from 'react';
import { motion } from "framer-motion";
import Heading from "../Heading/Heading";
import Container from "./modules/Container";
import AnimatedBackground from "../../utilities/AnimatedBackground/AnimatedBackground";
import Descriptor from "../Descriptor/Descriptor";
import slideInContainerVariants from "../../utilities/Animations/slideInContainer";
import { servicesHeading, descriptorText, services } from "./servicesData";
import { theme } from '../../theme';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import ScrollToTopLink from '../../utilities/ScrollToTopLink'; // Import ScrollToTopLink

const Services = () => {
  const [animationStep, setAnimationStep] = useState(0); // Track the animation step for Heading and Descriptor

  // Handlers to move to the next animation step
  const handleHeadingComplete = () => setAnimationStep(1);
  const handleDescriptorComplete = () => setAnimationStep(2);

  // Map services to include iconRows (based on your earlier setup for mobile and md+)
  const updatedServices = services.map((service) => {
    const iconRows = service.iconRows.map(row => ({
      icons: row.icons, // Ensure this is an array of icon paths
    }));
    return { ...service, iconRows };
  });

  return (
    <AnimatedBackground bgSizeMob="contain">
      <div className={`pt-10 pb-20 md:pb-40 ${theme.layoutPages.paddingHorizontal}`}>
        <div className={`flex flex-col md:flex-row min-h-[320px] overflow-hidden justify-between items-start gap-4  ${theme.layoutPages.paddingVertical}`}>
          
          {/* Heading Animation */}
          <Heading
            text={servicesHeading.text}
            spanText={servicesHeading.spanText}
            centered={false}
            isAnimate={animationStep === 0} // Animate at step 0
            onAnimationComplete={handleHeadingComplete} // Trigger Descriptor animation
          />
          
          {/* Descriptor Animation */}
          {animationStep >= 1 && (
            <Descriptor
              text={descriptorText}
              isAnimate={animationStep === 1} // Animate at step 1
              onAnimationComplete={handleDescriptorComplete} // Step done; no further steps needed
            />
          )}
        </div>

        {/* Slide-in Animation for Containers (independent of steps) */}
        <motion.div
          className="container-wrapper"
          variants={slideInContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {updatedServices.map((service, index) => (
            <ScrollToTopLink key={index} to={`/service/${service.slug}`}>
              {/* Wrapping the whole container in the clickable link */}
              <div onClick={() => { /* You can also add custom logic here if needed */ }}>
                <Container
                  heading={service.heading}
                  number={service.number}
                  services={service.services}
                  iconRows={service.iconRows} // Pass the icon rows for each service
                  link={service.slug}
                />
              </div>
            </ScrollToTopLink>
          ))}
        </motion.div>
      </div>
    </AnimatedBackground>
  );
};

export default Services;
