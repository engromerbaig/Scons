// src/ga/index.js
import ReactGA from "react-ga4";

const GA_TRACKING_ID = "G-SXGYEZCZ3V";  // Replace with your GA4 Measurement ID

export const initGA = () => {
  ReactGA.initialize(GA_TRACKING_ID);
};

export const logPageView = (page) => {
  ReactGA.send({ hitType: "pageview", page });
};
