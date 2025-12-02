'use client';

import React, { useEffect } from 'react';

const GrainedEffectProvider: React.FC = () => {
  useEffect(() => {
    // Load the grained.js script
    const script = document.createElement('script');
    script.src = '/js/grained.js';
    script.async = true;
    script.onload = () => {
      // Initialize grained.js after the script is loaded
      const element = document.getElementById('simpleGrainEffect');
      if (element && window.grained) {
        window.grained('#simpleGrainEffect', {
          animate: false,
          patternWidth: 150,
          patternHeight: 150,
          grainOpacity: 0.05,
          grainDensity: 1,
          grainWidth: 0.7,
          grainHeight: 1,
        });
      } else {
        console.error(
          'grained.js script loaded but window.grained is not defined or element not found',
        );
      }
    };

    script.onerror = () => {
      console.error('Failed to load grained.js script');
    };

    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return <div id="simpleGrainEffect"></div>;
};

export default GrainedEffectProvider;
