import React from 'react';
import { FeatureToggles } from '../';

export const FeatureBar = ({ darkMode, toggles, setToggles }) => (
  <div className={`${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'} border-b backdrop-blur-sm sticky top-16 z-40`}>
    <div className="max-w-[1600px] mx-auto px-4 py-3">
      <FeatureToggles
        darkMode={darkMode}
        toggles={toggles}
        setToggles={setToggles}
      />
    </div>
  </div>
);