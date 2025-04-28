import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import businessSteps from "./businessSteps";
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";

const BusinessFormulaMobile = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blueLight px-6 py-10">
      <Heading text="Formula For Business Success" spanText="Business Success" centered={true} />
      <BodyText
        text="Tyfora combines innovation, strategy, and flawless execution to deliver tech solutions that fuel growth and guarantee lasting success for your business."
        centered={true}
      />

      <div className="w-full mt-6">
      <Swiper
  modules={[Pagination, Autoplay]}
  spaceBetween={10}
  slidesPerView={1}
  autoplay={{ delay: 3000, disableOnInteraction: false }}
  pagination={{ clickable: true }}
  className="business-formula-swiper"
>

          {businessSteps.map((step, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center">
                {/* <h2 className="text-250px outlined-text font-bold text-center font-poppins text-blue leading-none">
                  {step.number}
                </h2> */}

          
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={step.image}
                    alt={step.heading}
                    className="w-3/4 h-full object-contain rounded-lg"
                  />


<Heading
text={step.heading}
fontFamily="font-bold"
color="font-black"
size="text-120px"
className="mt-2"
/>

                </div>


              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BusinessFormulaMobile;
