import React, { useEffect, useState, lazy } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // Import Helmet
import ogLogo from "../../assets/images/og-default.jpg"; // Logo-based OG image

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

import Projects from "../../components/Projects/Projects";

import TechUsed from "./TechUsed";
import { services } from "../../components/Services/servicesData";
import { theme } from "../../theme";
import projects from "../../pages/OurWork/projectDetails"; // Import projects data

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

  // Filter projects where service.heading is in the project's service array
  const filteredProjects = projects
    .filter((project) => project.service.includes(service.heading))
    .slice(0, 4); // Limit to 4 projects

  // Generate meta description (trim to 160 characters)
  const metaDescription =
    service.description?.length > 160
      ? `${service.description.substring(0, 157)}...`
      : service.description || `Discover Scons Tech' ${service.heading.toLowerCase()} services for innovative software solutions.`;

  // Generate keywords
  const keywords = [
    "Scons Tech",
    service.heading.toLowerCase(),
    "software development",
    "UK tech",
    "software solutions",
    "startups",
    "enterprises",
  ].join(", ");

  return (
    <div>
      <Helmet>
        <title>{`${service.heading} | Scons Tech`}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={`https://sconstech.com/service/${serviceSlug}`} />
        <meta property="og:title" content={`${service.heading} | Scons`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://sconstech.com/service/${serviceSlug}`} />
        <meta property="og:image" content={ogLogo} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Scons Tech logo" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${service.heading} | Scons Tech`} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogLogo} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": service.heading,
            "provider": {
              "@type": "Organization",
              "name": "Scons Tech",
              "url": "https://sconstech.com",
            },
            "description": metaDescription,
            "url": `https://sconstech.com/service/${serviceSlug}`,
            "image": ogLogo,
          })}
        </script>
      </Helmet>

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

      {/* Projects Section */}
      {filteredProjects.length >= 2 && (
        <FadeInSection>
          <Projects
            heading={`Our ${service.heading} Projects`}
            spanText={service.heading}
            filteredProjects={filteredProjects}
          />
        </FadeInSection>
      )}

      <FAQService faqData={service.faqData} faqHeading={service.heading} />
    </div>
  );
};

export default ServiceDetails;