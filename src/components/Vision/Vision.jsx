import { useEffect, useState } from 'react';
import { visionMissionData } from './visionMissionData';
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';
import { theme } from '../../theme';
import SkeletonLoader from '../../utilities/SkeletonLoader';

const Vision = () => (
  <section
    className={`relative min-h-screen flex flex-col items-center justify-start bg-black text-white ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}
  >
    {/* Content Overlay */}
    <div className="relative z-10 w-full flex flex-col items-center">
      {/* Main Heading */}
      <div className="mb-12 text-center xl:text-start">
        <Heading
          text="What Scons Stands For"
          spanText='Stands'
          spanColor='text-neon'
          color="text-white"
          centered={false}
          fontWeight="font-bold"
          isAnimate={false}
        />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {visionMissionData.map((item, index) => (
          <VisionCard key={index} item={item} />
        ))}
      </div>
    </div>
  </section>
);

const VisionCard = ({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative rounded-2xl shadow-lg overflow-hidden flex flex-col items-start min-h-[320px] transition-transform hover:-translate-y-2 hover:shadow-2xl duration-300 border border-black">
      {/* Background Image */}
      {!imageLoaded && (
        <SkeletonLoader
          className="absolute top-0 left-0 w-full h-full"
          rounded="rounded-2xl"
        />
      )}
      <img
        src={item.imageSrc}
        alt={item.heading}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImageLoaded(true)}
        loading="lazy"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-80 z-0" />

      {/* Card Content */}
      <div className="relative z-10 p-8 w-full h-full flex flex-col">
        <Heading
          text={item.heading}
          color="text-white"
          size="text-2xl"
          centered={false}
          fontWeight="font-black"
          isAnimate={false}
          className="mb-4"
        />
        <BodyText
          text={item.body}
          color="text-white"
          size="text-base"
          centered={false}
          isAnimate={false}
        />
      </div>
    </div>
  );
};

export default Vision;
