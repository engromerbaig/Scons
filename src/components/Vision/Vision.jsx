import { useEffect, useState } from 'react';
import { visionMissionData } from './visionMissionData';
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';
import { theme } from '../../theme';
import SkeletonLoader from '../../utilities/SkeletonLoader';

const Vision = ({ bgColor = 'bg-white' }) => (
  <section
    className={`relative min-h-screen  ${bgColor} text-white w-full ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}
  >
    {/* Content Overlay */}
      {/* Main Heading */}
  <Heading
  text="What We Stand For at Scons Tech"
  spanText="Stand For"
  spanColor="text-neon"
  color="text-black"
  centered={false}
  className="pb-6"
  showUnderline
/>

<BodyText
text="At Scons Tech, we’re shaping the digital future through innovation, integrity, and user-focused solutions. We craft high-quality web and mobile experiences that help businesses grow, combining creative design with scalable technology."

  centered={false}
  className="max-w-4xl pb-10"
/>


      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-x-20 w-full ">
        {visionMissionData.map((item, index) => (
          <VisionCard key={index} item={item} />
        ))}
      </div>
  </section>
);

const VisionCard = ({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative rounded-3xl shadow-lg overflow-hidden flex flex-col items-start min-h-[320px] transition-transform hover:-translate-y-2 hover:shadow-2xl duration-300 border border-black">
      {/* Background Image */}
      {!imageLoaded && (
        <SkeletonLoader
          className="absolute top-0 left-0 w-full h-full"
          rounded="rounded-3xl"
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
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* Card Content */}
      <div className="relative z-10 p-8 w-full h-full flex flex-col">
        <Heading
          text={item.heading}
          color="text-white"
          size="text-3xl"
          centered={false}
          fontWeight="font-black"
          isAnimate={false}
          className="mb-4"
        />
        <BodyText
          text={item.body}
          color="text-white"
          size="text-base"
          fontWeight="font-medium"
          centered={false}
          isAnimate={false}
          className='leading-loose'
        />
      </div>
    </div>
  );
};

export default Vision;
