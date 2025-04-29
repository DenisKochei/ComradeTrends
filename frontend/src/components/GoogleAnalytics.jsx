// src/components/GoogleAnalytics.jsx
import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';

const GoogleAnalytics = () => {
  useEffect(() => {
    ReactGA.initialize("G-6TXC5016DE"); // Replace with your Measurement ID
    ReactGA.send('pageview');
  }, []);

  return null;
};

export default GoogleAnalytics;