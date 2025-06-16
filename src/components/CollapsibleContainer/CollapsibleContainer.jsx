import { Link } from 'react-router-dom';
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from '../../theme';
import { slugify } from '../../utilities/slugify';
import Button from '../Button/Button';
import { formatDate } from './formatDate';
// Utility function to format date as "date month year"


const CollapsibleContainer = ({ jobType, workLocation, city, employmentType, borderColor, postedOn, closedOn, isOpen }) => {
    // Generate the job details link using slugified jobType
    const jobDetailsLink = `/careers/${slugify(jobType)}`;

    // Apply grayed-out styles for non-open jobs, keeping background unchanged
    const containerStyles = !isOpen ? 'pointer-events-none' : '';
    const textStyles = !isOpen ? 'text-gray-500' : 'text-black';
    const buttonStyles = !isOpen ? 'bg-gray-200 text-gray-500' : '';

    return (
        <Link to={isOpen ? jobDetailsLink : '#'} className={`block ${containerStyles}`}>
            <div className={`w-full border-[3px] ${borderColor} rounded-xl overflow-hidden`}>
                {/* Job details section */}
                <div className="w-full flex items-center justify-between px-2 md:px-6 lg:px-10 py-4">
                    {/* Left Section: Job details */}
                    <div>
                        <Heading
                            text={jobType}
                            fontWeight="font-semibold"
                            size="text-50px"
                            centered={false}
                            className={textStyles}
                        />
                        <BodyText
                            text={`${workLocation} - ${city} - ${employmentType}`}
                            centered={false}
                            className={textStyles}
                        />

                        <div className="flex flex-wrap mt-2 gap-x-4">

       <BodyText
                            text={`Posted On: ${formatDate(postedOn)}`}
                            centered={false}
                            size='text-sm'
                            className={`${textStyles} border-2 ${borderColor} font-semibold rounded-full px-2 py-0`}
                        />
                        {closedOn && (
                            <BodyText
                                text={`Closed On: ${formatDate(closedOn)}`}
                                centered={false}
                                                            size='text-sm'

                            className={`${textStyles} border-2 ${borderColor} font-semibold rounded-full px-1 py-0`}
                            />
                        )}

                        </div>
                 
                    </div>
                    {/* Right Section: Apply Button */}
                    <Button
                        name="View Details"
                        link={isOpen ? jobDetailsLink : '#'}
                        className={`py-2 px-4 ${buttonStyles}`}
                    />
                </div>
            </div>
        </Link>
    );
};

export default CollapsibleContainer;