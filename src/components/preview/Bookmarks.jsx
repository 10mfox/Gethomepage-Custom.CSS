// /src/components/preview/Bookmarks.jsx
import React, { useState } from 'react';
import { Link } from 'lucide-react';
import { getBaseStyles, getHoverStyles, getFocusStyles } from './styles';

const Bookmarks = ({ darkMode, cssVars, toggles, styles }) => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [focusedLink, setFocusedLink] = useState(null);

  // Demo bookmarks with both name and description
  const bookmarks = [
    {
      name: 'Dashboard',
      description: 'http://1.1.1.1:1234'
    },
    {
      name: 'Documentation',
      description: 'http://1.1.1.1:1234'
    }
  ];

  return (
    <div className="mt-auto relative z-10">
      <h3 
        style={{ color: toggles.enable_text_color ? cssVars.text_color : 'inherit' }} 
        className="text-sm font-medium mb-2 opacity-80"
      >
        Bookmarks
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {bookmarks.map(bookmark => (
          <div key={bookmark.name} className="flex items-center group cursor-pointer">
            <Link 
              style={styles.icon}
              className="w-4 h-4 flex-shrink-0 mr-2"
            />
            <div
              style={{
                ...getBaseStyles('bookmarks', darkMode, cssVars, toggles),
                ...getHoverStyles(hoveredLink === bookmark.name, 'bookmarks', darkMode, cssVars, toggles),
                ...getFocusStyles(focusedLink === bookmark.name, 'bookmarks', darkMode, cssVars, toggles),
              }}
              className="py-2.5 px-3 flex-1"
              onMouseEnter={() => setHoveredLink(bookmark.name)}
              onMouseLeave={() => setHoveredLink(null)}
              onFocus={() => setFocusedLink(bookmark.name)}
              onBlur={() => setFocusedLink(null)}
              tabIndex={0}
            >
              <div style={styles.centeredTitle} className="space-y-0.5">
                {/* Bookmark Name - hidden if hide_bookmark_names is enabled */}
                {!toggles.hide_bookmark_names && (
                  <span className="text-sm font-medium block truncate">
                    {bookmark.name}
                  </span>
                )}
                
                {/* Bookmark Description - hidden if hide_bookmark_descriptions is enabled */}
                {!toggles.hide_bookmark_descriptions && (
                  <span className="text-xs opacity-75 block truncate">
                    {bookmark.description}
                  </span>
                )}

                {/* Show at least one element if both are hidden */}
                {toggles.hide_bookmark_names && toggles.hide_bookmark_descriptions && (
                  <span className="text-sm font-medium block truncate">
                    {bookmark.name}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmarks;