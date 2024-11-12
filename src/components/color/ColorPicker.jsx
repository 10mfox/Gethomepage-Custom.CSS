import React from 'react';

export const ColorPicker = ({ label, value, onChange, darkMode }) => (
  <div>
    <label className={`block mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
      {label.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
    </label>
    <div className="flex space-x-2">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-16 rounded cursor-pointer"
        title="Choose color"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#000000"
        className={`flex-1 p-1 border rounded ${
          darkMode 
            ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
            : 'bg-white border-gray-300 placeholder-gray-500'
        }`}
        title="Enter color value (HEX, RGB, or color name)"
      />
      <div 
        className="w-9 h-9 rounded border"
        style={{ 
          backgroundColor: value,
          borderColor: darkMode ? '#4B5563' : '#D1D5DB'
        }}
        title="Color preview"
      />
    </div>
  </div>
);