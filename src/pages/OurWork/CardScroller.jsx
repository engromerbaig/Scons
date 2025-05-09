import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Heading from "../../components/Heading/Heading";
import BodyText from "../../components/BodyText/BodyText";
import { theme } from "../../theme";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Dummy data for the cards
const dummyData = [
  {
    number: "01",
    heading: "Research and Architect",
    text: "Our team studied the cheerleading world in detail, from competition rules to skills training methods. To set up a stable, scalable foundation for the game, we used the microservices architecture, splitting features into independent services."
  },
  {
    number: "02",
    heading: "Infrastructure Setup",
    text: "We built our backend on AWS using Kubernetes clusters. This allowed us to ensure the game scales automatically to different numbers of players, and we only pay for extra server power when needed. Our team then built the core mechanics, physics engine, and integrated animations."
  },
  {
    number: "03",
    heading: "Core Development",
    text: "Our developers focused on creating smooth gameplay mechanics, ensuring realistic physics for cheerleading moves. We integrated animations to bring characters to life, with attention to detail in every jump and stunt."
  },
  {
    number: "04",
    heading: "Testing and Optimization",
    text: "We conducted rigorous testing to ensure the game runs smoothly across devices. Performance optimization was key, reducing load times and ensuring seamless transitions between game stages."
  },
  {
    number: "05",
    heading: "Launch and Support",
    text: "After a successful launch, we provided ongoing support, releasing updates to fix bugs and introduce new features based on player feedback, ensuring a continually improving experience."
  }
];

// Card Component
const Card = ({ number, heading, text }) => (
  <div className="bg-gray-800 rounded-lg p-6 w-full">
    <div className="flex items-start">
      <span className="text-green-500 text-4xl font-bold mr-4">{number}</span>
      <div>
        <h3 className="text-white text-2xl font-bold mb-2">{heading}</h3>
        <p className="text-white text-base">{text}</p>
      </div>
    </div>
  </div>
);

// CardScroller Component
const CardScroller = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const [isComplete, setIsComplete] = useState(false);

  useLayoutEffect(() => {
    const cards = cardsRef.current.children;
    const totalCards = dummyData.length;
    const cardHeight = cards[0]?.offsetHeight || 200; // Approximate card height
    const gap = 24; // Consistent vertical gap (equivalent to space-y-6 in Tailwind)
    const totalHeight = (totalCards - 1) * (cardHeight + gap); // Height to scroll until last card is in view

    let ctx = gsap.context(() => {
      // Pin the section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: true,
        start: "top top",
        end: `+=${totalHeight}`, // End when last card is fully in view
        scrub: 1,
        anticipatePin: 1,
        pinSpacing: false, // Prevents extra space
        onUpdate: (self) => {
          // Unpin when the last card is fully in view
          if (self.progress >= 0.95 && !isComplete) {
            setIsComplete(true);
          }
        },
      });

      // Animate cards to scroll up
      gsap.fromTo(
        cardsRef.current,
        { y: 0 }, // Start from initial position
        {
          y: `-${totalHeight}`, // Scroll up to bring last card into view
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${totalHeight}`,
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`relative border-b-2 border-neon grid grid-cols-12 items-start ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} overflow-hidden`}
    >
      {/* LHS - Fixed Text */}
      <div className="col-span-6 flex flex-col items-start space-y-4">
        <Heading
          text="How boss of the World came to life"
          spanText="World"
          size="text-5xl"
          centered={false}
        />
        <BodyText
          text="We followed a comprehensive approach to ensure we built an authentic, feature-rich cheerleading gaming experience."
          centered={false}
          lineHeight="leading-loose"
        />
      </div>

      {/* RHS - Scrolling Cards */}
      <div className="col-span-6 relative">
        <div ref={cardsRef} className="space-y-6">
          {dummyData.map((item, index) => (
            <Card
              key={index}
              number={item.number}
              heading={item.heading}
              text={item.text}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardScroller;