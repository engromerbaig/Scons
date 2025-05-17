import React from 'react';
import InnerHero from '../../components/InnerHero/InnerHero';
import FormTemplate from '../../components/FormTemplate/FormTemplate';
import Heading from '../../components/Heading/Heading';
import BodyText from '../../components/BodyText/BodyText';
import contactImage from '../../assets/images/contact.svg';
import { theme } from '../../theme';
import Locations from '../../components/Locations/Locations';
import { contactDetails } from '../../components/MobileMenu/modules/contactDetails';

import { FiPhone, FiMail } from 'react-icons/fi';


const ContactUs = () => {
  return (
    <div>
      <InnerHero
        headingText="Get in Contact With Us"
        spanText="Contact"
        bodyText="Have questions or want to work with us? Reach out today — we’re here to help and look forward to connecting with you."
        illustrationImage={contactImage}
        illustrationImageWidth="w-3/4"
      />

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
                <FormTemplate buttonWidth="w-40" textAreaRows={4}  showSelect={true} hideErrorMessages={true}/>
              </div>

            </div>
          </div>

          {/* Locations Accordion Section */}
          <Locations isAnimate={false} />

        </div>
      </div>
    </div>
  );
};

export default ContactUs;
