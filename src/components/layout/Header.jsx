import React from 'react';
import { Moon, Sun, Save, Upload, Settings2 } from 'lucide-react';

export const Header = ({ darkMode, setDarkMode, handleSave, handleLoad }) => (
  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-50`}>
    <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Settings2 className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
        <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Gethomepage CSS Wizard
        </h1>
      </div>
      
      <div className="flex items-center space-x-3">
        <button
          onClick={handleSave}
          className="px-4 py-2 flex items-center space-x-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save CSS</span>
        </button>
        
        <label className="px-4 py-2 flex items-center space-x-2 rounded bg-green-500 hover:bg-green-600 text-white cursor-pointer transition-colors">
          <Upload className="w-4 h-4" />
          <span>Load</span>
          <input
            type="file"
            onChange={handleLoad}
            accept=".json"
            className="hidden"
          />
        </label>
        
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-lg ${
            darkMode 
              ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          } transition-colors`}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </div>
  </div>
);