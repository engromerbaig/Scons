import Heading from "../../components/Heading/Heading";
import BodyText from "../../components/BodyText/BodyText";
import Vision from "../../components/Vision/Vision";

import Collage from "../../components/Collage/Collage";
import InnerHero from "../../components/InnerHero/InnerHero";
import AnimatedBackground from "../../utilities/AnimatedBackground/AnimatedBackground";
import { visionData } from "./visionData";
import GreenBelt from "../../components/GreenBelt/GreenBelt";


import handImage from "../../assets/images/about/hand.webp"
import ballImage from "../../assets/images/about/ball.webp"
import logoImage from "../../assets/images/about/logo.svg"
import officeImage from "../../assets/images/about/office.webp"

import { theme } from "../../theme";
import Highlights from "../../components/UniqueApproach/modules/Highlights";


const KnowUs = () => {
   

    return (
        <>
       {/* Inner Hero Section */}
       <InnerHero
  headingText="About Scons"
  spanText="Scons"
  bodyText="Scons is a dynamic tech powerhouse, delivering innovative software solutions worldwide."
  images={[
    { src: ballImage, position: "top-left", alt: "Hand illustration", className: "w-28 h-28" },
    { src: handImage, position: "bottom-right", alt: "Ball illustration", className: "w-[500px]" },
    { src: logoImage, position: "logo", alt: "Scons Logo", className: "w-32 h-16" }
  ]}
/>


<div className={`${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal} `}>
  {/* Image container - centers image */}
  <div className="flex justify-center mb-6">
    <img src={officeImage} alt="Office" className="w-full rounded-3xl" />
  </div>

  {/* Text container - left aligned */}
  <div className="flex flex-col items-start gap-y-4">
    <Heading
      text="Building software for global leaders"
      className="text-start"
    />
    <BodyText
      text="At Scons, we envision a world where technology seamlessly integrates into every aspect of life, empowering individuals and businesses to achieve their fullest potential. We strive to be at the forefront of innovation, creating solutions that not only meet the needs of today but also anticipate the challenges of tomorrow."
      size="text-30px"
      color="text-black"
      className="text-start"
      fontWeight="font-normal"
    />

    <Highlights />
  </div>
</div>

 


<GreenBelt>
<Heading
                    text="Leadership"
                    size="text-70px"
                    fontWeight="font-semibold"
                />


</GreenBelt>

<Collage />


        </>
    );
};

export default KnowUs;
