<!--
🔧 ENGINE: Gallery Engine (Never Changes)
Core business logic for Gallery platform
-->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Component, GalleryProduct, HextraConfig } from '$lib/types/bai-compatible.js';
  import { galleryToBaiComponent } from '$lib/types/bai-compatible.js';
  
  const dispatch = createEventDispatcher();
  
  // Engine props (stable interface)
  export let products: GalleryProduct[] = [];
  export let clientConfig: HextraConfig;
  export let enableColorIntelligence: boolean = true;
  export let enableAI: boolean = true;
  
  // Convert Gallery products to bAI Components (ENGINE logic)
  $: baiComponents = products.map(product => galleryToBaiComponent(product));
  
  // Gallery state management (ENGINE)
  let selectedProduct: Component | null = null;
  let activeFilters: string[] = [];
  let searchQuery: string = '';
  
  // Engine functions (stable)
  function handleProductSelect(component: Component) {
    selectedProduct = component;
    dispatch('productSelect', { component });
  }
  
  function handleColorSelect(event: CustomEvent) {
    const { color, productId } = event.detail;
    dispatch('colorSelect', { color, productId });
  }
  
  function handleSearch(query: string) {
    searchQuery = query;
    dispatch('search', { query });
  }
  
  function handleFilter(filters: string[]) {
    activeFilters = filters;
    dispatch('filter', { filters });
  }
  
  // Filter products based on search and filters (ENGINE logic)
  $: filteredComponents = baiComponents.filter(component => {
    const matchesSearch = !searchQuery || 
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.consumer_tagline?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilters = activeFilters.length === 0 ||
      activeFilters.some(filter => component.tags?.includes(filter));
    
    return matchesSearch && matchesFilters;
  });
</script>

<!-- Engine Interface (stable) -->
<div class="gallery-engine">
  <!-- Search Interface -->
  <div class="search-interface">
    <input 
      type="text" 
      bind:value={searchQuery}
      placeholder="Search {clientConfig.client.name} products..."
      class="search-input"
    />
  </div>
  
  <!-- Filter Interface -->
  <div class="filter-interface">
    <h3>Categories</h3>
    <!-- Filter components here -->
  </div>
  
  <!-- Results Interface -->
  <div class="results-interface">
    <h3>
      {filteredComponents.length} Products Found
      {#if clientConfig.client.internal}
        <span class="client-badge">Internal Client: {clientConfig.client.name}</span>
      {/if}
    </h3>
    
    <!-- Slot for FUEL components -->
    <div class="products-grid">
      <slot 
        name="products" 
        {filteredComponents}
        {handleProductSelect}
        {handleColorSelect}
      />
    </div>
  </div>
  
  <!-- Selected Product Detail -->
  {#if selectedProduct}
    <div class="product-detail">
      <slot 
        name="detail" 
        component={selectedProduct}
      />
    </div>
  {/if}
</div>

<style>
  .gallery-engine {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    min-height: 100vh;
    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  }
  
  .search-interface {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .search-input {
    width: 100%;
    padding: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    font-size: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .client-badge {
    background: linear-gradient(45deg, #004AAE, #0CC0DF);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    margin-left: 1rem;
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    justify-items: center;
  }
  
  .product-detail {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background: white;
    border-radius: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
</style>
