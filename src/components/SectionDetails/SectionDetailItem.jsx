import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';
import Button from '../Button/Button';
import { theme } from '../../theme';
import slideInGsap from '../../utilities/Animations/slideInGsap';
import SkeletonLoader from '../../utilities/SkeletonLoader';

const SectionDetailItem = ({ serviceHeading, spanText, details, faqIcon, icons, isImageLeft }) => {
  const containerRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    slideInGsap(containerRef.current, { fromRight: isImageLeft, delay: 0.2 });
  }, [isImageLeft]);

  return (
    <div
      className={
        isImageLeft ? 'pr-10 md:pr-60 py-10 xl:py-14' : 'pl-10 md:pl-60 py-10 xl:py-14'
      }
    >
      <div
        ref={containerRef}
        className={`opacity-0 translate-x-[-100px] text-black grid grid-cols-1 md:grid-cols-12 shadow-3xl py-6 xl:py-16 ${theme.layoutPages.paddingHorizontal} ${
          isImageLeft
            ? 'tube-active-gradient-mirrored border-l-0 rounded-r-[40px] xl:rounded-r-full'
            : 'tube-active-gradient border-r-0 rounded-l-[40px] xl:rounded-l-full'
        }`}
      >
        {/* Image: Top or Left */}
        {faqIcon && (
          <div
            className={`p-6 flex items-center justify-center ${
              isImageLeft
                ? 'md:col-span-5 md:order-first'
                : 'md:col-span-5 md:order-last'
            }`}
          >
            {/* Wrapper for image with overlay */}
            <div className="relative w-1/2 md:w-11/12 aspect-square">
              {!imageLoaded && (
                <SkeletonLoader
                  className="w-full h-full absolute top-0 left-0"
                  rounded="rounded-full"
                />
              )}
              <img
                src={faqIcon}
                className={`w-full h-full rounded-full object-cover transition-opacity duration-500 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                alt="Service Icon"
                onLoad={() => setImageLoaded(true)}
              />
              <div className="absolute inset-0 rounded-full bg-neon opacity-15 pointer-events-none"></div>
            </div>
          </div>
        )}

        {/* Heading, BodyText, Icons, and Button */}
        <div
          className={`p-6 flex flex-col justify-between h-full ${
            isImageLeft
              ? 'md:col-span-7 md:order-last'
              : 'md:col-span-7 md:order-first'
          }`}
        >
          <div>
            <Heading
              text={serviceHeading}
              spanText={spanText}
              centered={false}
              size='text-50px'
              className="pb-4"
            />
            {details.map((detail, idx) => (
              <BodyText
                key={idx}
                text={detail.description}
                centered={false}
                lineHeight="leading-loose"
                color="text-black"
                className="xl:max-w-sm pr-10 pb-4"
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
                  className="w-8 xl:w-12 aspect-square svg-black opacity-50 hover:opacity-100 transition-opacity duration-300"
                />
              ))}
            </div>
          )}
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