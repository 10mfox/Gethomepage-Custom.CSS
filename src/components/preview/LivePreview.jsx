import React, { useState } from 'react';
import { Server, Database, Cloud, Activity, Link } from 'lucide-react';

export const LivePreview = ({ darkMode, cssVars, toggles }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);

  const styles = {
    card: {
      borderWidth: toggles.enable_borders ? cssVars.border_width : '0px',
      borderRadius: toggles.enable_borders ? cssVars.border_radius : '0px',
      borderColor: toggles.enable_borders ? cssVars.border_color : 'transparent',
      backdropFilter: toggles.enable_backdrop_filter ? cssVars.backdrop_filter : 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      transition: 'all 0.2s ease-in-out',
      fontFamily: toggles.enable_font ? cssVars.font_family : 'inherit',
      color: toggles.enable_text_color ? cssVars.text_color : 'inherit',
    },
    container: {
      backgroundColor: toggles.enable_background ? cssVars.background_color : 'transparent',
      padding: '1.5rem',
      borderRadius: '0.75rem',
      minHeight: '420px',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    tab: {
      borderWidth: toggles.enable_borders ? cssVars.border_width : '0px',
      borderRadius: toggles.enable_borders ? cssVars.border_radius : '0px',
      borderColor: toggles.enable_borders ? cssVars.border_color : 'transparent',
      padding: '0.625rem 1.25rem',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      transition: 'all 0.2s ease-in-out',
      color: toggles.enable_text_color ? cssVars.text_color : 'inherit',
      fontFamily: toggles.enable_font ? cssVars.font_family : 'inherit',
      flex: '0 0 auto'
    }
  };

  const getHoverStyle = (isHovered) => {
    if (!isHovered || !toggles.enable_hover_effects) return {};
    return {
      borderColor: cssVars.hover_border_color,
      transform: 'translateY(-1px)',
    };
  };

  const focusStyle = toggles.enable_focus_effects ? {
    borderColor: cssVars.focus_border_color,
  } : {};

  const services = [
    { icon: Server, name: 'Server', status: 'Online' },
    { icon: Database, name: 'Database', status: 'Connected' },
    { icon: Cloud, name: 'Storage', status: '75% Used' },
    { icon: Activity, name: 'Monitoring', status: 'Active' }
  ];

  return (
    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg transition-colors`}>
      <div className="mb-4 flex justify-between items-center">
        <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Preview
        </h2>
        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Interactive Preview
        </span>
      </div>

      <div style={styles.container} className="rounded-lg">
        {/* Navigation Tabs */}
        <div className="flex gap-3 px-1">
          {['Services', 'Storage', 'Settings'].map((tab, index) => (
            <button
              key={tab}
              style={{
                ...styles.tab,
                ...(index === 0 ? focusStyle : {}),
                ...getHoverStyle(hoveredTab === tab)
              }}
              className="transition-all hover:scale-105"
              onMouseEnter={() => setHoveredTab(tab)}
              onMouseLeave={() => setHoveredTab(null)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-2 gap-3">
          {services.map(service => (
            <div
              key={service.name}
              style={{
                ...styles.card,
                ...getHoverStyle(hoveredCard === service.name)
              }}
              className="p-4 flex items-center space-x-3 cursor-pointer"
              onMouseEnter={() => setHoveredCard(service.name)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <service.icon className="w-5 h-5 flex-shrink-0" />
              <div className={`min-w-0 flex-1 ${toggles.enable_centered_card_titles ? 'service-title' : ''}`}>
                <h3 className="font-medium truncate">{service.name}</h3>
                <p className="text-sm opacity-80 truncate">{service.status}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mt-auto">
          <h3 style={{ color: toggles.enable_text_color ? cssVars.text_color : 'inherit' }} 
              className="text-sm font-medium mb-2 opacity-80">
            Quick Links
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {['Dashboard', 'Documentation'].map(link => (
              <div
                key={link}
                style={{
                  ...styles.card,
                  ...getHoverStyle(hoveredLink === link)
                }}
                className="py-2.5 px-3 flex items-center space-x-2 cursor-pointer"
                onMouseEnter={() => setHoveredLink(link)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <Link className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm truncate">{link}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};