<!-- 
  Footer Component
  Version info, copyright, credits
-->
<script lang="ts">
  type Props = {
    version?: string;
  };
  
  let { version = '1.0.0' }: Props = $props();
</script>

<footer class="footer">
  <div class="footer-content">
    <div class="left">
      <span class="version">v{version}</span>
      <span class="divider">•</span>
      <span>© 2025 Gallery-Svelte</span>
    </div>
    
    <div class="center">
      <span class="powered">Powered by</span>
      <a href="https://svelte.dev" target="_blank" rel="noopener" class="svelte-link">
        Svelte 5
      </a>
    </div>
    
    <div class="right">
      <a href="https://github.com/your-repo" target="_blank" rel="noopener" class="github-link">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        GitHub
      </a>
      <span class="divider">•</span>
      <a href="https://theBlockchain.ai" target="_blank" rel="noopener">
        bAI Marketplace
      </a>
    </div>
  </div>
</footer>

<style>
  .footer {
    position: fixed;
    bottom: 0;
    left: 60px; /* Account for sidebar */
    right: 0;
    background: var(--color-bg-secondary);
    border-top: 1px solid var(--color-border);
    z-index: 40;
  }
  
  .footer-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 2rem;
    font-size: 0.875rem;
  }
  
  .left, .center, .right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--color-text-secondary);
  }
  
  .version {
    font-family: var(--font-mono);
    font-weight: 600;
    color: var(--color-text);
    letter-spacing: 0.05em;
  }
  
  .powered {
    font-weight: 500;
  }
  
  .divider {
    opacity: 0.5;
  }
  
  a {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  a:hover {
    color: var(--color-primary-hover);
    transform: translateY(-1px);
  }
  
  .github-link svg {
    width: 16px;
    height: 16px;
  }
  
  .svelte-link {
    color: #ff3e00;
  }
  
  .svelte-link:hover {
    color: #ff5a2e;
  }
  
  /* Mobile responsive */
  @media (max-width: 768px) {
    .footer {
      left: 0;
    }
    
    .footer-content {
      flex-direction: column;
      gap: 0.5rem;
      padding: 1rem;
    }
    
    .left, .center, .right {
      justify-content: center;
    }
  }
</style>