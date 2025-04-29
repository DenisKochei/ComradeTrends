// src/components/GoogleAnalytics.jsx
import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';

const GoogleAnalytics = () => {
  useEffect(() => {
    ReactGA.initialize(import.meta.env.ANALYTICS_ID); // Replace with your Measurement ID
    ReactGA.send('pageview');
  }, []);

  return null;
};

export default GoogleAnalytics;