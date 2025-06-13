import { Link } from 'react-router-dom';
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import { theme } from '../../theme';
import { slugify } from '../../utilities/slugify';
import Button from '../Button/Button';

const CollapsibleContainer = ({ jobType, workLocation, city, employmentType, borderColor }) => {
    // Generate the job details link using slugified jobType
    const jobDetailsLink = `/careers/${slugify(jobType)}`;

    return (
        <Link to={jobDetailsLink} className="block">
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
                        />
                        <BodyText
                            text={`${workLocation} - ${city} - ${employmentType}`}
                            centered={false}
                        />
                    </div>
                    {/* Right Section: Apply Button */}
                    <Button
                        name="View Details"
                        link={jobDetailsLink}
                        className="py-2 px-4"
                    />
                </div>
            </div>
        </Link>
    );
};

export default CollapsibleContainer;