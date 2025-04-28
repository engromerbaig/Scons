import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { FaChevronRight } from 'react-icons/fa'; // Import caret icon
import Heading from '../Heading/Heading';
import AnimatedBackground from '../../utilities/AnimatedBackground/AnimatedBackground';
import accordionData from './modules/accordionData';
import LocationContent from './modules/LocationContent';

const LocationMobile = () => {
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const [showIndicator, setShowIndicator] = useState(true); // State to toggle indicator

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Hide indicator if user scrolls at least 50px to the right
      if (container.scrollLeft > 50) {
        setShowIndicator(false);
      }
    };

    container.addEventListener('scroll', handleScroll);
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const items = container.querySelectorAll('.location-item');

    // Animation timeline
    const slideTimeline = gsap.timeline({ paused: true });

    // Animate items (slide in from right)
    slideTimeline.fromTo(
      items,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.3,
        ease: 'power3.out',
      }
    );

    // Intersection Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            slideTimeline.play();
            observerRef.current.disconnect();
          }
        });
      },
      { threshold: 0.2 }
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

  // Function to handle fast scroll right and hide indicator
  const handleFastScroll = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scrollLeft: containerRef.current.scrollLeft + 300, // Adjust scroll distance
        duration: 0.5,
        ease: 'power2.out',
      });
      setShowIndicator(false); // Hide indicator after clicking
    }
  };

  return (
    <AnimatedBackground noGrid={true} className="w-full overflow-hidden hide-scrollbar" style={{ overflow: 'hidden' }}>
      <div className="w-full bg-neon py-6">
        <Heading
          text="Innovation Centers Across The Globe"
          spanText="Across The Globe"
          color="text-black"
          size="text-85px"
          centered={true}
          className='leading-none'
        />
      </div>

      <div
        ref={containerRef}
        className="container mx-auto px-4 relative overflow-x-auto hide-scrollbar"
        style={{ overflowX: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex py-6 space-x-8">
          {accordionData.map((location, index) => (
            <div key={index} className="location-item flex-shrink-0 w-[350px]">
              {/* Use LocationContent Component */}
              <LocationContent location={location} />
            </div>
          ))}
        </div>

        {/* Right-side Caret Indicator */}
        {showIndicator && (
          <div
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-neon/50 text-black p-2 rounded-full shadow-lg cursor-pointer transition-opacity animate-pulse"
            onClick={handleFastScroll}
          >
            <FaChevronRight size={16} />
          </div>
        )}
      </div>
    </AnimatedBackground>
  );
};

export default LocationMobile;
