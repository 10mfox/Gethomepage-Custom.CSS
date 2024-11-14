import { useState } from 'react';
import { useConfig } from '../config/ConfigProvider';

export const usePresetManager = () => {
  const { customPresets, setCustomPresets, cssVars, setCssVars } = useConfig();
  const [isAddingPreset, setIsAddingPreset] = useState(false);
  const [saveError, setSaveError] = useState('');

  const handleSavePreset = (name, description) => {
    if (!name.trim()) {
      setSaveError('Please enter a preset name');
      return;
    }

    if (customPresets.some(preset => preset.name === name.trim())) {
      setSaveError('A preset with this name already exists');
      return;
    }

    const newPreset = {
      name: name.trim(),
      description: description.trim(),
      colors: { ...cssVars },
      isCustom: true
    };

    setCustomPresets(prev => [...prev, newPreset]);
    setIsAddingPreset(false);
    setSaveError('');
  };

  const handleDeletePreset = (presetName) => {
    const shouldDelete = window.confirm(`Are you sure you want to delete the preset "${presetName}"?`);
    if (shouldDelete) {
      setCustomPresets(prev => prev.filter(preset => preset.name !== presetName));
    }
  };

  const handleApplyPreset = (preset) => {
    setCssVars(prev => ({ ...prev, ...preset.colors }));
  };

  return {
    isAddingPreset,
    setIsAddingPreset,
    saveError,
    setSaveError,
    handleSavePreset,
    handleDeletePreset,
    handleApplyPreset
  };
};