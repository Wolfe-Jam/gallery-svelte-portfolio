<!-- 🎯 Master FlipCard-X - Universal Professional Component -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  // Core Props
  export let title: string = "Form Builder";
  export let tagline: string = "Smart Form Creation";
  export let gradient: [string, string] = ["#fb923c", "#ef4444"];
  export let size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 = 4;
  export let tags: string[] = ["forms", "component", "pro"];
  export let price: number = 199;
  
  // Feature Toggles
  export let showTags: boolean = true;
  export let showPalette: boolean = true;
  export let showToolbar: boolean = true;
  export let showBuyButton: boolean = true;
  
  // Mathematical Constants
  const SIZES = {
    1: 88,   2: 111,  3: 166,  4: 222,  5: 333,
    6: 444,  7: 555,  8: 777,  9: 999
  };
  
  const IMAGE_BOX_RATIO = 0.6666; // 66.66%
  
  // Calculated Dimensions
  $: flipCardSize = SIZES[size];
  $: imageBoxSize = Math.round(flipCardSize * IMAGE_BOX_RATIO);
  $: borderRadius = Math.round(flipCardSize * 0.054); // ~12px at SIZE-4
  $: imageRadius = Math.round(imageBoxSize * 0.081); // ~12px at SIZE-4
  $: titleSize = Math.round(flipCardSize * 0.072); // ~16px at SIZE-4
  $: taglineSize = Math.round(flipCardSize * 0.054); // ~12px at SIZE-4
  $: padding = Math.round(flipCardSize * 0.045); // ~10px at SIZE-4
  
  // Color Extraction
  $: gradientString = `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`;
  $: extractedColors = [
    "#000000", // Card background
    "#ffffff", // Text color
    gradient[0], // Primary gradient
    gradient[1], // Secondary gradient
    "#808080"  // Neutral
  ];
  
  // State
  let isFlipped = false;
  let isFavorited = false;
  let cartAdded = false;
  let showPreferencesOnBack = false;
  
  // Event Handlers
  function handleFlip() {
    isFlipped = !isFlipped;
    // Reset preferences view when flipping back to front
    if (!isFlipped) {
      showPreferencesOnBack = false;
    }
    dispatch('flip', { flipped: isFlipped });
  }
  
  function openPreferences() {
    showPreferencesOnBack = true;
    if (!isFlipped) {
      isFlipped = true; // Flip to back to show preferences
    }
    dispatch('settings', { title });
  }
  
  function handleFavorite() {
    isFavorited = !isFavorited;
    dispatch('favorite', { favorited: isFavorited });
  }
  
  function handleAddToCart() {
    cartAdded = true;
    setTimeout(() => cartAdded = false, 2000);
    dispatch('addToCart', { title, price });
  }
  
  function handlePurchase() {
    dispatch('purchase', { title, price, tags });
  }
</script>

<!-- 🎨 Master FlipCard-X Container -->
<div 
  class="flipcard-master"
  style="--card-size: {flipCardSize}px; --image-size: {imageBoxSize}px; --border-radius: {borderRadius}px;"
