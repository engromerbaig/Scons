import React, { lazy } from 'react';

// Lazy load components
const Hero = lazy(() => import('../../components/Hero/Hero'));
const UniqueApproachOld = lazy(() => import('../../components/UniqueApproach/UniqueApproachOld'));
const Industries = lazy(() => import('../../components/Industries/Industries'));
const Locations = lazy(() => import('../../components/Locations/Locations'));


import Technologies from '../../components/Technologies/Technologies';

import ServicesOld from '../../components/Services/ServicesOLD';
import Projects from '../../components/Projects/Projects';
import Testimonials from '../../components/Testimonials/Testimonials';
import StartProjectBelt from '../../components/StartProjectBelt/StartProjectBelt';



function Home() {
  return (
    <div className=''>
      {/* comment */}
      <Hero />

      <Projects />
      <UniqueApproachOld />

      {/* testing only */}
      {/* <Services /> */}
      <ServicesOld />
      {/* <BuisnessFormula /> */}
      <Technologies />

      <Industries />
      <Locations />
      <StartProjectBelt />
      <Testimonials />

    </div>
  );
}

export default Home;
