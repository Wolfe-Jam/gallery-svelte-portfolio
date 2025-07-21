<!--
🎯 Svelte 5 Responsive Grid System
Dynamic cards per row with proper reactivity
-->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  // Svelte 5 Props
  let { products = [], defaultWidth = 4 } = $props();
  
  // Reactive state
  let selectedWidth = $state(defaultWidth);
  
  // Width options (1-8 cards per row)
  const widthOptions = [1, 2, 3, 4, 5, 6, 7, 8];
  
  // Reactive grid calculation
  let gridStyle = $derived(`grid-template-columns: repeat(${selectedWidth}, 1fr);`);
  
  // Handle width change
  function handleWidthChange(width: number) {
    selectedWidth = width;
    dispatch('widthChange', { width });
  }
</script>

<!-- Width Control Bar -->
<div class="control-bar">
  <div class="view-controls">
    <span class="label">Width:</span>
    {#each widthOptions as width}
      <button 
        class="width-btn"
        class:active={selectedWidth === width}
        onclick={() => handleWidthChange(width)}
      >
        {width}
      </button>
    {/each}
    <span class="helper-text">cards per row</span>
  </div>
</div>

<!-- Responsive Grid -->
<div 
  class="responsive-grid" 
  style={gridStyle}
>
  {#each products as product, index}
    <div class="grid-item">
      <slot {product} {index} />
    </div>
  {/each}
</div>

<style>
  .control-bar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 1rem 0;
    margin-bottom: 1rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .view-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .label {
    font-weight: 500;
    color: #374151;
    margin-right: 0.5rem;
  }
  
  .width-btn {
    width: 2rem;
    height: 2rem;
    border: 1px solid #d1d5db;
    background: white;
    color: #6b7280;
    border-radius: 0.25rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .width-btn:hover {
    border-color: #3b82f6;
    color: #3b82f6;
  }
  
  .width-btn.active {
    background: #3b82f6;
    border-color: #3b82f6;
    color: white;
  }
  
  .helper-text {
    font-size: 0.875rem;
    color: #6b7280;
    margin-left: 0.5rem;
  }
  
  .responsive-grid {
    display: grid;
    gap: 1rem;
    width: 100%;
  }
  
  .grid-item {
    width: 100%;
    height: auto;
    overflow: hidden;
  }
</style>
