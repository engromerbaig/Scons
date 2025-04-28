import React from 'react';
import { useMediaQuery } from 'react-responsive';
import IconSectionDesktop from './IconSectionDesktop';
import IconSectionMobile from './IconSectionMobile';

const IconSection = ({ circularSection }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1200px)' });

  if (isMobile) {
    return <IconSectionMobile circularSection={circularSection} />;
  }

  return <IconSectionDesktop circularSection={circularSection} />;
};

export default IconSection;
