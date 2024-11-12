import React from 'react';
import { PresetButton } from './PresetButton';
import { Plus } from 'lucide-react';

export const CustomPresets = ({ darkMode, presets, onApply, onDelete, onSaveNew }) => (
  <div className="space-y-4">
    <button
      onClick={onSaveNew}
      className={`flex items-center px-4 py-2 rounded ${
        darkMode
          ? 'bg-blue-600 hover:bg-blue-700'
          : 'bg-blue-500 hover:bg-blue-600'
      } text-white transition-colors`}
    >
      <Plus className="w-4 h-4 mr-2" />
      Save Current Colors as Preset
    </button>

    {presets.length > 0 && (
      <div>
        <h3 className={`font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Custom Presets
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {presets.map(preset => (
            <PresetButton
              key={preset.name}
              preset={preset}
              onClick={() => onApply(preset)}
              onDelete={() => onDelete(preset.name)}
              darkMode={darkMode}
              showDelete={true}
            />
          ))}
        </div>
      </div>
    )}
  </div>
);