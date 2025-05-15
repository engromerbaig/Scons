// ServiceAccordion.jsx
import React, { useState, useRef, useEffect } from 'react';
import Heading from '../../components/Heading/Heading';
import BodyText from '../../components/BodyText/BodyText';
import { theme } from '../../theme';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { gsap } from 'gsap';

const ServiceAccordion = ({ heading, accordionData }) => {
  const [activeService, setActiveService] = useState(0);
  const iconRefs = useRef([]);
  const answerRefs = useRef([]);
  const imageRef = useRef(null);

  useEffect(() => {
    iconRefs.current.forEach((icon, index) => {
      if (icon) {
        gsap.to(icon, {
          rotation: activeService === index ? 0 : 45,
          duration: 0.3,
          ease: 'power2.inOut',
        });
      }
    });

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
        <div className="text-left mb-12">
          <Heading
            text={`Types of ${heading} Apps We Build`}
            spanText={heading}
            spanColor="text-neon"
            centered={false}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="hidden lg:flex lg:items-center">
            <div className="w-full h-[500px] overflow-hidden">
              <img
                ref={imageRef}
                src={accordionData[activeService].image}
                alt={accordionData[activeService].question}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div>
            {accordionData.map((service, index) => (
              <div key={service.id} className="mb-6">
                <button
                  onClick={() => handleServiceClick(index)}
                  className="w-full text-left p-0 rounded-lg flex items-start gap-x-4 justify-between"
                >
                  <Heading
                    text={service.question}
                    size="text-50px xl:text-40px"
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
                <div className="overflow-hidden" ref={(el) => (answerRefs.current[index] = el)}>
                  {activeService === index && (
                    <div className="p-0 pt-2">
                      <BodyText text={service.answer} centered={false} className="max-w-[30rem]" />

                      <BodyText
                        text="Key Features:"
                        size="text-sm"
                        fontWeight="font-black"
                        centered={false}
                        className="max-w-[30rem] py-4"
                      />

                      <ul className="mt-4 max-w-[30rem]">
                        {service.bestPoints.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-center gap-2 mb-4">
                            <IoIosCheckmarkCircle className="text-neon text-35px flex-shrink-0" />
                            <BodyText text={point} centered={false} />
                          </li>
                        ))}
                      </ul>

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
