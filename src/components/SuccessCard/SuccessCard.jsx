import successImage1 from "../../assets/images/success/1.png";
import successlogo1 from "../../assets/images/success/logo1.png";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";

const SuccessCard = () => {
    return ( <div className="flex flex-col items-start">
        <img src={successImage1} alt="success" className="rounded-3xl" />
        <img src={successlogo1} className="w-1/4" alt="success" />
        <Heading text="Success Story" size="text-35px" fontWeight="font-semibold" centered={false} />
        <BodyText text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."  size="text-25px" centered={false} />

    </div> );
}
 
export default SuccessCard;