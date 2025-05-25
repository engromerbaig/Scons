import React from 'react';
import Heading from "../Heading/Heading";
import GreenBelt from '../GreenBelt/GreenBelt';
import FadeWrapper from '../../utilities/Animations/FadeWrapper';
import SectionDetailItem from "./SectionDetailItem";
import { theme } from '../../theme';

const SectionDetails = ({ faqSpanText, faqBodyText, faqItems }) => {
  return (
    <div className={`min-h-screen ${theme.layoutPages.paddingVertical}`}>
      <div className="flex flex-col gap-6">
        <GreenBelt className="">
          <Heading text="Creating Solutions That Drive Success" />
        </GreenBelt>
      </div>

      <FadeWrapper>
        <div className={`py-10 `}>
          {faqItems.map((item, index) => (
            <div key={index}>
              <SectionDetailItem
                serviceHeading={item.serviceHeading}
                spanText={item.serviceHeading} // Use serviceHeading as spanText
                details={item.details}
                faqIcon={item.faqIcon[0]} // Pass the dynamic icon
                icons={item.icons} // Pass the icons array
                isImageLeft={index % 2 === 0} // Alternate right for odd, left for even
              />
            </div>
          ))}
        </div>
      </FadeWrapper>
    </div>
  );
};

export default SectionDetails;