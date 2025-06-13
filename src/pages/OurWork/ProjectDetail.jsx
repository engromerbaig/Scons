import React, { useEffect, useState, lazy } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ogLogo from "../../assets/images/og-default.jpg";

// Lazy load all components
const Heading = lazy(() => import("../../components/Heading/Heading"));
const BodyText = lazy(() => import("../../components/BodyText/BodyText"));
const SplideCarousel = lazy(() => import("../../components/SplideCarousel/SplideCarousel"));
const Button = lazy(() => import("../../components/Button/Button"));
const HorizontalScroller = lazy(() => import("../../components/HorizontalScroller/HorizontalScroller"));
const ImpactSection = lazy(() => import("./ImpactSection"));
const Vision = lazy(() => import("../../components/Vision/Vision"));
const InnerHero = lazy(() => import("../../components/InnerHero/InnerHero"));
const SkeletonLoader = lazy(() => import("../../utilities/SkeletonLoader"));
const Deliverables = lazy(() => import("./Deliverables"));
const FadeWrapper = lazy(() => import("../../utilities/Animations/FadeWrapper"));
const FadeInSection = lazy(() => import("../../utilities/Animations/FadeInSection"));

// Static imports
import { theme } from "../../theme";
import projects from "./projectDetails";
import { technologiesData } from "../../components/Technologies/technologiesData";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useLayoutEffect } from "react";

