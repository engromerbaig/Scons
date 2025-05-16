import React from 'react';
import { theme } from '../../theme';
import Heading from '../../components/Heading/Heading';
import Button from '../../components/Button/Button';
import ScrollToTopLink from '../../utilities/ScrollToTopLink';
import AnimatedBackground from '../../utilities/AnimatedBackground/AnimatedBackground';

const NotFound = () => {
  return (
    <div 
      className={`${theme.layoutPages.paddingVertical} flex h-screen justify-center items-center ${theme.layoutPages.paddingHorizontal} `}
    >
      <div className="text-center flex flex-col justify-center items-center space-y-4">
        <Heading text="404 Error" color="text-neon" size="text-90px" />
        <Heading text="Oops! Page Not Found" color="text-black" size="text-50px" />
        <p className="pb-8 text-black">It looks like the page you’re looking for doesn’t exist.</p>
        <ScrollToTopLink to="/">
          <Button name="Return to Home" 
                
                 />
        </ScrollToTopLink>
      </div>
    </div>
  );
};

export default NotFound;
