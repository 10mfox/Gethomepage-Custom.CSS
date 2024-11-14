import React from 'react';

const Footer = ({ darkMode, cssVars, toggles, styles }) => {
  if (toggles.remove_refresh_button_and_version) {
    return null;
  }

  return (
    <div className="mt-4 flex justify-between items-center px-2 relative z-10">
      <span 
        style={{ color: toggles.enable_text_color ? cssVars.text_color : 'inherit' }}
        className="text-xs opacity-60"
      >
        Version 2.0.0
      </span>
      <button
        className={`text-xs hover:scale-105 transition-transform flex items-center gap-2 px-2 py-1 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}
        onClick={() => console.log('Refresh clicked')}
      >
        <svg
          style={styles.icon}
          className="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 2v6h-6"></path>
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
          <path d="M3 22v-6h6"></path>
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
        </svg>
        <span>Refresh</span>
      </button>
    </div>
  );
};

export default Footer;