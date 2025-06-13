import React, { lazy } from "react";
import { Helmet } from 'react-helmet-async';
import ogDefault from '../../assets/images/og-default.jpg';

// Lazy load all components
const InnerHero = lazy(() => import("../../components/InnerHero/InnerHero"));
const CollapsibleContainer = lazy(() => import("../../components/CollapsibleContainer/CollapsibleContainer"));
const FAQ = lazy(() => import("../../components/FAQ/FAQ"));
const Heading = lazy(() => import("../../components/Heading/Heading"));

import schema from '../../utilities/schema';
import BodyText from "../../components/BodyText/BodyText";

// Static imports for non-component data
import jobListings from '../../data/jobListings.json';
import { theme } from '../../theme';
import careerImage from '../../assets/images/career.svg';

const Careers = () => {
    return (
        <>
            <Helmet>
                <title>Careers | Scons Tech</title>
                <meta
                    name="description"
                    content="Join Scons Tech and be part of a dynamic team transforming businesses worldwide. Explore career opportunities and grow with us."
                />
                <meta
                    name="keywords"
                    content="Scons Tech careers, tech jobs, software development jobs, UK tech careers, Pakistan tech jobs, join our team"
                />
                <link rel="canonical" href="https://sconstech.com/careers" />
                <meta property="og:title" content="Careers | Scons Tech" />
                <meta
                    property="og:description"
                    content="Join Scons Tech and be part of a dynamic team transforming businesses worldwide. Explore career opportunities and grow with us."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://sconstech.com/careers" />
                <meta property="og:image" content={ogDefault} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Careers | Scons Tech" />
                <meta
                    name="twitter:description"
                    content="Join Scons Tech and be part of a dynamic team transforming businesses worldwide. Explore career opportunities and grow with us."
                />
                <meta name="twitter:image" content={ogDefault} />
                <script type="application/ld+json">{schema}</script>
            </Helmet>

            {/* Inner Hero Section */}
          <InnerHero
    headingText="Kickstart Your Career With Us"
    spanText="Career"
    bodyText="Become a part of Scons Tech’s vibrant team driving innovation across the globe. Build, evolve, and thrive with us."
    height="h-[70vh]"
/>


            {/* Job Listings */}
            <div className={` ${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal} space-y-6 xl:space-y-12  `}>
                {jobListings.length > 0 ? (
                    jobListings.map((job, index) => (
                        <CollapsibleContainer
                            key={index}
                            jobType={job.jobType}
                            workLocation={job.workLocation}
                            city={job.city}
                            employmentType={job.employmentType}
                            borderColor={index % 2 === 0 ? 'border-black' : 'border-neon'}
                        />
                    ))
                ) : (
                    <>
                        <Heading
                            text="No Current Openings"
                            size="text-50px"
                            color="text-black"
                            centered={false}
                        />
                        <BodyText
                            text="Please check back later for updates."
                            centered={false}
                        />
                    </>
                )}
            </div>

            {/* FAQ Section */}
            <FAQ />
        </>
    );
};

export default Careers;