import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Heading from '../../components/Heading/Heading';
import BodyText from '../../components/BodyText/BodyText';
import jobListings from '../../data/jobListings.json'; // Updated import
import bulletIcon from '../../assets/icons/bullet.svg';
import ScrollToTopLink from '../../utilities/ScrollToTopLink';
import AnimatedBackground from '../../utilities/AnimatedBackground/AnimatedBackground';
import GreenBelt from '../../components/GreenBelt/GreenBelt';
import InnerHero from '../../components/InnerHero/InnerHero';
import { slugify } from '../../utilities/slugify';
import importJobImages from '../../utilities/importJobImages';

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
                headingSize='text-120px'
                bodyText={`${job.workLocation} - ${job.city} - ${job.employmentType}`}
                centeredHeading1={false}
                centeredbodyText={false}
                image={jobImage}
            />

            <GreenBelt className="rounded-b-2xl  mx-4 md:mx-8 lg:mx-12">


            <Heading
                    text={childJob.jobDescription}
                    color="text -black"
                    fontWeight='font-medium'
                    size="text-50px"
                    centered={true}
                />
            </GreenBelt>

            {/* GreenBelt Section */}
            {/* <div className="bg-blue py-10 w-full">
                <Heading
                    text={childJob.jobType}
                    color="text-black"
                    font="font-clashvar"
                    size="text-50px"
                    centered={true}
                />
            </div> */}

            {/* Image Container */}
        

            {/* Job Description */}
            {/* <div className="mt-8 w-4/5">
                <BodyText
                    text={childJob.jobDescription}
                    size="text-25px"
                    lineHeight="leading-loose"
                    centered={false}
                />
            </div> */}

            {/* Role Description */}
            <div className="mt-8 w-4/5">
                <Heading text="Role:" color="text-black" size='text-70px' fontWeight='font-semibold' centered={false} />
                <BodyText
                    text={childJob.roleDescription}
                    lineHeight="leading-loose"
                    centered={false}
                />
            </div>

            {/* Experience Section */}
            <div className="mt-8 w-4/5">
                <Heading text="Experience:" color="text-black" size='text-70px' fontWeight='font-semibold' centered={false} />
                <ul className="space-y-2 mt-4">
                    {childJob.experience.map((exp, index) => (
                        <li key={index} className="flex items-center space-x-4">
                            <img src={bulletIcon} alt="Bullet Icon" className="w-4 h-4" />
                            <span className="text-bodyText text-35px">{exp}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Skills Section */}
            <div className="mt-8 w-4/5">
                <Heading text="Skillsets:" color="text-black" size='text-70px' fontWeight='font-semibold' centered={false}  />
                <ul className="space-y-2 mt-4">
                    {childJob.skills.map((skill, index) => (
                        <li key={index} className="flex items-center space-x-4">
                            <img src={bulletIcon} alt="Bullet Icon" className="w-4 h-4" />
                            <span className="text-bodyText text-35px">{skill}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Apply Now Button */}
            <ScrollToTopLink to="/careers/apply" className="mt-8 w-4/5 flex justify-start">
                <button className=" font-bold text-blue border-blue border-2 px-6 py-2 rounded-md hover:bg-blue hover:text-black  transition-all duration-500 ease-in-out">
                    Apply Now
                </button>
            </ScrollToTopLink>
        </div>
    );
};

export default JobDetails;