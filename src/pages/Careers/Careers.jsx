import React, { useRef, useEffect, useState, lazy } from "react";

// Lazy load all components
const InnerHero = lazy(() => import("../../components/InnerHero/InnerHero"));
const CollapsibleContainer = lazy(() => import("../../components/CollapsibleContainer/CollapsibleContainer"));
const FAQ = lazy(() => import("../../components/FAQ/FAQ"));
const GreenBelt = lazy(() => import("../../components/GreenBelt/GreenBelt"));
const Heading = lazy(() => import("../../components/Heading/Heading"));

import BodyText from "../../components/BodyText/BodyText";

// Static imports for non-component data
import jobListings from '../../data/jobListings.json';
import { theme } from '../../theme';
import careerImage from '../../assets/images/career.svg';

const Careers = () => {
    return (
        <>
            {/* Inner Hero Section */} 
            <InnerHero
                headingText="Begin Your Career With Us"
                spanText="Career"
                bodyText="Join Scons Tech and be part of a dynamic team transforming businesses worldwide. Innovate, grow, and excel with us."
            
                height="h-[70vh]"
            />

            {/* Job Listings */}
            <div className={` ${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal} space-y-6 border-b `}>
                {/* {jobListings.map((job, index) => (
                    <CollapsibleContainer
                        key={index}
                        heading={job.heading}
                        workLocation={job.workLocation}
                        city={job.city}
                        employmentType={job.employmentType}
                        childItems={job.childItems}
                        borderColor={index % 2 === 0 ? 'border-bodyText' : 'border-neon'}
                    />
                ))} */}

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
            </div>

      
            {/* FAQ Section */}
            <FAQ />
        </>
    );
};

export default Careers;