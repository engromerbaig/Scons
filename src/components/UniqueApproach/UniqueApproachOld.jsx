import InfiniteMarquee from "../InfiniteMarquee/InfiniteMarquee";

import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";
import Highlights from "./modules/Highlights";

const itTopics = [
  "Web Design",
  "Custom Website Development",
  "Logo & Brand Identity",
  "UI/UX Design",
  "AI Chatbots",
  "Digital Marketing",
  "Search Engine Optimization (SEO)",
  "E-commerce Solutions",
  "Landing Pages",
  "Conversion Rate Optimization"
];


const UniqueApproach = () => {
  return (
    <div
      className={`flex flex-col justify-center overflow-hidden bg-white ${theme.layoutPages.paddingVertical}`}
    >
      <div className={`${theme.layoutPages.paddingHorizontal} `}>
        <div className="relative w-full">
          <Heading
            text="Our Incredible Journey"
            color="text-black"
            spanColor="text-black"
            spanText="Journey"
            centered={false}
            showUnderline
            className="pb-10"
          />
        </div>
        <div className="relative w-full">
        <BodyText
  text={
    <>
      At <strong>Software CONSultants (Scons)</strong>, innovation meets precision. Our client-centric approach ensures we understand your vision, ideate effectively, and deliver solutions that exceed expectations. From concept to deployment, we bring expertise and passion to every project. Our journey goes back to 2011, when we started as MEP & IT Services at{' '}
      <a
        href="https://www.econs.com.pk/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-black no-underline hover:no-underline"
      >
        Econs
      </a>
      , and through incredible leadership, the growth expanded our domain.
    </>
  }
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
