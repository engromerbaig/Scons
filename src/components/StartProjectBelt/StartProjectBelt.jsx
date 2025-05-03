import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const StartProjectBelt = () => {
    return ( <div className={`bg-white ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} `}>


        <div className=" bg-grayBg rounded-full shadow-md border-[0.1px] border-gray-100 flex flex-row items-center justify-between py-4 px-10">

        <Heading text="Ready to Start Your Project?" spanText="Project?" spanColor="text-neon" size="text-40px" color="text-black" centered={false} />
    
    <Link to="#">
    <Button
name="Get Started"
bgColor="bg-black"
textColor="white"

className="px-4 py-2"
/>       </Link>
        </div>

     

    </div> );
}
 
export default StartProjectBelt;