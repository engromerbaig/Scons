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
    price = '', // Fallback to base price
  } = packageInfo;

  // Use displayPrice if available, otherwise format the base price
  const finalPrice = displayPrice || `${currentSymbol} ${price}`;

  const handleFormSubmit = (formData) => {
    console.log('Package Inquiry Submitted:', { packageName: title, packagePrice: finalPrice, ...formData });
  };

  const inputStyles = "m-1 py-2 px-6 text-sm rounded-full text-white placeholder-bodyText bg-charcoal w-full focus:outline-none";

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <Heading
        text={`Interested in ${title}?`}
        spanText={`${title}?`}
        spanColor="text-neon"
        color="text-white"
        size="text-40px"
        centered={false}
      />
      <PackageFormTemplate
        packageName={title}
        packagePrice={finalPrice}
        handleFormSubmit={handleFormSubmit}
        inputStyles={inputStyles}
        hideErrorMessages={true}
        onSuccess={onClose}
        formName="package-inquiry" // Use static formName to match index.html
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