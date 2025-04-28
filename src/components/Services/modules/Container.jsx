import { useState, useEffect, useRef } from 'react';
import './index.css';
import BodyText from '../../BodyText/BodyText';
import Heading from '../../Heading/Heading';
import ScrollToTopLink from '../../../utilities/ScrollToTopLink';

const Container = ({ heading, number, services, iconRows, link }) => {
    const containerRef = useRef(null);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(true);
    const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
    const animationRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const updateInitialPosition = () => {
            if (containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const circleElement = containerRef.current.querySelector('.view-details-circle');
                const headingElement = containerRef.current.querySelector('.container-content');
                
                const circleSize = circleElement?.offsetWidth || 0; // Get the circle size
                const headingRect = headingElement?.getBoundingClientRect() || { top: 0, height: 0 };
    
                const x = containerRect.width - circleSize / 2; // Align to the right edge
                const y = headingRect.top - containerRect.top + headingRect.height / 2; // Vertically align with the heading
    
                setInitialPosition({ x, y });
                setCursorPosition({ x, y });
            }
        };
    
        updateInitialPosition();
        window.addEventListener('resize', updateInitialPosition);
        return () => window.removeEventListener('resize', updateInitialPosition);
    }, []);
    
    useEffect(() => {
        if (isMobile) return;
        
        const smoothingFactor = 0.8; // Increased for faster response
        const minDistanceThreshold = 0.2; // Snap to position when very close

        const animate = () => {
            const targetX = containerRef.current?.mouseX ?? initialPosition.x;
            const targetY = containerRef.current?.mouseY ?? initialPosition.y;

            setCursorPosition(prev => {
                const dx = targetX - prev.x;
                const dy = targetY - prev.y;
                
                if (Math.abs(dx) < minDistanceThreshold && Math.abs(dy) < minDistanceThreshold) {
                    return { x: targetX, y: targetY };
                }

                return {
                    x: prev.x + dx * smoothingFactor,
                    y: prev.y + dy * smoothingFactor
                };
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationRef.current);
    }, [isMobile, initialPosition]);

    const handleMouseMove = (e) => {
        if (!isMobile && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            containerRef.current.mouseX = e.clientX - rect.left;
            containerRef.current.mouseY = e.clientY - rect.top;
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile && containerRef.current) {
            containerRef.current.mouseX = initialPosition.x;
            containerRef.current.mouseY = initialPosition.y;
        }
        setIsHovering(false);
    };

    const IconRow = ({ icons, rowIndex }) => (
        <div className="grid grid-cols-5 gap-2 py-2">
            {icons.map((icon, index) => (
                <img
                    key={`icon-row${rowIndex}-${index}`}
                    src={icon}
                    alt={`icon-row${rowIndex}-${index}`}
                    loading="lazy"
                />
            ))}
        </div>
    );

    return (
        <div
            ref={containerRef}
            className="relative overflow-hidden cursor-none"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            <div className="glow-container grid text-white py-10 mx-0 border-b-2 border-neon">
                <div className="flex justify-between items-center py-10">
                    <Heading
                        text={heading}
                        centered={false}
                        size="text-40px"
                        className="pt-4 pb-10 container-content"
                    />
                    <ScrollToTopLink to={`/service/${link}`} className="cursor-default">
                        <div
                            className={`
                                view-details-circle md:backdrop-blur-[2px]
                                ml-auto w-20 h-20 flex
                                glow-container items-center justify-center
                                border-2 border-neon rounded-full cursor-none
                                ${!isMobile ? 'absolute' : 'relative'}
                                ${!isMobile && !isHovering ? 'opacity-0' : 'opacity-100'} // Hide when not hovering
                                transition-opacity duration-300 ease-in-out
                            `}
                            style={{
                                ...((!isMobile && {
                                    position: 'absolute',
                                    left: `${cursorPosition.x}px`,
                                    top: `${cursorPosition.y}px`,
                                    transform: 'translate(-50%, -50%)',
                                    transition: 'none', // Avoid animation when mouse is moving
                                })),
                                zIndex: 50,
                            }}
                        >
                            <Heading
                                text="VIEW DETAILS"
                                size="text-10px"
                                isAnimate={false}
                            />
                        </div>
                    </ScrollToTopLink>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12">
                    <div className="col-span-1 md:col-span-9 md:grid md:grid-cols-9">
                        <div className="md:col-span-3 flex items-center justify-start mb-4 md:mb-0">
                            <div className="text-neon text-200px font-clashvar outlined-text">
                                {number}
                            </div>
                        </div>
                        <div className="md:col-span-6 text-white text-34px font-clash grid gap-y-4 items-center">
                            {services.map((service, index) => (
                                <div key={index} className="flex items-center space-x-4">
                                    <div className="line-34px"></div>
                                    <BodyText
                                        text={service}
                                        centered={false}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="hidden md:col-span-3 md:flex md:items-start">
                        <div className="w-full">
                            <div className="grid grid-cols-1 gap-8">
                                {iconRows.map((iconRow, rowIndex) => (
                                    <IconRow
                                        key={`icon-row-${rowIndex}`}
                                        icons={iconRow.icons}
                                        rowIndex={rowIndex}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Container;
