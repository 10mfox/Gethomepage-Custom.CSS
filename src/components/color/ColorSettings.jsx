import React from 'react';
import { ColorPicker } from './ColorPicker';

export const ColorSettings = ({ darkMode, cssVars, setCssVars }) => {
  // Filter only color-related settings
  const colorSettings = Object.entries(cssVars).filter(([key]) => key.includes('color'));

  // Handle updating a single color
  const handleColorChange = (key, value) => {
    setCssVars(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {colorSettings.map(([key, value]) => (
        <ColorPicker
          key={key}
          label={key}
          value={value}
          onChange={(newValue) => handleColorChange(key, newValue)}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
};