import React from "react";
import Marquee from "react-fast-marquee";
import Heading from "../Heading/Heading";

const InfiniteMarquee = ({
  items,
  renderItem,
  speed = 100,
  pauseOnHover = false,
  showBullets = true,
}) => {
  return (
    <Marquee gradient={false} speed={speed} pauseOnHover={pauseOnHover}>
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center">
          {renderItem ? (
            <>
              {renderItem(item, idx)}
              {showBullets && (
                <span className="mx-8 font-black text-50px text-black select-none">
                  •
                </span>
              )}
            </>
          ) : (
            <>
              <Heading
                text={item}
                color="text-black"
                spanColor="text-black"
                fontWeight="font-medium"
                size="text-60px"
                className="whitespace-nowrap"
              />
              {showBullets && (
                <span className="mx-8 font-black text-50px text-neon select-none">
                  •
                </span>
              )}
            </>
          )}
        </span>
      ))}
    </Marquee>
  );
};

export default InfiniteMarquee;
