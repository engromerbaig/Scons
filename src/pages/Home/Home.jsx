import React, { lazy } from 'react';
import { Helmet } from 'react-helmet-async'; // Import Helmet
import ogDefault from '../../assets/images/og-default.jpg'; // Default OG image

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
import BlogsHome from '../Blogs/BlogsHome';

function Home() {
  return (
    <div>
      <Helmet>
        <title>Home | Scons Tech</title>
        {/* this is what google picks up */}
        <meta
          name="description"
          content="Scons Tech delivers innovative software solutions for startups and enterprises in the UK and beyond. Explore our services and projects."
        />
        <meta
          name="keywords"
          content="Scons Tech, software development, UK software company, web development, startups, enterprises, technology solutions"
        />
        <link rel="canonical" href="https://sconstech.com/" />
        <meta property="og:title" content="Home | Scons Tech" />
        <meta
          property="og:description"
          content="Scons Tech delivers innovative software solutions for startups and enterprises in the UK and beyond. Explore our services and projects."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sconstech.com/" />
        <meta property="og:image" content={ogDefault} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home | Scons Tech" />
        <meta
          name="twitter:description"
          content="Scons Tech delivers innovative software solutions for startups and enterprises in the UK and beyond. Explore our services and projects."
        />
        <meta name="twitter:image" content={ogDefault} />
      </Helmet>
      <FadeInSection>
        <Hero />
      </FadeInSection>
      <FadeInSection disabled>
        <UniqueApproachOld />
      </FadeInSection>
      <FadeInSection disabled>
        <StartProjectBelt
          headingText="Schedule a Virtual Meeting"
          text="Meeting"
          buttonText="Schedule Now"
          link="https://calendly.com/sconstech-official"
        />
      </FadeInSection>
      <FadeInSection disabled>
        <Projects showMystery={true} />
      </FadeInSection>
      <FadeInSection>
        <ServicesOld />
      </FadeInSection>
      <FadeInSection>
        <PackagesHome />
      </FadeInSection>
      <FadeInSection disabled>
        <Technologies />
      </FadeInSection>
      <FadeInSection>
        <Industries />
      </FadeInSection>
      <FadeInSection>
        <Locations />
      </FadeInSection>
      <FadeInSection disabled>
        <StartProjectBelt />
      </FadeInSection>
      <FadeInSection >
        <BlogsHome />
      </FadeInSection>
      <FadeInSection disabled>
        <Testimonials />
      </FadeInSection>
    </div>
  );
}

export default Home;