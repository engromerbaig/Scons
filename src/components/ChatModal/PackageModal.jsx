import React from 'react';
import ModalWrapper from './ModalWrapper';
import Heading from '../Heading/Heading';
import BodyText from '../BodyText/BodyText';
import PackageFormTemplate from '../FormTemplate/PackageFormTemplate';
import { Link } from 'react-router-dom';

const PackageModal = ({ isOpen, onClose, packageInfo = {} }) => {
  const { 
    title = '', 
    displayPrice = '', 
    currentSymbol = 'USD',
    price = '' // fallback to base price if displayPrice not available
  } = packageInfo;

  // Use displayPrice if available, otherwise format the base price
  const finalPrice = displayPrice || `USD ${price}`;

  const handleFormSubmit = (formData) => {
    console.log('Package Inquiry Submitted:', formData);
  };

  const inputStyles = "m-1 py-2 px-6 text-sm rounded-full text-white placeholder-bodyText bg-charcoal w-full focus:outline-none";

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <Heading
        text={`Interested in ${packageInfo.title}? `}
        spanText={`${packageInfo.title}?`}

        spanColor="text-neon"
        color="text-white"
        size="text-40px"
        centered={false}
        className=''
      />
      {/* <BodyText
        text="Fill out the form below and our team will reach out to you with all the details you need."
        centered={false}
        color="text-white"
        size="text-sm"
      /> */}
      <PackageFormTemplate
        packageName={title}
        packagePrice={finalPrice}
        handleFormSubmit={handleFormSubmit}
        inputStyles={inputStyles}
        hideErrorMessages={true}
        onSuccess={onClose}
        formName={`package-inquiry-${title.toLowerCase().replace(/\s+/g, '-')}`}
      />
      <BodyText
        text={
          <>
            Your data is safe with us. Learn more in our{' '}
            <span className="text-neon">
              <Link to="/privacy-policy" onClick={onClose}>Privacy Policy</Link>
            </span>.
          </>
        }
        centered={false}
        color="text-grayText"
        size="text-sm"
        className="mt-2 xl:mt-4"
      />
    </ModalWrapper>
  );
};

export default PackageModal;