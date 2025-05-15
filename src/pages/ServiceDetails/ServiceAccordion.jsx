import React, { useState } from 'react';
import Heading from '../../components/Heading/Heading';
import { serviceAccordionData } from './serviceAccordionData';
import { theme } from '../../theme';

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
          {/* Left Side: Accordion Items */}
          <div>
            {serviceAccordionData.map((service, index) => (
              <div key={service.id} className="mb-6">
                {/* Accordion Item */}
                <button
                  onClick={() => handleServiceClick(index)}
                  className={`w-full text-left p-4 rounded-lg ${
                    activeService === index ? 'bg-gray-100' : 'bg-white'
                  } hover:bg-gray-50 transition-colors`}
                >
                  <h3 className="text-lg font-semibold">
                    {service.question}
                  </h3>
                </button>
                {/* Answer (shown when active) */}
                {activeService === index && (
                  <div className="p-4">
                    <p className="text-gray-600">{service.answer}</p>
                    {/* Image for mobile */}
                    <div className="lg:hidden mt-4">
                      <img
                        src={service.image}
                        alt={service.question}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side: Image for larger screens */}
          <div className="hidden lg:block">
            <img
              src={serviceAccordionData[activeService].image}
              alt={serviceAccordionData[activeService].question}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceAccordion;