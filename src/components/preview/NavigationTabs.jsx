import React, { useState } from 'react';
import { getBaseStyles, getHoverStyles, getFocusStyles } from './styles';

const NavigationTabs = ({ darkMode, cssVars, toggles }) => {
  const [hoveredTab, setHoveredTab] = useState(null);
  const [focusedTab, setFocusedTab] = useState(null);
  const [activeTab, setActiveTab] = useState('Services');  // Track active tab

  const tabs = ['Services', 'Settings'];

  const handleKeyDown = (e, tab) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveTab(tab);
    }
  };

  return (
    <div className="flex justify-center relative z-10" role="tablist">
      <div className="flex gap-4 w-full max-w-sm justify-center">
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`${tab.toLowerCase()}-panel`}
            tabIndex={0}
            style={{
              ...getBaseStyles('tabs', darkMode, cssVars, toggles),
              ...getHoverStyles(hoveredTab === tab, 'tabs', darkMode, cssVars, toggles),
              ...getFocusStyles(focusedTab === tab, 'tabs', darkMode, cssVars, toggles),
            }}
            className={`flex-1 py-2.5 px-4 max-w-[150px] transition-all hover:scale-105 ${
              activeTab === tab 
                ? darkMode 
                  ? 'bg-gray-700/50' 
                  : 'bg-gray-100/50'
                : ''
            }`}
            onMouseEnter={() => setHoveredTab(tab)}
            onMouseLeave={() => setHoveredTab(null)}
            onFocus={() => setFocusedTab(tab)}
            onBlur={() => setFocusedTab(null)}
            onClick={() => setActiveTab(tab)}
            onKeyDown={(e) => handleKeyDown(e, tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationTabs;