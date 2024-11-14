import React from 'react';
import { ColorPicker } from './ColorPicker';
import { ArrowDown, ArrowUp } from 'lucide-react';

// Define the color settings structure with groups for mutually exclusive toggles
const elementColorSettings = {
  'Border Styles': {
    'widgets': {
      label: 'Widgets',
      options: [
        { toggle: 'enable_borders_widgets', colorKey: 'widgets_border_color', label: 'Static Border' },
        { toggle: 'enable_rotating_borders_widgets', 
          colorKeys: ['rotating_widgets_color_1', 'rotating_widgets_color_2'], 
          label: 'Rotating Border' }
      ]
    },
    'tabs': {
      label: 'Tabs',
      options: [
        { toggle: 'enable_borders_tabs', colorKey: 'tabs_border_color', label: 'Static Border' },
        { toggle: 'enable_rotating_borders_tabs', 
          colorKeys: ['rotating_tabs_color_1', 'rotating_tabs_color_2'], 
          label: 'Rotating Border' }
      ]
    },
    'cards': {
      label: 'Cards',
      options: [
        { toggle: 'enable_borders_cards', colorKey: 'cards_border_color', label: 'Static Border' },
        { toggle: 'enable_rotating_borders_cards', 
          colorKeys: ['rotating_cards_color_1', 'rotating_cards_color_2'], 
          label: 'Rotating Border' }
      ]
    },
    'bookmarks': {
      label: 'Bookmarks',
      options: [
        { toggle: 'enable_borders_bookmarks', colorKey: 'bookmarks_border_color', label: 'Static Border' },
        { toggle: 'enable_rotating_borders_bookmarks', 
          colorKeys: ['rotating_bookmarks_color_1', 'rotating_bookmarks_color_2'], 
          label: 'Rotating Border' }
      ]
    }
  },
  'Interactive Effects': {
    'hover': {
      label: 'Hover Effect',
      options: [
        { toggle: 'enable_hover_effects', colorKey: 'hover_border_color', label: 'Static Border' },
        { toggle: 'enable_rotating_hover',
          colorKeys: ['rotating_hover_color_1', 'rotating_hover_color_2'],
          label: 'Rotating Border' }
      ]
    },
    'focus': {
      label: 'Focus Effect',
      options: [
        { toggle: 'enable_focus_effects', colorKey: 'focus_border_color', label: 'Static Border' },
        { toggle: 'enable_rotating_focus',
          colorKeys: ['rotating_focus_color_1', 'rotating_focus_color_2'],
          label: 'Rotating Border' }
      ]
    }
  }
};

const ElementColorSettings = ({ darkMode, cssVars, setCssVars, toggles, setToggles }) => {
  const [expandedGroups, setExpandedGroups] = React.useState(
    Object.keys(elementColorSettings).reduce((acc, group) => {
      acc[group] = true;
      return acc;
    }, {})
  );

  // Check if any options in a group are toggled on
  const hasToggledOptions = (settings) => {
    return Object.values(settings).some(element => 
      element.options.some(option => toggles[option.toggle])
    );
  };

  // Check if an element has any options toggled on
  const hasElementToggles = (element) => {
    return element.options.some(option => toggles[option.toggle]);
  };

  const handleColorChange = (key, value) => {
    setCssVars(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleBorderTypeToggle = (elementKey, toggleKey, groupName) => {
    // Get the option pair for this element
    const elementOptions = elementColorSettings[groupName][elementKey].options;
    
    setToggles(prev => {
      const newToggles = { ...prev };
      
      // Turn off all toggles for this element
      elementOptions.forEach(option => {
        newToggles[option.toggle] = false;
      });
      
      // Enable the selected toggle
      newToggles[toggleKey] = !prev[toggleKey];
      
      return newToggles;
    });
  };

  const toggleGroup = (groupName) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  const renderElementOptions = (elementKey, element, groupName) => {
    if (!hasElementToggles(element)) return null;

    return (
      <div key={elementKey} className="space-y-4">
        <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {element.label}
        </h4>
        <div className="space-y-4 ml-4">
          {element.options.map((option) => (
            <div key={option.toggle} className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  name={`border-type-${elementKey}-${groupName}`}
                  checked={toggles[option.toggle]}
                  onChange={() => handleBorderTypeToggle(elementKey, option.toggle, groupName)}
                  className="mr-2"
                />
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {option.label}
                </span>
              </div>
              {toggles[option.toggle] && (
                option.colorKeys ? (
                  <div className="space-y-2 ml-6">
                    <ColorPicker
                      label="Start Color"
                      value={cssVars[option.colorKeys[0]]}
                      onChange={(value) => handleColorChange(option.colorKeys[0], value)}
                      darkMode={darkMode}
                    />
                    <ColorPicker
                      label="End Color"
                      value={cssVars[option.colorKeys[1]]}
                      onChange={(value) => handleColorChange(option.colorKeys[1], value)}
                      darkMode={darkMode}
                    />
                  </div>
                ) : (
                  <div className="ml-6">
                    <ColorPicker
                      label="Color"
                      value={cssVars[option.colorKey]}
                      onChange={(value) => handleColorChange(option.colorKey, value)}
                      darkMode={darkMode}
                    />
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {Object.entries(elementColorSettings).map(([groupName, settings]) => {
        // Skip groups that have no toggled options
        if (!hasToggledOptions(settings)) return null;

        return (
          <div 
            key={groupName}
            className={`rounded-lg border ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}
          >
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

            {expandedGroups[groupName] && (
              <div className="p-4 space-y-6 border-t border-gray-200 dark:border-gray-700">
                {Object.entries(settings).map(([elementKey, element]) => 
                  renderElementOptions(elementKey, element, groupName)
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ElementColorSettings;