import { useState, useEffect, useCallback } from "react";

const TypedText = ({ text, className, isNumber = false }) => {
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentText, setCurrentText] = useState("");
    const [isComplete, setIsComplete] = useState(false);
  
    useEffect(() => {
      // When text prop changes, start untyping the previous text first
      setIsDeleting(true);
      setIsComplete(false);
    }, [text]);
  
    useEffect(() => {
      // Handle deletion animation - much slower
      if (isDeleting) {
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentText(text);
          return;
        }
  
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
        }, isNumber ? 150 : 100); // Increased from 50/30 to 150/100
        
        return () => clearTimeout(timeout);
      } 
      // Handle typing animation - much slower
      else if (displayText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, isNumber ? 250 : 180); // Increased from 100/60 to 250/180
        
        return () => clearTimeout(timeout);
      } else if (displayText.length === currentText.length) {
        setIsComplete(true);
      }
    }, [displayText, isDeleting, currentText, isNumber]);
  
    return (
      <div className={className}>
        <span>{displayText}</span>
      </div>
    );
  };

  export default TypedText;