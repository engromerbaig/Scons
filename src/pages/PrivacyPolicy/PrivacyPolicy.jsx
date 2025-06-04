import React, { useRef } from 'react';
import Heading from '../../components/Heading/Heading';
import BodyText from '../../components/BodyText/BodyText';
import privacyPolicyData from './privacyPolicyData';
import { theme } from '../../theme';

const PrivacyPolicy = () => {
  const sectionRefs = useRef({});

  const scrollToSection = (id) => {
    const element = sectionRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal}  `}>
      <div className="grid grid-cols-12 gap-6">
        {/* Left Content (col-span-8) */}
        <div className="col-span-12 lg:col-span-8 max-w-xl">
          <Heading
            text={privacyPolicyData.title}
            centered={false}
            isAnimate={false}
            className="mb-6"
          />
          
          {privacyPolicyData.description.map((paragraph, index) => (
            <BodyText
              key={index}
              text={paragraph}
              centered={false}
              className=" mb-4 leading-relaxed"

              isAnimate={false}
            />
          ))}

          <div className="mt-8">
            {privacyPolicyData.policyList.map((policy, index) => (
              <div
                key={index}
                ref={(el) => (sectionRefs.current[index] = el)}
                className="mb-10 scroll-mt-20"
              >
                <Heading
                  text={policy.title}
                  size="text-2xl"
                  fontWeight="font-semibold"
                  isAnimate={false}
                              centered={false}

                  className="text-left mb-4"
                />
                <BodyText
                  text={policy.text}
                  centered={false}
                  className="leading-relaxed"
                  isAnimate={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar (col-span-4) */}
        <div className="col-span-12 lg:col-span-4 hidden lg:block">
          <div className="sticky top-20 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <ul className="space-y-3">
              {privacyPolicyData.policyList.map((policy, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(index)}
                    className="w-full text-left text-black hover:text-neon hover:bg-gray-100 px-4 py-2 rounded-full transition-colors duration-200 text-25px font-medium"
                  >
                    {policy.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;