import React from 'react';
import { useMediaQuery } from 'react-responsive';
import LocationDesktop from './LocationDesktop';
import LocationMobile from './LocationMobile';

const Locations = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' }); // Adjust breakpoint as needed

  if (isMobile) {
    return <LocationMobile />;
  }

  return <LocationDesktop />;
};

export default Locations;