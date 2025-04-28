import React from 'react';
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import gif from '../../assets/icons/gif.png';
import { theme } from '../../theme';
import AnimatedBackground from '../../utilities/AnimatedBackground/AnimatedBackground';
import FadeInSection from '../../utilities/Animations/FadeInSection';

const GIFSection = () => {
  return (
    <AnimatedBackground showBlob={false} topShadow={true} bgSize="contain"
      className={`min-h-screen ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} flex flex-col justify-center items-center`}
    >
      <div className="flex flex-col justify-center items-center">
        <Heading
          text="We Run The Code You Run The Business"
          spanText="You Run The Business"
          breakSpan={true}
          centered={true}
          size='text-85px'
        />

        <BodyText
          text="Leave the tech to us while you focus on scaling your business."
          centered={true}             
        />

        <BodyText
          text="Innovation simplified, success amplified."
          centered={true}  
          color='text-black' 
          fontWeight='font-semibold'          
        />

        <FadeInSection className='flex justify-center'>
          <img
            src={gif}
            className="w-full md:w-3/4 px-6 pt-14 " alt="GIF"
            loading='lazy'
          />
        </FadeInSection>
      </div>
    </AnimatedBackground>
  );
};

export default GIFSection;