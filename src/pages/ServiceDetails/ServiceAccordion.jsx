import React, { useState } from 'react';
import Heading from '../../components/Heading/Heading';
import BodyText from '../../components/BodyText/BodyText';
import { serviceAccordionData } from './serviceAccordionData';
import { theme } from '../../theme';
import { FaPlus, FaMinus } from 'react-icons/fa';

const ServiceAccordion = () => {
  const [activeService, setActiveService] = useState(0);

  const handleServiceClick = (index) => {
    setActiveService(index);
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
          <div className="hidden lg:flex lg:items-center">
            <div className="w-full h-[300px] overflow-hidden rounded-lg">
              <img
                src={serviceAccordionData[activeService].image}
                alt={serviceAccordionData[activeService].question}
                className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"
                style={{ opacity: activeService === activeService ? 1 : 0 }}
              />
            </div>
          </div>

          {/* Right Side: Accordion Items */}
          <div>
            {serviceAccordionData.map((service, index) => (
              <div key={service.id} className="mb-10">
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
                    <FaMinus className="text-neon text-[20px] mt-1" />
                  ) : (
                    <FaPlus className="text-black text-[20px] mt-1" />
                  )}
                </button>
                {/* Answer and Image for mobile */}
                {activeService === index && (
                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: activeService === index ? '500px' : '0',
                      opacity: activeService === index ? 1 : 0,
                    }}
                  >
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
                            className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceAccordion;