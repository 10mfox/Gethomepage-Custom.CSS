import React from 'react';
import { StyleSettings } from '../settings/StyleSettings';
import { LivePreview } from '../preview/LivePreview';
import { ColorSettings } from '../color/ColorSettings';
import { GeneratedCSS } from './GeneratedCSS';
import { Code, Palette } from 'lucide-react';
import { generateCSS } from '../config/CSSGenerator.js';

export const MainContent = ({ darkMode, cssVars, setCssVars, toggles }) => (
  <div className="max-w-[1600px] mx-auto p-4 lg:p-6 space-y-6">
    {/* Settings and Preview Grid */}
    <div className="grid lg:grid-cols-12 gap-6">
      {/* Style Settings */}
      <div className="lg:col-span-4">
        <StyleSettings 
          darkMode={darkMode} 
          cssVars={cssVars} 
          setCssVars={setCssVars} 
        />
      </div>

      {/* Color Settings */}
      <div className="lg:col-span-4">
        <div className={`${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-xl shadow-sm overflow-hidden`}>
          <div className={`px-4 py-3 border-b ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'
          }`}>
            <div className="flex items-center space-x-2">
              <Palette className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <h2 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Color Settings
              </h2>
            </div>
          </div>
          
          <div className="p-4">
            <ColorSettings
              darkMode={darkMode}
              cssVars={cssVars}
              setCssVars={setCssVars}
            />
          </div>
        </div>
      </div>
      
      {/* Preview Panel */}
      <div className="lg:col-span-4">
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
                  Live Preview
                </h2>
              </div>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Interactive Demo
              </span>
            </div>
          </div>
          
          <div className="p-4">
            <LivePreview
              darkMode={darkMode}
              cssVars={cssVars}
              toggles={toggles}
            />
          </div>
        </div>
      </div>
    </div>

    {/* Generated CSS */}
    <GeneratedCSS darkMode={darkMode} css={generateCSS(cssVars, toggles)} />
  </div>
);