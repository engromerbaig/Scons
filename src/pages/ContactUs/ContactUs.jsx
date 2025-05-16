import React from 'react';
import InnerHero from '../../components/InnerHero/InnerHero';
import FormTemplate from '../../components/FormTemplate/FormTemplate';
import Heading from '../../components/Heading/Heading';
import BodyText from '../../components/BodyText/BodyText';
import contactImage from '../../assets/images/contact.svg';
import accordionData from '../../components/Locations/modules/accordionData';
import { theme } from '../../theme';

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

      <div className={`${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal}`}>
        <div className="flex flex-col lg:flex-row  justify-start gap-8">
          {/* LHS: Location Data */}
          <div className="lg:w-1/2">
            <Heading
              text="Our Locations"
              className="text-3xl font-bold mb-6"
              centered={false}
            />
            {accordionData.map((location, index) => (
              <div key={index} className="mb-8 max-w-md">
                <Heading
                  text={`${location.title} Office`}
                  className="text-xl font-semibold mb-2"
                  centered={false}
                />
                <BodyText
                  text={location.content.address}
                  centered={false}
                />
                <BodyText
                  text={`Phone: ${location.content.phone}`}
                  centered={false}
                />
              </div>
            ))}
          </div>

          {/* RHS: Form Template */}
          <div className="lg:w-1/2">
            <FormTemplate buttonWidth='w-40' textAreaRows={4} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;