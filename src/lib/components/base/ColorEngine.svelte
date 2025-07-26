<!--
🔧 ENGINE: Color Intelligence Engine (Never Changes)
HEXTRA color science integration
-->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Component, BAI_Size } from '$lib/types/bai-compatible.js';
  import { BAI_SIZES, MASTER_SIZE } from '$lib/types/bai-compatible.js';
  import { logger } from '$lib/logger.js';
  
  const dispatch = createEventDispatcher();
  
  // Engine props (stable interface)
  export let product: Component;
  export let size: BAI_Size = 5;
  export let selectedColor: string = '';
  export let hextraEnabled: boolean = true;
  
  // Color intelligence calculations (ENGINE logic)
  $: cardSize = BAI_SIZES[size];
  $: swatchSize = Math.max(8, Math.round(40 * cardSize / MASTER_SIZE));
  $: gridCols = size <= 2 ? 2 : size <= 4 ? 3 : size <= 6 ? 4 : 5;
  $: gap = Math.max(2, Math.round(8 * cardSize / MASTER_SIZE));
  
  // HEXTRA Color Science (ENGINE) - WITH ERROR HANDLING
  async function analyzeColorCompatibility(color: string): Promise<number> {
    try {
      // Validate color input
      if (!color || !color.startsWith('#') || color.length !== 7) {
        logger.warn('Invalid color format:', color);
        return 75; // Default safe compatibility score
      }
      
      // TODO: Replace with real HEXTRA API call
      // For now, use deterministic algorithm instead of random
      const hex = color.substring(1);
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      
      // Simple print quality algorithm based on color saturation and brightness
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      const saturation = Math.max(r, g, b) - Math.min(r, g, b);
      
      // Higher saturation and mid-range brightness = better print quality
      const quality = Math.min(100, 
        (saturation / 255 * 60) + // Saturation component (0-60)
        (brightness > 128 ? (255 - brightness) / 255 * 40 : brightness / 255 * 40) // Brightness component (0-40)
      );
      
      return Math.round(quality);
    } catch (error) {
      logger.error('Color analysis failed:', error);
      return 50; // Safe fallback
    }
  }
  
  function getColorName(hex: string): string {
    try {
      // Enhanced color name detection with error handling
      if (!hex || !hex.startsWith('#')) {
        return 'Unknown Color';
      }
      
      const colorNames: Record<string, string> = {
        '#FFFFFF': 'White',
        '#000000': 'Black', 
        '#FF0000': 'Red',
        '#00FF00': 'Green',
        '#0000FF': 'Blue',
        '#FF914D': 'HEXTRA Orange',
        '#004AAE': 'HEXTRA Blue',
        '#0CC0DF': 'HEXTRA Cyan',
        '#FFFF00': 'Yellow',
        '#FF00FF': 'Magenta',
        '#00FFFF': 'Cyan',
        '#800080': 'Purple',
        '#FFA500': 'Orange',
        '#008000': 'Dark Green',
        '#800000': 'Maroon',
        '#808080': 'Gray'
      };
      
      const upperHex = hex.toUpperCase();
      return colorNames[upperHex] || upperHex;
    } catch (error) {
      logger.error('Color name detection failed:', error);
      return hex || 'Unknown';
    }
  }
  
  async function handleColorSelect(color: string) {
    try {
      selectedColor = color;
      
      // HEXTRA color analysis with error handling
      const compatibility = await analyzeColorCompatibility(color);
      const colorName = getColorName(color);
      
      dispatch('colorSelect', {
        color,
        colorName,
        compatibility,
        productId: product.id,
        hextraAnalysis: {
          printQuality: compatibility,
          recommendation: compatibility > 80 ? 'excellent' : compatibility > 60 ? 'good' : 'fair',
          hextraEnhanced: hextraEnabled,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      logger.error('Color selection failed:', error);
      
      // Dispatch error event
      dispatch('colorError', {
        color,
        error: error.message,
        productId: product.id
      });
      
      // Still dispatch basic event as fallback
      dispatch('colorSelect', {
        color,
        colorName: getColorName(color),
        compatibility: 50,
        productId: product.id,
        hextraAnalysis: {
          printQuality: 50,
          recommendation: 'fair',
          hextraEnhanced: false,
          error: 'Analysis failed'
        }
      });
    }
  }
  
  // Enhanced color data (ENGINE)
  $: enhancedColors = (product.colors || []).map(color => ({
    hex: color,
    name: getColorName(color),
    compatibility: analyzeColorCompatibility(color),
    selected: color === selectedColor
  }));
</script>

<!-- Color Intelligence Interface -->
<div class="color-engine" style="
  width: 100%;
  display: grid;
  grid-template-columns: repeat({gridCols}, 1fr);
  gap: {gap}px;
  justify-items: center;
  align-items: center;
  position: relative;
">
  {#each enhancedColors as colorData}
    <button
      class="color-swatch"
      class:selected={colorData.selected}
      class:high-quality={colorData.compatibility > 80}
      style="
        width: {swatchSize}px;
        height: {swatchSize}px;
        background-color: {colorData.hex};
        border-radius: 50%;
        border: 2px solid {colorData.selected ? '#004AAE' : 'rgba(255, 255, 255, 0.8)'};
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        position: relative;
      "
      on:click={() => handleColorSelect(colorData.hex)}
      on:mouseenter={(e) => e.target.style.transform = 'scale(1.1)'}
      on:mouseleave={(e) => e.target.style.transform = 'scale(1)'}
      title="{colorData.name} - Quality: {Math.round(colorData.compatibility)}%"
    >
      <!-- Quality indicator -->
      {#if hextraEnabled && colorData.compatibility > 90}
        <div class="quality-indicator">⭐</div>
      {/if}
    </button>
  {/each}
  
  <!-- HEXTRA Enhancement Badge -->
  {#if hextraEnabled}
    <div class="hextra-badge" style="
      position: absolute;
      bottom: -{gap * 2}px;
      right: 0;
      background: linear-gradient(45deg, #004AAE, #0CC0DF);
      border-radius: 12px;
      padding: 4px 12px;
      font-size: {Math.max(8, Math.round(12 * cardSize / MASTER_SIZE))}px;
      font-weight: bold;
      color: white;
      display: flex;
      gap: 4px;
      align-items: center;
      box-shadow: 0 2px 8px rgba(0, 74, 174, 0.3);
    ">
      <span>HEXTRA</span>
      <span style="opacity: 0.8;">Enhanced</span>
    </div>
  {/if}
</div>

<!-- Selected Color Analysis -->
{#if selectedColor && hextraEnabled}
  <div class="color-analysis" style="
    margin-top: {gap * 2}px;
    padding: {Math.max(8, Math.round(16 * cardSize / MASTER_SIZE))}px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    text-align: center;
    font-size: {Math.max(10, Math.round(14 * cardSize / MASTER_SIZE))}px;
  ">
    <div class="selected-color-info">
      <strong>{getColorName(selectedColor)}</strong>
      <br>
      <span style="opacity: 0.8;">
        Print Quality: {Math.round(analyzeColorCompatibility(selectedColor))}%
      </span>
    </div>
  </div>
{/if}

<style>
  .color-swatch {
    position: relative;
    overflow: visible;
  }
  
  .color-swatch.selected {
    box-shadow: 0 0 0 3px #004AAE, 0 4px 12px rgba(0, 74, 174, 0.3);
  }
  
  .color-swatch.high-quality::after {
    content: '';
    position: absolute;
    top: -2px;
    right: -2px;
    width: 8px;
    height: 8px;
    background: #22c55e;
    border-radius: 50%;
    border: 1px solid white;
  }
  
  .quality-indicator {
    position: absolute;
    top: -8px;
    right: -8px;
    font-size: 12px;
    background: #fbbf24;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
  }
  
  .color-analysis {
    border: 1px solid rgba(0, 74, 174, 0.2);
  }
  
  .selected-color-info {
    color: #374151;
  }
</style>
