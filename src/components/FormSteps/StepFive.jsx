import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '../Heading/Heading'; // Adjust path as needed
import BodyText from '../BodyText/BodyText'; // Adjust path as needed
import Button from '../Button/Button'; // Adjust path as needed
import { CheckCircle } from 'lucide-react';
import { theme } from '../../theme'; // Adjust path as needed

const StepFive = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this runs only on mount

  return (
    <div
      className={`flex flex-col ${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal} h-screen justify-center items-center gap-4 text-center`}
    >
      <CheckCircle size={64} className="text-green-500 mx-auto" />
      <Heading
        text="Thank you for your application!"
        color="text-black"
        centered={true}
        className="leading-none"
      />
      <BodyText
        text="We appreciate your interest in joining Scons Tech. Our hiring team will review your application and get back to you soon."
        centered={true}
        color="text-black"
        className="max-w-xl"
      />
      <div className="flex flex-row gap-4 justify-center items-center">
        <Button
          name="Return to Website"
          bgColor="bg-black"
          textColor="white"
          hoverBgColor="bg-black/90"
          hoverTextColor="white"
          fontSize="text-sm"
          textAlign="justify-center"
          fontWeight="font-bold"
          className="px-4 py-2 rounded-full text-center"
          onClick={() => navigate('/')}
        />
      </div>
    </div>
  );
};

export default StepFive;