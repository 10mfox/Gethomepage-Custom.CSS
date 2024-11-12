import React, { useState, useEffect } from 'react';
import { ColorPicker } from './ColorPicker';
import { CustomPresets } from './CustomPresets';
import { BuiltInPresets } from './BuiltInPresets';
import { SavePresetDialog } from './SavePresetDialog';
import { BUILT_IN_PRESETS } from './presets';

export const ColorSettings = ({ darkMode, cssVars, setCssVars }) => {
  // State for custom presets
  const [customPresets, setCustomPresets] = useState(() => {
    try {
      const stored = localStorage.getItem('cssWizardCustomPresets');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // State for save preset dialog
  const [isAddingPreset, setIsAddingPreset] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Save custom presets to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cssWizardCustomPresets', JSON.stringify(customPresets));
    } catch {
      // Silently fail if localStorage is not available
    }
  }, [customPresets]);

  // Filter only color-related settings
  const colorSettings = Object.entries(cssVars).filter(([key]) => key.includes('color'));

  // Handle saving new preset
  const handleSavePreset = (name, description) => {
    if (!name.trim()) {
      setSaveError('Please enter a preset name');
      return;
    }

    // Check for duplicate names
    if (customPresets.some(preset => preset.name === name.trim())) {
      setSaveError('A preset with this name already exists');
      return;
    }

    const newPreset = {
      name: name.trim(),
      description: description.trim(),
      colors: Object.fromEntries(colorSettings),
      isCustom: true
    };

    setCustomPresets(prev => [...prev, newPreset]);
    setIsAddingPreset(false);
    setSaveError('');
  };

  // Handle deleting custom preset
  const handleDeletePreset = (presetName) => {
    const shouldDelete = window.confirm(`Are you sure you want to delete the preset "${presetName}"?`);
    if (shouldDelete) {
      setCustomPresets(prev => prev.filter(preset => preset.name !== presetName));
    }
  };

  // Handle applying a preset
  const handleApplyPreset = (preset) => {
    setCssVars(prev => ({ ...prev, ...preset.colors }));
  };

  // Handle updating a single color
  const handleColorChange = (key, value) => {
    setCssVars(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left side: Colors & Borders with Custom Presets */}
      <div className="space-y-6">
        <div className="space-y-4">
          {colorSettings.map(([key, value]) => (
            <ColorPicker
              key={key}
              label={key}
              value={value}
              onChange={(newValue) => handleColorChange(key, newValue)}
              darkMode={darkMode}
            />
          ))}
        </div>

        <CustomPresets
          darkMode={darkMode}
          presets={customPresets}
          onApply={handleApplyPreset}
          onDelete={handleDeletePreset}
          onSaveNew={() => setIsAddingPreset(true)}
        />
      </div>

      {/* Right side: Built-in Presets */}
      <BuiltInPresets
        darkMode={darkMode}
        presets={BUILT_IN_PRESETS}
        onApply={handleApplyPreset}
      />

      {/* Save Preset Dialog */}
      {isAddingPreset && (
        <SavePresetDialog
          darkMode={darkMode}
          onSave={handleSavePreset}
          onClose={() => {
            setIsAddingPreset(false);
            setSaveError('');
          }}
          error={saveError}
        />
      )}
    </div>
  );
};