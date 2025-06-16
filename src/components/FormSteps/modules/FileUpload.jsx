import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiTrash } from 'react-icons/fi';
import { CheckCircle, XCircle } from 'lucide-react';
import fileIcon from '../../../assets/icons/file.svg';
import BodyText from '../../BodyText/BodyText';

const FileUpload = ({
  file,
  url,
  onFileChange,
  onUrlChange,
  placeholderText = "Paste URL Here",
  infoText = "We accept DOC, DOCX, PDF, RTF & TXT, up to 5MB",
  inputType = "input",
  isLoading = false,
  error = null,
  successMessage = null,
}) => {
  const [placeholderVisible, setPlaceholderVisible] = useState(true);

  const handleFileDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onFileChange(null); // Clear file
    onUrlChange(''); // Clear URL to re-enable both inputs
  };

  const truncateFileName = (name, maxLength = 20) => {
    if (name.length <= maxLength) return name;
    const parts = name.split('.');
    const extension = parts.pop();
    const baseName = parts.join('.');
    const truncatedBase = baseName.slice(0, maxLength - extension.length - 3);
    return `${truncatedBase}...${extension}`;
  };

  // Determine if file upload or URL input should be disabled
  const isFileUploadDisabled = !!url && !isLoading;
  const isUrlInputDisabled = !!file && !isLoading;

  return (
    <div className="flex flex-col w-full items-center gap-4">
      <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-4">
        {/* File Upload Box */}
        <label
          className={`flex flex-row lg:flex-col gap-4 lg:gap-0 items-center justify-center w-full lg:w-1/2 h-20 lg:h-40 border-2 rounded-lg relative transition px-4 ${
            isFileUploadDisabled
              ? 'border-gray-200 text-gray-500 pointer-events-none'
              : 'border-neon text-neon cursor-pointer hover:bg-neon/20'
          }`}
        >
          {isLoading ? (
            <svg
              className="h-5 w-5 text-neon"
              style={{ animation: 'spin 1s linear infinite' }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : file ? (
            <>
              <span
                className="text-center px-4 font-manrope w-full break-words overflow-hidden"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis',
                  wordBreak: 'break-all',
                }}
                title={file.name}
              >
                {truncateFileName(file.name)}
              </span>
              <button
                type="button"
                className="absolute top-2 right-2 cursor-pointer hover:text-neon transition"
                onClick={handleFileDelete}
                aria-label="Delete file"
              >
                <FiTrash size={20} className={isFileUploadDisabled ? 'text-gray-500' : 'text-black'} />
              </button>
            </>
          ) : (
            <>
              <img
                src={fileIcon}
                className={`w-10 lg:w-20 ${isFileUploadDisabled ? 'filter grayscale' : 'svg-neon'}`}
                alt="File Icon"
              />
              <span className="font-manrope text-sm lg:text-20px lg:mt-4">
                BROWSE
              </span>
            </>
          )}
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              const allowedTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/rtf',
                'text/plain',
              ];
              const maxSizeMB = 5;

              if (file) {
                if (!allowedTypes.includes(file.type)) {
                  alert('Invalid file type. Only DOC, DOCX, PDF, RTF, and TXT are allowed.');
                  return;
                }
                if (file.size > maxSizeMB * 1024 * 1024) {
                  alert('File size exceeds 5MB.');
                  return;
                }
                onFileChange(file);
                onUrlChange(''); // Clear URL when file is selected
              }
            }}
            className="hidden"
            disabled={isFileUploadDisabled || isLoading}
          />
        </label>

        {/* OR Separator */}
        <div className="font-bold text-xl mx-4">OR</div>

        {/* URL Input Box */}
        <div
          className={`flex flex-col justify-start w-full lg:w-1/2 h-20 lg:h-40 border-2 rounded-lg p-4 transition ${
            isUrlInputDisabled ? 'border-gray-200 text-gray-500' : 'border-neon text-black'
          }`}
        >
          {inputType === 'input' ? (
            <input
              type="text"
              placeholder={placeholderVisible ? placeholderText : ''}
              value={url || ''}
              onChange={(e) => onUrlChange(e.target.value)}
              onFocus={() => setPlaceholderVisible(false)}
              onBlur={() => setPlaceholderVisible(true)}
              className="bg-transparent w-full outline-none placeholder:text-gray-500"
              disabled={isUrlInputDisabled || isLoading}
            />
          ) : (
            <textarea
              placeholder={placeholderVisible ? placeholderText : ''}
              value={url || ''}
              onChange={(e) => onUrlChange(e.target.value)}
              onFocus={() => setPlaceholderVisible(false)}
              onBlur={() => setPlaceholderVisible(true)}
              className="bg-transparent w-full outline-none resize-none h-full placeholder:text-gray-500"
              disabled={isUrlInputDisabled || isLoading}
            />
          )}
        </div>
      </div>

      {/* Message Container - Fixed Height to Prevent Layout Shift */}
      <div className="w-full h-6 flex items-center justify-start mt-2">
        {error && (
          <div className="flex items-center gap-2 text-red-500 text-sm">
            <XCircle size={16} />
            <span>{error}</span>
          </div>
        )}
        {successMessage && !error && (
          <div className="flex items-center gap-2 text-green-500 text-sm">
            <CheckCircle size={16} />
            <span>{successMessage}</span>
          </div>
        )}
      </div>

      {/* Info Text */}
      {infoText && (
        <div className="w-full flex items-start justify-start">
          <BodyText
            text={infoText}
            size="text-17px"
            color="text-grayText"
            centered={false}
            isAnimate={false}
          />
        </div>
      )}
    </div>
  );
};

FileUpload.propTypes = {
  file: PropTypes.object,
  url: PropTypes.string,
  onFileChange: PropTypes.func.isRequired,
  onUrlChange: PropTypes.func.isRequired,
  placeholderText: PropTypes.string,
  infoText: PropTypes.string,
  inputType: PropTypes.oneOf(['input', 'textarea']),
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  successMessage: PropTypes.string,
};

export default FileUpload;