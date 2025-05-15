import React, { useState, useRef, useEffect } from 'react';
import Heading from '../../components/Heading/Heading';
import BodyText from '../../components/BodyText/BodyText';
import { serviceAccordionData } from './serviceAccordionData';
import { theme } from '../../theme';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { gsap } from 'gsap';

const ServiceAccordion = () => {
  const [activeService, setActiveService] = useState(0);
  const iconRefs = useRef([]);
  const answerRefs = useRef([]);
  const imageRef = useRef(null);

  useEffect(() => {
    // Debug: Log refs to ensure elements are captured
    console.log('Icon Refs:', iconRefs.current);
    console.log('Answer Refs:', answerRefs.current);
    console.log('Image Ref:', imageRef.current);

    // Animate icons
    iconRefs.current.forEach((icon, index) => {
      if (icon) {
        gsap.to(icon, {
          rotation: activeService === index ? 0 : 45,
          duration: 0.3,
          ease: 'power2.inOut',
        });
      }
    });

    // Animate answers
    answerRefs.current.forEach((answer, index) => {
      if (answer) {
        gsap.to(answer, {
          y: activeService === index ? 0 : 100,
          opacity: activeService === index ? 1 : 0,
          height: activeService === index ? 'auto' : 0,
          duration: 0.5,
          ease: 'power2.inOut',
          overwrite: true,
        });
      }
    });

    // Animate image fade
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.inOut',
        overwrite: true,
      });
    }
  }, [activeService]);

  const handleServiceClick = (index) => {
    // Fade out image before changing active service
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        duration: 0.15,
        ease: 'power2.inOut',
        onComplete: () => setActiveService(index),
      });
    } else {
      setActiveService(index);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <section className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}>
        {/* Heading */}
        <div className="text-left mb-12">
          <Heading
            text="Type of Services We Provide"
            spanText="Type of Services"
            centered={false}
          />
        </div>

        {/* Accordion Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Side: Image for larger screens */}
          <div className="hidden lg:flex lg:items-center ">
            <div className="w-full h-[500px] overflow-hidden ">
              <img
                ref={imageRef}
                src={serviceAccordionData[activeService].image}
                alt={serviceAccordionData[activeService].question}
                className="w-full h-full object-contain transition-opacity duration-300 ease-in-out"
              />
            </div>
          </div>

          {/* Right Side: Accordion Items */}
          <div>
            {serviceAccordionData.map((service, index) => (
              <div key={service.id} className="mb-6">
                {/* Accordion Item */}
                <button
                  onClick={() => handleServiceClick(index)}
                  className="w-full text-left p-0 rounded-lg flex items-start gap-x-4 justify-between"
                >
                  <Heading
                    text={service.question}
                    size="text-40px"
                    fontWeight="font-bold"
                    centered={false}
                    className={activeService === index ? 'text-neon' : ''}
                  />
                  {activeService === index ? (
                    <FiMinus
                      className="text-neon text-[30px] w-6 h-6 mt-1"
                      ref={(el) => (iconRefs.current[index] = el)}
                    />
                  ) : (
                    <FiPlus
                      className="text-black text-[30px] w-6 h-6 mt-1"
                      ref={(el) => (iconRefs.current[index] = el)}
                    />
                  )}
                </button>
                {/* Answer and Image for mobile */}
                <div
                  className="overflow-hidden"
                  ref={(el) => (answerRefs.current[index] = el)}
                >
                  {activeService === index && (
                    <div className="p-0 pt-2">
                      <BodyText
                        text={service.answer}
                        centered={false}
                        className="max-w-[30rem]"
                      />
                      {/* Image for mobile */}
                      <div className="lg:hidden mt-4">
                        <div className="w-full h-[200px] overflow-hidden rounded-lg">
                          <img
                            src={service.image}
                            alt={service.question}
                            className="w-full h-full object-contain transition-opacity duration-300 ease-in-out"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceAccordion;