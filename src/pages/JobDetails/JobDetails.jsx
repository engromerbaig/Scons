import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Heading from '../../components/Heading/Heading';
import BodyText from '../../components/BodyText/BodyText';
import jobListings from '../../data/jobListings.json'; // Updated import
import ScrollToTopLink from '../../utilities/ScrollToTopLink';
import AnimatedBackground from '../../utilities/AnimatedBackground/AnimatedBackground';
import GreenBelt from '../../components/GreenBelt/GreenBelt';
import InnerHero from '../../components/InnerHero/InnerHero';
import { slugify } from '../../utilities/slugify';
import importJobImages from '../../utilities/importJobImages';
import Button from '../../components/Button/Button';
import { FaCheckCircle } from "react-icons/fa";

const JobDetails = () => {
    const { heading, jobType } = useParams();

    // Find the main job and specific child job
    const job = jobListings.find(job => slugify(job.heading) === heading);
    const childJob = job?.childItems.find(item => slugify(item.jobType) === jobType);

    // Dynamically generate spanText (last word of jobType)
    const getSpanText = (jobType) => {
        const words = jobType.split(' ');
        return words[words.length - 1];
    };

    // Dynamically load the image or fallback to placeholder
    const jobImage = childJob ? importJobImages(slugify(childJob.jobType)) : null;

    // Error handling if job or childJob not found
    if (!job || !childJob) {
        return (
            <div className="text-white text-center py-20">
                Job details not found. Please check the URL or return to the careers page.
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center ">
            {/* InnerHero Section */}
            <InnerHero
                isCareer={true}
                headingText={childJob.jobType}
                spanText={getSpanText(childJob.jobType)} // Dynamically generated spanText
                breakSpan1={true}
                bodyText={`${job.workLocation} - ${job.city} - ${job.employmentType}`}
                centeredHeading1={false}
                centeredbodyText={false}
                image={jobImage}
                height='h-[70vh]'
            >
                <BodyText
                    text={childJob.jobDescription}
                    color="text-black"
                    centered={false}
                />
            </InnerHero>

            {/* Job Description */}
            <div className="mt-8 w-4/5">
                <BodyText
                    text={childJob.jobDescription}
                    size="text-25px"
                    lineHeight="leading-loose"
                    centered={false}
                />
            </div>

            {/* Role Description */}
            <div className="mt-12 w-4/5">
                <Heading text="Role:" color="text-black" size='text-50px' fontWeight='font-semibold' centered={false} />
                <BodyText
                    text={childJob.roleDescription}
                    centered={false}
                />
            </div>

            {/* Experience Section */}
            <div className="mt-8 w-4/5">
                <Heading text="Experience:" color="text-black" size='text-50px' fontWeight='font-semibold' centered={false} />
                <ul className="space-y-2 mt-4">
                    {childJob.experience.map((exp, index) => (
                        <li key={index} className="flex items-center space-x-4">
                            <FaCheckCircle className="w-4 h-4 text-neon" />
                            <BodyText text={exp} centered={false} />
                        </li>
                    ))}
                </ul>
            </div>

            {/* Skills Section */}
            <div className="mt-8 w-4/5">
                <Heading text="Skillsets:" color="text-black" size='text-50px' fontWeight='font-semibold' centered={false} />
                <ul className="space-y-2 mt-4">
                    {childJob.skills.map((skill, index) => (
                        <li key={index} className="flex items-center space-x-4">
                            <FaCheckCircle className="w-4 h-4 text-neon" />
                            <BodyText text={skill} centered={false} />
                        </li>
                    ))}
                </ul>
            </div>

            {/* Apply Now Button */}
            <div className="mt-8 w-4/5 flex justify-start">
                <Button
                    name="Apply Now"
                    link={`/careers/apply`}
                    className='py-2 px-4'
                />
            </div>
        </div>
    );
};

export default JobDetails;