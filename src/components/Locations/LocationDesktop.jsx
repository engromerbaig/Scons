import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Heading from '../Heading/Heading';
import AnimatedBackground from '../../utilities/AnimatedBackground/AnimatedBackground';
import accordionData from './modules/accordionData';
import LocationContent from './modules/LocationContent';
import { theme } from '../../theme';

const LocationDesktop = () => {
  const containerRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const lines = container.querySelectorAll('.vertical-line');
    const circles = container.querySelectorAll('.end-circle');
    const content = container.querySelectorAll('.location-content');

    // Ensure content starts hidden
    gsap.set(content, { opacity: 0, y: 20 });

    const animateLines = () => {
      const tl = gsap.timeline();
    
      // Animate vertical lines quickly
      tl.fromTo(
        lines,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.6, // Faster line animation
          stagger: 0.2, // Faster sequence
          ease: 'power3.out',
        }
      )
        // Instantly show circles (dots) after lines
        .fromTo(
          circles,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.3, // Faster scaling
            stagger: 0.2, // Matches line speed
            ease: 'back.out(1.7)',
          },
          '-=0.2' // Almost instant after lines
        )
        // Make content appear **right after** dots
        .fromTo(
          content,
          { opacity: 0, y: 5 }, // Minimal movement
          {
            opacity: 1,
            y: 0,
            duration: 0.3, // Super fast fade-in
            stagger: 0.2, // Faster content reveal
            ease: 'power3.out',
          },
          '-=0.2' // Near-instant after dots
        );
    };
    
    

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateLines();
            observerRef.current.disconnect();
          }
        });
      },
      { threshold: 0.3 } // Slightly lower threshold to trigger animation earlier
    );

    if (container) {
      observerRef.current.observe(container);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <AnimatedBackground noGrid={true} className={`w-full ${theme.layoutPages.paddingBottom}`}>
      <div className="w-full bg-neon py-6">
        <Heading
          text="Innovation Centers Across The Globe"
          spanText="Across The Globe"
          color="text-black"
          size="text-85px"
          centered={true}
        />
      </div>

      <div ref={containerRef} className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-8">
          {accordionData.map((location, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Line Container */}
              <div className="relative w-full flex justify-center mb-4">
                <div
                  className="vertical-line bg-neon w-1 origin-top"
                  style={{
                    height: location.lineHeight === 'short' ? '60px' : '400px',
                    transform: 'scaleY(0)',
                  }}
                />
                <div
                  className="end-circle w-4 h-4 bg-neon rounded-full absolute"
                  style={{
                    top: location.lineHeight === 'short' ? '60px' : '400px',
                    transform: 'translateY(-50%)',
                  }}
                />
              </div>

              {/* Location Content (Initially Hidden) */}
              <div className="location-content opacity-0 translate-y-4">
                <LocationContent location={location} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default LocationDesktop;
