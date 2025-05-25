import React from 'react';
import Heading from "../Heading/Heading";
import GreenBelt from '../GreenBelt/GreenBelt';
import FadeWrapper from '../../utilities/Animations/FadeWrapper';
import SectionDetailItem from "./SectionDetailItem";
import { theme } from '../../theme';
import BodyText from '../BodyText/BodyText';

const SectionDetails = ({ faqSpanText, faqBodyText, heading, faqItems }) => {
  return (
    <div className={`min-h-screen ${theme.layoutPages.paddingVertical}`}>

      <div className={`flex flex-col gap-2 ${theme.layoutPages.paddingHorizontal}`}>

   <Heading
            text={`Types of ${heading} Apps We Build`}
            spanText={heading}
            spanColor="text-neon"
            centered={true}
            // className={`${theme.layoutPages.paddingHorizontal}`}
          />

          <BodyText
            text={`We cover a wide range of ${heading} apps, lorem epsom osd  s da fd ffs gf dg d gd dg dfg fd gfd gfd g dg d gdf gfdg  dfg fd gfd gfd g dg d gdf gfdg  dfg fd gfd gfd g dg d gdf gfdg`}
            centered={true}
            className='xl:px-40'
          />

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