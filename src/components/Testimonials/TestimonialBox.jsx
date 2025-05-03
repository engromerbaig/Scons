import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaQuoteLeft } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const TestimonialBox = ({
  quote,
  name,
  position,
  company,
  rating,
  clientImg,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { scale: 0.88 },
        {
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top 70%",
            end: "center 50%",
            scrub: 0.4,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="relative border-[#181818] border-2 rounded-xl shadow-lg p-8 flex flex-col gap-4 w-full max-w-3xl mx-auto bg-[#181818] overflow-hidden"
      style={{ willChange: "transform" }}
    >
      {/* Background Quote Icon */}
      <FaQuoteLeft className="absolute text-30px text-neon opacity-10 top-4 left-4 z-0" />

      {/* Quote Text */}
      <div className="relative z-10">
        <p className="text-white text-lg italic">{quote}</p>
      </div>

      {/* Client Info */}
      <div className="flex items-center mt-4 relative z-10">
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
