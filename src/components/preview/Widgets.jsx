import React, { useState } from 'react';
import { Cpu } from 'lucide-react';
import { getBaseStyles, getHoverStyles, getFocusStyles } from './styles';

const WidgetCard = ({ icon: Icon, title, value, info, darkMode, cssVars, toggles, onHover, onFocus, isHovered, isFocused }) => {
  const textColor = toggles.enable_text_color ? cssVars.text_color : darkMode ? 'text-gray-200' : 'text-gray-700';
  const subTextColor = toggles.enable_text_color ? cssVars.text_color : darkMode ? 'text-gray-400' : 'text-gray-500';

  return (
    <div
      style={{
        ...getBaseStyles('widgets', darkMode, cssVars, toggles),
        ...getHoverStyles(isHovered, 'widgets', darkMode, cssVars, toggles),
        ...getFocusStyles(isFocused, 'widgets', darkMode, cssVars, toggles),
      }}
      className="p-4 flex items-center gap-4"
      onMouseEnter={onHover}
      onMouseLeave={() => onHover(null)}
      onFocus={onFocus}
      onBlur={() => onFocus(null)}
      tabIndex={0}
    >
      <div style={{ color: toggles.enable_text_color ? cssVars.text_color : darkMode ? '#9CA3AF' : '#6B7280' }}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-medium truncate" style={{ color: textColor }}>
            {title}
          </h3>
          <span className="text-sm ml-2" style={{ color: subTextColor }}>
            {value}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
          <div
            className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
            style={{ 
              width: value,
              backgroundColor: toggles.enable_text_color ? cssVars.text_color : '#3B82F6'
            }}
          />
        </div>
        <p className="text-xs mt-1 truncate" style={{ color: subTextColor }}>
          {info}
        </p>
      </div>
    </div>
  );
};

const Widgets = ({ darkMode, cssVars, toggles }) => {
  const [hoveredWidget, setHoveredWidget] = useState(null);
  const [focusedWidget, setFocusedWidget] = useState(null);

  return (
    <div className="relative z-10">
      <WidgetCard
        icon={Cpu}
        title="CPU Usage"
        value="45%"
        info="4 cores at 2.4GHz"
        darkMode={darkMode}
        cssVars={cssVars}
        toggles={toggles}
        onHover={() => setHoveredWidget('cpu')}
        onFocus={() => setFocusedWidget('cpu')}
        isHovered={hoveredWidget === 'cpu'}
        isFocused={focusedWidget === 'cpu'}
      />
    </div>
  );
};

export default Widgets;