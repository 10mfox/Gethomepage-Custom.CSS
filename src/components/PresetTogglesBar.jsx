import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Settings, Palette, BookmarkPlus } from 'lucide-react';
import { PresetButton } from './color/PresetButton';

const DropdownSection = ({ 
  darkMode, 
  isOpen, 
  setIsOpen, 
  title, 
  icon: Icon, 
  count, 
  countLabel, 
  children 
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-2 ${
          darkMode 
            ? 'bg-gray-800 hover:bg-gray-700 text-white' 
            : 'bg-white hover:bg-gray-50 text-gray-900'
        } border rounded-lg shadow-sm transition-colors`}
      >
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5" />
          <span className="font-medium">{title}</span>
          {count !== undefined && (
            <span className={`text-sm px-2 py-0.5 rounded-full ${
              darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
            }`}>
              {count} {countLabel}
            </span>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute z-50 w-full mt-2 py-2 rounded-lg shadow-lg border ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="max-h-96 overflow-y-auto">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export const PresetTogglesBar = ({
  darkMode,
  toggles,
  setToggles,
  customPresets,
  builtInPresets,
  onApplyPreset,
  onDeleteCustomPreset,
  onSaveNewPreset
}) => {
  const [togglesOpen, setTogglesOpen] = useState(false);
  const [builtInOpen, setBuiltInOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);

  const enabledCount = Object.values(toggles).filter(Boolean).length;

  return (
    <div className={`${
      darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'
    } border-b backdrop-blur-sm sticky top-16 z-40`}>
      <div className="max-w-[1600px] mx-auto px-4 py-3">
        <div className="flex flex-wrap gap-3 md:flex-nowrap">
          {/* Feature Toggles */}
          <div className="w-full md:w-1/3">
            <DropdownSection
              darkMode={darkMode}
              isOpen={togglesOpen}
              setIsOpen={setTogglesOpen}
              title="Feature Toggles"
              icon={Settings}
              count={enabledCount}
              countLabel="enabled"
            >
              {Object.entries(toggles).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => {
                    setToggles({ ...toggles, [key]: !value });
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 transition-colors ${
                    darkMode 
                      ? 'hover:bg-gray-700' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span className={`text-sm ${
                    darkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    {key.replace(/_/g, ' ').replace(/enable /g, '').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  <div className={`w-9 h-5 rounded-full transition-colors ${
                    value 
                      ? (darkMode ? 'bg-blue-600' : 'bg-blue-500')
                      : (darkMode ? 'bg-gray-600' : 'bg-gray-300')
                  }`}>
                    <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                      value ? 'translate-x-4' : 'translate-x-1'
                    } mt-0.5`} />
                  </div>
                </button>
              ))}
            </DropdownSection>
          </div>

          {/* Built-in Presets */}
          <div className="w-full md:w-1/3">
            <DropdownSection
              darkMode={darkMode}
              isOpen={builtInOpen}
              setIsOpen={setBuiltInOpen}
              title="Built-in Presets"
              icon={Palette}
              count={builtInPresets.length}
              countLabel="presets"
            >
              <div className="grid grid-cols-1 gap-2 p-2">
                {builtInPresets.map(preset => (
                  <PresetButton
                    key={preset.name}
                    preset={preset}
                    onClick={() => {
                      onApplyPreset(preset);
                      setBuiltInOpen(false);
                    }}
                    darkMode={darkMode}
                    showDelete={false}
                  />
                ))}
              </div>
            </DropdownSection>
          </div>

          {/* Custom Presets */}
          <div className="w-full md:w-1/3">
            <DropdownSection
              darkMode={darkMode}
              isOpen={customOpen}
              setIsOpen={setCustomOpen}
              title="Custom Presets"
              icon={BookmarkPlus}
              count={customPresets.length}
              countLabel="saved"
            >
              <div className="p-2 space-y-2">
                <button
                  onClick={() => {
                    onSaveNewPreset();
                    setCustomOpen(false);
                  }}
                  className={`w-full flex items-center justify-center px-4 py-2 rounded ${
                    darkMode
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white transition-colors`}
                >
                  Save Current Colors as Preset
                </button>

                {customPresets.length > 0 && (
                  <div className="grid grid-cols-1 gap-2">
                    {customPresets.map(preset => (
                      <PresetButton
                        key={preset.name}
                        preset={preset}
                        onClick={() => {
                          onApplyPreset(preset);
                          setCustomOpen(false);
                        }}
                        onDelete={() => onDeleteCustomPreset(preset.name)}
                        darkMode={darkMode}
                        showDelete={true}
                      />
                    ))}
                  </div>
                )}
              </div>
            </DropdownSection>
          </div>
        </div>
      </div>
    </div>
  );
};