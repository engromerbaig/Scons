import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";
import AnimatedBackground from "../../utilities/AnimatedBackground/AnimatedBackground";
import Highlights from "./modules/Highlights";

const UniqueApproachOld = () => {
  return (
    <div
      className={`flex flex-col justify-center overflow-hidden bg-black ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}
    >
      <div className="relative w-full">
        <Heading
          text="Our Unique Approach"
          color="text-white"
          spanColor="text-neon"
          spanText="Approach"
          centered={true}
        />
      </div>

      <div className="relative w-full">
        <BodyText
          text="At Tyfora, innovation meets precision. Our client-centric approach ensures we understand your vision, ideate effectively, and deliver solutions that exceed expectations. From concept to deployment, we bring expertise and passion to every project."
          color="text-white"
          centered={true}
        />
      </div>

      <div className={`relative ${theme.layoutPages.paddingVerticalTop} px-0 w-full`}>
        <Highlights />
      </div>
    </div>
  );
};

export default UniqueApproachOld;