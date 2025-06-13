import { Link } from 'react-router-dom';
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from '../../theme';
import { slugify } from '../../utilities/slugify';

const CollapsibleContainer = ({ jobType, workLocation, city, employmentType, borderColor }) => {
    // Generate the job details link using slugified jobType
    const jobDetailsLink = `/careers/${slugify(jobType)}`;

    return (
        <div className={`w-full border-[3px]  ${borderColor} rounded-xl overflow-hidden`}>
            {/* Job details section */}
            <div className="w-full flex items-center justify-between px-2 md:px-6 lg:px-10 py-4">
                {/* Left Section: Job details */}
                <div>
                    <Heading
                        text={jobType}
                        fontWeight="font-medium"
                        size="text-50px"
                        centered={false}
                    />
                    <BodyText
                        text={`${workLocation} - ${city} - ${employmentType}`}
                        size="text-30px"
                        centered={false}
                    />
                </div>
                {/* Right Section: Apply Button */}
                <Link
                    to={jobDetailsLink}
                    className="text-neon font-semibold text-10px md:text-25px border-b-2 border-neon"
                >
                    Apply
                </Link>
            </div>
        </div>
    );
};

export default CollapsibleContainer;