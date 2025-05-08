import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnimatedBackground from "../../utilities/AnimatedBackground/AnimatedBackground";
import projects from "./projectDetails";
import { theme } from "../../theme";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import AreaConverter from "../../utilities/AreaConverter";
import { FaTools, FaCheckCircle } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import AboveFooter from "./AboveFooter";


// Import Swiper styles and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/autoplay";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  // State for lightbox
  const [lightboxActive, setLightboxActive] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // State for thumbs Swiper
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // Scroll to top instantly when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0); // Instant scroll to top
  }, []);

  // Open lightbox
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxActive(true);
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxActive(false);
  };

  // Handle Escape key to close lightbox
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
    };

    if (lightboxActive) {
      window.addEventListener("keydown", handleKeyDown);
    }

    // Cleanup event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxActive]);

  if (!project) {
    return <div className="text-center py-20">Project not found</div>;
  }

  return (
    <AnimatedBackground bgSizeMob="contain" className={`min-h-screen ${theme.layoutPages.paddingVertical}`}>
    {/* Grid Layout */}
    <div className={`${theme.layoutPages.paddingHorizontal} grid grid-cols-1 lg:grid-cols-2 gap-8`}>
      {/* Left Side: Swiper Slider */}
      <div>
        {/* Main Slider */}
        {project.images?.length > 0 && (
          <>
            <Swiper
              navigation={true}
              modules={[Navigation, Thumbs, Autoplay]}
              thumbs={{ swiper: thumbsSwiper }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              className="mb-4 rounded-md shadow-md"
            >
              {project.images.map((image, index) => (
                <SwiperSlide key={index} onClick={() => openLightbox(index)}>
                  <img
                    src={image}
                    alt={`Project ${project.name} ${index + 1}`}
                    className="w-full h-96 object-cover rounded-md cursor-pointer"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnail Preview */}
            <Swiper
              spaceBetween={10}
              slidesPerView={4}
              modules={[Thumbs]}
              watchSlidesProgress={true}
              onSwiper={setThumbsSwiper}
              className="thumbnail-slider"
            >
              {project.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`Project ${project.name} ${index + 1}`}
                    className="w-full h-20 object-cover rounded-md cursor-pointer"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>

      {/* Right Side: Project Description */}
      <div className="text-gray-800">
        <h2 className="text-3xl font-bold">{project.name}</h2>
        {project.client && <h3 className="text-lg font-semibold">{project.client}</h3>}
        {project.year && project.type && (
          <p className="text-lg text-gray-600">{project.year} | {project.type}</p>
        )}
        {project.location && (
          <div className="flex items-center gap-x-1 mt-1">
            <FaLocationDot className="text-blue" />
            <span className="font-semibold leading-none">{project.location}</span>
          </div>
        )}
        {project.architect && <p className="mt-4"><strong>Architect: </strong>{project.architect}</p>}

        {project.details && <p className="mt-2">{project.details}</p>}
        {project.stories && <p className="mt-2"><strong>Stories: </strong>{project.stories}</p>}

        {project.area && <AreaConverter areaInSft={project.area} />}

        {project.services && (
  <div className="mt-4">
    <strong className="flex items-center gap-2">
      <FaTools className="text-blue" /> Services:
    </strong>
    <ul className="mt-1">
      {Object.entries(project.services).map(([serviceName, details]) => (
     <li key={serviceName} className="mt-2">
     <strong className="">{serviceName}:</strong>
     <ul className="ml-4 flex flex-wrap">
       {details.Service.map((item, index) => (
         <li key={index} className="flex items-center gap-2 mt-1 w-full md:w-1/2">
           <FaCheckCircle className="text-blue" />
           {item}
         </li>
       ))}
     </ul>
   </li>
      ))}
    </ul>
  </div>
)}

        {project.status && (
          <p className="mt-2">
            <strong>Status:</strong> {project.status}
          </p>
        )}

        {/* Back to Portfolio Link */}
        <Link to="/portfolio" className="inline-block mt-6 px-4 py-2 bg-blue text-white rounded-full">
          Back to Portfolio
        </Link>
      </div>
    </div>

    {/* Lightbox */}
    {lightboxActive && (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <button
          onClick={closeLightbox}
          className="absolute top-4 right-4 text-white text-2xl z-50 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
        >
          &times;
        </button>

        <Swiper initialSlide={lightboxIndex} navigation={true} modules={[Navigation]} className="w-full h-full">
          {project.images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Project ${project.name} ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )}
<AboveFooter currentProjectSlug={slug} />
</AnimatedBackground>
  );
};

export default ProjectDetail;