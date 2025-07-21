<!--
🎯 Universal GridSystem Component
Extracted from bAI marketplace logic - modular for both projects
-->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  // Svelte 5 Props (from bAI mathematical system)
  let { 
    items = [], 
    defaultSize = 5,
    showControls = true,
    showLayoutToggle = true,
    showSizeControl = true
  } = $props();
  
  // Reactive state (bAI pattern)
  let selectedSize = $state(defaultSize);
  let layoutMode = $state('grid'); // 'grid' | 'overlapping'
  
  // Mathematical SIZE system from bAI (EXACT COPY)
  const SIZES = {
    1: 88,   // 333 ÷ 4 = Micro Badge
    2: 111,  // 333 ÷ 3 = Tiny Perfect  
    3: 166,  // 333 ÷ 2 = Small Grid
    4: 222,  // 333 × 2/3 = Compact
    5: 333,  // 333 × 1 = Master Baseline ⭐
    6: 444,  // 333 × 4/3 = Large Display
    7: 555,  // 333 × 5/3 = Feature Hero
    8: 777,  // 333 × 7/3 = Showcase
    9: 999   // 333 × 3 = Mega Hero
  };
  
  // Optimal columns calculation (from bAI)
  function getOptimalColumns(size: number): number {
    switch(size) {
      case 1: // 88px
      case 2: // 111px
        return 8;
      case 3: // 166px
        return 6;
      case 4: // 222px
        return 5;
      case 5: // 333px
        return 4;
      case 6: // 444px
        return 3;
      case 7: // 555px
      case 8: // 777px
        return 2;
      case 9: // 999px
        return 1;
      default:
        return 3;
    }
  }
  
  // Get Tailwind grid class (from bAI)
  function getGridClass(cols: number): string {
    const gridClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-2', 
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8'
    };
    return gridClasses[cols] || 'grid-cols-3';
  }
  
  // Reactive calculations
  let gridColumns = $derived(getOptimalColumns(selectedSize));
  let cardSize = $derived(SIZES[selectedSize]);
  let cardOverlap = $derived(cardSize * 0.6); // For overlapping mode
  
  // Handle size change
  function handleSizeChange(newSize: number) {
    if (newSize >= 1 && newSize <= 9) {
      selectedSize = newSize;
      dispatch('sizeChange', { 
        size: newSize, 
        pixels: SIZES[newSize],
        columns: getOptimalColumns(newSize)
      });
    }
  }
  
  // Handle layout toggle
  function toggleLayout() {
    layoutMode = layoutMode === 'grid' ? 'overlapping' : 'grid';
    dispatch('layoutChange', { layout: layoutMode });
  }
  
  // Size options
  const sizeOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
</script>

