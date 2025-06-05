import React, { useRef, useEffect, useState, lazy } from 'react';
import { Helmet } from 'react-helmet-async'; // Import Helmet
import ogDefault from '../../assets/images/og-default.jpg'; // Default OG image

// Lazy load all components
const InnerHero = lazy(() => import('../../components/InnerHero/InnerHero'));
const FormTemplate = lazy(() => import('../../components/FormTemplate/FormTemplate'));
const Heading = lazy(() => import('../../components/Heading/Heading'));
const BodyText = lazy(() => import('../../components/BodyText/BodyText'));
const Locations = lazy(() => import('../../components/Locations/Locations'));
const FadeInSection = lazy(() => import('../../utilities/Animations/FadeInSection'));

import contactImage from '../../assets/images/contact.svg';
import { theme } from '../../theme';
import { contactDetails } from '../../components/MobileMenu/modules/contactDetails';
import FAQ from '../../components/FAQ/FAQ';
import { socialsData } from '../../components/MobileMenu/modules/socialsData';
import AuditModalBox from '../../components/FormTemplate/AuditModalBox';

import Button from '../../components/Button/Button';

const ContactUs = () => {

    const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  const handleFormSubmit = (formData) => {
    console.log('Form2 Submitted with Data:', formData);
  };

  return (
    <div>
      <Helmet>
        <title>Contact Us | Scons</title>
        <meta
          name="description"
          content="Get in touch with Scons for innovative software solutions. Reach out via our contact form or find our office locations."
        />
        <meta
          name="keywords"
          content="Scons, contact us, software company, UK tech, get in touch, software solutions"
        />
        <link rel="canonical" href="https://sconstech.com/contact-us" />
        <meta property="og:title" content="Contact Us | Scons" />
        <meta
          property="og:description"
          content="Get in touch with Scons for innovative software solutions. Reach out via our contact form or find our office locations."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sconstech.com/contact-us" />
        <meta property="og:image" content={ogDefault} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | Scons" />
        <meta
          name="twitter:description"
          content="Get in touch with Scons for innovative software solutions. Reach out via our contact form or find our office locations."
        />
        <meta name="twitter:image" content={ogDefault} />
      </Helmet>
      <FadeInSection>
        {/* <InnerHero
          headingText="Get in Contact With Us"
          spanText="Contact"
          bodyText="Have questions or want to work with us? Reach out today — we’re here to help and look forward to connecting with you."
          illustrationImage={contactImage}
          illustrationImageWidth="w-3/4"
        /> */}
      </FadeInSection>
      <div className="">
        <div className="flex flex-col gap-8">
          <div
            className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}
          >
            <div className="flex flex-col xl:flex-row gap-8 xl:gap-14">
              <div className="xl:w-1/2 flex flex-col gap-4">
                <Heading
                  text="Get a Free Audit"
                  spanText="Audit"
                  centered={false}
                  color="text-black"
                  spanColor="text-neon"
                />
                <BodyText
                  text="We’re here to help. Whether you have a question about our services, need assistance, or just want to say hello, feel free to reach out. We look forward to hearing from you!"
                  centered={false}
                  className="max-w-sm"
                />

                <Button
                name="What's in a Free Audit?"
                className='py-2 md:py-4 '
                                  onClick={() => setIsAuditModalOpen(true)}

                />
                {contactDetails.map((contact) => {
                  const Icon = contact.icon;
                  return (
<a
  key={contact.type}
  href={contact.link}
  className="flex items-center gap-2 px-2 py-2 rounded-xl text-25px font-medium transition-all duration-300 ease-in-out max-w-[250px] xl:max-w-sm
             border-2 
             xl:border-transparent border-neon  xl:bg-transparent
             xl:hover:border-neon 
             xl:hover:bg-neon/5 bg-neon/5"
>
  <Icon className="text-25px text-neon" />
  {contact.detail}
</a>

                  );
                })}

                  <div className="py-2 md:py-4 flex flex-row justify-between xl:space-x-2 max-w-[180px]">
         {socialsData.map((social, idx) => {
    const Icon = social.icon;
    return (
      <a
        key={idx}
        href={social.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:text-neon transition duration-300"
      >
        <Icon className="w-6 lg:w-7 h-6 lg:h-7 transition-transform " />
      </a>
    );
  })}

        </div>
              </div>
              <div className="xl:w-1/2 xl:shadow-xl xl:rounded-xl xl:border xl:px-6 xl:py-4">
                <FormTemplate
                  handleFormSubmit={handleFormSubmit}
                  buttonWidth="w-40"
                  inputStyles="m-1 p-2 md:p-3 border-2 rounded-xl shadow-xs text-sm  text-black placeholder-bodyText border-neon bg-transparent w-full focus:outline-none"
                  textAreaRows={3}
                  showSelect={true}
                  hideErrorMessages={true}
                  showPhoneNumber={false}
                  isAudit
                  btnText='Get Audit'
                />
              </div>
            </div>
          </div>
          <FadeInSection>
            <Locations />
          </FadeInSection>
          <FAQ />
        </div>
      </div>

         <AuditModalBox
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />
    </div>
  );
};

export default ContactUs;