export const generateKeyframes = (toggles) => {
  const hasRotatingEffects = Object.keys(toggles).some(key => 
    (key.startsWith('enable_rotating_borders_') || 
     key === 'enable_rotating_hover' || 
     key === 'enable_rotating_focus') && 
    toggles[key]
  );

  if (!hasRotatingEffects) return '';

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

@property --gradient-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}`;