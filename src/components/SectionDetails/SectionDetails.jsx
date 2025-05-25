import React from 'react';
import Heading from "../Heading/Heading";
import GreenBelt from '../GreenBelt/GreenBelt';
import FadeWrapper from '../../utilities/Animations/FadeWrapper';
import SectionDetailItem from "./SectionDetailItem";
import { theme } from '../../theme';
import BodyText from '../BodyText/BodyText';

const SectionDetails = ({ faqSpanText, faqBodyText, heading, faqItems }) => {
  // Extract service headings from faqItems
  const serviceHeadings = faqItems.map(item => item.serviceHeading);

  // Format service headings as JSX with bold styling
  const formattedHeadings = (
    <>
      {serviceHeadings.map((heading, index) => (
        <span key={index}>
          <span className="font-bold">{heading}</span>
          {index < serviceHeadings.length - 2 && ', '}
          {index === serviceHeadings.length - 2 && serviceHeadings.length > 1 && ', and '}
          {index === serviceHeadings.length - 1 && serviceHeadings.length > 1 && ''}
        </span>
      ))}
    </>
  );

  return (
    <div className={`min-h-screen ${theme.layoutPages.paddingVertical}`}>
      <div className={`flex flex-col gap-2 ${theme.layoutPages.paddingHorizontal}`}>
        <Heading
          text={`Types of ${heading} Apps We Build`}
          spanText={heading}
          spanColor="text-neon"
          centered={true}
        />

        <BodyText
          text={
            <>
              We specialize in building a wide range of {heading} applications, including {formattedHeadings}. Our team delivers tailored solutions to meet your unique business needs.
            </>
          }
          centered={true}
          className="xl:px-40"
        />
      </div>

      <FadeWrapper>
        <div className={`py-10`}>
          {faqItems.map((item, index) => (
            <div key={index}>
              <SectionDetailItem
                serviceHeading={item.serviceHeading}
                spanText={item.serviceHeading}
                details={item.details}
                faqIcon={item.faqIcon[0]}
                icons={item.icons}
                isImageLeft={index % 2 === 0}
              />
            </div>
          ))}
        </div>
      </FadeWrapper>
    </div>
  );
};

export default SectionDetails;