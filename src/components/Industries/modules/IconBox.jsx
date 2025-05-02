import React, { useRef } from "react";
import gsap from "gsap";
import BodyText from "../../BodyText/BodyText";

const IconBox = ({ name, icon, details }) => {
    const descriptionRef = useRef(null);
    const iconTextRef = useRef(null);

    const handleMouseEnter = () => {
        if (window.innerWidth >= 768) { // Only enable animation for screens `md` and above
            gsap.to(iconTextRef.current, { opacity: 0, duration: 0.5 });
            gsap.to(descriptionRef.current, { y: 0, opacity: 1, duration: 0.5 });
        }
    };

    const handleMouseLeave = () => {
        if (window.innerWidth >= 768) { // Only enable animation for screens `md` and above
            gsap.to(iconTextRef.current, { opacity: 1, duration: 0.5 });
            gsap.to(descriptionRef.current, { y: "100%", opacity: 0, duration: 0.5 });
        }
    };

    return (
        <div
            className="flex-1 p-2 flex items-center justify-center border hover:bg-black  border-boxBorder transform transition-transform duration-500 relative overflow-hidden z-10 ease-out hover:scale-110 hover:z-50 hover:shadow-lg"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Default Content: Icon and Text */}
            <div
                ref={iconTextRef}
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ opacity: 1 }}
            >
                <img
                    src={icon}
                    alt={`${name} Icon`}
                    className="w-1/4 aspect-square svg-neon"
                />
                <BodyText
                text={name}
                size="text-25px"
                color="text-white"
                fontWeight="font-bold"
                className="pt-4"
                />
             
            </div>

            {/* Hover Content: Description */}
            
            <div
                ref={descriptionRef}
                className="absolute flex items-center bottom-0 left-0 top-0 right-0 w-full px-4 py-2 text-white text-center bg-blackBg text-sm"
                style={{ transform: "translateY(100%)", opacity: 0 }}
            >
          
                {details}
            </div>
        </div>
    );
};

export default IconBox;
