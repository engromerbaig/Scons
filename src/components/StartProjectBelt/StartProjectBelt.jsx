import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const StartProjectBelt = () => {
    return ( <div className={`bg-white ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} `}>


        <div className=" bg-grayBg rounded-full shadow-xl border border-gray-200 flex flex-row items-center justify-between py-6 px-10">

        <Heading text="Ready to Start Your Project?" spanText="Project?" spanColor="text-neon" size="text-40px" color="text-black" centered={false} />
    
    <Link to="#">
    <Button
name="Get Started"
openModal={true}

/>       </Link>
        </div>

     

    </div> );
}
 
export default StartProjectBelt;