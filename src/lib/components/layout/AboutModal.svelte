<!-- 
  About Modal
  Shows version, credits, and project information
-->
<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  
  type Props = {
    isOpen?: boolean;
    version?: string;
    onClose?: () => void;
  };
  
  let { 
    isOpen = false, 
    version = '1.0.0',
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
</script>

{#if isOpen}
  <div 
    class="modal-backdrop" 
    onclick={handleBackdropClick}
    onkeydown={(e) => { if (e.key === 'Escape') closeModal(); }}
    role="dialog"
    aria-modal="true"
    aria-labelledby="about-modal-title"
    tabindex="-1"
    transition:fade={{ duration: 200 }}
  >
    <div 
      class="modal-content"
      transition:scale={{ duration: 200, start: 0.9 }}
    >
      <button class="close-btn" onclick={closeModal} aria-label="Close modal">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      
      <h2 id="about-modal-title">Gallery-Svelte</h2>
      <p class="version">Version {version}</p>
      
      <div class="section">
        <h3>FlipCard Component</h3>
        <p>
          A revolutionary Svelte 5 component showcasing modern runes,
          mathematical precision, and 60fps performance.
        </p>
      </div>
      
      <div class="section">
        <h3>Built With</h3>
        <ul>
          <li>Svelte 5 + SvelteKit</li>
          <li>Vite 5</li>
          <li>TypeScript</li>
          <li>Mathematical SIZE System</li>
        </ul>
      </div>
      
      <div class="section">
        <h3>Features</h3>
        <ul>
          <li>9 Mathematical SIZE levels (88px → 999px)</li>
          <li>Image-only mode for SIZE 1-2</li>
          <li>Full interactivity at SIZE 4+</li>
          <li>Global preferences sync</li>
          <li>Print-on-Demand integration</li>
        </ul>
      </div>
      
      <div class="links">
        <a href="https://github.com/your-repo" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
        <a href="https://theBlockchain.ai" target="_blank" rel="noopener">
          bAI Marketplace
        </a>
      </div>
      
      <div class="footer">
        <p>© 2025 Gallery-Svelte</p>
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
    background: white;
    border-radius: 1rem;
    padding: 2.5rem;
    max-width: 480px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  :global(.dark) .modal-content {
    background: #1f2937;
    color: #e5e7eb;
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
    color: #6b7280;
    transition: all 0.2s ease;
  }
  
  .close-btn:hover {
    color: #374151;
    transform: scale(1.1);
  }
  
  :global(.dark) .close-btn {
    color: #9ca3af;
  }
  
  :global(.dark) .close-btn:hover {
    color: #e5e7eb;
  }
  
  h2 {
    font-family: var(--font-heading);
    font-size: 2rem;
    font-weight: 800;
    margin: 0 0 0.5rem 0;
    background: linear-gradient(135deg, #3b82f6, #06b6d4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
  }
  
  .version {
    font-family: var(--font-mono);
    font-size: 1.125rem;
    color: #6b7280;
    margin: 0 0 2rem 0;
    font-weight: 600;
    letter-spacing: 0.05em;
  }
  
  :global(.dark) .version {
    color: #9ca3af;
  }
  
  .section {
    margin-bottom: 1.5rem;
  }
  
  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    color: #374151;
  }
  
  :global(.dark) h3 {
    color: #e5e7eb;
  }
  
  p {
    color: #6b7280;
    line-height: 1.6;
    margin: 0;
  }
  
  :global(.dark) p {
    color: #9ca3af;
  }
  
  ul {
    margin: 0;
    padding-left: 1.5rem;
    color: #6b7280;
  }
  
  :global(.dark) ul {
    color: #9ca3af;
  }
  
  li {
    margin: 0.25rem 0;
  }
  
  .links {
    display: flex;
    gap: 1rem;
    margin: 2rem 0;
  }
  
  .links a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    background: #f3f4f6;
    color: #374151;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s ease;
  }
  
  :global(.dark) .links a {
    background: #374151;
    color: #e5e7eb;
  }
  
  .links a:hover {
    background: #e5e7eb;
    transform: translateY(-2px);
  }
  
  :global(.dark) .links a:hover {
    background: #4b5563;
  }
  
  .links svg {
    width: 20px;
    height: 20px;
  }
  
  .footer {
    text-align: center;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
  }
  
  :global(.dark) .footer {
    border-top-color: #374151;
  }
  
  .footer p {
    margin: 0.25rem 0;
  }
  
  .tech {
    font-size: 0.875rem;
    color: #9ca3af;
  }
</style>