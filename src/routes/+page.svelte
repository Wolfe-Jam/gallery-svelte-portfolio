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
        
        <!-- GridViewBar component -->
        <div class="grid-view-bar">
            <!-- Toggle positioned as button 0 -->
            <div class="toggle-button">
                <span class="toggle-label"><strong>#s</strong></span>
                <button 
                    class="toggle-switch" 
                    class:on={showNumbers}
                    onclick={() => showNumbers = !showNumbers}
                    aria-label="Toggle number buttons"
                >
                    <span class="toggle-circle"></span>
                </button>
            </div>
            
            <!-- Control bar area -->
            <div class="control-bar">
                {#if showNumbers}
                    <!-- Number buttons -->
                    {#each [1,2,3,4,5,6,7,8,9] as num}
                        <button 
                            class="num-btn"
                            class:active={flipCardSize === num} 
                            onclick={() => flipCardSize = num}
                        >
                            {num}
                        </button>
                    {/each}
                {:else}
                    <!-- Slider with nodes -->
                    <div class="slider-container">
                        <input 
                            type="range" 
                            min="1" 
                            max="9" 
                            step="1"
                            bind:value={flipCardSize}
                            class="grid-slider"
                        />
                        <div class="slider-nodes">
                            {#each [1,2,3,4,5,6,7,8,9] as num}
                                <div class="slider-node" class:active={flipCardSize === num}></div>
                            {/each}
                        </div>
                    </div>
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
    
    /* GridViewBar - Compact single bar control */
    .grid-view-bar {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0;
        margin-bottom: 2rem;
        background: #000000;
        border-radius: 20px;
        padding: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        width: fit-content;
        margin-left: auto;
        margin-right: auto;
    }
    
    /* Toggle button positioned as button 0 */
    .toggle-button {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 0 8px;
    }
    
    .toggle-label {
        font-size: 0.75rem;
        color: white;
        font-weight: bold;
        margin-right: 2px;
    }
    
    /* Toggle switch - black/white theme, same height as number buttons */
    .toggle-switch {
        position: relative;
        width: 32px;
        height: 28px;
        background: #666;
        border: none;
        border-radius: 14px;
        cursor: pointer;
        transition: background-color 0.3s;
        padding: 0;
    }
    
    .toggle-switch.on {
        background: #333;
    }
    
    .toggle-circle {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 24px;
        height: 24px;
        background: white;
        border-radius: 50%;
        transition: transform 0.3s;
        box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    }
    
    .toggle-switch.on .toggle-circle {
        transform: translateX(6px);
    }
    
    /* Control bar - exact fit for buttons or slider */
    .control-bar {
        display: flex;
        align-items: center;
        height: 28px;
        margin-left: 4px;
    }
    
    /* Number buttons - round, compact, black/white */
    .num-btn {
        width: 28px;
        height: 28px;
        border: 1px solid #333;
        background: white;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.2s;
        font-weight: 600;
        font-size: 0.75rem;
        color: #333;
        margin: 0 1px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .num-btn:hover {
        background: #f0f0f0;
        transform: scale(1.05);
    }
    
    .num-btn.active {
        background: #333;
        color: white;
        border-color: #333;
    }
    
    /* Slider container - exact fit */
    .slider-container {
        position: relative;
        width: 262px; /* 9 buttons × 28px + 8 gaps × 2px */
        height: 28px;
        display: flex;
        align-items: center;
    }
    
    /* Custom slider - black theme */
    .grid-slider {
        width: 100%;
        height: 4px;
        background: #333;
        border-radius: 2px;
        outline: none;
        cursor: pointer;
        -webkit-appearance: none;
        appearance: none;
    }
    
    .grid-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        background: white;
        border: 2px solid #333;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    }
    
    .grid-slider::-moz-range-thumb {
        width: 16px;
        height: 16px;
        background: white;
        border: 2px solid #333;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    }
    
    /* Slider nodes - positioned where numbers would be */
    .slider-nodes {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        transform: translateY(-50%);
        display: flex;
        justify-content: space-between;
        pointer-events: none;
        padding: 0 14px; /* Center nodes with slider thumb */
    }
    
    .slider-node {
        width: 6px;
        height: 6px;
        background: #666;
        border-radius: 50%;
        transition: all 0.2s;
    }
    
    .slider-node.active {
        background: white;
        transform: scale(1.3);
        box-shadow: 0 0 4px rgba(255,255,255,0.5);
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
