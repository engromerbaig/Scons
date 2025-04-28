import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Heading from '../Heading/Heading';
import { theme } from '../../theme';

const IconSectionDesktop = ({ circularSection }) => {
  const containerRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const serviceElements = container.querySelectorAll('.service-item');
    const squares = container.querySelectorAll('.animated-square');
    const lines = container.querySelectorAll('.animated-line');

    // Staggered drop-down animation
    const dropTimeline = gsap.timeline({ paused: true });
    dropTimeline
      .fromTo(serviceElements[0], { y: -200, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
      .fromTo(serviceElements[1], { y: -200, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.3)
      .fromTo(serviceElements[2], { y: -200, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.6);

    // Dashed animation function
    const animateDashedElements = () => {
      squares.forEach(square => {
        gsap.set(square, { strokeDasharray: '10 10' });
        gsap.to(square, { strokeDashoffset: -1000, duration: 17, repeat: -1, ease: 'linear' });
      });
      lines.forEach(line => {
        gsap.set(line, { strokeDasharray: '10 10' });
        gsap.to(line, { strokeDashoffset: -1000, duration: 17, repeat: -1, ease: 'linear' });
      });
    };

    // Intersection Observer
    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          dropTimeline.play();
          setTimeout(animateDashedElements, 1000);
          observerRef.current.disconnect();
        }
      });
    }, { threshold: 0.7 });

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
    <div ref={containerRef} className={`flex flex-col items-center justify-center  px-20 overflow-hidden`}>
      <div className="relative flex justify-between w-full px-20">
        {circularSection.map((service, index) => (
          <div key={index} className={`relative flex flex-col items-center text-center service-item w-48 ${index === 1 ? 'mt-80' : 'mt-40'}`}>
            {/* Vertical Dashed Line */}
            <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 ${index === 1 ? 'h-screen' : 'h-[110%]'} overflow-hidden`}>
              <svg width="2" height="100%" className="overflow-hidden">
                <line x1="1" y1="0" x2="1" y2="100%" className="animated-line" stroke="var(--color-blue)" strokeWidth="2" strokeDasharray="10 10" />
              </svg>
            </div>

            {/* Rounded Square with Icon */}
            <div className="relative flex items-center justify-center w-48 h-48"> {/* ✅ Adjusted square size */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200"> {/* ✅ Adjusted SVG viewBox */}
                <rect 
                  x="10" y="10" 
                  width="180" height="180" /* ✅ Adjusted square size */
                  rx="25" ry="25" /* ✅ Adjusted corner radius */
                  fill="none" 
                  stroke="var(--color-blue)" 
                  strokeWidth="2" 
                  className="animated-square" 
                  strokeDasharray="10 10" 
                />
              </svg>
              <img src={service.icon} alt={`${service.word} Icon`} className="w-3/5 z-10 svg-blue" />
            </div>

            {/* Title */}
            <div className="w-48 flex justify-center">
              <Heading text={service.word} size="text-60px" fontWeight='font-medium' className="mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconSectionDesktop;
