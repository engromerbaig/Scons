import React from 'react';
import InnerHero from '../../components/InnerHero/InnerHero';
import FormTemplate from '../../components/FormTemplate/FormTemplate';
import Heading from '../../components/Heading/Heading';
import BodyText from '../../components/BodyText/BodyText';
import contactImage from '../../assets/images/contact.svg';
import accordionData from '../../components/Locations/modules/accordionData';
import { theme } from '../../theme';
import Locations from '../../components/Locations/Locations';

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

      <div className={``}>
        <div className="flex flex-col gap-8">

             <div className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical} `}>
            <FormTemplate buttonWidth='w-40' textAreaRows={4} />
          </div>
          {/* LHS: Location Data */}
       <Locations/>

          {/* RHS: Form Template */}
         
        </div>
      </div>
    </div>
  );
};

export default ContactUs;