import React from 'react';
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import gif from '../../assets/icons/gif.png';
import { theme } from '../../theme';
import FadeInSection from '../../utilities/Animations/FadeInSection';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

const GIFSection = () => {
  return (
    <div 
      className={`min-h-screen border-t border-grayBg ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} flex flex-col justify-center items-center`}
    >
      <div className="flex flex-col justify-center items-center">
     

        <Heading
          text="Lets Kick Start Your Journey"
          spanText='Start Your Journey'
          breakSpan={true}
          centered={true}
          size='text-85px'
          className='leading-tight'
        />

<BodyText
          text="Leave the tech to us while you focus on scaling your business."
          centered={true}  
          color='text-black' 
          fontWeight='font-semibold'              
        />
   
<Link className='py-6' to="#">
    <Button
name="Get Started"
bgColor="bg-black"
textColor="white"

className="px-4 py-2"
/>       </Link>
  
      </div>
    </div>
  );
};

export default GIFSection;