import React, { useState, useEffect } from 'react';
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className="scroll-to-top">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 bg-transparent border-neon border-2  rounded-xl py-1 px-2 shadow-sm hover:shadow-md transition-shadow z-[10]"
                >
                    <MdOutlineKeyboardArrowUp size={30} className='text-neon ' />
                </button>
            )}
        </div>
    );
};

export default ScrollToTop;