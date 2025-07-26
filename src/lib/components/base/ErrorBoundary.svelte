<!--
🛡️ Error Boundary Component for Svelte 5
Catches component failures and shows graceful fallback
-->
<script lang="ts">
  import { onMount } from 'svelte';
  import { logger } from '$lib/logger.js';
  
  // Svelte 5 Props
  let { 
    fallback = null,
    showError = false,
    componentName = 'Component'
  } = $props();
  
  // Error state
  let hasError = $state(false);
  let errorMessage = $state('');
  let errorStack = $state('');
  
  // Error boundary
  onMount(() => {
    const handleError = (event: ErrorEvent) => {
      hasError = true;
      errorMessage = event.message || 'Unknown error occurred';
      errorStack = event.error?.stack || '';
      
      // Log to console for debugging
      logger.error(`[${componentName}] Component Error:`, {
        message: errorMessage,
        stack: errorStack,
        event
      });
      
      // Prevent error from bubbling up
      event.preventDefault();
      return false;
    };
    
    const handleRejection = (event: PromiseRejectionEvent) => {
      hasError = true;
      errorMessage = `Promise rejection: ${event.reason}`;
      
      logger.error(`[${componentName}] Promise Rejection:`, {
        reason: event.reason,
        promise: event.promise
      });
      
      event.preventDefault();
    };
    
    // Add global error listeners
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);
    
    // Cleanup
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  });
  
  // Reset error state
  function resetError() {
    hasError = false;
    errorMessage = '';
    errorStack = '';
  }
</script>

{#if hasError}
  <!-- Error Fallback UI -->
  <div class="error-boundary">
    <div class="error-content">
      <div class="error-icon">⚠️</div>
      <h3 class="error-title">Something went wrong</h3>
      <p class="error-message">
        {componentName} encountered an error and couldn't render properly.
      </p>
      
      {#if showError}
        <details class="error-details">
          <summary>Error Details</summary>
          <pre class="error-stack">{errorMessage}\n\n{errorStack}</pre>
        </details>
      {/if}
      
      <button class="retry-button" onclick={resetError}>
        🔄 Try Again
      </button>
    </div>
    
    <!-- Custom fallback slot -->
    {#if fallback}
      <div class="custom-fallback">
        <slot name="fallback" />
      </div>
    {/if}
  </div>
{:else}
  <!-- Normal content -->
  <slot />
{/if}

<style>
  .error-boundary {
    padding: 2rem;
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 0.75rem;
    margin: 1rem 0;
  }
  
  .error-content {
    text-align: center;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .error-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .error-title {
    color: #dc2626;
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
  }
  
  .error-message {
    color: #7f1d1d;
    margin: 0 0 1.5rem 0;
    line-height: 1.5;
  }
  
  .error-details {
    text-align: left;
    margin: 1rem 0;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 1rem;
  }
  
  .error-details summary {
    cursor: pointer;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
  }
  
  .error-stack {
    font-family: 'Monaco', 'Consolas', monospace;
    font-size: 0.875rem;
    color: #6b7280;
    white-space: pre-wrap;
    word-break: break-word;
    margin: 0;
    padding: 0.5rem;
    background: #f9fafb;
    border-radius: 0.25rem;
    overflow-x: auto;
  }
  
  .retry-button {
    background: #dc2626;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .retry-button:hover {
    background: #b91c1c;
  }
  
  .custom-fallback {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #fecaca;
  }
  
  /* Dark mode */
  :global(.dark) .error-boundary {
    background: #1f2937;
    border-color: #374151;
  }
  
  :global(.dark) .error-title {
    color: #ef4444;
  }
  
  :global(.dark) .error-message {
    color: #d1d5db;
  }
  
  :global(.dark) .error-details {
    background: #111827;
    border-color: #374151;
  }
  
  :global(.dark) .error-stack {
    background: #1f2937;
    color: #9ca3af;
  }
</style>
