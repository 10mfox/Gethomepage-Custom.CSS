export const generateVariables = (cssVars, toggles) => {
  const variables = [];

  // Font variables  
  if (toggles.enable_font) {
    variables.push(`  --my-font: "${cssVars.font_family}";`);
  }

  // Border variables for each element type
  ['tabs', 'widgets', 'cards', 'bookmarks'].forEach(element => {
    if (toggles[`enable_borders_${element}`]) {
      variables.push(`  --${element}-border-color: ${cssVars[`${element}_border_color`]};`);
    }
    
    if (toggles[`enable_rotating_borders_${element}`]) {
      variables.push(`  --rotating-${element}-color-1: ${cssVars[`rotating_${element}_color_1`]};`);
      variables.push(`  --rotating-${element}-color-2: ${cssVars[`rotating_${element}_color_2`]};`);
    }
  });

  // Interactive effects variables
  if (toggles.enable_hover_effects) {
    variables.push(`  --hover-border-color: ${cssVars.hover_border_color};`);
  }
  
  if (toggles.enable_rotating_hover) {
    variables.push(`  --rotating-hover-color-1: ${cssVars.rotating_hover_color_1};`);
    variables.push(`  --rotating-hover-color-2: ${cssVars.rotating_hover_color_2};`);
  }

  if (toggles.enable_focus_effects) {
    variables.push(`  --focus-border-color: ${cssVars.focus_border_color};`);
  }
  
  if (toggles.enable_rotating_focus) {
    variables.push(`  --rotating-focus-color-1: ${cssVars.rotating_focus_color_1};`);
    variables.push(`  --rotating-focus-color-2: ${cssVars.rotating_focus_color_2};`);
  }

  // Common variables
  if (toggles.enable_backdrop_filter) {
    variables.push(`  --backdrop-filter: ${cssVars.backdrop_filter};`);
  }

  variables.push(`  --border-width: ${cssVars.border_width};`);
  variables.push(`  --border-radius: ${cssVars.border_radius};`);
  variables.push(`  --animation-time: ${cssVars.animated_time_border};`);

  return variables;
};