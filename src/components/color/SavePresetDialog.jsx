import React, { useState } from 'react';
import { X } from 'lucide-react';

export const SavePresetDialog = ({ darkMode, onSave, onClose, error }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    onSave(name, description);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 max-w-md w-full`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Save Custom Preset
          </h3>
          <button
            onClick={onClose}
            className={`text-gray-500 hover:text-gray-700 transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className={`block mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Preset Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-2 border rounded ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300'
              }`}
              placeholder="My Custom Theme"
            />
          </div>
          
          <div>
            <label className={`block mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Description (optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full p-2 border rounded ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300'
              }`}
              placeholder="Describe your color theme"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="flex justify-end space-x-2 mt-6">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded ${
                darkMode
                  ? 'bg-gray-600 hover:bg-gray-500'
                  : 'bg-gray-200 hover:bg-gray-300'
              } transition-colors`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className={`px-4 py-2 rounded ${
                darkMode
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white transition-colors`}
            >
              Save Preset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};