import React from 'react';
import { useParams } from 'react-router-dom';
import { services } from '../../components/Services/servicesData';
import Heading from '../../components/Heading/Heading';
import InnerHero from '../../components/InnerHero/InnerHero';
import { theme } from '../../theme';
import IconSection from '../../components/IconService/IconSection';
import SectionDetails from '../../components/SectionDetails/SectionDetails';
import Reviews from '../../components/Reviews/Reviews';
import FAQService from '../../components/FAQService/FAQService';
import DevProcess from '../../components/DevProcessHorizontal/DevProcess';
import ScrollToTopLink from '../../utilities/ScrollToTopLink';
import AnimatedBackground from '../../utilities/AnimatedBackground/AnimatedBackground';
import GreenBelt from '../../components/GreenBelt/GreenBelt';

const ServiceDetails = () => {
    const { serviceSlug } = useParams();

    // Find the service by slug
    const service = services.find((s) => s.slug === serviceSlug);

    // Error handling if service is not found
    if (!service) {
        return (
            <div className="text-white text-center py-20">
                Service details not found. Please check the URL or return to the services page.
            </div>
        );
    }

    return (
        <div>
            {/* Hero Section */}
            <InnerHero
                headingText={service.heading}
                spanText={service.spanText}
                headingText2={service.description}
                bodyText={service.helperText}
                illustrationImage={service.image}
                bgColor='bg-white'
                showPattern={false}
                headingColor='text-black'
                bodyTextColor='text-black'
                headingSize='text-90px'

               

                
            />

            {/* Tagline Section */}
            {/* <div className={`bg-neon ${theme.layoutPages.paddingHorizontal} rounded-b-2xl py-4 md:py-8 mt-4 md:mt-8 mx-4 md:mx-8 lg:mx-12`}>
                <Heading
                    text={service.tagline} // "Beyond Development, We Build Journeys"
                    color="text-black"
                    fontWeight='font-medium'
                    size='text-50px'
                    centered={true}
                />
            </div> */}

            <GreenBelt className="rounded-b-2xl  mx-4 md:mx-8 lg:mx-12">
            <Heading
                    text={service.tagline} // "Beyond Development, We Build Journeys"
                    color="text-black"
                    fontWeight='font-medium'
                    size='text-50px'
                    centered={true}
                />


            </GreenBelt>

            {/* Icon Section */}
            <IconSection circularSection={service.circularSection} />

            {/* Section Details */}
            <SectionDetails
                faqSpanText={service.faqSpanText}
                faqBodyText={service.faqBodyText}
                faqItems={service.iconRows}
            />

            {/* Reviews Section */}
            <Reviews />

            {/* Development Process Section */}
            <DevProcess />

            <GreenBelt className="flex flex-col lg:flex-row justify-center items-center space-y-4 lg:justify-between ">
            <Heading
            text='Let’s make great things happen together.' 
            spanText='happen together.'
            size='text-60px'
            />

                <ScrollToTopLink to="/lets-innovate">
                    <button className="bg-transparent border-black border-2 text-30px  px-6 rounded-md py-3 smooth-hover">Let’s Innovate</button>
                </ScrollToTopLink>



            </GreenBelt>

            {/* Call-to-Action Section */}
            {/* <div
                className={`bg-neon ${theme.layoutPages.paddingHorizontal} z-40 relative flex flex-col justify-center items-center gap-6 py-6 md:py-14`}
            >
                <Heading
                    text="Let’s make great things happen together." // "How about we discuss things over a virtual coffee?"
                    color="text-black"
                    size="text-40px"
                    centered={true}
                />
                <ScrollToTopLink to="/lets-innovate">
                    <button className="bg-black font-bold px-6 py-3">Let’s Innovate</button>
                </ScrollToTopLink>
            </div> */}

            {/* FAQ Section */}
            <FAQService faqData={service.faqData} />
        </div>
    );
};

export default ServiceDetails;