<!-- Control Bar (bAI style) -->
{#if showControls}
  <div class="grid-controls">
    <!-- Layout Toggle -->
    {#if showLayoutToggle}
      <div class="layout-toggle">
        <button 
          class:active={layoutMode === 'grid'}
          onclick={() => { layoutMode = 'grid'; dispatch('layoutChange', { layout: 'grid' }); }}
        >
          ⚏ Grid
        </button>
        <button 
          class:active={layoutMode === 'overlapping'}
          onclick={() => { layoutMode = 'overlapping'; dispatch('layoutChange', { layout: 'overlapping' }); }}
        >
          🎭 Fan
        </button>
      </div>
    {/if}
    
    <!-- Size Control (bAI mathematical system) -->
    {#if showSizeControl}
      <div class="size-control">
        <label>SIZE:</label>
        <div class="size-buttons">
          {#each sizeOptions as size}
            <button 
              class="size-btn"
              class:active={selectedSize === size}
              onclick={() => handleSizeChange(size)}
              title="SIZE-{size} ({SIZES[size]}px)"
            >
              {size}
            </button>
          {/each}
        </div>
        <span class="size-label">{SIZES[selectedSize]}px</span>
      </div>
    {/if}
  </div>
{/if}

<!-- Grid Display -->
{#if layoutMode === 'grid'}
  <!-- Standard Grid Layout -->
  <div 
    class="universal-grid {getGridClass(gridColumns)}"
    style="--card-size: {cardSize}px;"
  >
    {#each items as item, index}
      <div class="grid-item">
        <slot {item} {index} size={selectedSize} pixels={cardSize} />
      </div>
    {/each}
  </div>
{:else}
  <!-- Overlapping/Fan Layout (bAI style) -->
  <div 
    class="overlapping-container"
    style="
      min-height: {cardSize + 200}px;
      --card-size: {cardSize}px;
      --card-count: {items.length};
      --card-overlap: {cardOverlap}px;
    "
  >
    <div class="fan-deck">
      {#each items as item, index}
        <div 
          class="overlapping-card"
          style="
            --index: {index};
            --total: {items.length};
            --offset-x: {(index - (items.length - 1) / 2) * cardOverlap}px;
            z-index: {index};
          "
        >
          <slot {item} {index} size={selectedSize} pixels={cardSize} />
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  /* Control Bar (bAI styling) */
  .grid-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
    padding: 1.5rem;
    background: white;
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
  }
  
  .layout-toggle {
    display: flex;
    background: #f3f4f6;
    border-radius: 0.5rem;
    padding: 0.25rem;
  }
  
  .layout-toggle button {
    padding: 0.5rem 1rem;
    border: none;
    background: transparent;
    color: #6b7280;
    font-weight: 500;
    cursor: pointer;
    border-radius: 0.375rem;
    transition: all 0.2s;
  }
  
  .layout-toggle button.active {
    background: white;
    color: #111827;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  /* Size Control (bAI styling) */
  .size-control {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .size-control label {
    font-weight: 600;
    color: #374151;
  }
  
  .size-buttons {
    display: flex;
    gap: 0.25rem;
  }
  
  .size-btn {
    width: 2.5rem;
    height: 2.5rem;
    border: 2px solid #e5e7eb;
    background: white;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.875rem;
  }
  
  .size-btn:hover {
    border-color: #9ca3af;
    background: #f9fafb;
  }
  
  .size-btn.active {
    background: linear-gradient(135deg, #22d3ee, #3b82f6);
    color: white;
    border-color: transparent;
  }
  
  .size-label {
    font-weight: 500;
    color: #6b7280;
    font-size: 0.875rem;
  }
  
  /* Grid Layout */
  .universal-grid {
    display: grid;
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    place-items: center;
  }
  
  .grid-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  
  /* Overlapping Layout (bAI fan/deck system) */
  .overlapping-container {
    position: relative;
    max-width: 1400px;
    margin: 0 auto;
    padding: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-x: auto;
  }
  
  .fan-deck {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(var(--card-size) + (var(--card-count) * var(--card-overlap)));
    height: calc(var(--card-size) + 100px);
  }
  
  .overlapping-card {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: 
      translate(-50%, -50%)
      translateX(var(--offset-x));
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }
  
  .overlapping-card:hover {
    transform: 
      translate(-50%, -50%)
      translateX(var(--offset-x))
      translateY(-20px);
    z-index: 99 !important;
  }
  
  /* Responsive Grid Classes */
  .grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
  .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
  .grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
  .grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
  .grid-cols-5 { grid-template-columns: repeat(5, 1fr); }
  .grid-cols-6 { grid-template-columns: repeat(6, 1fr); }
  .grid-cols-7 { grid-template-columns: repeat(7, 1fr); }
  .grid-cols-8 { grid-template-columns: repeat(8, 1fr); }
  
  /* Responsive adjustments */
  @media (max-width: 1024px) {
    .universal-grid {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
    }
  }
  
  /* Dark mode support */
  :global(.dark) .grid-controls {
    background: #1f2937;
  }
  
  :global(.dark) .layout-toggle {
    background: #374151;
  }
  
  :global(.dark) .layout-toggle button.active,
  :global(.dark) .size-btn {
    background: #1f2937;
    color: #f3f4f6;
  }
  
  :global(.dark) .size-btn.active {
    background: linear-gradient(135deg, #22d3ee, #3b82f6);
  }
</style>
