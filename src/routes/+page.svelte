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
                    <!-- Slider -->
                    <div class="slider-container">
                        <input 
                            type="range" 
                            min="1" 
                            max="9" 
                            step="1"
                            bind:value={flipCardSize}
                            class="grid-slider"
                        />
                        <div class="slider-tooltip" style="left: {((flipCardSize - 1) / 8) * 100}%">
                            {flipCardSize}
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
        color: #00859B;  /* Updated teal color */
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
        font-size: 0.625rem;  /* Reduced to match smaller toggle */
        color: white;
        font-weight: bold;
        margin-right: 2px;
    }
    
    /* Toggle switch - reduced by 20% for less emphasis */
    .toggle-switch {
        position: relative;
        width: 38px;  /* 48px × 0.8 = 38.4px */
        height: 22px;  /* 28px × 0.8 = 22.4px */
        background: #666;
        border: none;
        border-radius: 11px;
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
        width: 18px;  /* 24px × 0.8 = 19.2px, adjusted to 18px */
        height: 18px;
        background: white;
        border-radius: 50%;
        transition: transform 0.3s;
        box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    }
    
    .toggle-switch.on .toggle-circle {
        transform: translateX(16px);  /* Adjusted for smaller size */
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
    
    /* Slider container - extended for breathing room */
    .slider-container {
        position: relative;
        width: calc(262px + 2rem); /* Original width + 2rem extra black bar */
        height: 28px;
        display: flex;
        align-items: center;
        padding-right: 1rem; /* Add padding to show black bar after orange */
    }
    
    /* Custom slider - orange solid color */
    .grid-slider {
        width: calc(100% - 1rem); /* Leave room for black bar at end */
        height: 6px;
        background: transparent;
        outline: none;
        cursor: pointer;
        -webkit-appearance: none;
        appearance: none;
        position: relative;
    }
    
    /* Track styling */
    .grid-slider::-webkit-slider-runnable-track {
        width: 100%;
        height: 6px;
        background: #F4633A;
        border-radius: 3px;
    }
    
    .grid-slider::-moz-range-track {
        width: 100%;
        height: 6px;
        background: #F4633A;
        border-radius: 3px;
    }
    
    /* Thumb styling */
    .grid-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        background: white;
        border: 2px solid #F4633A;
        border-radius: 50%;
        cursor: pointer;
        margin-top: -7px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        transition: all 0.2s;
    }
    
    .grid-slider::-moz-range-thumb {
        width: 20px;
        height: 20px;
        background: white;
        border: 2px solid #F4633A;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        transition: all 0.2s;
    }
    
    .grid-slider::-webkit-slider-thumb:hover {
        transform: scale(1.1);
        box-shadow: 0 3px 6px rgba(0,0,0,0.3);
    }
    
    .grid-slider::-moz-range-thumb:hover {
        transform: scale(1.1);
        box-shadow: 0 3px 6px rgba(0,0,0,0.3);
    }
    
    /* Fast tooltip */
    .slider-tooltip {
        position: absolute;
        top: -25px;
        transform: translateX(-50%);
        background: #333;
        color: white;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s;
    }
    
    .slider-tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 4px solid transparent;
        border-top-color: #333;
    }
    
    /* Show tooltip on hover/focus */
    .slider-container:hover .slider-tooltip,
    .grid-slider:focus + .slider-tooltip {
        opacity: 1;
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
