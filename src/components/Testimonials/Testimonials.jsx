
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from "../../theme";

const Testimonials = () => {
    return ( <div className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} bg-black flex flex-col items-center min-h-screen`}>
        <div className="flex flex-col justify-center items-start w-full mb-8">
            <Heading text="What Our Clients Say" color="text-white" centered={false} />
            <BodyText
                text="Discover how our innovative solutions have transformed businesses and empowered growth."
                centered={false}
                color="text-white"
            />
        </div>

        {/* Testimonials Section */}
        <div className="w-full transition-all duration-300 ease-in-out" style={{ minHeight: "500px" }}>
            {/* Placeholder for testimonials */}
            <BodyText text="Testimonials will be displayed here." color="text-white" centered={true} />
        </div>



    </div> );
}
 
export default Testimonials;