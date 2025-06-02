import Button from "../components/Button/Button";
import { FaArrowCircleLeft } from "react-icons/fa";

const ReturnButton = ({text="Portfolio", link="/portfolio"}) => {
  return (
    <div className="fixed bottom-4 left-4 z-[10]">
      <Button
        name={
          <span className="flex items-center gap-2">
            <FaArrowCircleLeft className="text-sm font-black" />
            {text}
          </span>
        }
        type="button"
        // bgColor="bg-neon"
        // textColor="black"
        fontSize="text-xs"
        openModal={false}
        link={link}
      />
    </div>
  );
};

export default ReturnButton;