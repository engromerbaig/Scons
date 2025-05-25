import React, { useEffect, useState, lazy } from "react";
import { useParams } from "react-router-dom";

// Lazy load all components
const Heading = lazy(() => import("../../components/Heading/Heading"));
const InnerHero = lazy(() => import("../../components/InnerHero/InnerHero"));
const IconSection = lazy(() => import("../../components/IconService/IconSection"));
const SectionDetails = lazy(() =>
  import("../../components/SectionDetails/SectionDetails")
);
const Reviews = lazy(() => import("../../components/Reviews/Reviews"));
const FAQService = lazy(() => import("../../components/FAQService/FAQService"));
const DevProcess = lazy(() =>
  import("../../components/DevProcessHorizontal/DevProcess")
);
const ScrollToTopLink = lazy(() =>
  import("../../utilities/ScrollToTopLink")
);
const AnimatedBackground = lazy(() =>
  import("../../utilities/AnimatedBackground/AnimatedBackground")
);
const GreenBelt = lazy(() => import("../../components/GreenBelt/GreenBelt"));
const ServiceAccordion = lazy(() => import("./ServiceAccordion"));
const FadeInSection = lazy(() =>
  import("../../utilities/Animations/FadeInSection")
);
const FadeWrapper = lazy(() =>
  import("../../utilities/Animations/FadeWrapper")
);

import TechUsed from "./TechUsed";

// Static imports for non-component data
import { services } from "../../components/Services/servicesData";
import { theme } from "../../theme";

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
          bgColor="bg-white"
          headingColor="text-black"
          bodyTextColor="text-black"
          showBottomShadow={true}
        />
      </FadeInSection>

      {/* Section Details */}
      <SectionDetails
        faqSpanText={service.faqSpanText}
        faqBodyText={service.faqBodyText}
        faqItems={service.iconRows}
        heading={service.spanText}
      />

      {/* Pass service.heading to TechUsed */}
      <TechUsed heading={service.heading} serviceHeading={service.heading} />

      {/* Development Process Section */}
      <FadeWrapper>
        <DevProcess />
      </FadeWrapper>

      <FAQService faqData={service.faqData} faqHeading={service.heading} />
    </div>
  );
};

export default ServiceDetails;