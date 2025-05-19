import React, { useEffect, useState, lazy } from "react";
import { useParams } from 'react-router-dom';

// Lazy load all components
const Heading = lazy(() => import('../../components/Heading/Heading'));
const InnerHero = lazy(() => import('../../components/InnerHero/InnerHero'));
const IconSection = lazy(() => import('../../components/IconService/IconSection'));
const SectionDetails = lazy(() => import('../../components/SectionDetails/SectionDetails'));
const Reviews = lazy(() => import('../../components/Reviews/Reviews'));
const FAQService = lazy(() => import('../../components/FAQService/FAQService'));
const DevProcess = lazy(() => import('../../components/DevProcessHorizontal/DevProcess'));
const ScrollToTopLink = lazy(() => import('../../utilities/ScrollToTopLink'));
const AnimatedBackground = lazy(() => import('../../utilities/AnimatedBackground/AnimatedBackground'));
const GreenBelt = lazy(() => import('../../components/GreenBelt/GreenBelt'));
const ServiceAccordion = lazy(() => import('./ServiceAccordion'));
const FadeInSection = lazy(() => import('../../utilities/Animations/FadeInSection'));
const FadeWrapper = lazy(() => import('../../utilities/Animations/FadeWrapper'));

// Static imports for non-component data
import { services } from '../../components/Services/servicesData';
import { theme } from '../../theme';

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
            <FadeInSection>
                <InnerHero
                    headingText={service.heading}
                    spanText={service.spanText}
                    headingText2={service.description}
                    bodyText={service.helperText}
                    illustrationImage={service.image}
                    bgColor='bg-white'
                    headingColor='text-black'
                    bodyTextColor='text-black'
                    showBottomShadow={true}
                />
            </FadeInSection>

            <FadeInSection>
                <ServiceAccordion heading={service.spanText} accordionData={service.serviceAccordionData} />
            </FadeInSection>

            {/* Section Details */}
            <SectionDetails
                faqSpanText={service.faqSpanText}
                faqBodyText={service.faqBodyText}
                faqItems={service.iconRows}
            />

            {/* Development Process Section */}
            <FadeWrapper>
                <DevProcess />
            </FadeWrapper>

            <GreenBelt className="flex flex-col lg:flex-row justify-center items-center space-y-4 lg:justify-between ">
                <Heading
                    text='Let’s make great things happen together.'
                    spanText='happen together.'
                    size='text-60px'
                />
                <ScrollToTopLink to="/lets-innovate">
                    <button className="bg-transparent border-black border-2 text-30px px-6 rounded-md py-3 smooth-hover">Let’s Innovate</button>
                </ScrollToTopLink>
            </GreenBelt>

            <FAQService faqData={service.faqData} />
        </div>
    );
};

export default ServiceDetails;