>
  <!-- Main FlipCard with Flip Functionality -->
  <div class="flipcard-wrapper" on:click={handleFlip}>
    
    {#if !isFlipped}
      <!-- 🎨 FRONT SIDE -->
      <div class="flipcard-side flipcard-front">
        <!-- 🎮 4-Corner Button System - ONLY SIZE 4+ -->
        {#if size >= 4}
          <div class="corner-buttons-container">
            <button class="corner-btn top-left" on:click|stopPropagation={openPreferences} title="Settings">
              <span class="btn-icon">i</span>
            </button>
            
            <button class="corner-btn top-right" on:click|stopPropagation={handleAddToCart} title="Add to Cart">
              <span class="btn-icon">🛒</span>
              {#if cartAdded}
                <span class="cart-indicator">+1</span>
              {/if}
            </button>
            
            <button 
              class="corner-btn bottom-left" 
              class:favorited={isFavorited}
              on:click|stopPropagation={handleFavorite} 
              title="Favorite"
            >
              <span class="btn-icon">{isFavorited ? '♥' : '♡'}</span>
            </button>
            
            <button class="corner-btn bottom-right" on:click|stopPropagation={handleFlip} title="Flip Card">
              <span class="btn-icon flip-icon" class:flipped={isFlipped}>⟲</span>
            </button>
          </div>
        {/if}
        
        <!-- ImageBox with Gradient (Centered) -->
        <div 
          class="image-box"
          style="background: {gradientString}; border-radius: {imageRadius}px;"
        >
        </div>
        
        <!-- Title & Tagline -->
        <div class="text-content">
          <h3 class="card-title" style="font-size: {titleSize}px;">
            {title}
          </h3>
          <p class="card-tagline" style="font-size: {taglineSize}px;">
            {tagline}
          </p>
        </div>
      </div>
    {:else}
      <!-- 🔄 BACK SIDE -->
      <div class="flipcard-side flipcard-back">
        <div class="back-content">
          {#if showPreferencesOnBack}
            <!-- 🔧 PREFERENCES MODE -->
            <div class="preferences-back-arrow">
              <button 
                class="back-arrow-btn" 
                on:click|stopPropagation={() => { 
                  showPreferencesOnBack = false; 
                  isFlipped = false; 
                }}
                title="Back to FlipCard"
              >
                ←
              </button>
            </div>
            
            <h3 class="back-title" style="font-size: {titleSize}px;">
              FlipCard Settings
            </h3>
            
            <div class="preferences-content">
              <div class="pref-section">
                <div class="pref-info">
                  <span class="pref-label">Show Tags</span>
                </div>
                <div class="pref-toggle" class:checked={showTags}>
                  <span class="toggle-slider"></span>
                </div>
              </div>
              
              <div class="pref-section">
                <div class="pref-info">
                  <span class="pref-label">Color Palette</span>
                </div>
                <div class="pref-toggle" class:checked={showPalette}>
                  <span class="toggle-slider"></span>
                </div>
              </div>
              
              <div class="pref-section">
                <div class="pref-info">
                  <span class="pref-label">Toolbar</span>
                </div>
                <div class="pref-toggle" class:checked={showToolbar}>
                  <span class="toggle-slider"></span>
                </div>
              </div>
            </div>
          {:else}
            <!-- 📋 PRODUCT INFO MODE -->
            <h3 class="back-title" style="font-size: {titleSize}px;">
              {title}
            </h3>
            
            <div class="back-sections">
              <div class="back-section">
                <h4 class="section-title">📋 Overview</h4>
                <p class="section-content">
                  Professional component for modern applications. Built with precision and performance in mind.
                </p>
              </div>
              
              <div class="back-section">
                <h4 class="section-title">🎯 Features</h4>
                <ul class="features-list">
                  <li>Mathematical sizing system</li>
                  <li>Professional grade quality</li>
                  <li>Universal compatibility</li>
                  <li>Enterprise ready</li>
                </ul>
              </div>
            </div>
            
            <!-- Back flip button -->
            <button class="back-flip-btn" on:click|stopPropagation={handleFlip} title="Flip Back">
              ← Back
            </button>
          {/if}
        </div>
      </div>
    {/if}
  </div>
  
  <!-- Tags Row - ONLY SIZE 4+ -->
  {#if showTags && tags?.length > 0 && size >= 4}
    <div class="tags-row">
      {#each tags as tag}
        <span class="tag">#{tag}</span>
      {/each}
    </div>
  {/if}
  
  <!-- Color Palette - ONLY SIZE 4+ -->
  {#if showPalette && size >= 4}
    <div class="color-palette">
      {#each extractedColors as color}
        <div class="color-swatch" style="background-color: {color};" title={color}></div>
      {/each}
    </div>
  {/if}
  
  <!-- Toolbar - ONLY SIZE 4+ -->
  {#if showToolbar && size >= 4}
    <div class="toolbar">
      <button class="tool-btn" title="Download">📥</button>
      <button class="tool-btn" title="Share">📤</button>
      <button class="tool-btn" title="Email">📧</button>
      <button class="tool-btn" title="Mobile">📱</button>
      <button class="tool-btn" title="Link">🔗</button>
      <button class="tool-btn" title="Settings">⚙️</button>
    </div>
  {/if}
  
  <!-- Buy Button -->
  {#if showBuyButton}
    <button class="buy-button" on:click={handlePurchase}>
      ⚡ BUY
    </button>
  {/if}
</div>

<style>
  /* 🎯 Master FlipCard-X Styles - Self-Contained */
  .flipcard-master {
    /* Container */
    position: relative;
    display: flex;
    flex-direction: column;
    width: var(--card-size);
    gap: 8px;
    
    /* Isolation */
    isolation: isolate;
    contain: layout style;
    
    /* Reset potential conflicts */
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    
    /* Typography reset */
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1;
    color: inherit;
  }
  
  /* 🎨 FlipCard Wrapper */
  .flipcard-wrapper {
    position: relative;
    width: var(--card-size);
    height: var(--card-size);
    cursor: pointer;
    perspective: 1200px;
    transform-style: preserve-3d;
  }
  
  /* 🔄 FlipCard Sides */
  .flipcard-side {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000000;
    border-radius: var(--border-radius);
    padding: 12px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    backface-visibility: hidden;
    transition: transform 0.6s ease;
  }
  
  .flipcard-front {
    transform: rotateY(0deg);
  }
  
  .flipcard-back {
    transform: rotateY(180deg);
    justify-content: flex-start;
    color: white;
  }
  
  .flipcard-wrapper:hover .flipcard-side {
    transform: translateY(-2px);
  }
  
  /* 🔄 Back Side Content */
  .back-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 8px;
    box-sizing: border-box;
  }
  
  .back-title {
    color: white;
    font-weight: 700;
    margin: 0 0 12px 0;
    font-size: inherit;
    text-align: center;
  }
  
  .back-sections {
    flex: 1;
    overflow-y: auto;
  }
  
  .back-section {
    margin-bottom: 12px;
  }
  
  .section-title {
    color: #22d3ee;
    font-size: 12px;
    font-weight: 600;
    margin: 0 0 4px 0;
  }
  
  .section-content {
    color: rgba(255, 255, 255, 0.9);
    font-size: 10px;
    line-height: 1.3;
    margin: 0;
  }
  
  .features-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  .features-list li {
    color: rgba(255, 255, 255, 0.9);
    font-size: 10px;
    line-height: 1.3;
    margin-bottom: 2px;
    padding-left: 12px;
    position: relative;
  }
  
  .features-list li::before {
    content: "•";
    color: #22d3ee;
    position: absolute;
    left: 0;
  }
  
  .back-flip-btn {
    margin-top: auto;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .back-flip-btn:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  /* 🔧 Preferences Mode */
  .preferences-back-arrow {
    position: absolute;
    top: 4px;
    left: 4px;
    z-index: 20;
  }
  
  .back-arrow-btn {
    width: 24px;
    height: 24px;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    transition: all 0.2s ease;
  }
  
  .back-arrow-btn:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  .preferences-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 12px;
  }
  
  .pref-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
  }
  
  .pref-info {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .pref-label {
    color: white;
    font-size: 12px;
    font-weight: 500;
  }
  
  .pref-toggle {
    width: 36px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .pref-toggle.checked {
    background: #22d3ee;
  }
  
  .toggle-slider {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    transition: all 0.2s ease;
  }
  
  .pref-toggle.checked .toggle-slider {
    transform: translateX(16px);
  }
  
  /* 📐 ImageBox (66.66% Ratio) */
  .image-box {
    position: relative;
    width: var(--image-size);
    height: var(--image-size);
    margin-bottom: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
  }
  
  .flipcard-wrapper:hover .image-box {
    transform: scale(1.02);
  }
  
  /* 🎮 4-Corner Button System */
  /* 🎮 4-Corner Button System (bAI Compatible) */
  .corner-buttons-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none; /* Allow clicks through to card */
    z-index: 10;
  }

  .corner-btn {
    position: absolute;
    pointer-events: auto; /* Enable clicks on buttons */
    width: 28px; /* Exact same size for ALL corners */
    height: 28px; /* Exact same size for ALL corners */
    border: none;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px; /* Consistent font size */
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
  
  .corner-btn:hover {
    background: rgba(0, 0, 0, 0.95);
    transform: scale(1.1);
  }
  
  /* ✅ bAI Corner Positions - 4px inset from card edges */
  .corner-btn.top-left {
    top: 4px;
    left: 4px;
  }
  
  .corner-btn.top-right {
    top: 4px;
    right: 4px;
  }
  
  .corner-btn.bottom-left {
    bottom: 4px;
    left: 4px;
  }
  
  .corner-btn.bottom-right {
    bottom: 4px;
    right: 4px;
  }
  
  .corner-btn.favorited {
    background: #ef4444;
    color: white;
  }
  
  .btn-icon {
    display: block;
    line-height: 1;
  }
  
  .flip-icon {
    transition: transform 0.3s ease;
  }
  
  .flip-icon.flipped {
    transform: rotate(180deg);
  }
  
  .cart-indicator {
    position: absolute;
    top: -4px;
    right: -4px;
    background: #10b981;
    color: white;
    font-size: 10px;
    padding: 2px 4px;
    border-radius: 8px;
    line-height: 1;
  }
  
  /* 📝 Typography */
  .text-content {
    text-align: center;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }
  
  .card-title {
    color: white;
    font-weight: 700;
    margin: 0 0 4px 0;
    line-height: 1.1;
    text-align: center;
    letter-spacing: 0.02em;
  }
  
  .card-tagline {
    color: rgba(255, 255, 255, 0.85);
    font-weight: 400;
    margin: 0;
    line-height: 1.2;
    text-align: center;
    opacity: 0.9;
  }
  
  /* 🏷️ Tags Row */
  .tags-row {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: center;
    min-height: 20px;
  }
  
  .tag {
    color: #6b7280;
    font-size: 12px;
    font-weight: 500;
    line-height: 1;
    padding: 0;
    margin: 0;
  }
  
  /* 🎨 Color Palette */
  .color-palette {
    display: flex;
    gap: 4px;
    justify-content: center;
    min-height: 16px;
  }
  
  .color-swatch {
    width: 16px;
    height: 16px;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  
  .color-swatch:hover {
    transform: scale(1.2);
  }
  
  /* 🛠️ Toolbar */
  .toolbar {
    display: flex;
    gap: 4px;
    justify-content: center;
    background: rgba(0, 0, 0, 0.8);
    padding: 8px;
    border-radius: 12px;
    min-height: 40px;
  }
  
  .tool-btn {
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    transition: all 0.2s ease;
  }
  
  .tool-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }
  
  /* ⚡ Buy Button */
  .buy-button {
    width: 100%;
    padding: 12px 24px;
    background: #000000;
    color: white;
    border: none;
    border-radius: 24px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-height: 48px;
  }
  
  .buy-button:hover {
    background: #1f1f1f;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  .buy-button:active {
    transform: translateY(0);
  }
  
  /* 📱 Responsive Scaling */
  @media (max-width: 768px) {
    .flipcard-master {
      gap: 6px;
    }
    
    .corner-btn {
      width: 24px;
      height: 24px;
      font-size: 12px;
    }
    
    .tool-btn {
      width: 28px;
      height: 28px;
      font-size: 12px;
    }
  }
</style>