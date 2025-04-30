import InfiniteMarquee from "../InfiniteMarquee/InfiniteMarquee";

import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";
import Highlights from "./modules/Highlights";

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

const UniqueApproach = () => {
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
        <InfiniteMarquee speed={140} items={itTopics} />
      </div>
    </div>
  );
};

export default UniqueApproach;
