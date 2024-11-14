import { elements } from '../constants/selectors';

export const generateBaseStyles = (cssVars, toggles) => {
  const styles = [];

  // Global styles
  if (toggles.enable_font || toggles.enable_text_color) {
    styles.push(`
/* Global Styles */
* {
  ${toggles.enable_font ? `font-family: var(--my-font) !important;` : ''}
  ${toggles.enable_text_color ? `color: ${cssVars.text_color} !important;` : ''}
}`);
  }

  // Background styles
  if (toggles.enable_background) {
    styles.push(`
/* Background */
#page_container {
  background-color: ${cssVars.background_color};
}`);
  }

  // Backdrop filter
  if (toggles.enable_backdrop_filter) {
    styles.push(`
/* Backdrop Filter */
.backdrop-blur {
  backdrop-filter: var(--backdrop-filter);
  -webkit-backdrop-filter: var(--backdrop-filter);
}`);
  }

  return styles;
};

export const generateElementStyles = (cssVars, toggles) => {
  const styles = [];

  Object.entries(elements).forEach(([name, { selector }]) => {
    // Static borders
    if (toggles[`enable_borders_${name}`]) {
      styles.push(`
/* Static Borders - ${name} */
${selector} {
  border: var(--border-width) solid var(--${name}-border-color);
  border-radius: var(--border-radius);
  ${toggles.enable_backdrop_filter ? `backdrop-filter: var(--backdrop-filter);` : ''}
  transition: border-color 0.3s ease;
}`);
    }

    // Rotating borders
    if (toggles[`enable_rotating_borders_${name}`]) {
      styles.push(`
/* Rotating Borders - ${name} */
${selector} {
  border: var(--border-width) solid transparent;
  border-radius: var(--border-radius);
  ${toggles.enable_backdrop_filter ? `backdrop-filter: var(--backdrop-filter);` : ''}
  background: 
    linear-gradient(${cssVars.background_color}, ${cssVars.background_color}) padding-box,
    linear-gradient(
      var(--angle), 
      var(--rotating-${name}-color-1), 
      var(--rotating-${name}-color-2)
    ) border-box;
  animation: rotate var(--animation-time) linear infinite;
}`);
    }
  });

  return styles;
};

export const generateInteractiveStyles = (cssVars, toggles) => {
  const styles = [];
  const elements = [
    'button[id$="-tab"]',
    '#information-widgets',
    '.service-card',
    '.bookmark'
  ];

  // Static hover effects
  if (toggles.enable_hover_effects) {
    styles.push(`
/* Static Hover Effects */
${elements.join(':hover,\n')}:hover {
  border-color: var(--hover-border-color);
  transform: translateY(-1px);
  transition: all 0.3s ease;
}`);
  }

  // Rotating hover effects
  if (toggles.enable_rotating_hover) {
    styles.push(`
/* Rotating Hover Effects */
${elements.join(':hover,\n')}:hover {
  border: var(--border-width) solid transparent;
  border-radius: var(--border-radius);
  transform: translateY(-1px);
  background: 
    linear-gradient(${cssVars.background_color}, ${cssVars.background_color}) padding-box,
    linear-gradient(
      var(--angle), 
      var(--rotating-hover-color-1), 
      var(--rotating-hover-color-2)
    ) border-box;
  animation: rotate var(--animation-time) linear infinite;
  transition: transform 0.3s ease;
}`);
  }

  // Static focus effects
  if (toggles.enable_focus_effects) {
    styles.push(`
/* Static Focus Effects */
button[id$="-tab"]:focus {
  border-color: var(--focus-border-color);
  outline: none;
  transition: all 0.3s ease;
}`);
  }

  // Rotating focus effects
  if (toggles.enable_rotating_focus) {
    styles.push(`
/* Rotating Focus Effects */
button[id$="-tab"]:focus {
  border: var(--border-width) solid transparent;
  border-radius: var(--border-radius);
  outline: none;
  background: 
    linear-gradient(${cssVars.background_color}, ${cssVars.background_color}) padding-box,
    linear-gradient(
      var(--angle), 
      var(--rotating-focus-color-1), 
      var(--rotating-focus-color-2)
    ) border-box;
  animation: rotate var(--animation-time) linear infinite;
}`);
  }

  return styles;
};