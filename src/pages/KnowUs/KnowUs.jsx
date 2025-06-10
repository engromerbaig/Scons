import React, { useRef, useEffect, useState, lazy } from 'react';
import { Helmet } from 'react-helmet-async'; // Import Helmet
import ogDefault from '../../assets/images/og-default.jpg'; // Default OG image
import schema from '../../utilities/schema';


// Lazy load all components
const Heading = lazy(() => import('../../components/Heading/Heading'));
const BodyText = lazy(() => import('../../components/BodyText/BodyText'));
const Vision = lazy(() => import('../../components/Vision/Vision'));
const Collage = lazy(() => import('../../components/Collage/Collage'));
const InnerHero = lazy(() => import('../../components/InnerHero/InnerHero'));
const AnimatedBackground = lazy(() => import('../../utilities/AnimatedBackground/AnimatedBackground'));
const GreenBelt = lazy(() => import('../../components/GreenBelt/GreenBelt'));
const StartProjectBelt = lazy(() => import('../../components/StartProjectBelt/StartProjectBelt'));
const Highlights = lazy(() => import('../../components/UniqueApproach/modules/Highlights'));
const HeadingWithText = lazy(() => import('../../utilities/HeadingWithText'));
const Industries = lazy(() => import('../../components/Industries/Industries'));
const Locations = lazy(() => import('../../components/Locations/Locations'));
const Testimonials = lazy(() => import('../../components/Testimonials/Testimonials'));
const Technologies = lazy(() => import('../../components/Technologies/Technologies'));
const FadeInSection = lazy(() => import('../../utilities/Animations/FadeInSection'));

import { MessageBox } from '../../components/MessageBox/MessageBox';
import logoImage from '../../assets/icons/inner/trustpilot.svg';
import officeImage from '../../assets/images/about/office.webp';
import aboutUsImage from '../../assets/images/about/about.svg';
import ceoImage from '../../assets/images/about/ceo.webp';
import { theme } from '../../theme';
import SkeletonLoader from '../../utilities/SkeletonLoader';

const KnowUs = () => {
  const officeImgRef = useRef(null);
  const [isScaled, setIsScaled] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = officeImgRef.current;
    if (!img) return;

    let timeout = null;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5) {
          if (timeout) clearTimeout(timeout);
          setIsScaled(true);
        } else {
          timeout = setTimeout(() => setIsScaled(false), 120);
        }
      },
      { threshold: [0, 0.5, 1] }
    );

    observer.observe(img);

    return () => {
      observer.disconnect();
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>About Us | Scons Tech</title>
        <meta
          name="description"
          content="Learn about Scons Tech, a Pakistan-based software innovator delivering cutting-edge solutions for global startups and enterprises."
        />
        <meta
          name="keywords"
          content="Scons Tech, about us, software company, Pakistan tech, mission, vision, technology solutions"
        />
        <link rel="canonical" href="https://sconstech.com/about" />
        <meta property="og:title" content="About Us | Scons Tech" />
        <meta
          property="og:description"
          content="Learn about Scons Tech, a Pakistan-based software innovator delivering cutting-edge solutions for global startups and enterprises."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sconstech.com/about" />
        <meta property="og:image" content={ogDefault} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | Scons Tech" />
        <meta
          name="twitter:description"
          content="Learn about Scons Tech, a Pakistan-based software innovator delivering cutting-edge solutions for global startups and enterprises."
        />
        <meta name="twitter:image" content={ogDefault} />
          <script type="application/ld+json">{schema}</script>

      </Helmet>
      <FadeInSection>
        <InnerHero
          logoImages={[logoImage]}
          headingText="About Scons Tech & The Journey So Far"
          spanText="Scons Tech"
  bodyText="Scons Tech is a forward-thinking software development company based in Pakistan & the UK, committed to delivering cutting-edge digital solutions to clients worldwide."
          showBottomShadow={true}
          illustrationImage={aboutUsImage}
          illustrationImageWidth="w-3/4"
          showCarousel={false}
                    logoWidth='w-40'

        />
      </FadeInSection>
      <FadeInSection>
        <div
          className={`${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal}`}
        >
          <div className="relative w-full mb-6">
            {!imageLoaded && (
              <SkeletonLoader
                className="w-full h-[500px] absolute top-0 left-0"
                rounded="rounded-3xl"
              />
            )}
            <img
              ref={officeImgRef}
              src={officeImage}
              alt="Office"
              className={`w-full rounded-3xl transition-opacity duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transform: isScaled ? 'scale(1.06)' : 'scale(1)',
                transition: 'transform 1.0s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.5s',
                willChange: 'transform, opacity',
              }}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          <div className="flex flex-col items-start gap-y-6 pt-10">
           <HeadingWithText
  heading="Your All-In-One Digital Growth Partner"
  body="Welcome to Scons Tech — your partner in innovation and digital growth. We're a passionate team of developers and consultants dedicated to building modern, user-focused software for startups, small businesses, and global brands. From custom websites and mobile apps to scalable digital solutions, we combine creativity and code to help your ideas thrive. At Scons Tech, we don’t just build software — we build your vision."
/>

            <Highlights />
          </div>
        </div>
      </FadeInSection>
      <MessageBox
        Message="We are a team of passionate individuals who believe in the power of technology to transform lives. Our transition from the electrical to the IT domain has been nothing short of sensational, fueled by our rapidly growing client base."
        Name="Mr. Omer"
        Designation="Co-Founder, Scons Tech"
        ProfileDisplay={ceoImage}
      />
      <FadeInSection>
        <Industries />
      </FadeInSection>
      <Technologies />
      <FadeInSection>
        <Vision />
      </FadeInSection>

      
      <Locations />
      <StartProjectBelt />
      <Testimonials />
    </>
  );
};

export default KnowUs;