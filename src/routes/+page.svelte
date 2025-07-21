<script lang="ts">
    import { BAI_SIZES, type SizeKey } from '$lib/constants/sizing.js';
    import FlipCard from '$lib/components/marketplace/FlipCard.svelte';
    import { flipcardPreferences } from '$lib/stores/flipcardPreferences.js';
    import { demoProducts } from '$lib/data/demo-products.js';
    
    // Convert demo product to component format
    function demoToComponent(product: any) {
        return {
            id: product.id,
            name: product.name || product.title,
            title: product.title,
            price: product.price,
            image: product.image,
            description: product.description,
            sizes: product.sizes || [],
            colors: product.colors || []
        };
    }
    
    let flipCardSize: SizeKey = 4;
    let showNumbers = false;
    
    function handleViewSize8(productId: string) {
        flipCardSize = 8;
        console.log('View SIZE-8 for:', productId);
    }
</script>

<main class="main-content">
    <div class="content-wrapper">
        <h1 class="main-title">Gallery Svelte Portfolio</h1>
        <p class="subtitle">Professional UI Components for E-commerce</p>
        
        <div class="size-controls">
            <label>Grid Size: {flipCardSize}</label>
            
            <!-- Simple pillbox toggle -->
            <div class="pillbox-toggle">
                <button class:active={!showNumbers} onclick={() => showNumbers = false}>
                    Slider
                </button>
                <button class:active={showNumbers} onclick={() => showNumbers = true}>
                    #s
                </button>
            </div>
            
            {#if showNumbers}
                <!-- Number buttons -->
                <div class="number-buttons">
                    {#each [1,2,3,4,5,6,7,8,9] as num}
                        <button 
                            class="num-btn"
                            class:active={flipCardSize === num} 
                            onclick={() => flipCardSize = num}
                        >
                            {num}
                        </button>
                    {/each}
                </div>
            {:else}
                <!-- Slider -->
                <input type="range" min="1" max="9" bind:value={flipCardSize} />
            {/if}
        </div>
        
        <!-- Using the EXCEPTIONAL POD Gallery grid system -->
        <div class="grid-container">
            {#each demoProducts as product}
                <div class="grid-item">
                    <div class="flipcard-isolator">
                        <FlipCard
                            component={demoToComponent(product)}
                            size={flipCardSize}
                            theme="professional"
                            onview-size8={() => handleViewSize8(product.id)}
                        />
                    </div>
                </div>
            {/each}
        </div>
    </div>
</main>

<style>
    .main-content {
        min-height: 100vh;
        padding: 2rem;
        background: var(--color-background, #ffffff);
    }
    
    .content-wrapper {
        max-width: 1200px;
        margin: 0 auto;
    }
    
    .main-title {
        font-size: 2.5rem;
        font-weight: 700;
        text-align: center;
        margin-bottom: 1rem;
        color: var(--color-primary, #0066cc);
    }
    
    .subtitle {
        font-size: 1.25rem;
        text-align: center;
        margin-bottom: 2rem;
        color: var(--color-text, #333333);
    }
    
    .size-controls {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;
        padding: 1rem;
        background: var(--color-surface, #f8f9fa);
        border-radius: 8px;
        flex-wrap: wrap;
    }
    
    .size-controls label {
        font-weight: 500;
        color: var(--color-text, #333333);
    }
    
    .size-controls input[type="range"] {
        width: 200px;
    }
    
    /* Pillbox toggle */
    .pillbox-toggle {
        display: inline-flex;
        background: #e5e5e5;
        border-radius: 20px;
        padding: 2px;
    }
    
    .pillbox-toggle button {
        padding: 4px 12px;
        border: none;
        background: transparent;
        border-radius: 18px;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 0.875rem;
        color: #666;
    }
    
    .pillbox-toggle button.active {
        background: white;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        color: #333;
    }
    
    /* Number buttons */
    .number-buttons {
        display: flex;
        gap: 0.5rem;
    }
    
    .num-btn {
        width: 32px;
        height: 32px;
        border: 1px solid #ddd;
        background: white;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
        font-weight: 500;
        color: #666;
    }
    
    .num-btn:hover {
        border-color: var(--color-primary, #0066cc);
        color: var(--color-primary, #0066cc);
    }
    
    .num-btn.active {
        background: var(--color-primary, #0066cc);
        color: white;
        border-color: var(--color-primary, #0066cc);
    }
    
    /* EXCEPTIONAL POD Gallery grid system */
    .grid-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 16px;
        padding: 1rem;
    }
    
    .grid-item {
        display: block;
        background-color: transparent;
    }
    
    .flipcard-isolator {
        isolation: isolate;
    }
    
    @media (max-width: 768px) {
        .main-content {
            padding: 1rem;
        }
        
        .main-title {
            font-size: 2rem;
        }
        
        .grid-container {
            justify-content: center;
        }
    }
</style>
