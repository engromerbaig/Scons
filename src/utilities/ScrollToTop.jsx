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
                    className="fixed bottom-4 right-4 bg-neon opacity-80 text-black rounded-full p-2   shadow-md hover:shadow-lg transition-shadow"
                >
                    <MdOutlineKeyboardArrowUp className='text-[30px]' />
                </button>
            )}
        </div>
    );
};

export default ScrollToTop;
