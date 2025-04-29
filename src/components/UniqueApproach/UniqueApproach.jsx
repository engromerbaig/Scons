import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";
import uniqueBannerImage from "../../assets/icons/unique_banner.svg";
import uniqueApproachText from "./modules/uniqueApproachText";

gsap.registerPlugin(ScrollTrigger);

const UniqueApproach = () => {
  const sectionRef = useRef(null);
  const textScrollRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const textScroll = textScrollRef.current;
    const progress = progressRef.current;

    const handleScroll = () => {
      const scrollTop = textScroll.scrollTop;
      const scrollHeight = textScroll.scrollHeight - textScroll.clientHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;
      progress.style.height = `${scrollPercentage}%`;
    };

    textScroll.addEventListener("scroll", handleScroll);

    return () => {
      textScroll.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const innerScrollEl = textScrollRef.current;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${innerScrollEl.scrollHeight}`,
        pin: true,
        pinSpacing: true,
        scrub: false,
        onEnter: () => {
          innerScrollEl.scrollTop = 0; // Reset scroll on enter
        },
        onUpdate: (self) => {
          const progress = self.progress;

          // if section is pinned and user has scrolled inside inner box to bottom, allow unpin
          const innerScrollComplete =
            innerScrollEl.scrollTop + innerScrollEl.clientHeight >=
            innerScrollEl.scrollHeight - 1;

          if (progress > 0.95 && innerScrollComplete) {
            self.disable(); // Unpin by disabling the trigger
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`relative bg-uniqueBg/50 overflow-hidden ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}
      style={{ minHeight: "100vh" }}
    >
      <div className="mb-2">
        <Heading
          text="Our innovative approach delivers unique, tailored solutions with excellence."
          spanText="tailored solutions with excellence."
          spanColor="text-neon"
          fontWeight="font-medium"
          spanFontWeight="font-semibold"
          breakSpan={true}
          className="text-start"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* LHS Scrollable Text with Progress Bar */}
        <div className="md:col-span-7 relative flex items-start">
          <div className="relative w-2 mr-2">
            <div className="absolute top-0 h-[50vh] w-1 bg-gray-300 rounded overflow-hidden">
              <div
                ref={progressRef}
                className="bg-neon w-full"
                style={{ height: "0%" }}
              ></div>
            </div>
          </div>

          {/* Scrollable Text */}
          <div
            ref={textScrollRef}
            className="h-[50vh] overflow-y-scroll pr-2 relative flex-1"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style>
              {`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>

            <div className="space-y-6">
              <BodyText
                text={uniqueApproachText}
                className="text-start"
                lineHeight="leading-loose"
              />
            </div>
          </div>
        </div>

        {/* RHS Image */}
        <div className="md:col-span-5 flex justify-center items-center">
          <img
            src={uniqueBannerImage}
            alt="Unique Approach"
            className="w-full max-w-md md:max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default UniqueApproach;
