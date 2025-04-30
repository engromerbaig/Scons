import Marquee from "react-fast-marquee";
import Heading from "../Heading/Heading";

const InfiniteMarquee = ({ items }) => (
  <Marquee gradient={false} speed={100} pauseOnHover={false}>
    {items.map((topic, idx) => (
      <span key={topic + idx} className="flex items-center">
        <Heading
          text={topic}
          color="text-black"
          spanColor="text-black"
          fontWeight="font-medium"
          size="text-60px"
          className="whitespace-nowrap"
        />
        {/* Add bullet unless last item */}
          <span className="mx-8 font-black text-50px text-black select-none">•</span>
     
      </span>
    ))}
  </Marquee>
);

export default InfiniteMarquee;
