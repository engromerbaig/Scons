// src/animations/slideUpGsap.js
import gsap from "gsap";

/**
 * Slide-up animation using GSAP.
 * 
 * @param {HTMLElement} target - The target element to animate.
 * @param {Object} options - Animation options.
 * @param {number} [options.delay=0] - Delay before the animation starts.
 * @param {number} [options.duration=0.5] - Duration of the animation.
 * @param {string} [options.ease="power2.out"] - Easing function.
 */
const slideUpGsap = (target, { delay = 0, duration = 0.5, ease = "power2.out" } = {}) => {
    if (!target) return; // Ensure the target element exists
    gsap.fromTo(
        target,
        { opacity: 0, y: 100 },
        {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease,
        }
    );
};

export default slideUpGsap;
