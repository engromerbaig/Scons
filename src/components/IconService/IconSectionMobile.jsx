import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Heading from '../Heading/Heading';

const IconSectionMobile = ({ circularSection }) => {
  const containerRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const rows = container.querySelectorAll('.service-row');
    const squares = container.querySelectorAll('.animated-square');
    const lines = container.querySelectorAll('.animated-line');

    // Staggered slide-in animation
    const slideTimeline = gsap.timeline({ paused: true });
    slideTimeline
      .fromTo(rows[0], { y: -200, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
      .fromTo(rows[1], { x: -200, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, 0.3)
      .fromTo(rows[2], { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, 0.6);

    // Dashed Line Animation
    const animateDashedElements = () => {
      squares.forEach((square) => {
        gsap.set(square, { strokeDasharray: '10 10' });
        gsap.to(square, {
          strokeDashoffset: -1000,
          duration: 17,
          repeat: -1,
          ease: 'linear',
        });
      });

      lines.forEach((line) => {
        gsap.set(line, { strokeDasharray: '10 10' });
        gsap.to(line, {
          strokeDashoffset: -1000,
          duration: 17,
          repeat: -1,
          ease: 'linear',
        });
      });
    };

    // Intersection Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            slideTimeline.play();
            setTimeout(animateDashedElements, 1000); // Start dashed animations after slide-in
            observerRef.current.disconnect();
          }
        });
      },
      { threshold: 0.7 }
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
    <div
      ref={containerRef}
      className="flex flex-col items-center text-white space-y-12 py-16 overflow-hidden"
    >
      {circularSection.map((service, index) => (
        <div
          key={index}
          className={`service-row flex flex-col items-center relative w-full ${
            index === 1 ? 'self-start' : index === 2 ? 'self-end' : ''
          }`}
        >
          {/* Dotted Lines */}
          {index === 0 && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 h-[calc(100%-80px)] overflow-hidden">
              <svg width="2" height="100%" className="overflow-hidden">
                <line
                  x1="1"
                  y1="100%"
                  x2="1"
                  y2="0"
                  className="animated-line"
                  stroke="var(--color-neon)"
                  strokeWidth="2"
                  strokeDasharray="10 10"
                />
              </svg>
            </div>
          )}
          {index === 1 && (
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[calc(50%-80px)] overflow-hidden">
              <svg width="100%" height="2" className="overflow-hidden">
                <line
                  x1="0"
                  y1="1"
                  x2="100%"
                  y2="1"
                  className="animated-line"
                  stroke="var(--color-neon)"
                  strokeWidth="2"
                  strokeDasharray="10 10"
                />
              </svg>
            </div>
          )}
          {index === 2 && (
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[calc(50%-80px)] overflow-hidden">
              <svg width="100%" height="2" className="overflow-hidden">
                <line
                  x1="0"
                  y1="1"
                  x2="100%"
                  y2="1"
                  className="animated-line"
                  stroke="var(--color-neon)"
                  strokeWidth="2"
                  strokeDasharray="10 10"
                />
              </svg>
            </div>
          )}

          {/* Square with Icon */}
          <div className="relative flex items-center justify-center w-40 h-40">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
              <rect
                x="10"
                y="10"
                width="180"
                height="180"
                rx="25"
                ry="25"
                fill="none"
                stroke="var(--color-neon)"
                strokeWidth="2"
                className="animated-square"
                strokeDasharray="10 10"
              />
            </svg>
            <img
              src={service.icon}
              alt={`${service.word} Icon`}
              className="w-3/5 z-10 svg-neon"
            />
          </div>

          {/* Title */}
          <Heading text={service.word} size="text-60px" fontWeight='font-medium'  className="mt-2" />
        </div>
      ))}
    </div>
  );
};

export default IconSectionMobile;