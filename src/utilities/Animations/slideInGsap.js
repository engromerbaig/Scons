import gsap from "gsap";

/**
 * Slide-in animation using GSAP and Intersection Observer.
 *
 * @param {HTMLElement} target - The target element to animate.
 * @param {Object} options - Animation options.
 * @param {boolean} options.fromRight - If true, slides in from the right; otherwise, slides in from the left.
 * @param {number} [options.delay=0] - Delay before the animation starts.
 * @param {number} [options.duration=0.5] - Duration of the animation.
 * @param {string} [options.ease="power2.out"] - Easing function.
 * @param {Object} [observerOptions={}] - Intersection Observer options.
 */
const slideInGsap = (
    target,
    {
        fromRight = false,
        delay = 0,
        duration = 0.5,
        ease = "power2.out",
        observerOptions = { threshold: 0.1 },
    } = {}
) => {
    if (!target) return; // Ensure the target element exists

    const onIntersection = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Trigger animation when element is in viewport
                gsap.fromTo(
                    target,
                    { opacity: 0, x: fromRight ? -400 : 400 }, // Start position
                    {
                        opacity: 1,
                        x: 0, // End position
                        duration,
                        delay,
                        ease,
                    }
                );
                observer.unobserve(target); // Stop observing after animation triggers
            }
        });
    };

    const observer = new IntersectionObserver(onIntersection, observerOptions);
    observer.observe(target);
};

export default slideInGsap;
