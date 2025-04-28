import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const updateVhVariable = () => {
  const vh = window.innerHeight * 0.01; // 1% of the viewport height
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

// Update on load and resize
window.addEventListener("resize", updateVhVariable);
window.addEventListener("orientationchange", updateVhVariable);
updateVhVariable();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
