import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";
import Highlights from "./modules/Highlights";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css"; // Basic CSS

const itTopics = [
  "Web Design",
  "Mobile Apps",
  "Web 3.0",
  "Crypto Solutions",
  "UI/UX",
  "AI Integration",
  "E-commerce",
  "Cloud Development",
  "SaaS Platforms",
  "Blockchain"
];

const UniqueApproachOld = () => {
  return (
    <div
      className={`flex flex-col justify-center overflow-hidden bg-white ${theme.layoutPages.paddingVertical}`}
    >

      <div className={`${theme.layoutPages.paddingHorizontal} `}>
      <div className="relative w-full">
        <Heading
          text="Our Unique Approach"
          color="text-black"
          spanColor="text-black"
          spanText="Approach"
          centered={false}
        />
      </div>

      <div className="relative w-full">
        <BodyText
          text="At Tyfora, innovation meets precision. Our client-centric approach ensures we understand your vision, ideate effectively, and deliver solutions that exceed expectations. From concept to deployment, we bring expertise and passion to every project."
          color="text-black"
          centered={false}
        />
      </div>

      <div className={`relative ${theme.layoutPages.paddingVerticalTop} px-0 w-full`}>
        <Highlights />
      </div>

      </div>
  

      <div className="mt-4">
        <Splide
          options={{
            type: "loop",
            perPage: 4,
            gap: "1rem",
            pagination: true,
            arrows: false,
            autoplay: true,
            interval: 3000,
            breakpoints: {
              768: { perPage: 1 },
              1024: { perPage: 2 }
            }
          }}
        >
          {itTopics.map((topic, index) => (
            <SplideSlide key={index}>
              <div className="">
                <Heading
                text={topic}
                color="text-black"
                spanColor="text-black"
                fontWeight="font-semibold"
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default UniqueApproachOld;
