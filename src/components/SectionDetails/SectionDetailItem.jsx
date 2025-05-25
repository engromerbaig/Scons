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
        isImageLeft ? 'pr-4 md:pr-60 py-10 xl:py-14' : 'pl-4 md:pl-60 py-10 xl:py-14'
      }
    >
      <div
        ref={containerRef}
        className={`opacity-0 translate-x-[-100px]  text-black grid grid-cols-1 md:grid-cols-12  shadow-3xl py-6 xl:py-10 ${theme.layoutPages.paddingHorizontal} ${
          isImageLeft
            ? 'tube-active-gradient-mirrored border-l-0 rounded-r-full'
            : 'tube-active-gradient border-r-0 rounded-l-full'
        }`}
      >
        {/* Image: Top or Left */}
        {faqIcon && (
          <div
            className={`p-6 flex items-center justify-center ${
              isImageLeft
                ? ' md:col-span-4 md:order-first'
                : ' md:col-span-4 md:order-last'
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
                className='xl:max-w-sm pr-10'
              />
            ))}
          </div>

          {/* Icons row */}
          {icons && icons.length > 0 && (
            <div className="flex justify-center xl:justify-between items-center gap-10 py-6">
              {icons.map((icon, idx) => (
                <img
                  key={idx}
                  src={icon}
                  alt={`Icon ${idx}`}
                  className="w-8 xl:w-12 aspect-square svg-neon opacity-70 hover:opacity-100 transition-opacity duration-300"
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