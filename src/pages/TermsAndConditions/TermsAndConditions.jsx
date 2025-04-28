import React from 'react';
import Heading from '../../components/Heading/Heading';
import BodyText from '../../components/BodyText/BodyText';
import termsData from './termsData';
import { theme } from '../../theme';

const TermsAndConditions = () => {
    return (
        <div className={`${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal} text-left`}>
            <Heading text={termsData.title} size="text-70px" color="text-black" fontWeight="font-semibold" isAnimate={false} />
            
            {termsData.description.map((paragraph, index) => (
                <BodyText key={index} text={paragraph} centered={false} className="text-left mb-4" isAnimate={false} />
            ))}

            <div className="text-start mt-6">
                {termsData.termsList.map((term, index) => (
                    <div key={index} className="mb-10">
                        <Heading text={term.title} size="text-40px" color="text-black" fontWeight="font-medium" isAnimate={false} className='text-start' />
                        <BodyText text={term.text} centered={false} className="text-left" isAnimate={false} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TermsAndConditions;
