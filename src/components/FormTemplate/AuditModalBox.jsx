
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { auditDetails } from './auditDetails';

const AuditModalBox = ({ isOpen, onClose }) => {


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto transform transition-transform duration-300 scale-100">
        <h2 className="text-2xl font-bold text-black mb-4">
          What to Include in Your Free Website Audit (Scons Tech)
        </h2>
        <div className="space-y-6">
          {auditDetails.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-black flex items-center gap-2">
                <FaCheckCircle className="text-neon" />
                {section.title}
              </h3>
              <ul className="mt-2 space-y-2">
                {section.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                    <FaCheckCircle className="text-neon mt-1 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neon text-black rounded-full font-semibold hover:bg-neon/80 transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuditModalBox;
