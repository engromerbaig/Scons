import Heading from "../../components/Heading/Heading";
import BodyText from "../../components/BodyText/BodyText";

import Button from "../../components/Button/Button";
import { theme } from "../../theme";
const ThankYou = () => {
  return (
    <div className={`flex flex-col ${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal} h-screen justify-center items-center gap-4 text-white text-center `}>
          <Heading
            text="Thank You For Your Submission!"
            color="text-black"
            centered={true}
            className="leading-none"
          />
          <BodyText
            text="We've received your response and our team will review it shortly. We'll get back to you as soon as possible."
            centered={true}
            color="text-black"
            className="max-w-xl"
          />
          <Button
            name="Back to Home"
            className=""
            bgColor="bg-black"
            textColor="text-black"
            hoverBgColor="bg-black/90"
            hoverTextColor="text-black"
            fontSize="text-sm"
            fontWeight="font-bold"
            textAlign="justify-center"
            type="button"
            onClick={() => window.location.href = '/'} // Simple redirect to home
          />
    </div>
  );
};

export default ThankYou;