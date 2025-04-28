import React from 'react';
import Heading from '../../components/Heading/Heading';
import BodyText from '../../components/BodyText/BodyText';
import privacyPolicyData from './privacyPolicyData';
import { theme } from '../../theme';

const PrivacyPolicy = () => {
    return (
        <div className={`${theme.layoutPages.paddingVertical} ${theme.layoutPages.paddingHorizontal} text-left`}>
            <Heading text={privacyPolicyData.title} size="text-70px" color="text-black" fontWeight="font-semibold" isAnimate={false} />
            
            {privacyPolicyData.description.map((paragraph, index) => (
                <BodyText key={index} text={paragraph} centered={false} className="text-left mb-4" isAnimate={false} />
            ))}

            <div className="text-start mt-6">
                {privacyPolicyData.policyList.map((policy, index) => (
                    <div key={index} className="mb-10">
                        <Heading text={policy.title} size="text-40px" color="text-black" fontWeight="font-medium" isAnimate={false} className='text-start' />
                        <BodyText text={policy.text} centered={false} className="text-left" isAnimate={false} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PrivacyPolicy;
