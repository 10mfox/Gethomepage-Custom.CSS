import React from 'react';

// Configuration options with expanded settings
const GENERAL_SETTINGS = {
  // Original font settings remain unchanged
  font_family: {
    label: 'Font Family',
    options: [
      // Modern Sans-Serif Fonts
      { value: "Inter", label: "Inter - Modern & Clean", category: "Modern Sans" },
      { value: "Roboto", label: "Roboto - Google's Font", category: "Modern Sans" },
      { value: "Open Sans", label: "Open Sans - Friendly & Open", category: "Modern Sans" },
      { value: "Noto Sans", label: "Noto Sans - Universal", category: "Modern Sans" },
      { value: "Source Sans Pro", label: "Source Sans Pro - Adobe's Sans", category: "Modern Sans" },
      { value: "Montserrat", label: "Montserrat - Modern Geometric", category: "Modern Sans" },
      { value: "Lato", label: "Lato - Balanced & Modern", category: "Modern Sans" },
      { value: "Poppins", label: "Poppins - Geometric Sans", category: "Modern Sans" },
      { value: "Work Sans", label: "Work Sans - Minimal Modern", category: "Modern Sans" },
      { value: "Ubuntu", label: "Ubuntu - Friendly Tech", category: "Modern Sans" },
      
      // Classic Sans-Serif Fonts
      { value: "Arial", label: "Arial - Classic Sans", category: "Classic Sans" },
      { value: "Helvetica", label: "Helvetica - Swiss Classic", category: "Classic Sans" },
      { value: "Verdana", label: "Verdana - Screen Friendly", category: "Classic Sans" },
      { value: "Tahoma", label: "Tahoma - Microsoft Classic", category: "Classic Sans" },
      { value: "Trebuchet MS", label: "Trebuchet MS - Modern Classic", category: "Classic Sans" },
      { value: "Segoe UI", label: "Segoe UI - Windows UI", category: "Classic Sans" },
      { value: "system-ui", label: "System UI - Native Look", category: "Classic Sans" },
      { value: "-apple-system", label: "Apple System - macOS Native", category: "Classic Sans" },
      
      // Modern Serif Fonts
      { value: "Merriweather", label: "Merriweather - Modern Serif", category: "Modern Serif" },
      { value: "Playfair Display", label: "Playfair Display - Elegant", category: "Modern Serif" },
      { value: "Lora", label: "Lora - Contemporary Serif", category: "Modern Serif" },
      { value: "Crimson Text", label: "Crimson Text - Old Style", category: "Modern Serif" },
      { value: "Libre Baskerville", label: "Libre Baskerville - Modern Classic", category: "Modern Serif" },
      { value: "Source Serif Pro", label: "Source Serif Pro - Adobe's Serif", category: "Modern Serif" },
      { value: "PT Serif", label: "PT Serif - ParaType Serif", category: "Modern Serif" },
      { value: "Cormorant", label: "Cormorant - Display Serif", category: "Modern Serif" },
      
      // Classic Serif Fonts
      { value: "Times New Roman", label: "Times New Roman - Classic", category: "Classic Serif" },
      { value: "Georgia", label: "Georgia - Screen Serif", category: "Classic Serif" },
      { value: "Garamond", label: "Garamond - Renaissance", category: "Classic Serif" },
      { value: "Palatino", label: "Palatino - Elegant Classic", category: "Classic Serif" },
      { value: "Baskerville", label: "Baskerville - Traditional", category: "Classic Serif" },
      { value: "Cambria", label: "Cambria - Modern Classic", category: "Classic Serif" },
      { value: "Book Antiqua", label: "Book Antiqua - Ancient Style", category: "Classic Serif" },
      
      // Coding & Technical Fonts
      { value: "Fira Code", label: "Fira Code - With Ligatures", category: "Coding" },
      { value: "JetBrains Mono", label: "JetBrains Mono - IDE Font", category: "Coding" },
      { value: "Source Code Pro", label: "Source Code Pro - Adobe Code", category: "Coding" },
      { value: "IBM Plex Mono", label: "IBM Plex Mono - IBM's Code", category: "Coding" },
      { value: "Cascadia Code", label: "Cascadia Code - Microsoft Code", category: "Coding" },
      { value: "Inconsolata", label: "Inconsolata - Monospace", category: "Coding" },
      { value: "Courier New", label: "Courier New - Classic Mono", category: "Coding" },
      { value: "Consolas", label: "Consolas - Windows Mono", category: "Coding" },
      { value: "Monaco", label: "Monaco - macOS Mono", category: "Coding" },
      { value: "Menlo", label: "Menlo - Apple Mono", category: "Coding" },
      
      // Display & Decorative Fonts
      { value: "Impact", label: "Impact - Bold Display", category: "Display" },
      { value: "Permanent Marker", label: "Permanent Marker - Marker Style", category: "Display" },
      { value: "Comic Sans MS", label: "Comic Sans MS - Casual", category: "Display" },
      { value: "Brush Script MT", label: "Brush Script MT - Script", category: "Display" },
      { value: "Copperplate", label: "Copperplate - Engraved", category: "Display" },
      { value: "Philosopher", label: "Philosopher - Art Deco", category: "Display" },
      { value: "Righteous", label: "Righteous - Modern Display", category: "Display" },
      { value: "Bangers", label: "Bangers - Comic Style", category: "Display" },
      
      // Handwriting & Script Fonts
      { value: "Dancing Script", label: "Dancing Script - Elegant Script", category: "Script" },
      { value: "Pacifico", label: "Pacifico - Fun Script", category: "Script" },
      { value: "Great Vibes", label: "Great Vibes - Calligraphy", category: "Script" },
      { value: "Sacramento", label: "Sacramento - Light Script", category: "Script" },
      { value: "Caveat", label: "Caveat - Handwritten", category: "Script" },
      { value: "Indie Flower", label: "Indie Flower - Casual Script", category: "Script" },
      { value: "Satisfy", label: "Satisfy - Brush Script", category: "Script" },
      { value: "Kalam", label: "Kalam - Handwriting", category: "Script" }
    ]
  },
  // Original settings
  border_width: {
    label: 'Border Width',
    options: [
      "1px", "2px", "3px", "4px", "5px",
      "6px", "8px", "10px", "12px", "16px"
    ]
  },
  border_radius: {
    label: 'Border Radius',
    options: [
      ".125rem", ".25rem", ".375rem",
      ".5rem", ".75rem", "1rem"
    ]
  },
  backdrop_filter: {
    label: 'Backdrop Filter',
    options: [
      "blur(8px)", "blur(4px)",
      "blur(12px)", "blur(16px)"
    ]
  },
  // New settings
  box_shadow: {
    label: 'Box Shadow',
    options: [
      "none",
      "0 1px 3px rgba(0, 0, 0, 0.1)",
      "0 4px 6px rgba(0, 0, 0, 0.1)",
      "0 10px 15px rgba(0, 0, 0, 0.1)",
      "0 20px 25px rgba(0, 0, 0, 0.1)",
      "0 1px 3px rgba(0, 0, 0, 0.2)",
      "0 4px 6px rgba(0, 0, 0, 0.2)",
      "0 10px 15px rgba(0, 0, 0, 0.2)",
      "0 20px 25px rgba(0, 0, 0, 0.2)",
      "0 0 10px rgba(0, 0, 0, 0.1)",
      "0 0 20px rgba(0, 0, 0, 0.1)"
    ]
  },
  gradient_direction: {
    label: 'Gradient Direction',
    options: [
      "0deg", "45deg", "90deg", "135deg",
      "180deg", "225deg", "270deg", "315deg"
    ]
  },
  text_shadow: {
    label: 'Text Shadow',
    options: [
      "none",
      "1px 1px 2px rgba(0, 0, 0, 0.3)",
      "2px 2px 4px rgba(0, 0, 0, 0.3)",
      "3px 3px 6px rgba(0, 0, 0, 0.3)",
      "0 0 5px rgba(0, 0, 0, 0.3)",
      "0 0 10px rgba(0, 0, 0, 0.3)"
    ]
  },
  text_transform: {
    label: 'Text Transform',
    options: [
      "none", "uppercase", "lowercase",
      "capitalize"
    ]
  },
  padding: {
    label: 'Padding',
    options: [
      "0", "0.5rem", "1rem", "1.5rem",
      "2rem", "2.5rem", "3rem"
    ]
  },
  margin: {
    label: 'Margin',
    options: [
      "0", "0.5rem", "1rem", "1.5rem",
      "2rem", "2.5rem", "3rem"
    ]
  },
  animation_duration: {
    label: 'Animation Duration',
    options: [
      "0.2s", "0.3s", "0.5s", "0.7s",
      "1s", "1.5s", "2s"
    ]
  },
  animation_timing: {
    label: 'Animation Timing',
    options: [
      "linear", "ease", "ease-in", "ease-out",
      "ease-in-out", "cubic-bezier(0.4, 0, 0.2, 1)"
    ]
  },
  scrollbar_width: {
    label: 'Scrollbar Width',
    options: [
      "thin", "8px", "10px", "12px",
      "14px", "16px"
    ]
  },
  scrollbar_thumb_color: {
    label: 'Scrollbar Thumb Color',
    options: [
      "#888888", "#666666", "#444444",
      "#222222", "#000000"
    ]
  },
  scrollbar_track_color: {
    label: 'Scrollbar Track Color',
    options: [
      "#f1f1f1", "#e1e1e1", "#d1d1d1",
      "#c1c1c1", "#b1b1b1"
    ]
  },
  grid_columns: {
    label: 'Grid Columns',
    options: [
      "1fr", "1fr 1fr", "1fr 1fr 1fr",
      "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"
    ]
  },
  grid_gap: {
    label: 'Grid Gap',
    options: [
      "0.5rem", "1rem", "1.5rem",
      "2rem", "2.5rem", "3rem"
    ]
  }
};

