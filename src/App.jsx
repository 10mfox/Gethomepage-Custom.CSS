import React, { useState, useEffect } from 'react';
import {
  Header,
  FeatureBar,
  MainContent,
  FeatureToggles,
  GeneralSettings,
  LivePreview,
  ColorSettings
} from './components';

const loadStoredConfig = () => {
  try {
    const storedConfig = localStorage.getItem('cssWizardConfig');
    return storedConfig ? JSON.parse(storedConfig) : null;
  } catch (error) {
    // Silently fail and return null for invalid stored config
    return null;
  }
};

const App = () => {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const stored = localStorage.getItem('cssWizardDarkMode');
      return stored ? JSON.parse(stored) : true;
    } catch {
      return true;
    }
  });

  // CSS Variables state
  const [cssVars, setCssVars] = useState(() => {
    const stored = loadStoredConfig();
    return stored?.cssVars || {
      // Original variables
      backdrop_filter: 'blur(8px)',
      border_color: '#1B5E20',
      focus_border_color: '#4169E1',
      hover_border_color: '#DC143C',
      border_width: '5px',
      border_radius: '.375rem',
      font_family: 'Arial',
      text_color: '#FFD700',
      background_color: '#000000',
      
      // New variables
      box_shadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      gradient_start: '#4158D0',
      gradient_end: '#C850C0',
      gradient_direction: '45deg',
      text_shadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
      text_transform: 'none',
      padding: '1rem',
      margin: '1rem',
      animation_duration: '0.3s',
      animation_timing: 'ease-in-out',
      scrollbar_width: '10px',
      scrollbar_thumb_color: '#888888',
      scrollbar_track_color: '#f1f1f1',
      grid_columns: '1fr 1fr',
      grid_gap: '1rem'
    };
  });

  // Feature toggles state
  const [toggles, setToggles] = useState(() => {
    const stored = loadStoredConfig();
    // Define the default toggles
    const defaultToggles = {
      // Original toggles
      enable_font: true,
      enable_text_color: true,
      enable_background: true,
      enable_borders: true,
      enable_backdrop_filter: true,
      enable_hover_effects: true,
      enable_focus_effects: true,
      
      // New toggles
      enable_box_shadow: true,
      enable_gradients: false,
      enable_text_effects: false,
      enable_spacing: false,
      enable_animations: false,
      enable_custom_scrollbar: false,
      enable_grid_layout: false
    };
    
    if (stored?.toggles) {
      // Filter out any toggles that aren't in our defaults
      return Object.keys(defaultToggles).reduce((acc, key) => {
        acc[key] = stored.toggles[key] ?? defaultToggles[key];
        return acc;
      }, {});
    }
    
    return defaultToggles;
  });

  // Save config to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('cssWizardConfig', JSON.stringify({ cssVars, toggles }));
    } catch (error) {
      // Silently fail if localStorage is not available
    }
  }, [cssVars, toggles]);

  // Handle dark mode changes
  useEffect(() => {
    try {
      localStorage.setItem('cssWizardDarkMode', JSON.stringify(darkMode));
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (error) {
      // Silently fail if localStorage is not available
    }
  }, [darkMode]);

  // Generate CSS (moved to separate function for clarity)
  const generateCSS = () => {
    const cssParts = [];

    // Header comment
    cssParts.push(`/*==================================
  GETHOMEPAGE CSS WIZARD
  Generated: ${new Date().toLocaleString()}
==================================*/`);

    // CSS Variables
    const hasVariables = Object.values(toggles).some(value => value);
    if (hasVariables) {
      cssParts.push(`
/*==================================
  CSS VARIABLES
==================================*/`);
    
      cssParts.push("\n:root {");
      // Original variables
      if (toggles.enable_backdrop_filter) {
        cssParts.push("  --my-backdrop-filter: " + cssVars.backdrop_filter + ";");
      }
      if (toggles.enable_borders) {
        cssParts.push("  --my-border-color: " + cssVars.border_color + ";");
        cssParts.push("  --my-border-width: " + cssVars.border_width + ";");
        cssParts.push("  --my-border-radius: " + cssVars.border_radius + ";");
      }
      if (toggles.enable_hover_effects) {
        cssParts.push("  --my-hover-border-color: " + cssVars.hover_border_color + ";");
      }
      if (toggles.enable_focus_effects) {
        cssParts.push("  --my-focus-border-color: " + cssVars.focus_border_color + ";");
      }
      if (toggles.enable_font) {
        cssParts.push('  --my-font: "' + cssVars.font_family + '";');
      }
      
      // New variables
      if (toggles.enable_box_shadow) {
        cssParts.push("  --my-box-shadow: " + cssVars.box_shadow + ";");
      }
      if (toggles.enable_gradients) {
        cssParts.push("  --my-gradient: linear-gradient(" + cssVars.gradient_direction + ", " + cssVars.gradient_start + ", " + cssVars.gradient_end + ");");
      }
      if (toggles.enable_text_effects) {
        cssParts.push("  --my-text-shadow: " + cssVars.text_shadow + ";");
        cssParts.push("  --my-text-transform: " + cssVars.text_transform + ";");
      }
      if (toggles.enable_spacing) {
        cssParts.push("  --my-padding: " + cssVars.padding + ";");
        cssParts.push("  --my-margin: " + cssVars.margin + ";");
      }
      if (toggles.enable_animations) {
        cssParts.push("  --my-animation-duration: " + cssVars.animation_duration + ";");
        cssParts.push("  --my-animation-timing: " + cssVars.animation_timing + ";");
      }
      if (toggles.enable_custom_scrollbar) {
        cssParts.push("  --my-scrollbar-width: " + cssVars.scrollbar_width + ";");
        cssParts.push("  --my-scrollbar-thumb-color: " + cssVars.scrollbar_thumb_color + ";");
        cssParts.push("  --my-scrollbar-track-color: " + cssVars.scrollbar_track_color + ";");
      }
      if (toggles.enable_grid_layout) {
        cssParts.push("  --my-grid-columns: " + cssVars.grid_columns + ";");
        cssParts.push("  --my-grid-gap: " + cssVars.grid_gap + ";");
      }
      cssParts.push("}");
    }

    // Base Styles
    const hasBaseStyles = toggles.enable_font || toggles.enable_text_color || toggles.enable_background || toggles.enable_text_effects;
    if (hasBaseStyles) {
      cssParts.push(`
/*==================================
  BASE STYLES
==================================*/`);
    
      cssParts.push("\n* {");
      if (toggles.enable_font) {
        cssParts.push("  font-family: var(--my-font) !important;");
      }
      if (toggles.enable_text_color) {
        cssParts.push("  color: " + cssVars.text_color + " !important;");
      }
      if (toggles.enable_text_effects) {
        cssParts.push("  text-shadow: var(--my-text-shadow);");
        cssParts.push("  text-transform: var(--my-text-transform);");
      }
      cssParts.push("}");

      if (toggles.enable_background) {
        cssParts.push(`
#page_container {
  background-color: ${cssVars.background_color};
  ${toggles.enable_gradients ? 'background-image: var(--my-gradient);' : ''}
}`);
      }
    }

    // Widget and Card Styles
    const hasWidgetStyles = toggles.enable_borders || toggles.enable_backdrop_filter || toggles.enable_box_shadow || toggles.enable_spacing;
    if (hasWidgetStyles) {
      cssParts.push(`
/*==================================
  WIDGETS & CARDS
==================================*/`);
    
      cssParts.push(`
/* Service Widgets & Bookmarks */
#information-widgets,
.bookmark-text,
.service-card {`);
      if (toggles.enable_borders) {
        cssParts.push("  border-width: var(--my-border-width);");
        cssParts.push("  border-radius: var(--my-border-radius);");
        cssParts.push("  border-color: var(--my-border-color);");
      }
      if (toggles.enable_backdrop_filter) {
        cssParts.push("  backdrop-filter: var(--my-backdrop-filter);");
      }
      if (toggles.enable_box_shadow) {
        cssParts.push("  box-shadow: var(--my-box-shadow);");
      }
      if (toggles.enable_spacing) {
        cssParts.push("  padding: var(--my-padding);");
        cssParts.push("  margin: var(--my-margin);");
      }
      cssParts.push("}");
    }

    // Grid Layout
    if (toggles.enable_grid_layout) {
      cssParts.push(`
/*==================================
  GRID LAYOUT
==================================*/

.grid-container {
  display: grid;
  grid-template-columns: var(--my-grid-columns);
  gap: var(--my-grid-gap);
}`);
    }

    // Custom Scrollbar
    if (toggles.enable_custom_scrollbar) {
      cssParts.push(`
/*==================================
  CUSTOM SCROLLBAR
==================================*/

::-webkit-scrollbar {
  width: var(--my-scrollbar-width);
}

::-webkit-scrollbar-track {
  background: var(--my-scrollbar-track-color);
}

::-webkit-scrollbar-thumb {
  background: var(--my-scrollbar-thumb-color);
  border-radius: calc(var(--my-scrollbar-width) / 2);
}`);
    }

    // Animations
    if (toggles.enable_animations) {
      cssParts.push(`
/*==================================
  ANIMATIONS
==================================*/

.animated {
  transition: all var(--my-animation-duration) var(--my-animation-timing);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.fade-in {
  animation: fadeIn var(--my-animation-duration) var(--my-animation-timing);
}

.slide-in {
  animation: slideIn var(--my-animation-duration) var(--my-animation-timing);
}`);
    }

    // Interactive States
    const hasInteractiveStates = toggles.enable_hover_effects || toggles.enable_focus_effects;
    if (hasInteractiveStates) {
      cssParts.push(`
/*==================================
  INTERACTIVE STATES
==================================*/`);
    
      if (toggles.enable_hover_effects) {
        cssParts.push(`
/* Hover Effects */
button[id$='-tab']:hover,
.service-card:hover,
.bookmark-text:hover {
  border-color: var(--my-hover-border-color);
  ${toggles.enable_animations ? 'transform: translateY(-2px);' : ''}
}`);
      }

      if (toggles.enable_focus_effects) {
        cssParts.push(`
/* Focus Effects */
button[id$='-tab']:focus {
  border-color: var(--my-focus-border-color);
  ${toggles.enable_box_shadow ? 'box-shadow: 0 0 0 2px var(--my-focus-border-color);' : ''}
}`);
      }
    }

    // Add responsive styles
    cssParts.push(`
/*==================================
  RESPONSIVE STYLES
==================================*/

/* General Mobile (Tablets & Phones) */
@media screen and (max-width: 768px) {
  #myTab {
    padding: 5px;
    background: none;
    backdrop-filter: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  button[id$='-tab'] {
    padding: 10px;
    margin: 0;
    width: calc(50% - 5px);
    justify-content: center;
  }

  ${toggles.enable_grid_layout ? `
  .grid-container {
    grid-template-columns: 1fr;
  }` : ''}
}

/* Landscape Mobile */
@media screen and (max-width: 850px) and (orientation: landscape) {
  #widgets-wrap,
  .service-card {
    gap: 1em;
  }

  .information-widget-resource {
    margin-left: 20px;
    margin-right: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }
}

/* Portrait Mobile (Phones) */
@media screen and (max-width: 480px) and (orientation: portrait) {
  #widgets-wrap,
  .service-card {
    gap: 1em;
  }

  .information-widget-resource {
    margin-left: 20px;
    margin-right: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }
}

/*==================================
  UTILITIES
==================================*/
#footer {
  display: none;
}`);

    return cssParts.join('\n');
  };

  // Handle saving configuration
  const handleSave = () => {
    try {
      // Save CSS file
      const css = generateCSS();
      const cssBlob = new Blob([css], { type: 'text/css' });
      const cssUrl = URL.createObjectURL(cssBlob);
      const cssLink = document.createElement('a');
      cssLink.href = cssUrl;
      cssLink.download = 'custom.css';
      document.body.appendChild(cssLink);
      cssLink.click();
      document.body.removeChild(cssLink);
      URL.revokeObjectURL(cssUrl);

      // Save configuration file
      const config = { cssVars, toggles, darkMode };
      const configBlob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
      const configUrl = URL.createObjectURL(configBlob);
      const configLink = document.createElement('a');
      configLink.href = configUrl;
      configLink.download = 'custom.css.json';
      document.body.appendChild(configLink);
      configLink.click();
      document.body.removeChild(configLink);
      URL.revokeObjectURL(configUrl);
    } catch (error) {
      alert('Failed to save files. Please try again.');
    }
  };

  // Handle loading configuration
  const handleLoad = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target.result);
        if (config.cssVars) {
          setCssVars(config.cssVars);
          setToggles(config.toggles || toggles);
          setDarkMode(config.darkMode ?? darkMode);
          localStorage.setItem('cssWizardConfig', JSON.stringify(config));
        }
      } catch (error) {
        alert('Failed to load configuration file. Please make sure it\'s a valid JSON file.');
      }
    };
    reader.onerror = () => {
      alert('Failed to read the configuration file. Please try again.');
    };
    reader.readAsText(file);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'} transition-colors`}>
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        handleSave={handleSave}
        handleLoad={handleLoad}
      />
      <FeatureBar
        darkMode={darkMode}
        toggles={toggles}
        setToggles={setToggles}
      />
      <MainContent
        darkMode={darkMode}
        cssVars={cssVars}
        setCssVars={setCssVars}
        toggles={toggles}
        generateCSS={generateCSS}
      />
    </div>
  );
};

export default App;