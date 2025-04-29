import React, { lazy } from 'react';

// Lazy load components
const Hero = lazy(() => import('../../components/Hero/Hero'));
const UniqueApproachOld = lazy(() => import('../../components/UniqueApproach/UniqueApproachOld'));
const Services = lazy(() => import('../../components/Services/Services'));
const Industries = lazy(() => import('../../components/Industries/Industries'));
const GIFSection = lazy(() => import('../../components/GIFSection/GIFSection'));
const Locations = lazy(() => import('../../components/Locations/Locations'));
const BuisnessFormula = lazy(() => import('../../components/BuisnessFormula/BuisnessFormula'));
import ServicesOld from '../../components/Services/ServicesOLD';
import SuccessStories from '../../components/SuccessStories/SuccessStories';



function Home() {
  return (
    <div className=''>
      {/* comment */}
      <Hero />

      <SuccessStories />
      <UniqueApproachOld />

      {/* testing only */}
      {/* <Services /> */}
      <ServicesOld />
      {/* <BuisnessFormula /> */}

      <Industries />
      <GIFSection />
      <Locations />
    </div>
  );
}

export default Home;
