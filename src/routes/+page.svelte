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
            
            <!-- Fixed toggle position -->
            <div class="toggle-section">
                <span class="toggle-label">#s</span>
                <button 
                    class="toggle-switch" 
                    class:on={showNumbers}
                    onclick={() => showNumbers = !showNumbers}
                    aria-label="Toggle number buttons"
                >
                    <span class="toggle-circle"></span>
                </button>
            </div>
            
            <!-- Dynamic control area -->
            <div class="control-area">
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
    
    /* Toggle section - fixed position */
    .toggle-section {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-shrink: 0;
    }
    
    .toggle-label {
        font-size: 0.875rem;
        color: #666;
        font-weight: 500;
    }
    
    /* Control area for dynamic content */
    .control-area {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 32px;
        flex-grow: 1;
    }
    
    /* Toggle switch */
    .toggle-switch {
        position: relative;
        width: 44px;
        height: 24px;
        background: #ccc;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        transition: background-color 0.3s;
        padding: 0;
    }
    
    .toggle-switch.on {
        background: var(--color-primary, #0066cc);
    }
    
    .toggle-circle {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 20px;
        height: 20px;
        background: white;
        border-radius: 50%;
        transition: transform 0.3s;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    
    .toggle-switch.on .toggle-circle {
        transform: translateX(20px);
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
