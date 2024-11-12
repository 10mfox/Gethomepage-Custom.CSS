import { useConfig } from '../config/ConfigProvider';
import { generateCSS } from '../config/CSSGenerator';

export const useFileActions = () => {
  const { 
    cssVars, 
    toggles, 
    setToggles, 
    setCssVars, 
    setDarkMode, 
    darkMode 
  } = useConfig();

  const handleSave = () => {
    try {
      // Save CSS file
      const css = generateCSS(cssVars, toggles);
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

  return { handleSave, handleLoad };
};