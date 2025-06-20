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
            text="Rooted in Econs, Evolved as Scons Tech"
            color="text-black"
            spanColor="text-black"
            centered={false}
            className="pb-10"
          />
        </div>
        <div className="relative w-full">
        <BodyText
text={
  <>
    <strong>Software Consultants Technologies (Scons Tech)</strong> is a modern software company evolved from{' '}
    <a
      href="https://www.econs.com.pk/"
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-black no-underline hover:no-underline"
    >
      Econs
    </a>
    , an engineering consultancy established in 2011. What began as MEP and IT services has grown into a dedicated software team.

    <br />

    At Scons Tech, we build scalable websites, web apps, and digital platforms for startups and growing businesses — with a focus on performance, design, and real-world impact.
  </>
}

className="max-w-5xl"

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
