import React from 'react';
import { Code } from 'lucide-react';

export const GeneratedCSS = ({ darkMode, css }) => (
  <div className={`${
    darkMode ? 'bg-gray-800' : 'bg-white'
  } rounded-xl shadow-sm overflow-hidden`}>
    <div className={`px-4 py-3 border-b ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Code className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <h2 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Generated CSS
          </h2>
        </div>
      </div>
    </div>
    
    <div className="p-4">
      <pre className={`${
        darkMode ? 'bg-gray-900' : 'bg-gray-800'
      } text-gray-100 p-4 rounded-lg text-sm whitespace-pre-wrap break-words`}>
        {css}
      </pre>
    </div>
  </div>
);