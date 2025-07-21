<script lang="ts">
    import { BAI_SIZES, type SizeKey } from '$lib/constants/sizing.js';
    
    let selectedSize: SizeKey = 4;
    let showGrid = true;
    
    // Create demo grid items
    const gridItems = Array.from({ length: 24 }, (_, i) => ({
        id: i + 1,
        title: `Item ${i + 1}`,
        description: `Demo grid item ${i + 1} showing responsive behavior`
    }));
    
    // Calculate grid properties based on size
    $: gridProps = BAI_SIZES[selectedSize];
    $: itemWidth = gridProps?.width || '200px';
    $: itemHeight = gridProps?.height || '150px';
    $: columns = gridProps?.columns || 4;
</script>

<main class="demo-container">
    <div class="header">
        <h1>Grid System Demo</h1>
        <p class="subtitle">Professional responsive grid system with 9 predefined sizes</p>
    </div>
    
    <div class="controls">
        <div class="size-selector">
            <h3>Grid Size: {selectedSize}</h3>
            <div class="size-buttons">
                {#each [1,2,3,4,5,6,7,8,9] as size}
                    <button 
                        class="size-btn"
                        class:active={selectedSize === size}
                        onclick={() => selectedSize = size}
                    >
                        {size}
                    </button>
                {/each}
            </div>
        </div>
        
        <div class="grid-info">
            <div class="info-item">
                <span class="label">Item Size:</span>
                <span class="value">{itemWidth} × {itemHeight}</span>
            </div>
            <div class="info-item">
                <span class="label">Columns:</span>
                <span class="value">{columns}</span>
            </div>
            <div class="info-item">
                <span class="label">Total Items:</span>
                <span class="value">{gridItems.length}</span>
            </div>
        </div>
        
        <div class="toggle-section">
            <button 
                class="toggle-btn"
                class:active={showGrid}
                onclick={() => showGrid = !showGrid}
            >
                {showGrid ? 'Hide' : 'Show'} Grid
            </button>
        </div>
    </div>
    
    {#if showGrid}
        <div 
            class="grid-container"
            style="
                --item-width: {itemWidth};
                --item-height: {itemHeight};
                --columns: {columns};
            "
        >
            {#each gridItems as item}
                <div class="grid-item" data-size="{selectedSize}">
                    <div class="item-content">
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                        <div class="item-meta">
                            <span class="size-tag">SIZE-{selectedSize}</span>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
    
    <div class="documentation">
        <h2>Grid System Features</h2>
        <div class="features-grid">
            <div class="feature">
                <h3>🎯 9 Predefined Sizes</h3>
                <p>Carefully crafted size presets from compact to showcase</p>
            </div>
            <div class="feature">
                <h3>📱 Fully Responsive</h3>
                <p>Adapts seamlessly across all device sizes</p>
            </div>
            <div class="feature">
                <h3>⚡ Performance Optimized</h3>
                <p>CSS Grid with efficient rendering</p>
            </div>
            <div class="feature">
                <h3>🎨 Theme Ready</h3>
                <p>Works with any color scheme or theme</p>
            </div>
        </div>
    </div>
</main>

<style>
    .demo-container {
        min-height: 100vh;
        padding: 2rem;
        background: var(--color-background, #ffffff);
        color: var(--color-text, #333333);
    }
    
    .header {
        text-align: center;
        margin-bottom: 3rem;
    }
    
    .header h1 {
        font-size: 3rem;
        font-weight: 700;
        color: var(--color-primary, #0066cc);
        margin-bottom: 1rem;
    }
    
    .subtitle {
        font-size: 1.25rem;
        color: var(--color-text-secondary, #666666);
        max-width: 600px;
        margin: 0 auto;
    }
    
    .controls {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        margin-bottom: 3rem;
        padding: 2rem;
        background: var(--color-surface, #f8f9fa);
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .size-selector h3 {
        margin-bottom: 1rem;
        color: var(--color-text, #333333);
    }
    
    .size-buttons {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }
    
    .size-btn {
        width: 48px;
        height: 48px;
        border: 2px solid #ddd;
        background: white;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;
        font-weight: 600;
        font-size: 1.1rem;
        color: #666;
    }
    
    .size-btn:hover {
        border-color: var(--color-primary, #0066cc);
        color: var(--color-primary, #0066cc);
        transform: translateY(-2px);
    }
    
    .size-btn.active {
        background: var(--color-primary, #0066cc);
        color: white;
        border-color: var(--color-primary, #0066cc);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,102,204,0.3);
    }
    
    .grid-info {
        display: flex;
        gap: 2rem;
        flex-wrap: wrap;
    }
    
    .info-item {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    
    .label {
        font-size: 0.875rem;
        color: var(--color-text-secondary, #666666);
        font-weight: 500;
    }
    
    .value {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--color-primary, #0066cc);
    }
    
    .toggle-btn {
        padding: 0.75rem 1.5rem;
        border: 2px solid var(--color-primary, #0066cc);
        background: white;
        color: var(--color-primary, #0066cc);
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.2s;
    }
    
    .toggle-btn:hover,
    .toggle-btn.active {
        background: var(--color-primary, #0066cc);
        color: white;
    }
    
    .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(var(--item-width), 1fr));
        gap: 1rem;
        margin-bottom: 3rem;
        padding: 1rem;
    }
    
    .grid-item {
        width: var(--item-width);
        height: var(--item-height);
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        transition: all 0.3s;
        overflow: hidden;
        justify-self: center;
    }
    
    .grid-item:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    }
    
    .item-content {
        padding: 1rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    
    .item-content h4 {
        margin: 0 0 0.5rem 0;
        color: var(--color-text, #333333);
        font-size: 1rem;
    }
    
    .item-content p {
        margin: 0;
        font-size: 0.875rem;
        color: var(--color-text-secondary, #666666);
        line-height: 1.4;
        flex-grow: 1;
    }
    
    .item-meta {
        margin-top: 0.5rem;
        display: flex;
        justify-content: flex-end;
    }
    
    .size-tag {
        background: var(--color-primary, #0066cc);
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
    }
    
    .documentation {
        margin-top: 4rem;
        padding: 2rem;
        background: var(--color-surface, #f8f9fa);
        border-radius: 12px;
    }
    
    .documentation h2 {
        text-align: center;
        margin-bottom: 2rem;
        color: var(--color-text, #333333);
    }
    
    .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
    }
    
    .feature {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .feature h3 {
        margin: 0 0 1rem 0;
        color: var(--color-text, #333333);
        font-size: 1.125rem;
    }
    
    .feature p {
        margin: 0;
        color: var(--color-text-secondary, #666666);
        line-height: 1.5;
    }
    
    @media (max-width: 768px) {
        .demo-container {
            padding: 1rem;
        }
        
        .header h1 {
            font-size: 2.5rem;
        }
        
        .controls {
            padding: 1rem;
        }
        
        .grid-info {
            gap: 1rem;
        }
        
        .size-buttons {
            justify-content: center;
        }
        
        .grid-container {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
    }
</style>