import React, { lazy } from 'react';

// Lazy load all components
const Hero = lazy(() => import('../../components/Hero/Hero'));
const UniqueApproachOld = lazy(() => import('../../components/UniqueApproach/UniqueApproachOld'));
const Industries = lazy(() => import('../../components/Industries/Industries'));
const Locations = lazy(() => import('../../components/Locations/Locations'));
const Technologies = lazy(() => import('../../components/Technologies/Technologies'));
const ServicesOld = lazy(() => import('../../components/Services/ServicesOLD'));
const Projects = lazy(() => import('../../components/Projects/Projects'));
const Testimonials = lazy(() => import('../../components/Testimonials/Testimonials'));
const StartProjectBelt = lazy(() => import('../../components/StartProjectBelt/StartProjectBelt'));
const FadeInSection = lazy(() => import('../../utilities/Animations/FadeInSection'));
import PackagesHome from '../Packages/PackagesHome';


function Home() {
  return (
    <div>
      <FadeInSection><Hero /></FadeInSection>
        <FadeInSection disabled><UniqueApproachOld /></FadeInSection>
      <FadeInSection disabled><StartProjectBelt headingText='Schedule a Virtual Meeting' text='Meeting' buttonText='Schedule Now' /></FadeInSection>

      <FadeInSection disabled><Projects showMystery={true} /></FadeInSection>
      <FadeInSection><ServicesOld /></FadeInSection>
            <FadeInSection><PackagesHome /></FadeInSection>

      <FadeInSection disabled><Technologies /></FadeInSection>
      <FadeInSection><Industries /></FadeInSection>
      <FadeInSection><Locations /></FadeInSection>
      <FadeInSection disabled><StartProjectBelt /></FadeInSection>
      <FadeInSection disabled><Testimonials /></FadeInSection>
    </div>
  );
}

export default Home;
