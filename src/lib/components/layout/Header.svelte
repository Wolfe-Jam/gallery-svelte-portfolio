<script lang="ts">
  interface Props {
    'onmenu-click'?: () => void;
  }
  
  let { 'onmenu-click': onMenuClick }: Props = $props();
</script>

<header class="header">
  <div class="header-content">
    <button 
      class="menu-button"
      onclick={onMenuClick}
      aria-label="Open menu"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </button>
    
    <h1 class="logo">Gallery Svelte</h1>
    
    <nav class="nav-links">
      <a href="/" class="nav-link">Home</a>
      <a href="/components" class="nav-link">Components</a>
      <a href="/docs" class="nav-link">Docs</a>
    </nav>
  </div>
</header>

<style>
  .header {
    position: sticky;
    top: 0;
    z-index: 40;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
  }
  
  .header-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
  }
  
  .menu-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border: none;
    background: transparent;
    color: var(--color-text);
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .menu-button:hover {
    background: var(--color-hover);
  }
  
  .logo {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    color: var(--color-primary);
  }
  
  .nav-links {
    display: flex;
    gap: 2rem;
    margin-left: auto;
  }
  
  .nav-link {
    color: var(--color-text);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }
  
  .nav-link:hover {
    color: var(--color-primary);
  }
  
  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }
  }
</style>