// Debug: Verify projects is an array
console.log("Projects:", projects);

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  // State to track image and video loading
  const [coverImageLoaded, setCoverImageLoaded] = useState(false);
  const [additionalImageLoaded, setAdditionalImageLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setCoverImageLoaded(false);
    setAdditionalImageLoaded(false);
    setVideoLoaded(false);

    // Fallback timeout for video loader (5 seconds)
    const timeout = setTimeout(() => {
      setVideoLoaded(true);
    }, 5000);

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [slug]);

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

  if (!project) {
    return <div className="text-center py-20">Project not found</div>;
  }

  // Generate meta description
  const metaDescription =
    project.bodyText?.length > 160
      ? `${project.bodyText.substring(0, 157)}...`
      : project.bodyText || `Explore Scons Tech' ${project.heading.toLowerCase()} project, showcasing innovative software solutions.`;

  // Generate keywords
  const keywords = [
    "Scons Tech",
    project.heading.toLowerCase(),
    ...(Array.isArray(project.service) ? project.service : [project.service]).map((s) => s.toLowerCase()),
    "software development",
    "UK tech",
    "portfolio",
    "project",
  ].join(", ");

  return (
    <div className={`${theme.layoutPages.paddingBottom} min-h-screen`}>
      <Helmet>
        <title>{`${project.heading} | Scons Tech`}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={`https://sconstech.com/portfolio/${slug}`} />
        <meta property="og:title" content={`${project.heading} | Scons Tech`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://sconstech.com/portfolio/${slug}`} />
        <meta property="og:image" content={ogLogo} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Scons Tech logo" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${project.heading} | Scons Tech`} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogLogo} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": project.heading,
            "description": metaDescription,
            "url": `https://sconstech.com/portfolio/${slug}`,
            "image": ogLogo,
            "creator": {
              "@type": "Organization",
              "name": "Scons Tech",
              "url": "https://sconstech.com",
            },
            "keywords": keywords.split(", "),
          })}
        </script>
      </Helmet>

      <InnerHero
        logoImages={[project.logo]}
        headingText={project.heading}
        bodyText={project.bodyText}
        height="h-auto"
        headingColor="text-black"
        showBottomShadow={false}
        showPattern={false}
      >
        <div className="flex flex-wrap gap-2 items-start justify-start">
          {(Array.isArray(project.service) ? project.service : [project.service]).map((serviceItem, index) => (
            <div
              key={index}
              className="border-2 border-black text-center rounded-full px-4 py-1 w-fit"
            >
              <BodyText
                text={serviceItem}
                size="text-xs"
                fontWeight="font-semibold"
                color="text-black"
              />
            </div>
          ))}
        </div>
      </InnerHero>

      <FadeInSection>
        <div className="relative w-full h-full">
          {!coverImageLoaded && (
            <SkeletonLoader className="absolute top-0 left-0 w-full h-full" />
          )}
          <img
            src={project.coverImage}
            alt={project.heading}
            className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
              coverImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            onLoad={() => setCoverImageLoaded(true)}
          />
        </div>
      </FadeInSection>

      {/* About Client Section */}
      <div
        className={`flex flex-col xl:flex-row justify-between gap-8 ${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal}`}
      >
        <div className="flex flex-col gap-4 xl:w-1/2 w-full">
          <Heading
            text="About the Client"
            spanText="Client"
            spanColor="text-neon"
            centered={false}
            lineHeight="leading-none"
            size="text-60px"
          />
          <BodyText text={project.clientDetails} centered={false} />
          <div className="flex flex-row items-center">
            <BodyText
              text="Location:"
              fontWeight="font-semibold"
              className="mr-2"
            />
            <BodyText text={project.location} />
          </div>
        </div>

        {/* Additional Image with skeleton */}
        <div className="flex items-center xl:w-1/2 w-full justify-center relative">
          {!additionalImageLoaded && (
            <SkeletonLoader className="absolute top-0 left-0 w-full h-full" />
          )}
          <img
            src={project.additionalImages[0]}
            alt="Project visual"
            className={`w-full max-w-[800px] rounded-md object-contain transition-opacity duration-500 ease-in-out ${
              additionalImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            onLoad={() => setAdditionalImageLoaded(true)}
          />
        </div>
      </div>

      <FadeWrapper>
        {/* Project Description & Technologies */}
        <div
          className={`flex flex-col xl:flex-row justify-between items-end gap-8 ${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal}`}
        >
          <div className="flex flex-col gap-4 xl:w-3/5 w-full">
            <Heading
              text={project.headline}
              centered={false}
              lineHeight="leading-none"
              color="text-black"
            />
            <BodyText text={project.details} centered={false} color="text-black" />
          </div>

          <div className="flex flex-col justify-start items-start gap-2 xl:w-2/5 w-full">
            <BodyText
              text="Stack Used:"
              color="text-grayText"
              centered={false}
              fontWeight="font-bold"
            />
            <div className="grid grid-cols-2 gap-2 mt-2">
              {project.technologies
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
        </div>
      </FadeWrapper>

      <FadeWrapper>
        <div className={`${theme.layoutPages.paddingVertical}`}>
          {project.additionalImages.slice(1, 4).some((img) => img) && (
            <SplideCarousel
              images={project.additionalImages.slice(1, 4)}
              speed={1}
              height="400px"
              gap="1rem"
              objectFit="contain"
              haveBgBlurred={true}
              pauseOnHover={false}
            />
          )}

          {project.additionalImages.slice(4, 7).some((img) => img) && (
            <SplideCarousel
              images={project.additionalImages.slice(4, 7)}
              speed={-1}
              height="400px"
              gap="1rem"
              objectFit="contain"
              haveBgBlurred={true}
              pauseOnHover={false}
            />
          )}
        </div>
      </FadeWrapper>


{/* add the project.video && on the main wrapper here */}
   {project.video && (
  <FadeWrapper>
    <Heading
      text="Watch a Live Demo"
      spanText="Demo"
      spanColor="text-neon"
      className="mb-2"
    />
    {/* Optional Video Section */}
    <div
      className={`relative w-full max-w-[1000px] mx-auto ${theme.layoutPages.paddingVertical}`}
    >
      {!videoLoaded && (
        <SkeletonLoader
          className="absolute top-0 left-0 w-full h-[300px] sm:h-[300px] xl:h-[550px] rounded-3xl border-4 xl:border-8 border-neon"
        />
      )}
      <video
        src={project.video}
        controls
        playsInline
        muted
        preload="metadata"
        poster={project.coverImage || ogLogo} // Fallback to coverImage or ogLogo
        className={`w-full h-[300px] sm:h-[300px] xl:h-[550px] object-contain rounded-3xl border-4 xl:border-8 border-neon transition-opacity duration-500 ease-in-out ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
        onCanPlay={() => setVideoLoaded(true)}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  </FadeWrapper>
)}


      <Deliverables deliverables={project.deliverables} heading={project.heading} />

      <HorizontalScroller
        heading={`How ${project.heading} came to life`}
        spanHeading={project.heading}
        bodyText="Scons Tech brings projects to life with a clear and proven process—starting from strategic planning and architecture design, followed by precise development focused on performance and scalability. Each project is thoroughly tested and refined through client feedback to ensure a smooth, successful launch."
      />

      <ImpactSection heading={project.heading} introText={project.impactIntro} impacts={project.impacts} />

      <Vision />
    </div>
  );
};

export default ProjectDetail;