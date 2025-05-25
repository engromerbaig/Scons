import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';
import Button from '../Button/Button';
import { theme } from '../../theme';
import slideInGsap from '../../utilities/Animations/slideInGsap';

const SectionDetailItem = ({ serviceHeading, spanText, details, faqIcon, icons, isImageLeft }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    slideInGsap(containerRef.current, { fromRight: isImageLeft, delay: 0.2 });
  }, [isImageLeft]);

  return (
    <div
      className={
        isImageLeft ? 'pr-10 md:pr-32 py-10' : 'pl-10 md:pl-32 py-10'
      }
    >
      <div
        ref={containerRef}
        className={`opacity-0 translate-x-[-100px] tube-active-gradient text-black grid grid-cols-1 md:grid-cols-12  py-10 ${theme.layoutPages.paddingHorizontal} ${
          isImageLeft
            ? 'border-l-0 rounded-r-full'
            : 'border-r-0 rounded-l-full'
        }`}
      >
        {/* Image: Top or Left */}
        {faqIcon && (
          <div
            className={`p-6 flex items-center justify-center ${
              isImageLeft
                ? 'md:col-span-4 md:order-first'
                : 'md:col-span-4 md:order-last'
            }`}
          >
            <img
              src={faqIcon}
              className="w-1/4 md:w-3/5 svg-neon"
              alt="Service Icon"
            />
          </div>
        )}

        {/* Heading, BodyText, Icons, and Button */}
        <div
          className={`p-6 flex flex-col justify-between h-full ${
            isImageLeft
              ? 'md:col-span-8 md:order-last'
              : 'md:col-span-8 md:order-first'
          }`}
        >
          <div>
            <Heading
              text={serviceHeading}
              spanText={spanText}
              centered={false}
              className="pb-2"
            />
            {details.map((detail, idx) => (
              <BodyText
                key={idx}
                text={detail.description}
                centered={false}
                lineHeight="leading-loose"
                color="text-black"
                className='xl:max-w-sm'
              />
            ))}
          </div>

          {/* Icons row */}
          {icons && icons.length > 0 && (
            <div className="flex justify-between items-center py-6">
              {icons.map((icon, idx) => (
                <img
                  key={idx}
                  src={icon}
                  alt={`Icon ${idx}`}
                  className="w-8 xl:w-12 aspect-square svg-neon opacity-50 hover:opacity-100 transition-opacity duration-300"
                />
              ))}
            </div>
          )}

          {/* Button */}
          {/* <div className="pt-4">
            <Button
              name="Contact Us"
              size="text-sm"
              textColor="black"
              fontWeight="font-bold"
              hoverTextColor="black"
              bgColor="bg-neon"
              hoverBgColor="bg-neon"
              openModal={true}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

SectionDetailItem.propTypes = {
  serviceHeading: PropTypes.string.isRequired,
  spanText: PropTypes.string.isRequired,
  details: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  faqIcon: PropTypes.string,
  icons: PropTypes.arrayOf(PropTypes.string),
  isImageLeft: PropTypes.bool.isRequired,
};

export default SectionDetailItem;