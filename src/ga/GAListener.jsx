// src/GAListener.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logPageView } from "./ga";

const GAListener = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

export default GAListener;
