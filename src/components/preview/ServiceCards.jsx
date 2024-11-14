import React, { useState } from 'react';
import { Server, Database, Cloud, Activity } from 'lucide-react';
import { getBaseStyles, getHoverStyles, getFocusStyles } from './styles';

const services = [
  { icon: Server, name: 'Server', status: 'Online' },
  { icon: Database, name: 'Database', status: 'Connected' },
  { icon: Cloud, name: 'Storage', status: '75% Used' },
  { icon: Activity, name: 'Monitoring', status: 'Active' }
];

const ServiceCards = ({ darkMode, cssVars, toggles, styles }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [focusedCard, setFocusedCard] = useState(null);

  return (
    <div className="grid grid-cols-2 gap-3 relative z-10">
      {services.map(service => (
        <div
          key={service.name}
          style={{
            ...getBaseStyles('cards', darkMode, cssVars, toggles),
            ...getHoverStyles(hoveredCard === service.name, 'cards', darkMode, cssVars, toggles),
            ...getFocusStyles(focusedCard === service.name, 'cards', darkMode, cssVars, toggles),
          }}
          className={`p-4 cursor-pointer ${
            toggles.enable_centered_card_titles 
              ? 'flex flex-col items-center' 
              : 'flex items-center space-x-3'
          }`}
          onMouseEnter={() => setHoveredCard(service.name)}
          onMouseLeave={() => setHoveredCard(null)}
          onFocus={() => setFocusedCard(service.name)}
          onBlur={() => setFocusedCard(null)}
          tabIndex={0}
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
  );
};

export default ServiceCards;