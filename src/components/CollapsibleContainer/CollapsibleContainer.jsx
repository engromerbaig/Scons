import { useState } from 'react';
import { Link } from 'react-router-dom';
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import caretIcon from '../../assets/icons/caretdown2.svg';
import { theme } from '../../theme';
import ScrollToTopLink from '../../utilities/ScrollToTopLink';
import playIcon from "../../assets/icons/play.svg";
import { slugify } from '../../utilities/slugify';

const CollapsibleContainer = ({ heading, workLocation, city, employmentType, childItems, borderColor }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={``}>
            {/* Main container with conditional classes for expanded state */}
            <div className={`w-full border-[3px] lg:border-4 ${borderColor} rounded-xl overflow-hidden ${isOpen ? 'bg-transparent' : ''}`}>
                {/* Header section */}
                <div
                    onClick={toggleOpen}
                    className="w-full flex items-center justify-between px-2 md:px-6 lg:px-10 py-4 cursor-pointer"
                >
                    {/* Left Section: Heading and BodyText */}
                    <div>
                        <Heading
                            text={heading}
                            fontWeight='font-medium'
                            size="text-50px"
                            centered={false}
                        />
                        <BodyText
                            text={`${workLocation} - ${city} - ${employmentType}`}
                            size="text-30px"
                            centered={false}
                        />
                    </div>
                    {/* Right Section: Rotatable Caret */}
                    <div className="flex items-center">
                        <img
                            src={caretIcon}
                            alt="Caret"
                            className={`w-6 lg:w-8 aspect-square transform transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}
                        />
                    </div>
                </div>

                {/* Expandable content section */}
                <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                    {isOpen && (
                        <div className="bg-transparent">
                            {childItems.map((item, index) => {
                                // Dynamically generate buttonLink using slugify
                                const buttonLink = `/careers/${slugify(heading)}/${slugify(item.jobType)}`;

                                return (
                                    <div
                                        key={index}
                                        className={`px-2 md:px-10 py-4 lg:py-6 flex items-center justify-between border-t-2 ${borderColor === 'border-blue' ? 'border-blue' : 'border-bodyText'}`}
                                    >
                                        <div className="flex flex-col">
                                            <div className="flex gap-x-1 lg:gap-x-4">
                                                <img src={playIcon} className="w-3" alt="" />
                                                <Heading
                                                    text={item.jobType}
                                                    color="text-black"
                                                    fontWeight='font-medium'
                                                    size="text-sm md:text-35px"
                                                    centered={false}
                                                />
                                            </div>
                                        </div>
                                        <Link
                                            to={buttonLink} // Use dynamically generated buttonLink
                                            className="text-blue font-semibold text-10px md:text-25px border-b-2 border-blue"
                                        >
                                            {item.buttonText}
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CollapsibleContainer;