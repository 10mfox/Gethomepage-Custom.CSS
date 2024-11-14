import { elements } from '../constants/selectors';

export const generateInteractiveStyles = (cssVars, toggles) => {
  const styles = [];

  // Static hover effects
  if (toggles.enable_hover_effects) {
    const hoverSelectors = Object.entries(elements)
      .filter(([_, { staticToggle }]) => toggles[staticToggle])
      .map(([_, { selector }]) => `${selector}:hover`)
      .join(',\n');

    if (hoverSelectors) {
      styles.push(`
/* Static Hover Effects */
${hoverSelectors} {
  border-color: var(--my-hover-border-color);
}`);
    }
  }

  // Rotating hover effects
  if (toggles.enable_rotating_hover) {
    const rotatingHoverSelectors = Object.entries(elements)
      .filter(([_, { rotatingToggle }]) => toggles[rotatingToggle])
      .map(([_, { selector }]) => `${selector}:hover`)
      .join(',\n');

    if (rotatingHoverSelectors) {
      styles.push(`
/* Rotating Hover Effects */
${rotatingHoverSelectors} {
  border: var(--my-border-width) solid transparent;
  border-radius: var(--my-border-radius);
  background: 
    linear-gradient(${cssVars.background_color}, ${cssVars.background_color}) padding-box,
    linear-gradient(var(--angle), var(--animated-hover-border-color-1), var(--animated-hover-border-color-2)) border-box;
  animation: rotate var(--animated-time-border) linear infinite;
}`);
    }
  }

  // Static focus effects
  if (toggles.enable_focus_effects) {
    const focusSelectors = Object.entries(elements)
      .filter(([_, { staticToggle }]) => toggles[staticToggle])
      .map(([_, { selector }]) => `${selector}:focus-visible`)
      .join(',\n');

    if (focusSelectors) {
      styles.push(`
/* Static Focus Effects */
${focusSelectors} {
  border-color: var(--my-focus-border-color);
  outline: none;
}`);
    }
  }

  // Rotating focus effects
  if (toggles.enable_rotating_focus) {
    const rotatingFocusSelectors = Object.entries(elements)
      .filter(([_, { rotatingToggle }]) => toggles[rotatingToggle])
      .map(([_, { selector }]) => `${selector}:focus-visible`)
      .join(',\n');

    if (rotatingFocusSelectors) {
      styles.push(`
/* Rotating Focus Effects */
${rotatingFocusSelectors} {
  border: var(--my-border-width) solid transparent;
  border-radius: var(--my-border-radius);
  background: 
    linear-gradient(${cssVars.background_color}, ${cssVars.background_color}) padding-box,
    linear-gradient(var(--angle), var(--animated-focus-border-color-1}, var(--animated-focus-border-color-2}) border-box;
  animation: rotate var(--animated-time-border) linear infinite;
  outline: none;
}`);
    }
  }

  return styles;
};