import React from 'react';
import { ColorPicker } from './ColorPicker';
import { ArrowDown, ArrowUp } from 'lucide-react';
import ElementColorSettings from './ElementColorSettings';

// Define base color groups
const baseColorGroups = {
  'Basic Colors': {
    'text_color': { label: 'Text Color', toggle: 'enable_text_color' },
    'background_color': { label: 'Background Color', toggle: 'enable_background' }
  }
};

export const ColorSettings = ({ darkMode, cssVars, setCssVars, toggles }) => {
  const [expandedGroups, setExpandedGroups] = React.useState({
    'Basic Colors': true,
    'Animation Settings': true
  });

  // Handle updating a single color
  const handleColorChange = (key, value) => {
    setCssVars(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Toggle group expansion
  const toggleGroup = (groupName) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  // Handle animation timing change
  const handleTimingChange = (value) => {
    const newValue = Math.max(1, Math.min(60, parseInt(value)));
    
    // Update the CSS variables
    setCssVars(prev => ({
      ...prev,
      animated_time_border: `${newValue}s`
    }));

    // Force update of the CSS variable in :root
    document.documentElement.style.setProperty('--animated-time-border', `${newValue}s`);
  };

  // Get animation duration in seconds
  const getAnimationDuration = () => {
    const duration = cssVars.animated_time_border || '10s';
    return parseInt(duration.replace('s', ''));
  };

  // Check if any rotating effects or borders are enabled
  const hasRotatingEffects = Object.entries(toggles).some(([key, value]) => 
    value && (
      key.startsWith('enable_rotating_borders_') || 
      key === 'enable_rotating_hover' || 
      key === 'enable_rotating_focus'
    )
  );

  return (
    <div className="space-y-6">
      {/* Basic Colors Section */}
      {Object.entries(baseColorGroups).map(([groupName, colors]) => {
        // Only show if any toggles in the group are enabled
        const hasEnabledToggles = Object.values(colors).some(({ toggle }) => toggles[toggle]);
        if (!hasEnabledToggles) return null;

        return (
          <div 
            key={groupName} 
            className={`rounded-lg border ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}
          >
            {/* Group Header */}
            <button
              onClick={() => toggleGroup(groupName)}
              className={`w-full px-4 py-3 flex items-center justify-between ${
                darkMode 
                  ? 'hover:bg-gray-700' 
                  : 'hover:bg-gray-50'
              } transition-colors rounded-t-lg`}
            >
              <h3 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                {groupName}
              </h3>
              {expandedGroups[groupName] ? (
                <ArrowUp className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              ) : (
                <ArrowDown className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              )}
            </button>

            {/* Color Pickers */}
            {expandedGroups[groupName] && (
              <div className="p-4 space-y-4 border-t border-gray-200 dark:border-gray-700">
                {Object.entries(colors).map(([colorKey, colorInfo]) => {
                  if (!toggles[colorInfo.toggle]) return null;

                  return (
                    <div key={colorKey}>
                      <ColorPicker
                        label={colorInfo.label}
                        value={cssVars[colorKey]}
                        onChange={(value) => handleColorChange(colorKey, value)}
                        darkMode={darkMode}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Animation Timing Control */}
      {hasRotatingEffects && (
        <div 
          className={`rounded-lg border ${
            darkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}
        >
          <button
            onClick={() => toggleGroup('Animation Settings')}
            className={`w-full px-4 py-3 flex items-center justify-between ${
              darkMode 
                ? 'hover:bg-gray-700' 
                : 'hover:bg-gray-50'
            } transition-colors rounded-t-lg`}
          >
            <h3 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Animation Settings
            </h3>
            {expandedGroups['Animation Settings'] ? (
              <ArrowUp className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            ) : (
              <ArrowDown className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            )}
          </button>

          {expandedGroups['Animation Settings'] && (
            <div className="p-4 space-y-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="range"
                    min="1"
                    max="60"
                    value={getAnimationDuration()}
                    onChange={(e) => handleTimingChange(e.target.value)}
                    className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={getAnimationDuration()}
                    onChange={(e) => handleTimingChange(e.target.value)}
                    className={`w-20 p-2 border rounded ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                  />
                  <span className={`${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    seconds
                  </span>
                </div>
              </div>
              <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Adjust the rotation speed of animated borders (1-60 seconds per rotation)
              </p>
            </div>
          )}
        </div>
      )}

      {/* Element-specific Color Settings */}
      <ElementColorSettings
        darkMode={darkMode}
        cssVars={cssVars}
        setCssVars={setCssVars}
        toggles={toggles}
      />
    </div>
  );
};