import { Link } from "react-router-dom";
import Heading from "../../components/Heading/Heading";

const ImageGrid = ({ data }) => {
    return (
        <div className="grid gap-20 md:gap-8 md:grid-cols-2 py-20 md:py-40">
            {data.map((item) => (
                <div
                    key={item.id}
                    className={`relative flex flex-col ${
                        item.position === "right" ? "items-end" : "items-start"
                    } min-h-[400px]`}
                >
                    {/* Spacer for right-side items */}
                    {item.position === "right" && (
                        <div className="h-0 md:h-32 w-full" />
                    )}
                    
                    {/* Container for image and text box */}
                    <div className="relative w-3/4">
                        <img
                            src={item.image}
                            className={`rounded-${item.position === "left" ? "r" : "l"}-3xl w-full`}
                            alt={item.text}
                        />
                        {/* Text box with Link */}
                        <div
                            className={`absolute bottom-0 translate-y-1/2 ${
                                item.position === "left" ? "left-0" : "right-0"
                            } w-2/3 overflow-visible`}
                        >
                            <Link to={item.link} className="block bg-blue py-4 px-2 md:px-0 md:py-8 w-full cursor-pointer">
                                <Heading
                                    text={item.text}
                                    color="text-black"
                                    size="text-25px"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ImageGrid;
