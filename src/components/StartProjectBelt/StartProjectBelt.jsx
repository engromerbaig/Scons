import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText"; // Note: This is imported but not used; consider removing if unnecessary
import { theme } from "../../theme";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { MessageBoxLayout } from "../MessageBox/MessageBox";

const StartProjectBelt = ({ text = "Project" }) => {
  return (
    <MessageBoxLayout CIRCLE_COUNT={3}>
      <div className="flex flex-col gap-y-2 xl:flex-row items-center justify-between text-center xl:text-left w-full">
        <Heading
          text={`Ready to Start Your ${text}?`}
          spanText={text}
          spanColor="text-neon"
          size="text-60px xl:text-40px"
          color="text-white"
          centered={true}
        />
       <Button
          name="Start Now!"
          openModal={true}
          bgColor="bg-neon"
          hoverBgColor="bg-neon/90"
          textColor="black"
          hoverTextColor="black"
          
        />
      </div>
    </MessageBoxLayout>
  );
};

export default StartProjectBelt;