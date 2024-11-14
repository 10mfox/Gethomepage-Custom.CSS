export const generateBaseStyles = (cssVars, toggles) => {
  const styles = [];

  if (toggles.enable_font || toggles.enable_text_color) {
    styles.push("\n* {");
    if (toggles.enable_font) {
      styles.push("  font-family: var(--my-font) !important;");
    }
    if (toggles.enable_text_color) {
      styles.push("  color: " + cssVars.text_color + " !important;");
    }
    styles.push("}");
  }

  if (toggles.enable_background) {
    styles.push(`
#page_container {
  background-color: ${cssVars.background_color};
}`);
  }

  return styles;
};