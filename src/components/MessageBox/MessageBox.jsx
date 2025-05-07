import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";

import { theme } from "../../theme";


const MessageBox = ({Message, Name, Designation, ProfileDisplay}) => {
    return (  <div className={` ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} `}>


<div className=" bg-black rounded-3xl shadow-md border-[0.1px] border-gray-100 flex flex-col gap-y-6 xl:gap-y-10 items-start justify-between px-6 py-10 lg:py-10 lg:px-20"
>
<Heading text={Message}  size="text-40px" color="text-white" centered={false} className="text-start pr-10 lg:pr-20 leading-tight" />


<div className="flex flex-row items-start gap-x-4">
  <img src={ProfileDisplay} alt="Message Box" className="lg:w-24 lg:h-24 w-12 h-12  rounded-full" />
  <div className="flex flex-col items-start">
    <BodyText text={Name} color="text-white" />
    <BodyText text={Designation} className="text-grayText" />
  </div>
</div>





</div>  

     
    </div>);
}
 
export default MessageBox;