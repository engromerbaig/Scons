import Heading from "../../components/Heading/Heading";
import BodyText from "../../components/BodyText/BodyText";
import Vision from "../../components/Vision/Vision";

import Collage from "../../components/Collage/Collage";
import InnerHero from "../../components/InnerHero/InnerHero";
import AnimatedBackground from "../../utilities/AnimatedBackground/AnimatedBackground";
import { visionData } from "./visionData";
import GreenBelt from "../../components/GreenBelt/GreenBelt";

const KnowUs = () => {
   

    return (
        <>
       {/* Inner Hero Section */}
       <InnerHero
                headingText="About Scons"
                spanText="Scons"
                bodyText="Scons is a dynamic tech powerhouse, delivering innovative software solutions worldwide."
            />

        <div className="py-20 ">
            {visionData.map((item, index) => (
                <div key={index} >
                    <Vision
                        headingText={item.headingText}
                        spanText={item.spanText}
                        bodyText={item.bodyText}
                        imageSrc={item.imageSrc}
                        isImageLeft={index % 2 == 0}  // Alternate right for odd, left for even
                    />
                </div>
            ))}


</div>


<GreenBelt>
<Heading
                    text="Leadership"
                    size="text-70px"
                    fontWeight="font-semibold"
                />


</GreenBelt>

<Collage />


{/* Collage here */}
{/* <div  className="py-40 ">

</div> */}

        </>
    );
};

export default KnowUs;
