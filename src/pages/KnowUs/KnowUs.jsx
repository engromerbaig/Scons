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
  bodyText="Scons Tech is a modern software company from Pakistan, evolved from Econs. We build custom websites, web apps, and digital solutions for startups and growing teams."
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
  body={
    <>
      Welcome to <strong>Scons Tech</strong> — a modern software company born from the engineering legacy of{' '}
      <a
        href="https://www.econs.com.pk/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-black no-underline hover:no-underline"
      >
        Econs
      </a>
      . We’re a small but dedicated team of developers and creatives committed to building impactful digital products.

      <br />

      From <strong>custom websites</strong> and <strong>mobile apps</strong> to <strong>SEO-ready landing pages</strong> and <strong>AI-integrated features</strong>, we bring together clean design, smart code, and real business understanding.

      <br />

      Our focus is on <strong>startups</strong> and <strong>growing businesses</strong> that want to stand out, scale fast, and stay future-ready.

      <br />

      At Scons Tech, we don’t just build software — <strong>we help shape your digital vision</strong>, one product at a time.
    </>
  }
/>


            <Highlights />
          </div>
        </div>
      </FadeInSection>
      <MessageBox
        Message="Scons Tech is our fresh start — built on the foundation of Econs, but driven by a new mindset. We’re here to create clean, modern software that helps businesses grow."
        Name="Mr. Faraz Ahmed"
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