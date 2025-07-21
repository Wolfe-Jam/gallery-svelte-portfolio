<!-- 
  Left Sidebar Navigation
  Flat industrial icons, bold style, no button borders
-->
<script lang="ts">
  import { flipcardPreferencesActions } from '$lib/stores/flipcardPreferences';
  import { colorTheme } from '$lib/stores/colorTheme';
  
  type Props = {
    onAboutClick?: () => void;
    onSettingsClick?: () => void;
  };
  
  let { 
    onAboutClick = () => {}, 
    onSettingsClick = () => {} 
  }: Props = $props();
  
  let isExpanded = $state(false);
  
  function toggleTheme() {
    colorTheme.toggleDarkMode();
  }
</script>

<nav class="sidebar" class:expanded={isExpanded}>
  <!-- Logo / About -->
  <button class="icon-item" onclick={onAboutClick} title="About Gallery-Svelte">
    <svg class="icon logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <rect x="7" y="7" width="10" height="10" rx="1"/>
      <line x1="12" y1="3" x2="12" y2="7"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
      <line x1="3" y1="12" x2="7" y2="12"/>
      <line x1="17" y1="12" x2="21" y2="12"/>
    </svg>
    <span class="label">About</span>
  </button>
  
  <!-- Settings -->
  <button class="icon-item" onclick={onSettingsClick} title="Settings & Preferences">
    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v6m0 6v6m-9-9h6m6 0h6M4.22 4.22l4.24 4.24m7.08 7.08l4.24 4.24M19.78 4.22l-4.24 4.24m-7.08 7.08l-4.24 4.24"/>
    </svg>
    <span class="label">Settings</span>
  </button>
  
  <!-- Theme Toggle -->
  <button class="icon-item bottom" onclick={toggleTheme} title={$colorTheme.darkMode ? 'Light Mode' : 'Dark Mode'}>
    {#if $colorTheme.darkMode}
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    {:else}
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    {/if}
    <span class="label">{$colorTheme.darkMode ? 'Light' : 'Dark'}</span>
  </button>
</nav>

<style>
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 60px;
    background: var(--color-bg-secondary);
    border-right: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
    z-index: 50;
    transition: width 0.2s ease;
  }
  
  .sidebar:hover {
    width: 160px;
  }
  
  .icon-item {
    position: relative;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    color: var(--color-text-secondary);
    background: none;
    border: none;
    padding: 0;
    font-family: inherit;
  }
  
  .icon-item:hover {
    color: var(--color-text);
    background: color-mix(in srgb, var(--color-primary) 5%, transparent);
  }
  
  .icon-item.bottom {
    margin-top: auto;
  }
  
  .icon {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }
  
  .icon.logo {
    width: 32px;
    height: 32px;
  }
  
  .icon-item:hover .icon {
    transform: scale(1.1);
  }
  
  .label {
    position: absolute;
    left: 60px;
    white-space: nowrap;
    opacity: 0;
    font-weight: 600;
    font-size: 0.875rem;
    transition: opacity 0.2s ease;
    pointer-events: none;
  }
  
  .sidebar:hover .label {
    opacity: 1;
  }
  
  /* Active state for settings when panel is open */
  .icon-item.active {
    color: var(--color-primary);
    background: color-mix(in srgb, var(--color-primary) 10%, transparent);
  }
</style>