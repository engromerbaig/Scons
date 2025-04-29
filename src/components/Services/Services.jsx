import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import AnimatedBackground from '../../utilities/AnimatedBackground/AnimatedBackground';
import { services } from './servicesData';
import { theme } from '../../theme';
import Heading from '../Heading/Heading';
import useFadeInAnimation from '../../utilities/Animations/useFadeInAnimation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Services = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(services[0]);
  const [isMobile, setIsMobile] = useState(false);
  const { ref } = useFadeInAnimation({ isAnimate: true, delay: 0.3, duration: 0.8, threshold: 0.2 });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AnimatedBackground topShadow={true} showBlob={false} bgSize="cover" className={`w-full lg:min-h-screen ${theme.layoutPages.paddingVertical}`}>
      <div className={`flex flex-col lg:flex-row lg:justify-between lg:h-[80vh] gap-2 ${theme.layoutPages.paddingHorizontal}`}>
        
        {!isMobile && (
          <div className="w-full lg:w-1/2 flex flex-col justify-between h-full overflow-y-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedService.heading === service.heading ? 'font-bold text-black caret-neon' : 'text-black/20'
                }`}
                onMouseEnter={() => setSelectedService(service)}
                onClick={() => navigate(`/service/${service.slug}`)}
              >
                <Heading text={service.heading} spanText={service.spanText} centered={false} size="text-55px" inActiveHeading={selectedService.heading !== service.heading} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex flex-col lg:flex-row justify-center items-center relative">
          {isMobile ? (
            <>
              <div className="w-full text-center mb-4">
                <Heading text={selectedService.heading} spanText={selectedService.spanText} centered={true} size="text-55px" isAnimate={false} />
              </div>
              <div className="w-full" onClick={() => navigate(`/service/${selectedService.slug}`)}>
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={10}
                  slidesPerView={1}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  onSlideChange={(swiper) => setSelectedService(services[swiper.activeIndex])}
                >
                  {services.map((service, index) => (
                    <SwiperSlide key={index}>
                      <div className="flex justify-center items-center w-full h-full">
                        <LazyLoadImage
                          src={service.image}
                          alt={service.heading}
                          effect="blur"
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </>
          ) : (
            <div ref={ref} className="w-full h-auto flex justify-center items-center">
              <LazyLoadImage
                key={selectedService.image}
                src={selectedService.image}
                alt={selectedService.heading}
                effect="blur"
                className="w-full h-auto object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default Services;
