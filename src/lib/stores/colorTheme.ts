/**
 * Color Theme Store
 * Manages Gallery vs Industrial color themes + dark mode
 */

import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type ColorTheme = 'gallery' | 'industrial';

export interface ThemeState {
  colorTheme: ColorTheme;
  darkMode: boolean;
}

function createThemeStore() {
  // Default theme state
  const defaultState: ThemeState = {
    colorTheme: 'gallery',
    darkMode: false
  };

  // Initialize from localStorage in browser
  const initialState = browser 
    ? {
        colorTheme: (localStorage.getItem('colorTheme') as ColorTheme) || defaultState.colorTheme,
        darkMode: localStorage.getItem('darkMode') === 'true'
      }
    : defaultState;

  const { subscribe, set, update } = writable<ThemeState>(initialState);

  // Apply theme classes to document
  function applyTheme(state: ThemeState) {
    if (!browser) return;

    const { colorTheme, darkMode } = state;
    const doc = document.documentElement;

    // Remove existing theme classes
    doc.classList.remove('gallery', 'industrial', 'dark');

    // Apply color theme
    if (colorTheme === 'industrial') {
      doc.classList.add('industrial');
    }

    // Apply dark mode
    if (darkMode) {
      doc.classList.add('dark');
    }

    // Save to localStorage
    localStorage.setItem('colorTheme', colorTheme);
    localStorage.setItem('darkMode', darkMode.toString());
  }

  return {
    subscribe,
    setColorTheme: (colorTheme: ColorTheme) => {
      update(state => {
        const newState = { ...state, colorTheme };
        applyTheme(newState);
        return newState;
      });
    },
    toggleDarkMode: () => {
      update(state => {
        const newState = { ...state, darkMode: !state.darkMode };
        applyTheme(newState);
        return newState;
      });
    },
    setTheme: (theme: Partial<ThemeState>) => {
      update(state => {
        const newState = { ...state, ...theme };
        applyTheme(newState);
        return newState;
      });
    },
    // Initialize theme on app start
    init: () => {
      update(state => {
        applyTheme(state);
        return state;
      });
    }
  };
}

export const colorTheme = createThemeStore();