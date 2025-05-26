import React from 'react';
import Heading from '../../components/Heading/Heading';
import './Loader.css';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center relative">
        <div className="flex items-baseline">
          <Heading
            text="Scons"
            fontWeight="font-semibold"
            color="text-black"
            fontFamily="font-poppins"
            size="text-150px md:text-90px"
          />
          <span
            className="dot ml-2 w-2 h-2 rounded-full bg-neon pulse"
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
