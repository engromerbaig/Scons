import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TestimonialBox = ({
  quote,
  name,
  position,
  company,
  rating,
  clientImg,
  quoteImg,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { scale: 0.9 },
        {
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top 60%",    // when top of element hits 80% viewport height
            end: "bottom 30%",   // until bottom hits 20% viewport height
            scrub: true,        // smooth scrubbing linked to scroll position
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="border-[#181818] border-2 rounded-xl shadow-lg p-8 flex flex-col gap-4 w-full max-w-3xl mx-auto bg-[#181818]"
      style={{ willChange: "transform" }}
    >
      {/* Quote Icon */}
      <div className="flex items-center">
        <img src={quoteImg} alt="Quote" className="w-8 h-8 mr-2" />
        <span className="text-white text-lg italic">{quote}</span>
      </div>
      {/* Client Info */}
      <div className="flex items-center mt-4">
        <img
          src={clientImg}
          alt={name}
          className="w-12 h-12 rounded-full border-2 border-neon mr-4"
        />
        <div>
          <div className="font-semibold text-white">{name}</div>
          <div className="text-gray-400 text-sm">
            {position}, {company}
          </div>
          {/* Star Rating */}
          <div className="flex mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={i < rating ? "text-neon" : "text-gray-600"}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialBox;
