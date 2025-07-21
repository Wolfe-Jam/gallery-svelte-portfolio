/**
 * 🔥 FUEL: FlipCard Global Preferences Store
 * bAI-compatible preferences that sync across all FlipCards
 */

import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// FlipCard preferences interface
export interface FlipCardPreferences {
  showPalette: boolean;
  showTags: boolean;
  showToolbar: boolean;
  showBuyButton: boolean;
  showTooltips: boolean;
}

// Default preferences
const defaultPreferences: FlipCardPreferences = {
  showPalette: true,
  showTags: true,
  showToolbar: true,
  showBuyButton: true,
  showTooltips: true,
};

// Load preferences from localStorage if available
function loadPreferences(): FlipCardPreferences {
  if (!browser) return defaultPreferences;
  
  try {
    const stored = localStorage.getItem('flipcard-preferences');
    if (stored) {
      return { ...defaultPreferences, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.warn('Failed to load FlipCard preferences:', error);
  }
  
  return defaultPreferences;
}

// Create the store
export const flipcardPreferences = writable<FlipCardPreferences>(loadPreferences());

// Actions for updating preferences
export const flipcardPreferencesActions = {
  toggle: (key: keyof FlipCardPreferences) => {
    flipcardPreferences.update(prefs => {
      const newPrefs = { ...prefs, [key]: !prefs[key] };
      
      // Save to localStorage
      if (browser) {
        try {
          localStorage.setItem('flipcard-preferences', JSON.stringify(newPrefs));
        } catch (error) {
          console.warn('Failed to save FlipCard preferences:', error);
        }
      }
      
      return newPrefs;
    });
  },
  
  set: (preferences: Partial<FlipCardPreferences>) => {
    flipcardPreferences.update(prefs => {
      const newPrefs = { ...prefs, ...preferences };
      
      // Save to localStorage
      if (browser) {
        try {
          localStorage.setItem('flipcard-preferences', JSON.stringify(newPrefs));
        } catch (error) {
          console.warn('Failed to save FlipCard preferences:', error);
        }
      }
      
      return newPrefs;
    });
  },
  
  reset: () => {
    flipcardPreferences.set(defaultPreferences);
    
    // Clear localStorage
    if (browser) {
      try {
        localStorage.removeItem('flipcard-preferences');
      } catch (error) {
        console.warn('Failed to clear FlipCard preferences:', error);
      }
    }
  }
};