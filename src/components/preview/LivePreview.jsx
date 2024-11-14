import React from 'react';
import Background from './Background';
import NavigationTabs from './NavigationTabs';
import ServiceCards from './ServiceCards';
import Bookmarks from './Bookmarks';
import Footer from './Footer';
import Widgets from './Widgets';
import { getRotateKeyframes, getCommonStyles } from './styles';

export const LivePreview = ({ darkMode, cssVars, toggles }) => {
  const commonStyles = getCommonStyles(darkMode, cssVars, toggles);

  return (
    <>
      <style>{getRotateKeyframes(cssVars)}</style>
      <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg transition-colors`}>
        <div style={commonStyles.container} className="rounded-lg">
          {/* Decorative Background Elements */}
          <Background styles={commonStyles} />
          
          {/* Widgets Area */}
          <Widgets
            darkMode={darkMode}
            cssVars={cssVars}
            toggles={toggles}
          />

          {/* Navigation Tabs */}
          <NavigationTabs
            darkMode={darkMode}
            cssVars={cssVars}
            toggles={toggles}
          />

          {/* Service Cards */}
          <ServiceCards
            darkMode={darkMode}
            cssVars={cssVars}
            toggles={toggles}
            styles={commonStyles}
          />

          {/* Bookmarks */}
          <Bookmarks
            darkMode={darkMode}
            cssVars={cssVars}
            toggles={toggles}
            styles={commonStyles}
          />

          {/* Footer */}
          <Footer
            darkMode={darkMode}
            cssVars={cssVars}
            toggles={toggles}
            styles={commonStyles}
          />
        </div>
      </div>
    </>
  );
};