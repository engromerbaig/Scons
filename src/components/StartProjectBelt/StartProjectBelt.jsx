import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const StartProjectBelt = () => {
    return ( <div className={`px-10 py-4 border-1 border-gray-500 rounded-full shadow-md my-20 mx-40 flex flex-row items-center justify-between  bg-grayBg`}>

       <Heading text="Ready to Start Your Project?" spanText="Project?" spanColor="text-neon" size="text-40px" color="text-black" centered={false} />
    
          <Link to="#">
          <Button
  name="Get Started"
  bgColor="bg-black"
  textColor="white"
 
  className="px-4 py-2"
/>       </Link>

    </div> );
}
 
export default StartProjectBelt;