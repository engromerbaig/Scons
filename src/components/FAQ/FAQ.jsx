import { useState } from 'react';
import Heading from "../Heading/Heading";
import BodyText from "../BodyText/BodyText";
import caretDown from '../../assets/icons/caretdown.svg';
import { faqData } from './faqData';
import FAQItem from './modules/FAQItem';
import { theme } from '../../theme';

// Dummy FAQ Data




const FAQ = () => {
    // Set the first FAQ item as active by default
    const [activeFAQ, setActiveFAQ] = useState(0);

    const handleFAQClick = (index) => {
        setActiveFAQ(activeFAQ === index ? null : index);
    };

    return (
        <div className={`${theme.layoutPages.paddingHorizontal} ${theme.layoutPages.paddingVertical}`}>
            <div className="text-center mb-8">
            
                <BodyText
                    text="Find answers to common questions about Tyfora’s services, processes, and how we empower businesses with innovative solutions."
                />
            </div>

            {/* FAQ List */}
            <div className={`${theme.layoutPages.conatinerVerticalGap}`}>
                {faqData.map((faq, index) => (
                    <FAQItem
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                        isActive={activeFAQ === index}
                        onClick={() => handleFAQClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default FAQ;
