import React from 'react';
import InnerHero from "../../components/InnerHero/InnerHero";
import CollapsibleContainer from "../../components/CollapsibleContainer/CollapsibleContainer";
import FAQ from "../../components/FAQ/FAQ";
import jobListings from '../../data/jobListings.json'; // Import JSON data
import GreenBelt from '../../components/GreenBelt/GreenBelt';
import Heading from '../../components/Heading/Heading';
import { theme } from '../../theme';


const Careers = () => {
    return (
        <>
            {/* Inner Hero Section */}
            <InnerHero
                headingText="Begin Your Career With Us"
                spanText="Career With Us"
                bodyText="Join Tyfora and be part of a dynamic team transforming businesses worldwide. Innovate, grow, and excel with us."
            />

            {/* Job Listings */}
            <div className={` ${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal} space-y-6 lg:space-y-12`}>
                {jobListings.map((job, index) => (
                    <CollapsibleContainer
                        key={index}
                        heading={job.heading}
                        workLocation={job.workLocation}
                        city={job.city}
                        employmentType={job.employmentType}
                        childItems={job.childItems}
                        borderColor={index % 2 === 0 ? 'border-bodyText' : 'border-neon'} // Alternating border color
                    />
                ))}
            </div>


            <GreenBelt>
                <Heading
                text="Our Dedication"
                spanText='Dedication'
                size='text-70px'
                />
            </GreenBelt>
            {/* FAQ Section */}
            <FAQ />
        </>
    );
};

export default Careers;