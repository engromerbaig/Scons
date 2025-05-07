import { visionMissionData } from './visionMissionData';
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';
import { theme } from '../../theme';
import visionBg from "../../assets/images/vision/vbg.webp";

const Vision = () => (
  <section
    className={`relative min-h-screen flex flex-col items-center justify-start bg-black text-white ${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}
  >
    {/* Background Image with opacity */}
    <img
      src={visionBg}
      alt="Vision background"
      className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none z-0"
      style={{ objectPosition: "center" }}
    />

    {/* Content Overlay */}
    <div className="relative z-10 w-full flex flex-col items-center">
      {/* Main Heading */}
      <div className="mb-12 text-center">
        <Heading
          text="Our Vision & Goals"
          color="text-white"
          size="text-5xl"
          centered
          fontWeight="font-bold"
          isAnimate={false}
        />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {visionMissionData.map((item, index) => (
          <div
            key={index}
            className="bg-black/80 border border-white/10 rounded-2xl shadow-lg p-8 flex flex-col items-start transition-transform hover:-translate-y-2 hover:shadow-2xl duration-300"
          >
            <Heading
              text={item.heading}
              color="text-neon"
              size="text-2xl"
              centered={false}
              fontWeight="font-semibold"
              isAnimate={false}
              className="mb-4"
            />
            <BodyText
              text={item.body}
              color="text-white"
              size="text-base"
              centered={false}
              isAnimate={false}
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Vision;
