import React from 'react';
import { Trash2 } from 'lucide-react';

export const PresetButton = ({ preset, onClick, onDelete, darkMode, showDelete = false }) => (
  <div className={`relative group ${
    darkMode 
      ? 'bg-gray-600 hover:bg-gray-500' 
      : 'bg-gray-200 hover:bg-gray-300'
  } rounded p-2 transition-all`}>
    <button
      onClick={onClick}
      className="w-full text-left"
      title={preset.description}
    >
      <div className="flex items-center">
        <div className="w-4 h-4 rounded mr-2" 
             style={{ backgroundColor: preset.colors.text_color }} />
        <span className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} truncate`}>
          {preset.name}
        </span>
      </div>
      <div className="h-1 mt-1 rounded-full flex">
        {[
          preset.colors.border_color,
          preset.colors.hover_border_color,
          preset.colors.focus_border_color
        ].map((color, index) => (
          <div
            key={index}
            className="flex-1"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </button>
    {showDelete && onDelete && (
      <button
        onClick={onDelete}
        className={`absolute top-1 right-1 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
          darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-400'
        }`}
        title="Delete preset"
      >
        <Trash2 className="w-4 h-4 text-red-500" />
      </button>
    )}
  </div>
);