export const GeneralSettings = ({ darkMode, cssVars, setCssVars }) => {
  const handleChange = (setting, value) => {
    setCssVars(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  // Group fonts by category
  const groupedFonts = GENERAL_SETTINGS.font_family.options.reduce((acc, font) => {
    if (!acc[font.category]) {
      acc[font.category] = [];
    }
    acc[font.category].push(font);
    return acc;
  }, {});

  // Group settings by category for better organization
  const settingGroups = {
    typography: ['font_family', 'text_shadow', 'text_transform'],
    borders: ['border_width', 'border_radius', 'box_shadow'],
    effects: ['backdrop_filter', 'gradient_direction'],
    spacing: ['padding', 'margin'],
    animation: ['animation_duration', 'animation_timing'],
    scrollbar: ['scrollbar_width', 'scrollbar_thumb_color', 'scrollbar_track_color'],
    layout: ['grid_columns', 'grid_gap']
  };

  const renderSettingGroup = (groupName, settings) => (
    <div key={groupName} className="space-y-4">
      <h3 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
        {groupName.charAt(0).toUpperCase() + groupName.slice(1)}
      </h3>
      {settings.map(setting => {
        if (setting === 'font_family') {
          return (
            <div key={setting}>
              <label className={`block mb-2 font-medium ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Font Family
              </label>
              <select
                value={cssVars.font_family}
                onChange={(e) => handleChange('font_family', e.target.value)}
                className={`w-full p-2.5 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-blue-500 transition-colors`}
              >
                {Object.entries(groupedFonts).map(([category, fonts]) => (
                  <optgroup key={category} label={category}>
                    {fonts.map(font => (
                      <option 
                        key={font.value} 
                        value={font.value}
                        style={{ fontFamily: font.value }}
                      >
                        {font.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <div className="mt-2 space-y-1">
                <p 
                  className={`${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  } text-sm`}
                  style={{ fontFamily: cssVars.font_family }}
                >
                  Preview text in {cssVars.font_family}
                </p>
                <p 
                  className={`${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  } text-sm`}
                  style={{ fontFamily: cssVars.font_family }}
                >
                  The quick brown fox jumps over the lazy dog 0123456789
                </p>
              </div>
            </div>
          );
        }

        const { label, options } = GENERAL_SETTINGS[setting];
        return (
          <div key={setting}>
            <label className={`block mb-2 font-medium ${
              darkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              {label}
            </label>
            <select
              value={cssVars[setting]}
              onChange={(e) => handleChange(setting, e.target.value)}
              className={`w-full p-2.5 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500 transition-colors`}
            >
              {options.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-8">
      {Object.entries(settingGroups).map(([groupName, settings]) => 
        renderSettingGroup(groupName, settings)
      )}
    </div>
  );
};