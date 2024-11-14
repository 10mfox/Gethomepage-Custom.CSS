import React, { useState } from 'react';
import { Link } from 'lucide-react';
import { getBaseStyles, getHoverStyles, getFocusStyles } from './styles';

const Bookmarks = ({ darkMode, cssVars, toggles, styles }) => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [focusedLink, setFocusedLink] = useState(null);

  return (
    <div className="mt-auto relative z-10">
      <h3 
        style={{ color: toggles.enable_text_color ? cssVars.text_color : 'inherit' }} 
        className="text-sm font-medium mb-2 opacity-80"
      >
        Bookmarks
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {['Dashboard', 'Documentation'].map(link => (
          <div key={link} className="flex items-center group cursor-pointer">
            <Link 
              style={styles.icon}
              className="w-4 h-4 flex-shrink-0 mr-2"
            />
            <div
              style={{
                ...getBaseStyles('bookmarks', darkMode, cssVars, toggles),
                ...getHoverStyles(hoveredLink === link, 'bookmarks', darkMode, cssVars, toggles),
                ...getFocusStyles(focusedLink === link, 'bookmarks', darkMode, cssVars, toggles),
              }}
              className="py-2.5 px-3 flex-1"
              onMouseEnter={() => setHoveredLink(link)}
              onMouseLeave={() => setHoveredLink(null)}
              onFocus={() => setFocusedLink(link)}
              onBlur={() => setFocusedLink(null)}
              tabIndex={0}
            >
              <span style={styles.centeredTitle} className="text-sm truncate block">
                {link}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmarks;