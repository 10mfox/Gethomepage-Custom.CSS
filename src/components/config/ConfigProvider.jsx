import React, { createContext, useContext, useState, useEffect } from 'react';
import { BUILT_IN_PRESETS } from '../color/presets';

const ConfigContext = createContext(undefined);

const defaultCssVars = {
  backdrop_filter: 'blur(8px)',
  border_color: '#1B5E20',
  focus_border_color: '#4169E1',
  hover_border_color: '#DC143C',
  border_width: '5px',
  border_radius: '.375rem',
  font_family: 'Arial',
  text_color: '#FFD700',
  background_color: '#000000',
};

const defaultToggles = {
  enable_font: false,
  enable_text_color: false,
  enable_background: false,
  enable_borders: false,
  enable_backdrop_filter: false,
  enable_hover_effects: false,
  enable_focus_effects: false,
  enable_centered_card_titles: false,
  remove_refresh_button_and_version: false,
};

const loadStoredConfig = () => {
  try {
    const storedConfig = localStorage.getItem('cssWizardConfig');
    return storedConfig ? JSON.parse(storedConfig) : null;
  } catch (error) {
    console.error('Error loading stored config:', error);
    return null;
  }
};

export const ConfigProvider = ({ children }) => {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('cssWizardDarkMode');
    return stored ? JSON.parse(stored) : true;
  });

  // CSS Variables state
  const [cssVars, setCssVars] = useState(() => {
    const stored = loadStoredConfig();
    return stored?.cssVars || defaultCssVars;
  });

  // Feature toggles state
  const [toggles, setToggles] = useState(() => {
    const stored = loadStoredConfig();
    if (stored?.toggles) {
      return Object.keys(defaultToggles).reduce((acc, key) => {
        acc[key] = stored.toggles[key] ?? defaultToggles[key];
        return acc;
      }, {});
    }
    return defaultToggles;
  });

  // Custom presets state
  const [customPresets, setCustomPresets] = useState(() => {
    try {
      const stored = localStorage.getItem('cssWizardCustomPresets');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Save config to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cssWizardConfig', JSON.stringify({ cssVars, toggles }));
  }, [cssVars, toggles]);

  // Save custom presets to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cssWizardCustomPresets', JSON.stringify(customPresets));
    } catch {
      // Silently fail if localStorage is not available
    }
  }, [customPresets]);

  // Handle dark mode changes
  useEffect(() => {
    localStorage.setItem('cssWizardDarkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const value = {
    darkMode,
    setDarkMode,
    cssVars,
    setCssVars,
    toggles,
    setToggles,
    customPresets,
    setCustomPresets,
    builtInPresets: BUILT_IN_PRESETS
  };

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};