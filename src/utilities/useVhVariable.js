import { useEffect } from 'react';

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export function useVhVariable(ref) {
  useEffect(() => {
    if (!ref.current) return;

    const updateVhVariable = () => {
      const vh = window.innerHeight * 0.01;
      // Update CSS variable on the component's root container, not globally
      ref.current.style.setProperty('--vh', `${vh}px`);
    };

    const debouncedUpdate = debounce(updateVhVariable, 150);

    window.addEventListener('resize', debouncedUpdate);
    window.addEventListener('orientationchange', updateVhVariable);

    // Initial update
    updateVhVariable();

    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      window.removeEventListener('orientationchange', updateVhVariable);
    };
  }, [ref]);
}
