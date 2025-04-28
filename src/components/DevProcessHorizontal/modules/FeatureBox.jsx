import Heading from "../../Heading/Heading";
import BodyText from "../../BodyText/BodyText";
import AnimatedBackground from '../../../utilities/AnimatedBackground/AnimatedBackground';

const FeatureBox = ({ number, title, description, borderColor }) => {
  return (
    <div className="grid grid-cols-12 gap-4 lg:rounded-lg p-0 h-screen w-full md:h-[40vh] lg:h-[60vh] border-2 lg:border-[3px] bg-white" style={{ borderColor }}>
      {/* Column 1 (span 1): Neon Background */}
     
      {/* Column 2 (span 11): Content */}
      <div className="col-span-12 pl-6 pr-4  flex flex-col justify-center md:justify-start space-y-2 py-6 break-words">
        <div className="text-neon text-180px lg:text-120px md:text-120px font-poppins outlined-text-2 font-semibold leading-none">
          {number}
        </div>
        <Heading text={title} size="text-50px lg:text-35px" fontWeight="font-semibold" centered={false} className="break-words" />
        <BodyText text={description} centered={false} size="text-35px lg:text-27px" lineHeight="leading-loose md:leading-normal" />
      </div>
    </div>
  );
};

export default FeatureBox;