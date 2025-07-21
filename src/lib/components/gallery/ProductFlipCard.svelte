<!--
🔥 FUEL: bAI-Compatible ProductFlipCard
This component can be replaced with bAI FlipCard.svelte directly
-->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { scale } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import ColorEngine from '../base/ColorEngine.svelte';
  import type { Component, BAI_Size, FlipCardTheme } from '$lib/types/bai-compatible.js';
  import { BAI_SIZES, MASTER_SIZE } from '$lib/types/bai-compatible.js';
  
  // bAI-compatible event dispatcher
  const dispatch = createEventDispatcher();
  
  // 🔥 FUEL: bAI-compatible props (exact same interface as theblockchain-ai-svelte)
  export let component: Component;
  export let size: BAI_Size = 5;
  export let theme: FlipCardTheme = 'professional';
  export let displayOnly: boolean = false;
  
  // FUEL: bAI mathematical size system (can be replaced with bAI code)
  $: cardWidth = BAI_SIZES[size];
  $: cardHeight = BAI_SIZES[size];
  $: padding = Math.max(8, Math.round(40 * cardWidth / MASTER_SIZE));
  $: borderRadius = Math.max(4, Math.round(12 * cardWidth / MASTER_SIZE));
  $: titleFontSize = Math.max(12, Math.round(32 * cardWidth / MASTER_SIZE));
  $: taglineFontSize = Math.max(10, Math.round(18 * cardWidth / MASTER_SIZE));
  
  // Component state
  let isFlipped = false;
  let selectedColor = '';
  let currentImageIndex = 0;
  
  // Image cycling for multiple product shots
  $: availableImages = component.gallery?.blank_images || [component.image] || [];
  $: currentImage = availableImages[currentImageIndex] || component.image;
  $: hasMultipleImages = availableImages.length > 1;
  
  // 🔥 FUEL: bAI-compatible themes (can be replaced with bAI theme system)
  const themes = {
    professional: {
      gradient: 'linear-gradient(135deg, #22d3ee, #3b82f6)',
      textColor: '#1f2937',
      cardBg: '#ffffff'
    },
    gallery: {
      gradient: 'linear-gradient(135deg, #004AAE, #0CC0DF)',
      textColor: '#ffffff',
      cardBg: '#1f2937'
    },
    gradient: {
      gradient: component.flip_card_color || 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      textColor: '#ffffff',
      cardBg: '#ffffff'
    }
  };
  
  $: currentTheme = themes[theme] || themes.professional;
  
  // 🔥 FUEL: bAI-compatible transitions (can be replaced with bAI transitions)
  function flipTransition(node: Element, { duration = 600 }) {
    return {
      duration,
      easing: cubicOut,
      css: (t: number) => {
        const isBackSide = node.classList.contains('card-back');
        const rotateY = isBackSide ? 180 - (t * 180) : t * 180;
        return `
          transform: perspective(1000px) rotateY(${rotateY}deg);
          backface-visibility: hidden;
        `;
      }
    };
  }
  
  // 🔥 FUEL: bAI-compatible event handlers (can be replaced with bAI handlers)
  function handleFlip(event?: Event) {
    if (event) event.stopPropagation();
    isFlipped = !isFlipped;
    dispatch('flip', { isFlipped, productId: component.id });
  }
  
  function handleColorSelect(event: CustomEvent) {
    const { color, colorName, compatibility, hextraAnalysis } = event.detail;
    selectedColor = color;
    currentImageIndex = 0; // Reset to first image when color changes
    dispatch('colorSelect', { 
      color, 
      colorName, 
      compatibility, 
      productId: component.id,
      hextraAnalysis 
    });
  }
  
  // Image cycling functions
  function nextImage(event?: Event) {
    if (event) event.stopPropagation();
    if (currentImageIndex < availableImages.length - 1) {
      currentImageIndex++;
    } else {
      currentImageIndex = 0; // Loop back to first
    }
  }
  
  function previousImage(event?: Event) {
    if (event) event.stopPropagation();
    if (currentImageIndex > 0) {
      currentImageIndex--;
    } else {
      currentImageIndex = availableImages.length - 1; // Loop to last
    }
  }
  
  // Smart text for different sizes (bAI pattern)
  $: displayName = size === 1 ? 
    (component.name.includes(' ') ? component.name.split(' ')[0].substring(0, 4) : component.name.substring(0, 4)) :
    size === 2 ?
    (component.name.includes(' ') ? component.name.split(' ')[0].substring(0, 6) : component.name.substring(0, 6)) :
    component.name;
  
  $: displayTagline = size <= 1 ? '' :
    size === 2 ? 'Product' :
    size <= 3 ? 
    (component.consumer_tagline && component.consumer_tagline.length > 10 ?
     component.consumer_tagline.substring(0, 10) : component.consumer_tagline || 'Product') :
    component.consumer_tagline || 'Professional Product';
</script>

<!-- 🔥 FUEL: bAI-compatible FlipCard (this entire structure can be replaced with bAI FlipCard.svelte) -->
<div 
  class="flipcard-wrapper"
  style="width: {cardWidth}px; height: {cardHeight}px;"
  on:click={handleFlip}
  on:keydown={(e) => e.key === 'Enter' && handleFlip()}
  role="button"
  tabindex="0"
