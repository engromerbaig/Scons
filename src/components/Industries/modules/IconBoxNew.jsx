import { useState } from "react";

const IconBoxNew = ({ icon, name }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="flex flex-row parent-hover items-center justify-center hover:cursor-pointer p-3 bg-white border-neon border-[3px] rounded-full w-full hover:bg-neon transition-all duration-300 relative overflow-hidden hover:shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Icon */}
            <img
    src={icon}
    alt={name}
    className="w-1/5 aspect-square svg-neon " // Apply global classes
/>

            {/* Text with Slide Effect */}
            <div className="ml-1 lg:ml-4 relative overflow-hidden">
                <p
                    className="text-sm lg:text-25px  font-bold transition-transform duration-300"
                    style={{
                        transform: isHovered ? "translateY(0)" : "translateY(-100%)",
                        color: isHovered ? "white" : "black",
                    }}
                >
                    {name}
                </p>
                <p
                    className="text-sm lg:text-25px font-bold absolute top-0 left-0 transition-transform duration-300"
                    style={{
                        transform: isHovered ? "translateY(100%)" : "translateY(0)",
                        color: "black",
                    }}
                >
                    {name}
                </p>
            </div>
        </div>
    );
};

export default IconBoxNew;