<!-- 
  Settings Modal
  Theme switching, preferences, and configuration
-->
<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { colorTheme, type ColorTheme } from '$lib/stores/colorTheme';
  
  type Props = {
    isOpen?: boolean;
    onClose?: () => void;
  };
  
  let { 
    isOpen = false, 
    onClose = () => {}
  }: Props = $props();
  
  function closeModal() {
    onClose();
  }
  
  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleColorThemeChange(theme: ColorTheme) {
    colorTheme.setColorTheme(theme);
  }

  function handleDarkModeToggle() {
    colorTheme.toggleDarkMode();
  }
</script>

{#if isOpen}
  <div 
    class="modal-backdrop" 
    onclick={handleBackdropClick}
    onkeydown={(e) => { if (e.key === 'Escape') closeModal(); }}
    role="dialog"
    aria-modal="true"
    aria-labelledby="settings-modal-title"
    tabindex="-1"
    transition:fade={{ duration: 200 }}
  >
    <div 
      class="modal-content"
      transition:scale={{ duration: 200, start: 0.9 }}
    >
      <button class="close-btn" onclick={closeModal} aria-label="Close settings">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      
      <h2 id="settings-modal-title">Settings</h2>
      
      <!-- Color Theme Section -->
      <div class="section">
        <h3>Color Theme</h3>
        <p class="description">Choose between Gallery mode or Industrial aesthetic</p>
        
        <div class="theme-options">
          <button 
            class="theme-option"
            class:active={$colorTheme.colorTheme === 'gallery'}
            onclick={() => handleColorThemeChange('gallery')}
          >
            <div class="theme-preview gallery-preview">
              <div class="preview-bar gallery-bar"></div>
              <div class="preview-content">
                <div class="preview-text gallery-text"></div>
                <div class="preview-accent gallery-accent"></div>
              </div>
            </div>
            <span class="theme-label">Gallery Mode</span>
            <span class="theme-desc">Clean, neutral, product-focused</span>
          </button>
          
          <button 
            class="theme-option"
            class:active={$colorTheme.colorTheme === 'industrial'}
            onclick={() => handleColorThemeChange('industrial')}
          >
            <div class="theme-preview industrial-preview">
              <div class="preview-bar industrial-bar"></div>
              <div class="preview-content">
                <div class="preview-text industrial-text"></div>
                <div class="preview-accent industrial-accent"></div>
              </div>
            </div>
            <span class="theme-label">Industrial Mode</span>
            <span class="theme-desc">Cyan, dark blue, dramatic contrast</span>
          </button>
        </div>
      </div>
      
      <!-- Dark Mode Section -->
      <div class="section">
        <h3>Appearance</h3>
        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-label">Dark Mode</span>
            <span class="setting-desc">Switch between light and dark appearance</span>
          </div>
          <button 
            class="toggle-switch"
            class:active={$colorTheme.darkMode}
            onclick={handleDarkModeToggle}
            aria-label="Toggle dark mode"
          >
            <div class="toggle-slider"></div>
          </button>
        </div>
      </div>
      
      <!-- Typography Section -->
      <div class="section">
        <h3>Typography</h3>
        <div class="typography-info">
          <div class="font-sample">
            <span class="font-heading">League Spartan</span>
            <span class="font-desc">Headlines & Display</span>
          </div>
          <div class="font-sample">
            <span class="font-body">Roboto</span>
            <span class="font-desc">Body Text</span>
          </div>
          <div class="font-sample">
            <span class="font-mono">Roboto Mono</span>
            <span class="font-desc">Technical Values</span>
          </div>
        </div>
      </div>
      
      <div class="footer">
        <p>Gallery-Svelte v1.0.0</p>
        <p class="tech">Powered by Svelte 5</p>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 2rem;
  }
  
  .modal-content {
    background: var(--color-bg);
    border-radius: 1rem;
    padding: 2.5rem;
    max-width: 560px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border: 1px solid var(--color-border);
  }
  
  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 32px;
    height: 32px;
    border: none;
    background: none;
    cursor: pointer;
    color: var(--color-text-secondary);
    transition: all 0.2s ease;
  }
  
  .close-btn:hover {
    color: var(--color-text);
    transform: scale(1.1);
  }
  
  h2 {
    font-family: var(--font-heading);
    font-size: 2rem;
    font-weight: 800;
    margin: 0 0 0.5rem 0;
    background: linear-gradient(135deg, var(--color-primary), var(--color-cyan));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
  }
  
  .section {
    margin-bottom: 2rem;
  }
  
  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    color: var(--color-text);
  }
  
  .description {
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin: 0 0 1rem 0;
    font-size: 0.875rem;
  }
  
  /* Theme Options */
  .theme-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  
  .theme-option {
    background: var(--color-bg-secondary);
    border: 2px solid var(--color-border);
    border-radius: 0.75rem;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
  }
  
  .theme-option:hover {
    border-color: var(--color-primary);
    transform: translateY(-1px);
  }
  
  .theme-option.active {
    border-color: var(--color-primary);
    background: var(--color-primary);
    color: white;
  }
  
  .theme-preview {
    width: 100%;
    height: 48px;
    border-radius: 0.5rem;
    overflow: hidden;
    margin-bottom: 0.75rem;
    position: relative;
  }
  
  .gallery-preview {
    background: linear-gradient(135deg, #f8f9fa, #ffffff);
  }
  
  .industrial-preview {
    background: linear-gradient(135deg, #f0f9ff, #0f172a);
  }
  
  .preview-bar {
    height: 12px;
    width: 100%;
  }
  
  .gallery-bar {
    background: linear-gradient(90deg, #3b82f6, #2563eb);
  }
  
  .industrial-bar {
    background: linear-gradient(90deg, #22d3ee, #0891b2);
  }
  
  .preview-content {
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .preview-text {
    width: 60%;
    height: 4px;
    border-radius: 2px;
  }
  
  .gallery-text {
    background: #6b7280;
  }
  
  .industrial-text {
    background: #1e293b;
  }
  
  .preview-accent {
    width: 20%;
    height: 4px;
    border-radius: 2px;
  }
  
  .gallery-accent {
    background: #3b82f6;
  }
  
  .industrial-accent {
    background: #22d3ee;
  }
  
  .theme-label {
    font-weight: 600;
    font-size: 0.875rem;
    display: block;
    margin-bottom: 0.25rem;
  }
  
  .theme-desc {
    font-size: 0.75rem;
    opacity: 0.8;
  }
  
  /* Settings Row */
  .setting-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
  }
  
  .setting-info {
    flex: 1;
  }
  
  .setting-label {
    font-weight: 600;
    display: block;
    margin-bottom: 0.25rem;
    color: var(--color-text);
  }
  
  .setting-desc {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
  }
  
  /* Toggle Switch */
  .toggle-switch {
    position: relative;
    width: 44px;
    height: 24px;
    background: var(--color-border);
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .toggle-switch.active {
    background: var(--color-primary);
  }
  
  .toggle-slider {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: transform 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .toggle-switch.active .toggle-slider {
    transform: translateX(20px);
  }
  
  /* Typography Section */
  .typography-info {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .font-sample {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.75rem;
    background: var(--color-bg-secondary);
    border-radius: 0.5rem;
  }
  
  .font-heading {
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 1.125rem;
  }
  
  .font-body {
    font-family: var(--font-body);
    font-weight: 500;
  }
  
  .font-mono {
    font-family: var(--font-mono);
    font-weight: 600;
  }
  
  .font-desc {
    font-size: 0.75rem;
    color: var(--color-text-secondary);
  }
  
  .footer {
    text-align: center;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--color-border);
  }
  
  .footer p {
    margin: 0.25rem 0;
    color: var(--color-text-secondary);
  }
  
  .tech {
    font-size: 0.875rem;
  }
  
  /* Mobile responsive */
  @media (max-width: 640px) {
    .theme-options {
      grid-template-columns: 1fr;
    }
    
    .modal-content {
      padding: 2rem;
    }
  }
</style>