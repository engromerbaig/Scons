import React from 'react';

const ProgressBar = ({ progressPercentage }) => {
    return (
        <div className="absolute top-20 w-4/5 flex items-center justify-center">
            {/* Progress Line */}
            <div className="relative w-full h-1 bg-[#454545]">
                <div
                    className="absolute h-1 bg-neon"
                    style={{
                        width: `${progressPercentage}%`,
                    }}
                />
                {/* Bullet */}
                <div
                    className="absolute w-6 h-6 bg-neon rounded-full top-[-8px]"
                    style={{
                        left: `${progressPercentage}%`,
                        transform: 'translateX(-50%)',
                    }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