>
  {#if isFlipped}
    <!-- Back Side -->
    <div 
      class="flipcard-side card-back"
      style="
        background: {currentTheme.cardBg};
        border-radius: {borderRadius}px;
        padding: {padding}px;
      "
      transition:scale={{duration: 600}}
      on:click|stopPropagation
    >
      <div class="back-content" style="color: {theme === 'gallery' ? '#ffffff' : '#1f2937'};">
        <h3 style="font-size: {titleFontSize}px; margin: 0 0 {padding/2}px 0;">
          Color Options
        </h3>
        
        <!-- 🔧 ENGINE: Color Intelligence (Gallery-specific, not in bAI) -->
        <ColorEngine 
          product={component}
          {size}
          bind:selectedColor
          hextraEnabled={true}
          on:colorSelect={handleColorSelect}
        />
        
        <!-- bAI-compatible pricing display -->
        {#if size >= 4 && !displayOnly}
          <div class="pricing-info" style="
            margin-top: {padding}px;
            font-size: {Math.max(10, Math.round(12 * cardWidth / MASTER_SIZE))}px;
            text-align: center;
          ">
            <div>Individual: ${(component.price_individual / 100).toFixed(0)}</div>
            <div>Team: ${(component.price_team / 100).toFixed(0)}</div>
            <div>Enterprise: ${(component.price_enterprise / 100).toFixed(0)}</div>
          </div>
        {/if}
        
        <!-- HEXTRA Enhancement Badge -->
        <div class="hextra-enhancement" style="
          position: absolute;
          bottom: {padding/2}px;
          right: {padding/2}px;
          background: linear-gradient(45deg, #FF914D, #FF6B35);
          border-radius: 8px;
          padding: 2px 8px;
          font-size: {Math.max(8, Math.round(10 * cardWidth / MASTER_SIZE))}px;
          font-weight: bold;
          color: white;
        ">
          AI Enhanced
        </div>
      </div>
    </div>
  {:else}
    <!-- Front Side -->
    <div 
      class="flipcard-side card-front"
      style="
        background: {currentTheme.gradient};
        border-radius: {borderRadius}px;
        padding: {padding}px;
        color: {currentTheme.textColor};
      "
      transition:flipTransition={{duration: 600}}
    >
      <!-- Product Image Area (2/3 of space) -->
      <div class="image-area" style="
        width: 100%;
        height: {Math.round((cardHeight - (padding * 2)) * 0.67)}px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: {borderRadius/2}px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: {padding/2}px;
        position: relative;
      ">
        {#if currentImage}
          <img 
            src={currentImage} 
            alt="{component.name} - View {currentImageIndex + 1}"
            style="
              max-width: 100%;
              max-height: 100%;
              object-fit: cover;
              border-radius: {borderRadius/2}px;
            "
          />
          
          <!-- Image Navigation for multiple shots -->
          {#if hasMultipleImages && size >= 4}
            <div class="image-nav" style="
              position: absolute;
              bottom: 4px;
              left: 50%;
              transform: translateX(-50%);
              display: flex;
              align-items: center;
              gap: 4px;
              background: rgba(0, 0, 0, 0.7);
              border-radius: 12px;
              padding: 2px 8px;
            ">
              <button 
                on:click={previousImage}
                style="
                  background: none;
                  border: none;
                  color: white;
                  font-size: {Math.max(10, Math.round(14 * cardWidth / MASTER_SIZE))}px;
                  cursor: pointer;
                  padding: 2px;
                "
              >◀</button>
              
              <span style="
                color: white;
                font-size: {Math.max(8, Math.round(10 * cardWidth / MASTER_SIZE))}px;
                min-width: 20px;
                text-align: center;
              ">
                {currentImageIndex + 1}/{availableImages.length}
              </span>
              
              <button 
                on:click={nextImage}
                style="
                  background: none;
                  border: none;
                  color: white;
                  font-size: {Math.max(10, Math.round(14 * cardWidth / MASTER_SIZE))}px;
                  cursor: pointer;
                  padding: 2px;
                "
              >▶</button>
            </div>
          {/if}
          
          <!-- Small dot indicator for multiple images on tiny cards -->
          {#if hasMultipleImages && size <= 2}
            <div style="
              position: absolute;
              top: 4px;
              right: 4px;
              width: 6px;
              height: 6px;
              background: rgba(255, 255, 255, 0.8);
              border-radius: 50%;
              border: 1px solid rgba(0, 0, 0, 0.3);
            "></div>
          {/if}
        {:else}
          <div style="
            width: 60%;
            height: 60%;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: {Math.max(16, Math.round(48 * cardWidth / MASTER_SIZE))}px;
          ">
            🎨
          </div>
        {/if}
      </div>
      
      <!-- Text Area (1/3 of space) -->
      <div class="text-area" style="
        height: {Math.round((cardHeight - (padding * 2)) * 0.33)}px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
      ">
        <h3 style="
          font-size: {titleFontSize}px;
          font-weight: 600;
          margin: 0;
          line-height: 1.2;
        ">
          {displayName}
        </h3>
        
        {#if displayTagline && size > 1}
          <p style="
            font-size: {taglineFontSize}px;
            opacity: 0.9;
            margin: {padding/4}px 0 0 0;
            line-height: 1.3;
          ">
            {displayTagline}
          </p>
        {/if}
        
        {#if size >= 3}
          <p style="
            font-size: {Math.max(8, Math.round(12 * cardWidth / MASTER_SIZE))}px;
            opacity: 0.7;
            margin: {padding/4}px 0 0 0;
          ">
            {hasMultipleImages ? `${availableImages.length} photos • Click to see colors` : 'Click to see colors'}
          </p>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .flipcard-wrapper {
    perspective: 1000px;
    cursor: pointer;
    position: relative;
    margin: 10px;
  }
  
  .flipcard-side {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .back-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  
  .pricing-info {
    opacity: 0.8;
  }
  
  .pricing-info div {
    margin: 2px 0;
  }
</style>
