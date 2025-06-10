import React, { lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import ogDefault from '../../assets/images/og-default.jpg';
import schema from '../../utilities/schema';

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
        <title>Scons Tech | Web Development, Mobile Apps, UI/UX Design, SEO & Digital Strategy</title>
        <meta
          name="description"
          content="Scons Tech offers expert web development, mobile app creation, UI/UX design, and SEO services to boost your digital presence. Partner with us for innovative solutions."
        />
        <meta
          name="keywords"
          content="Scons Tech, web development, mobile apps, UI/UX design, SEO, digital strategy, software solutions, tech company"
        />
        <link rel="canonical" href="https://sconstech.com/" />
        <meta property="og:title" content="Scons Tech | Web Development, Mobile Apps, UI/UX Design, SEO & Digital Strategy" />
        <meta
          property="og:description"
          content="Scons Tech offers expert web development, mobile app creation, UI/UX design, and SEO services to boost your digital presence. Partner with us for innovative solutions."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sconstech.com/" />
        <meta property="og:image" content={ogDefault} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Scons Tech | Web Development, Mobile Apps, UI/UX Design, SEO & Digital Strategy" />
        <meta
          name="twitter:description"
          content="Scons Tech offers expert web development, mobile app creation, UI/UX design, and SEO services to boost your digital presence. Partner with us for innovative solutions."
        />
        <meta name="twitter:image" content={ogDefault} />
        {/* Include external schema */}
        <script type="application/ld+json">{schema}</script>
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
      <FadeInSection>
        <BlogsHome />
      </FadeInSection>
      <FadeInSection disabled>
        <Testimonials />
      </FadeInSection>
    </div>
  );
}

export default Home;