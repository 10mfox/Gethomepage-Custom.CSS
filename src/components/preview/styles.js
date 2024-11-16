// Generate rotation keyframes
export const getRotateKeyframes = (cssVars) => {
  const animationTime = cssVars?.animated_time_border || '10s';
  return `
    @keyframes rotate {
      to {
        --angle: 360deg;
      }
    }
    @property --angle {
      syntax: "<angle>";
      initial-value: 0deg;
      inherits: false;
    }
    :root {
      --animated-time-border: ${animationTime};
    }
  `;
};

// Get base styles for an element type
export const getBaseStyles = (elementType, darkMode, cssVars, toggles) => {
  let styles = {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    ...(toggles.enable_backdrop_filter && {
      backdropFilter: cssVars.backdrop_filter,
      WebkitBackdropFilter: cssVars.backdrop_filter,
    }),
    transition: 'all 0.2s ease-in-out',
    fontFamily: toggles.enable_font ? cssVars.font_family : 'inherit',
    color: toggles.enable_text_color ? cssVars.text_color : 'inherit',
    position: 'relative',
    zIndex: 1,
  };

  // Add static borders
  if (toggles[`enable_borders_${elementType}`]) {
    styles = {
      ...styles,
      borderWidth: cssVars.border_width,
      borderStyle: 'solid',
      borderRadius: cssVars.border_radius,
      borderColor: cssVars[`${elementType}_border_color`],
    };
  }

  // Add rotating borders
  if (toggles[`enable_rotating_borders_${elementType}`]) {
    styles = {
      ...styles,
      borderWidth: cssVars.border_width,
      borderStyle: 'solid',
      borderRadius: cssVars.border_radius,
      borderColor: 'transparent',
      backgroundImage: `linear-gradient(${darkMode ? '#1f2937' : '#ffffff'}, ${darkMode ? '#1f2937' : '#ffffff'}), linear-gradient(var(--angle), ${cssVars[`rotating_${elementType}_color_1`]}, ${cssVars[`rotating_${elementType}_color_2`]})`,
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
      animation: 'rotate var(--animated-time-border) linear infinite',
    };
  }

  return styles;
};

// Get hover styles for an element
export const getHoverStyles = (isHovered, elementType, darkMode, cssVars, toggles) => {
  if (!isHovered) return {};

  let hoverStyles = {};

  // Check for enabled hover effects
  const useRotatingHover = toggles.enable_rotating_hover;
  const useStaticHover = toggles.enable_hover_effects;

  if (useRotatingHover) {
    hoverStyles = {
      borderWidth: cssVars.border_width,
      borderStyle: 'solid',
      borderRadius: cssVars.border_radius,
      borderColor: 'transparent',
      transform: 'translateY(-1px)',
      backgroundImage: `linear-gradient(${darkMode ? '#1f2937' : '#ffffff'}, ${darkMode ? '#1f2937' : '#ffffff'}), linear-gradient(var(--angle), ${cssVars.rotating_hover_color_1}, ${cssVars.rotating_hover_color_2})`,
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
      animation: 'rotate var(--animated-time-border) linear infinite',
    };
  } else if (useStaticHover) {
    hoverStyles = {
      borderWidth: cssVars.border_width,
      borderStyle: 'solid',
      borderRadius: cssVars.border_radius,
      borderColor: cssVars.hover_border_color,
      transform: 'translateY(-1px)',
    };
  }

  return hoverStyles;
};

// Get focus styles for an element
export const getFocusStyles = (isFocused, elementType, darkMode, cssVars, toggles) => {
  if (!isFocused) return {};

  let focusStyles = {};

  // Check for enabled focus effects
  const useRotatingFocus = toggles.enable_rotating_focus;
  const useStaticFocus = toggles.enable_focus_effects;

  if (useRotatingFocus) {
    focusStyles = {
      borderWidth: cssVars.border_width,
      borderStyle: 'solid',
      borderRadius: cssVars.border_radius,
      borderColor: 'transparent',
      outline: 'none',
      backgroundImage: `linear-gradient(${darkMode ? '#1f2937' : '#ffffff'}, ${darkMode ? '#1f2937' : '#ffffff'}), linear-gradient(var(--angle), ${cssVars.rotating_focus_color_1}, ${cssVars.rotating_focus_color_2})`,
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
      animation: 'rotate var(--animated-time-border) linear infinite',
    };
  } else if (useStaticFocus) {
    focusStyles = {
      borderWidth: cssVars.border_width,
      borderStyle: 'solid',
      borderRadius: cssVars.border_radius,
      borderColor: cssVars.focus_border_color,
      outline: 'none',
    };
  }

  return focusStyles;
};

// Get common style objects
export const getCommonStyles = (darkMode, cssVars, toggles) => ({
  icon: {
    color: toggles.enable_text_color ? cssVars.text_color : darkMode ? '#fff' : '#000',
  },
  container: {
    backgroundColor: toggles.enable_background ? cssVars.background_color : 'transparent',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    minHeight: '420px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    position: 'relative',
    overflow: 'hidden',
  },
  centeredTitle: toggles.enable_centered_card_titles ? {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '.1rem',
    width: '100%'
  } : {},
  decorativeBlob: {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(25px)',
    opacity: 0.5,
    zIndex: 0,
  }
});