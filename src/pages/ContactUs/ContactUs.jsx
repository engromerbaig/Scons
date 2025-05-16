import React from 'react';
import InnerHero from '../../components/InnerHero/InnerHero';
import FormTemplate from '../../components/FormTemplate/FormTemplate';
import Heading from '../../components/Heading/Heading';
import BodyText from '../../components/BodyText/BodyText';
import contactImage from '../../assets/images/contact.svg';
import accordionData from '../../components/Locations/modules/accordionData';

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

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LHS: Location Data */}
          <div className="lg:w-1/2">
            <Heading
              text="Our Locations"
              className="text-3xl font-bold mb-6"
            />
            {accordionData.map((location, index) => (
              <div key={index} className="mb-8">
                <Heading
                  text={`${location.title}, ${location.country}`}
                  className="text-xl font-semibold mb-2"
                />
                <BodyText
                  text={location.content.address}
                  className="text-gray-700 mb-2"
                />
                <BodyText
                  text={`Phone: ${location.content.phone}`}
                  className="text-gray-700"
                />
              </div>
            ))}
          </div>

          {/* RHS: Form Template */}
          <div className="lg:w-1/2">
            <FormTemplate buttonWidth='w-40' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;