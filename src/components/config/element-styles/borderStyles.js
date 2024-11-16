import { elements } from '../constants/selectors';

export const generateBorderStyles = (cssVars, toggles) => {
  const styles = [];

  // Apply borders to enabled elements
  Object.entries(elements).forEach(([name, { selector, staticToggle, rotatingToggle }]) => {
    if (toggles[staticToggle]) {
      styles.push(`
/* Static Borders - ${name} */
${selector} {
  border-width: var(--my-border-width);
  border-style: solid;
  border-radius: var(--my-border-radius);
  border-color: var(--my-border-color);
  ${toggles.enable_backdrop_filter ? "backdrop-filter: var(--my-backdrop-filter);" : ""}
}`);
    }

    if (toggles[rotatingToggle]) {
      styles.push(`
/* Rotating Borders - ${name} */
${selector} {
  border: var(--my-border-width) solid transparent;
  border-radius: var(--my-border-radius);
  ${toggles.enable_backdrop_filter ? "backdrop-filter: var(--my-backdrop-filter);" : ""}
  background: 
    linear-gradient(${cssVars.background_color}, ${cssVars.background_color}) padding-box,
    linear-gradient(var(--angle), var(--animated-border-color-1}, var(--animated-border-color-2)) border-box;
  animation: rotate var(--animated-time-border) linear infinite;
}`);
    }
  });

  return styles;
};