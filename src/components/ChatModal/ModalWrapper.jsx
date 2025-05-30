import React, { useEffect, useState } from 'react';

const ModalWrapper = ({ isOpen, onClose, children }) => {
  const [showCloseButton, setShowCloseButton] = useState(false);

  useEffect(() => {
    let showBtnTimer;

    if (isOpen) {
      showBtnTimer = setTimeout(() => setShowCloseButton(true), 500);
      document.body.style.overflow = 'hidden'; // Disable scroll
    } else {
      document.body.style.overflow = ''; // Re-enable scroll
      setShowCloseButton(false);
    }

    return () => {
      clearTimeout(showBtnTimer);
      document.body.style.overflow = ''; // Ensure scroll is reset
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 h-screen z-[9999] flex items-center justify-end bg-black bg-opacity-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-black py-12 px-8 w-[500px] h-screen shadow-xl relative transform transition-transform duration-500 ease-in-out z-110 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-50px text-black bg-white hover:bg-white rounded-full w-8 h-8 flex items-center justify-center z-120"
          >
            ×
          </button>
        )}
        <div className="flex flex-col justify-start text-start gap-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;