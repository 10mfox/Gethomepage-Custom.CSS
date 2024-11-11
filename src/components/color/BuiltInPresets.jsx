import React from 'react';
import { PresetButton } from './PresetButton';

export const BuiltInPresets = ({ darkMode, presets, onApply }) => (
  <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
    <h3 className={`font-medium mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
      Built-in Presets
    </h3>
    <div className="grid grid-cols-2 gap-2">
      {presets.map(preset => (
        <PresetButton
          key={preset.name}
          preset={preset}
          onClick={() => onApply(preset)}
          darkMode={darkMode}
          showDelete={false}
        />
      ))}
    </div>
  </div>
);