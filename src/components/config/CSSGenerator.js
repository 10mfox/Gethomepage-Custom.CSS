const generateCSS = (cssVars, toggles) => {
  const cssParts = [];

  // Header comment
  cssParts.push(`/*==================================
  GETHOMEPAGE CSS WIZARD
  Generated: ${new Date().toLocaleString()}
==================================*/`);

  // CSS Variables - only if there are enabled toggles
  const hasVariables = Object.values(toggles).some(value => value);
  if (hasVariables) {
    cssParts.push(`
/*==================================
  CSS VARIABLES
==================================*/`);
  
    cssParts.push("\n:root {");
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
    cssParts.push("}");
  }

  // Base Styles
  const hasBaseStyles = toggles.enable_font || toggles.enable_text_color || toggles.enable_background;
  if (hasBaseStyles) {
    cssParts.push(`
/*==================================
  BASE STYLES
==================================*/`);
    
    if (toggles.enable_font || toggles.enable_text_color) {
      cssParts.push("\n* {");
      if (toggles.enable_font) {
        cssParts.push("  font-family: var(--my-font) !important;");
      }
      if (toggles.enable_text_color) {
        cssParts.push("  color: " + cssVars.text_color + " !important;");
      }
      cssParts.push("}");
    }

    if (toggles.enable_background) {
      cssParts.push(`
#page_container {
  background-color: ${cssVars.background_color};
}`);
    }
  }

  // Widget and Card Styles
  const hasWidgetStyles = toggles.enable_borders || toggles.enable_backdrop_filter;
  if (hasWidgetStyles) {
    cssParts.push(`
/*==================================
  WIDGETS & CARDS
==================================*/

/* Service Widgets & Bookmarks */
#information-widgets div[class*="service-card"],
.bookmark,
.service-card {`);
    if (toggles.enable_borders) {
      cssParts.push("  border-width: var(--my-border-width);");
      cssParts.push("  border-radius: var(--my-border-radius);");
      cssParts.push("  border-color: var(--my-border-color);");
      cssParts.push("  border-style: solid;");
    }
    if (toggles.enable_backdrop_filter) {
      cssParts.push("  backdrop-filter: var(--my-backdrop-filter);");
    }
    cssParts.push("}");
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
#information-widgets div[class*="service-card"]:hover,
.bookmark:hover,
.service-card:hover {
  border-color: var(--my-hover-border-color);
}`);
    }

    if (toggles.enable_focus_effects) {
      cssParts.push(`
/* Focus Effects */
#information-widgets div[class*="service-card"]:focus-within,
.bookmark:focus-within,
.service-card:focus-within {
  border-color: var(--my-focus-border-color);
}`);
    }
  }

  // Centered Titles
  if (toggles.enable_centered_card_titles) {
    cssParts.push(`
/*==================================
  CENTERED TITLES
==================================*/

.service-title,
.bookmark-text {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  text-align: center !important;
  width: 100% !important;
}`);
  }

  // Remove Refresh Button
  if (toggles.remove_refresh_button_and_version) {
    cssParts.push(`
/*==================================
  HIDE REFRESH & VERSION
==================================*/

#footer {
  display: none !important;
}`);
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
}`);

  return cssParts.join('\n');
};

export { generateCSS };
