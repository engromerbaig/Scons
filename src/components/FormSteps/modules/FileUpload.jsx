import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiTrash } from 'react-icons/fi';
import fileIcon from '../../../assets/icons/file.svg';
import BodyText from '../../BodyText/BodyText';

const FileUpload = ({
    file,
    url,
    onFileChange,
    onUrlChange,
    placeholderText = "Paste URL Here",
    infoText = "We accept DOC, DOCX, PDF, RTF & TXT, up to 1MB",
    inputType = "input",
}) => {
    const [placeholderVisible, setPlaceholderVisible] = useState(true);

    const handleFileDelete = (e) => {
        e.stopPropagation();
        onFileChange(null);
    };

    const truncateFileName = (name, maxLength = 20) => {
        if (name.length <= maxLength) return name;
    
        const parts = name.split('.');
        const extension = parts.pop();
        const baseName = parts.join('.');
        const truncatedBase = baseName.slice(0, maxLength - extension.length - 3);
    
        return `${truncatedBase}...${extension}`;
    };
    

    return (
        <div className="flex flex-col w-full items-center gap-4">
            <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-4">
                {/* File Upload Box */}
                <label className="flex flex-row lg:flex-col gap-4 lg:gap-0 items-center justify-center w-full lg:w-1/2 h-20 lg:h-40 border-2 border-neon rounded-lg relative transition px-4 cursor-pointer hover:bg-neon/20 ">
                    {file ? (
                        <>
<span
    className="text-center px-4 font-clashvar text-neon w-full break-words overflow-hidden"
    style={{
        display: '-webkit-box',
        WebkitLineClamp: 2, // Allow up to 2 lines
        WebkitBoxOrient: 'vertical',
        textOverflow: 'ellipsis',
        wordBreak: 'break-all',
    }}
    title={file.name} // Show full file name on hover
>
    {file.name}
</span>


                            <div
                                className="absolute top-2 right-2 text-bodyText cursor-pointer hover:text-black transition"
                                onClick={handleFileDelete}
                            >
                                <FiTrash size={20} />
                            </div>
                        </>
                    ) : (
                        <>
                            <img src={fileIcon} className="w-10 lg:w-20" alt="File Icon" />
                            <span className="font-clashvar text-sm lg:text-20px text-bodyText lg:mt-4">
                                BROWSE | DROPBOX
                            </span>
                        </>
                    )}
                    <input
                        type="file"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            const allowedTypes = [
                                "application/pdf",
                                "application/msword", // DOC
                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
                                "application/rtf", // RTF
                                "text/plain", // TXT
                            ];
                            const maxSizeMB = 1;
                        
                            if (file) {
                                if (!allowedTypes.includes(file.type)) {
                                    alert("Invalid file type. Only DOC, DOCX, PDF, RTF, and TXT are allowed.");
                                    return;
                                }
                        
                                if (file.size > maxSizeMB * 1024 * 1024) {
                                    alert("File size exceeds 1 MB.");
                                    return;
                                }
                        
                                onFileChange(file);
                            }
                        }}
                                                className="hidden"
                    />
                </label>

                {/* OR Separator */}
                <div className="text-bodyText font-bold text-xl mx-4">OR</div>

                {/* URL Input Box */}
                <div className="flex flex-col justify-start w-full lg:w-1/2 h-20 lg:h-40 border-2 border-neon rounded-lg p-4 transition">
                    {inputType === "input" ? (
                        <input
                            type="text"
                            placeholder={placeholderVisible ? placeholderText : ""}
                            value={url || ''}
                            onChange={(e) => onUrlChange(e.target.value)}
                            onFocus={() => setPlaceholderVisible(false)}
                            onBlur={() => setPlaceholderVisible(true)}
                            className="bg-transparent w-full outline-none text-bodyText placeholder:text-bodyText"
                        />
                    ) : (
                        <textarea
                            placeholder={placeholderVisible ? placeholderText : ""}
                            value={url || ''}
                            onChange={(e) => onUrlChange(e.target.value)}
                            onFocus={() => setPlaceholderVisible(false)}
                            onBlur={() => setPlaceholderVisible(true)}
                            className="bg-transparent w-full outline-none resize-none h-full text-bodyText placeholder:text-bodyText"
                        />
                    )}
                </div>
            </div>

            {/* Info Text */}
            {infoText && (
                <div className="w-full flex items-start justify-start mt-2">
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
    inputType: PropTypes.oneOf(["input", "textarea"]),
};

export default FileUpload;