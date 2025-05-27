import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText"; // Note: This is imported but not used; consider removing if unnecessary
import { theme } from "../../theme";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const StartProjectBelt = ({ text = "Project" }) => {
  return (
    <div
      className={`bg-white ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}
    >
      <div
        className="bg-gray-100 rounded-full shadow-md flex flex-col gap-y-2 xl:flex-row items-center justify-center xl:justify-between py-6 px-10 text-center xl:text-left"
      >
        <Heading
          text={`Ready to Start Your ${text}?`}
          spanText={text}
          spanColor="text-neon"
          size="text-40px"
          color="text-black"
          className="max-w-[200px] xl:max-w-4xl"
          centered={true} // Override to true for mobile centering; adjust if Heading component handles this differently
        />

        <Button
          name="Get Started"
          openModal={true}
          fontSize="text-10px xl:text-sm"
          className="mx-auto xl:mx-0" // Ensure button is centered horizontally on mobile
        />
      </div>
    </div>
  );
};

export default StartProjectBelt;