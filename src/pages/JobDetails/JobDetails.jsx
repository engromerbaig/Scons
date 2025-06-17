import React from 'react';
import { useParams } from 'react-router-dom';
import Heading from '../../components/Heading/Heading';
import BodyText from '../../components/BodyText/BodyText';
import jobListings from '../../data/jobListings.json';
import Button from '../../components/Button/Button';
import { FaCheckCircle } from "react-icons/fa";
import { theme } from '../../theme';
import { slugify } from '../../utilities/slugify';
import importJobImages from '../../utilities/importJobImages';
import InnerHero from '../../components/InnerHero/InnerHero';
import { formatDate } from '../../components/CollapsibleContainer/formatDate';
import { technologiesData } from '../../components/Technologies/technologiesData'; // Import technologiesData

const JobDetails = () => {
    const { jobType } = useParams(); // Get the jobType slug from the URL

    // Find the job by matching the slugified jobType
    const job = jobListings.find(job => slugify(job.jobType) === jobType);

    // Dynamically generate spanText (last word of jobType)
    const getSpanText = (jobType) => {
        const words = jobType.split(' ');
        return words[words.length - 1];
    };

    // Dynamically load the image or fallback to placeholder
    const jobImage = job ? importJobImages(slugify(job.jobType)) : null;

    // Function to find technology icon
    const findTechnologyIcon = (techName) => {
        for (const category in technologiesData) {
            for (const platform in technologiesData[category]) {
                const tech = technologiesData[category][platform].find(
                    (t) => t.name.toLowerCase() === techName.toLowerCase()
                );
                if (tech) return tech.icon;
            }
        }
        return null;
    };

    // Error handling if job not found
    if (!job) {
        return (
            <div className="text-white text-center py-20">
                Job details not found. Please check the URL or return to the careers page.
            </div>
        );
    }

    return (
        <>
            {/* InnerHero Section */}
            <InnerHero
                isCareer={true}
                headingText={job.jobType}
                spanText={getSpanText(job.jobType)}
                breakSpan1={true}
                bodyText={`${job.workLocation} - ${job.city} - ${job.employmentType}`}
                centeredHeading1={false}
                centeredbodyText={false}
                image={jobImage}
                height='h-[70vh]'
            >
                <BodyText
                    text={job.jobDescription}
                    color="text-black"
                    centered={false}
                />
            </InnerHero>

            {/* Nested Parent Div with Flex and Consistent Gaps */}
            <div className={`flex flex-col gap-8 ${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal}`}>
                {/* Posted */}
                <div className='flex flex-wrap gap-x-2'>
                    <Heading text="Job Posted On:" color="text-black" size='text-25px' fontWeight='font-semibold' centered={false} />
                    <BodyText
                        text={`${formatDate(job.postedOn)}`}
                        centered={false}
                        size='text-25px'
                    />
                </div>
                {/* Role Description */}
                <div>
                    <Heading text="Role:" color="text-black" size='text-50px' fontWeight='font-semibold' centered={false} />
                    <BodyText
                        text={job.roleDescription}
                        centered={false}
                    />
                </div>

                {/* Experience Section */}
                <div>
                    <Heading text="Experience:" color="text-black" size='text-50px' fontWeight='font-semibold' centered={false} />
                    <ul className="space-y-2 mt-4">
                        {job.experience.map((exp, index) => (
                            <li key={index} className="flex items-center space-x-4">
                                <FaCheckCircle className="w-4 h-4 text-neon" />
                                <BodyText text={exp} centered={false} />
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Skills Section */}
                <div>
                    <Heading text="Skillsets:" color="text-black" size='text-50px' fontWeight='font-semibold' centered={false} />
                    <ul className="space-y-2 mt-4">
                        {job.skills.map((skill, index) => (
                            <li key={index} className="flex items-center space-x-4">
                                <FaCheckCircle className="w-4 h-4 text-neon" />
                                <BodyText text={skill} centered={false} />
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Tech Stack Section */}
                {job.techStack && job.techStack.length > 0 && (
                    <div>
                        <Heading text="Required Technologies:" color="text-black" size='text-50px' fontWeight='font-semibold' centered={false} />
                        <div className="grid grid-cols-2 xl:grid-cols-4 max-w-3xl gap-2 xl:gap-4 mt-4">
                            {job.techStack
                                .filter((tech) => findTechnologyIcon(tech))
                                .map((tech, index) => {
                                    const icon = findTechnologyIcon(tech);
                                    return (
                                        <Button
                                            key={index}
                                            name={tech}
                                            icon={icon}
                                            hoverBgColor="bg-neon"
                                            hoverTextColor="text-black"
                                            noIconChange={true}
                                            bgColor="bg-gray-100"
                                            textColor="black"
                                            fontWeight="font-semibold"
                                            className="py-3"
                                            fontSize="text-xs xl:text-sm"
                                        />
                                    );
                                })}
                        </div>
                    </div>
                )}

                {/* Apply Now Button */}
                <div className="flex justify-start">
                    <Button
                        name="Apply Now"
                        link={`/careers/apply?jobType=${slugify(job.jobType)}`}
                        className='py-2 px-4'
                    />
                </div>
            </div>
        </>
    );
};

export default JobDetails;