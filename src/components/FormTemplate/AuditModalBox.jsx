import React, { useEffect, useRef } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5';
import { auditDetails } from './auditDetails';
import BodyText from '../BodyText/BodyText';

const AuditModalBox = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  // Handle Escape key and outside click to close modal
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
      <div
        ref={modalRef}
        className="bg-white package-scrollbar rounded-lg p-6 max-w-xl w-10/12 max-h-[70vh] overflow-y-auto transform transition-transform duration-300 scale-100 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neon hover:text-neon/80 transition-colors duration-300"
          aria-label="Close modal"
        >
          <IoCloseCircle className="xl:w-8 xl:h-8 w-6 h-6" />
        </button>
        <BodyText
          text="What is Included in My Free Website Audit?"
          centered={false}
          fontWeight="font-bold"
          className="text-xl pr-10 text-black mb-4"
        />
        <div className="space-y-6">
          {auditDetails.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-black flex items-center gap-2">
                <BodyText
                  text={section.title}
                  fontWeight="font-bold"
                  size="text-lg"
                  centered={false}
                />
              </h3>
              <ul className="mt-2 space-y-2">
                {section.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                    <FaCheckCircle className="text-neon mt-1 flex-shrink-0" />
                    <BodyText text={item} size="text-sm" centered={false} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuditModalBox;