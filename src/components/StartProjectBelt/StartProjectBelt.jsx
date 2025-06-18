import Heading from "../Heading/Heading";
import Button from "../Button/Button";
import { MessageBoxLayout } from "../MessageBox/MessageBox";
import NewsletterButton from "../Footer/NewsLetterButton";

const StartProjectBelt = ({
  text = "Project",
  bgColor = "bg-black",
  buttonText = "Get Started",
  headingText = "Ready to Start Your",
  openModal = true,
  link, // Optional link
  isNews = false, // New prop to toggle NewsletterButton
}) => {
  return (
    <MessageBoxLayout bgColor={bgColor} CIRCLE_COUNT={3}>
      <div className="flex flex-col gap-y-4 xl:flex-row items-center justify-between text-center xl:text-left w-full">
        <Heading
          text={`${headingText} ${text}?`}
          spanText={text}
          spanColor="text-neon"
          size="text-60px xl:text-40px"
          color="text-white"
          centered={true}
        />
        {isNews ? (
          <NewsletterButton />
        ) : (
          <Button
            name={buttonText}
            openModal={openModal && !link} // Only true if no link
            link={link} // link overrides openModal
            bgColor="bg-neon"
            hoverBgColor="bg-neon/90"
            textColor="black"
            hoverTextColor="black"
          />
        )}
      </div>
    </MessageBoxLayout>
  );
};

export default StartProjectBelt;