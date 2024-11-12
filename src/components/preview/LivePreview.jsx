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
      borderStyle: 'solid',
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
    },
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
    tab: {
      borderWidth: toggles.enable_borders ? cssVars.border_width : '0px',
      borderRadius: toggles.enable_borders ? cssVars.border_radius : '0px',
      borderColor: toggles.enable_borders ? cssVars.border_color : 'transparent',
      borderStyle: 'solid',
      padding: '0.625rem 1.25rem',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      ...(toggles.enable_backdrop_filter && {
        backdropFilter: cssVars.backdrop_filter,
        WebkitBackdropFilter: cssVars.backdrop_filter,
      }),
      transition: 'all 0.2s ease-in-out',
      color: toggles.enable_text_color ? cssVars.text_color : 'inherit',
      fontFamily: toggles.enable_font ? cssVars.font_family : 'inherit',
      flex: '1',
      textAlign: 'center',
      maxWidth: '150px',
      position: 'relative',
      zIndex: 1,
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
      <div style={styles.container} className="rounded-lg">
        {/* Decorative Background Elements */}
        <div
          style={{
            ...styles.decorativeBlob,
            width: '200px',
            height: '200px',
            background: 'linear-gradient(45deg, #FF59F8, #BD00FF)',
            top: '10%',
            left: '20%',
          }}
        />
        <div
          style={{
            ...styles.decorativeBlob,
            width: '250px',
            height: '250px',
            background: 'linear-gradient(45deg, #FFB86C, #FF4D4D)',
            bottom: '20%',
            right: '15%',
          }}
        />
        <div
          style={{
            ...styles.decorativeBlob,
            width: '180px',
            height: '180px',
            background: 'linear-gradient(45deg, #4DD4FF, #4DFF91)',
            top: '40%',
            right: '25%',
          }}
        />

        {/* Navigation Tabs */}
        <div className="flex justify-center relative z-10">
          <div className="flex gap-4 w-full max-w-sm justify-center">
            {['Services', 'Settings'].map((tab, index) => (
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
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-2 gap-3 relative z-10">
          {services.map(service => (
            <div
              key={service.name}
              style={{
                ...styles.card,
                ...getHoverStyle(hoveredCard === service.name)
              }}
              className={`p-4 cursor-pointer ${
                toggles.enable_centered_card_titles 
                  ? 'flex flex-col items-center' 
                  : 'flex items-center space-x-3'
              }`}
              onMouseEnter={() => setHoveredCard(service.name)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <service.icon style={styles.icon} className={`w-5 h-5 flex-shrink-0 ${
                toggles.enable_centered_card_titles ? 'mb-2' : ''
              }`} />
              <div style={styles.centeredTitle} className="min-w-0 flex-1">
                <h3 className="font-medium truncate">{service.name}</h3>
                <p className="text-sm opacity-80 truncate">{service.status}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bookmarks */}
        <div className="mt-auto relative z-10">
          <h3 style={{ color: toggles.enable_text_color ? cssVars.text_color : 'inherit' }} 
              className="text-sm font-medium mb-2 opacity-80">
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
                    ...styles.card,
                    ...getHoverStyle(hoveredLink === link)
                  }}
                  className="py-2.5 px-3 flex-1"
                  onMouseEnter={() => setHoveredLink(link)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <span style={styles.centeredTitle} className="text-sm truncate block">
                    {link}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Refresh Button and Version */}
        {!toggles.remove_refresh_button_and_version && (
          <div className="mt-4 flex justify-between items-center px-2 relative z-10">
            <span 
              style={{ color: toggles.enable_text_color ? cssVars.text_color : 'inherit' }}
              className="text-xs opacity-60"
            >
              Version 2.0.0
            </span>
            <button
              style={{
                ...styles.card,
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              className="text-xs hover:scale-105 transition-transform"
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
        )}
      </div>
    </div>
  );
};