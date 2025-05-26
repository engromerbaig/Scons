import React, { useRef, useEffect, useState, lazy } from "react";

// Lazy load all components
const InnerHero = lazy(() => import('../../components/InnerHero/InnerHero'));
const FormTemplate = lazy(() => import('../../components/FormTemplate/FormTemplate'));
const Heading = lazy(() => import('../../components/Heading/Heading'));
const BodyText = lazy(() => import('../../components/BodyText/BodyText'));
const Locations = lazy(() => import('../../components/Locations/Locations'));
const FadeInSection = lazy(() => import('../../utilities/Animations/FadeInSection'));

// Static imports for non-component data
import contactImage from '../../assets/images/contact.svg';
import { theme } from '../../theme';
import { contactDetails } from '../../components/MobileMenu/modules/contactDetails';
import FAQ from "../../components/FAQ/FAQ";

const ContactUs = () => {
  const handleFormSubmit = (formData) => {
    console.log('Form2 Submitted with Data:', formData);
  };

  return (
    <div>
      <FadeInSection>
        <InnerHero
          headingText="Get in Contact With Us"
          spanText="Contact"
          bodyText="Have questions or want to work with us? Reach out today — we’re here to help and look forward to connecting with you."
          illustrationImage={contactImage}
          illustrationImageWidth="w-3/4"
        />
      </FadeInSection>

      <div className="">
        <div className="flex flex-col gap-8">
          {/* Contact Section */}
          <div className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}>
            <div className="flex flex-col xl:flex-row gap-8">
              {/* Left Side: Heading + BodyText */}
              <div className="xl:w-1/2 flex flex-col gap-4">
                <Heading
                  text="Talk to Our Team"
                  spanText="Team"
                  centered={false}
                  color="text-black"
                  spanColor='text-neon'
                />
                <BodyText
                  text="We’re here to help. Whether you have a question about our services, need assistance, or just want to say hello, feel free to reach out. We look forward to hearing from you!"
                  centered={false}
                  className='max-w-sm'
                />

                {contactDetails.map((contact) => {
                  const Icon = contact.icon;
                  return (
                    <a
                      key={contact.type}
                      href={contact.link}
                      className="flex items-center gap-2 hover:text-neon text-25px font-medium transition-colors"
                    >
                      <Icon className="text-25px text-black" />
                      {contact.detail}
                    </a>
                  );
                })}
              </div>

              {/* Right Side: Form */}
              <div className="xl:w-1/2">
                <FormTemplate
                  handleFormSubmit={handleFormSubmit}
                  buttonWidth="w-40"
                  textAreaRows={4}
                  showSelect={true}
                  hideErrorMessages={true}
                />
              </div>
            </div>
          </div>

          <FadeInSection>
            <Locations />
          </FadeInSection>

          <FAQ />
          {/* Locations Accordion Section */}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;