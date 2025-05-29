import { useRef, useEffect } from "react";
import gsap from "gsap";
import { theme } from "../../theme";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";

// Reusable MessageBoxLayout component
const MessageBoxLayout = ({ children, CIRCLE_COUNT=5, bgColor="bg-black" }) => {
  const circlesRef = useRef([]);

  useEffect(() => {
    // Animate each circle's opacity in a staggered, looping fashion
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "sine.inOut" } });
    circlesRef.current.forEach((circle, i) => {
      tl.to(circle, { opacity: 0.3, duration: 0.5 }, i * 0.12)
        .to(circle, { opacity: 1 - i * 0.1, duration: 0.5 }, "+=0.25");
    });
    return () => tl.kill();
  }, []);

  return (
    <div className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}>
      <div className={`relative ${bgColor} rounded-3xl shadow-md border-[0.1px] border-gray-100 flex flex-col gap-y-6 xl:gap-y-10 items-start justify-between px-6 py-10 lg:py-10 lg:px-20`}>
        {children}
        {/* Concentric White Circles, GSAP animated */}
        <div
          className="absolute bottom-0 right-0 pointer-events-none z-10"
          style={{
            width: "30px",
            height: "40px",
          }}
        >
          {Array.from({ length: CIRCLE_COUNT }).map((_, i) => {
            const size = 46 + i * 36;
            return (
              <span
                key={i}
                ref={(el) => (circlesRef.current[i] = el)}
                className="absolute border border-white rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  opacity: 1 - i * 0.15,
                  borderWidth: 2,
                  background: "transparent",
                  pointerEvents: "none",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Updated MessageBox component using MessageBoxLayout
const MessageBox = ({ Message, Name, Designation, ProfileDisplay }) => {
  return (
    <MessageBoxLayout>
      <Heading
        text={`"${Message}"`}
        size="text-40px"
        color="text-white"
        centered={false}
        className="text-start pr-10 lg:pr-20 leading-tight"
      />
      <div className="flex flex-row items-start gap-x-4">
        <img
          src={ProfileDisplay}
          alt="Message Box"
          className="lg:w-20 lg:h-20 w-12 h-12 rounded-full object-cover"
          loading="lazy"
        />
        <div className="flex flex-col items-start">
          <BodyText text={Name} color="text-white" />
          <BodyText text={Designation} className="text-grayText" size="text-sm" />
        </div>
      </div>
    </MessageBoxLayout>
  );
};

export { MessageBox, MessageBoxLayout };