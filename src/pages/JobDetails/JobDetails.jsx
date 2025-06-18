import React, { lazy } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ogDefault from '../../assets/images/og-default.jpg';
import jobListings from '../../data/jobListings.json';
import { theme } from '../../theme';
import { slugify } from '../../utilities/slugify';
import importJobImages from '../../utilities/importJobImages';
import { formatDate } from '../../components/CollapsibleContainer/formatDate';
import { technologiesData } from '../../components/Technologies/technologiesData';
import { Link } from 'react-router-dom';
import schema from '../../utilities/schema';

// Lazy load components
const Heading = lazy(() => import('../../components/Heading/Heading'));
const BodyText = lazy(() => import('../../components/BodyText/BodyText'));
const Button = lazy(() => import('../../components/Button/Button'));
const InnerHero = lazy(() => import('../../components/InnerHero/InnerHero'));
const FaCheckCircle = lazy(() => import('react-icons/fa').then(module => ({ default: module.FaCheckCircle })));

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

    // Dynamic schema for the job
    const jobSchema = job ? {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": job.jobType,
        "description": job.jobDescription,
        "hiringOrganization": {
            "@type": "Organization",
            "name": "Scons Tech",
            "sameAs": "https://sconstech.com"
        },
        "jobLocation": {
            "@type": "Place",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": job.city,
                "addressCountry": job.workLocation === "Remote" ? "Remote" : "PK"
            }
        },
        "employmentType": job.employmentType,
        "datePosted": job.postedOn,
        "validThrough": job.closedOn || null,
        "experienceRequirements": {
            "@type": "OccupationalExperienceRequirements",
            "description": job.experience.join("; ")
        },
        "skills": job.skills.join(", ")
    } : {};

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
            <Helmet>
                <title>{`${job.jobType} | Scons Tech Careers`}</title>
                <meta
                    name="description"
                    content={job.jobDescription.length > 160 ? `${job.jobDescription.substring(0, 157)}...` : job.jobDescription}
                />
                <meta
                    name="keywords"
                    content={`${job.jobType}, Scons Tech jobs, ${job.employmentType} jobs, ${job.city} tech jobs, software development careers, ${job.skills.join(', ')}`}
                />
                <link rel="canonical" href={`https://sconstech.com/careers/${slugify(job.jobType)}`} />
                <meta property="og:title" content={`${job.jobType} | Scons Tech Careers`} />
                <meta
                    property="og:description"
                    content={job.jobDescription.length > 160 ? `${job.jobDescription.substring(0, 157)}...` : job.jobDescription}
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://sconstech.com/careers/${slugify(job.jobType)}`} />
                <meta property="og:image" content={jobImage || ogDefault} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${job.jobType} | Scons Tech Careers`} />
                <meta
                    name="twitter:description"
                    content={job.jobDescription.length > 160 ? `${job.jobDescription.substring(0, 157)}...` : job.jobDescription}
                />
                <meta name="twitter:image" content={jobImage || ogDefault} />
                <script type="application/ld+json">{JSON.stringify(jobSchema)}</script>
            </Helmet>

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
            <div className={`flex flex-col max-w-7xl gap-8 ${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal}`}>
                {/* Posted */}
                <div className='flex flex-wrap gap-x-3'>
                    <Heading text="Job Posted On:" color="text-black" size='text-25px' fontWeight='font-semibold' centered={false} />
                    <BodyText
                        text={`${formatDate(job.postedOn)}`}
                        centered={false}
                        size='text-25px'
                    />
                </div>

                {/* Company Overview */}
                <div>
                    <Heading text="About Scons Tech:" color="text-black" size='text-50px' fontWeight='font-semibold' centered={false} />
                    <BodyText
                        text={
                            <>
                                Scons Tech is a growing software development company in Pakistan, focused on delivering innovative solutions for startups and enterprises worldwide.{' '}
                                <Link to="/about" className="text-neon hover:text-black font-bold transition-colors">
                                    Learn more
                                </Link>
                            </>
                        }
                        centered={false}
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

                {/* Responsibilities */}
                {job.responsibilities && job.responsibilities.length > 0 && (
                    <div>
                        <Heading text="Responsibilities:" color="text-black" size='text-50px' fontWeight='font-semibold' centered={false} />
                        <ul className="space-y-2 mt-4">
                            {job.responsibilities.map((resp, index) => (
                                <li key={index} className="flex items-center space-x-4">
                                    <FaCheckCircle className="w-4 h-4 text-neon" />
                                    <BodyText text={resp} centered={false} />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Experience Section */}
                <div>
                    <Heading text={`Experience (${job.experienceLevel}):`} color="text-black" size='text-50px' fontWeight='font-semibold' centered={false} />
                    <ul className="space-y-2 mt-4">
                        {job.experience.map((exp, index) => (
                            <li key={index} className="flex items-center space-x-4">
                                <FaCheckCircle className="w-4 h-4 text-neon" />
                                <BodyText text={exp} centered={false} />
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Priority Skills Section */}
                {job.prioritySkills && job.prioritySkills.length > 0 && (
                    <div>
                        <Heading text="Priority Skillsets:" color="text-black" size='text-50px' fontWeight='font-semibold' centered={false} />
                        <ul className="space-y-2 mt-4">
                            {job.prioritySkills.map((skill, index) => (
                                <li key={index} className="flex items-center space-x-4">
                                    <FaCheckCircle className="w-4 h-4 text-neon" />
                                    <BodyText text={skill} centered={false} />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Skills Section */}
                <div>
                    <Heading text="Additional Skillsets:" color="text-black" size='text-50px' fontWeight='font-semibold' centered={false} />
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

                {/* Compensation */}
                {job.compensationType && (
                    <div>
                        <Heading text="Compensation:" color="text-black" size='text-50px' fontWeight='font-semibold' centered={false} />
                        <BodyText
                            text={`${job.compensationType}${job.compensationDetails ? `: ${job.compensationDetails}` : ''}`}
                            centered={false}
                        />
                    </div>
                )}

                {/* Benefits */}
                {job.benefits && job.benefits.length > 0 && (
                    <div>
                        <Heading text="Benefits:" color="text-black" size='text-50px' fontWeight='font-semibold' centered={false} />
                        <ul className="space-y-2 mt-4">
                            {job.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-center space-x-4">
                                    <FaCheckCircle className="w-4 h-4 text-neon" />
                                    <BodyText text={benefit} centered={false} />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Application Instructions */}
                <div>
                    <Heading text="How to Apply:" color="text-black" size='text-50px' fontWeight='font-semibold' centered={false} />
                    <BodyText
                        text={
                            <>
                                Submit your resume, optionally a cover letter, and a portfolio showcasing your skills via the{' '}
                                <Link to={`/careers/apply?jobType=${slugify(job.jobType)}`} className="text-neon hover:text-black font-bold transition-colors">
                                    Application Form
                                </Link>{' '}
                                or email us at{' '}
                                <a href="mailto:hr@sconstech.com" className="text-neon hover:text-black font-bold transition-colors">
                                    hr@sconstech.com
                                </a>
                            </>
                        }
                        centered={false}
                    />
                </div>
            </div>

            {/* Floating Apply Now Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <Button
                    name="Apply Now"
                    link={`/careers/apply?jobType=${slugify(job.jobType)}`}
                    className="rounded-full py-2 px-4 shadow-lg bg-black text-black hover:bg-black hover:text-black transition-all duration-300"
                    fontSize="text-base"
                    fontWeight="font-semibold"
                />
            </div>
        </>
    );
};

export default JobDetails;