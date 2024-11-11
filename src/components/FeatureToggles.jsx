import React from 'react';
import { ToggleRight, ToggleLeft } from 'lucide-react';

export const FeatureToggles = ({ darkMode, toggles, setToggles }) => (
  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg shadow-sm`}>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 p-3">
      {Object.entries(toggles).map(([key, value]) => (
        <button
          key={key}
          onClick={() => setToggles({...toggles, [key]: !value})}
          className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
            value
              ? darkMode
                ? 'bg-blue-500/20 text-blue-400'
                : 'bg-blue-50 text-blue-600'
              : darkMode
                ? 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <span className="text-sm">
            {key.replace(/_/g, ' ').replace(/enable /g, '').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
          {value ? (
            <ToggleRight className="w-4 h-4 ml-2 flex-shrink-0" />
          ) : (
            <ToggleLeft className="w-4 h-4 ml-2 flex-shrink-0" />
          )}
        </button>
      ))}
    </div>
  </div>
);