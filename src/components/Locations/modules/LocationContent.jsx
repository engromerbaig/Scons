import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import Heading from '../../Heading/Heading';
import BodyText from '../../BodyText/BodyText';

const LocationContent = ({ location }) => {
  return (
    <div className="location-content flex flex-col items-center lg:text-center mt-4 px-2 lg:px-0 gap-y-2 lg:gap-y-0 h-full lg:block">
      {/* Country and Title - Always Centered */}
      <div className="flex justify-center items-center gap-2 whitespace-nowrap w-full">
        <Heading text={location.country} className="text-50px" fontFamily="font-semibold" />
        <BodyText text={`(${location.title})`} className="text-35px font-normal" color="text-black" />
      </div>

      {/* Address Section - Left-aligned on small screens, centered on lg */}
      <div className="flex items-start justify-center gap-2 lg:gap-3 w-full">
        <FaMapMarkerAlt className="text-30px text-neon flex-shrink-0" />
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.content.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-30px text-black no-underline hover:font-bold transition-all duration-200"
        >
          {location.content.address}
        </a>
      </div>

      {/* Phone Section - Left-aligned on small screens, centered on lg */}
      {location.content.phone && (
        <div className="flex items-start justify-center gap-2 lg:gap-3 w-full">
          <FaPhoneAlt className="text-30px text-neon flex-shrink-0" />
          <a
            href={`tel:${location.content.phone.replace(/\s+/g, '')}`} // Remove spaces for compatibility
            className="text-30px text-black no-underline hover:font-bold transition-all duration-200"
          >
            {location.content.phone}
          </a>
        </div>
      )}

      {/* Image - Left-aligned on small screens, centered on lg */}
      <div className="flex-grow flex items-end lg:items-center justify-center w-full">
        <img
          src={location.content.image}
          alt={`${location.title} location`}
          className="w-3/4 object-contain my-4"
        />
      </div>
    </div>
  );
};

export default LocationContent;
