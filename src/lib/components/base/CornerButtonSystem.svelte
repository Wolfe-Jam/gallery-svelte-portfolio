<!-- 
🎮 CornerButtonSystem.svelte - Reusable 4-Corner Button Component
Centralized corner button logic for all FlipCard implementations
-->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { getCornerOffset, type SizeKey } from '$lib/constants/sizing.js';
  
  const dispatch = createEventDispatcher<{
    settings: void;
    cart: void;
    love: { isLoved: boolean };
    flip: void;
  }>();
  
  // Props
  export let size: SizeKey = 5;
  export let showTooltips: boolean = true;
  export let isFlipped: boolean = false;
  
  // Button states
  export let isLoved: boolean = false;
  export let cartItemAdded: boolean = false;
  export let cartCount: number = 0;
  
  // Button visibility toggles
  export let showSettings: boolean = true;
  export let showCart: boolean = true;
  export let showLove: boolean = true;
  export let showFlip: boolean = true;
  
  // Icon customization
  export let settingsIcon: string = 'i';
  export let cartIcon: string = '+';
  export let flipIcon: string = '🔄';
  
  // Responsive corner positioning using centralized function
  $: cornerOffset = getCornerOffset(size);
  
  // Dynamic love icon
  $: loveIcon = isLoved ? '♥' : '♡';
  
  // Event handlers with stopPropagation to prevent card interactions
  function handleSettings(event: Event) {
    event.stopPropagation();
    dispatch('settings');
  }
  
  function handleCart(event: Event) {
    event.stopPropagation();
    dispatch('cart');
  }
  
  function handleLove(event: Event) {
    event.stopPropagation();
    dispatch('love', { isLoved: !isLoved });
  }
  
  function handleFlip(event: Event) {
    event.stopPropagation();
    dispatch('flip');
  }
</script>

<!-- Only show corner buttons on SIZE 4+ for space reasons -->
{#if size >= 4}
  <div class="corner-buttons-container">
    <!-- TOP-LEFT: Settings/Preferences -->
    {#if showSettings}
      <button 
        class="corner-btn settings-btn" 
        style="top: {cornerOffset}px; left: {cornerOffset}px;"
        on:click={handleSettings}
        aria-label="Settings"
      >
        {settingsIcon}
        {#if showTooltips}
          <div class="corner-tooltip">Settings</div>
        {/if}
      </button>
    {/if}
    
    <!-- TOP-RIGHT: Add to Cart -->
    {#if showCart}
      <button 
        class="corner-btn cart-btn" 
        style="top: {cornerOffset}px; right: {cornerOffset}px;"
        on:click={handleCart}
        class:cart-added={cartItemAdded}
        aria-label="Add to cart"
      >
        {cartIcon}
        {#if cartItemAdded && cartCount > 0}
          <span class="cart-indicator">+{cartCount}</span>
        {:else if cartItemAdded}
          <span class="cart-indicator">✓</span>
        {/if}
        {#if showTooltips}
          <div class="corner-tooltip">Cart</div>
        {/if}
      </button>
    {/if}
    
    <!-- BOTTOM-LEFT: Love/Favorite -->
    {#if showLove}
      <button 
        class="corner-btn heart-btn" 
        style="bottom: {cornerOffset}px; left: {cornerOffset}px;"
        on:click={handleLove}
        class:loved={isLoved}
        aria-label={isLoved ? 'Remove from favorites' : 'Add to favorites'}
      >
        {loveIcon}
        {#if showTooltips}
          <div class="corner-tooltip">{isLoved ? 'Loved' : 'Love'}</div>
        {/if}
      </button>
    {/if}
    
    <!-- BOTTOM-RIGHT: Flip Card -->
    {#if showFlip}
      <button 
        class="corner-btn flip-btn" 
        style="bottom: {cornerOffset}px; right: {cornerOffset}px;"
        on:click={handleFlip}
        class:flipped={isFlipped}
        aria-label="Flip card"
      >
        <span class="flip-icon">{flipIcon}</span>
        {#if showTooltips}
          <div class="corner-tooltip">Flip</div>
        {/if}
      </button>
    {/if}
  </div>
{/if}

<style>
  /* Container - positioned over the entire card */
  .corner-buttons-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none; /* Allow clicks through to card */
    z-index: 10;
    overflow: visible;
  }

  /* Base corner button styling */
  .corner-btn {
    position: absolute;
    pointer-events: auto; /* Re-enable clicks for buttons */
    width: 28px;
    height: 28px;
    border: none;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    user-select: none;
  }

  .corner-btn:hover {
    background: rgba(0, 0, 0, 0.95);
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  }

  .corner-btn:active {
    transform: scale(1.05);
  }

  /* Enhanced cart and settings buttons - balanced middle ground */
  .corner-btn.cart-btn,
  .corner-btn.settings-btn {
    background: rgba(0, 0, 0, 0.9);
    border: 1.5px solid rgba(255, 255, 255, 0.6);
    color: rgba(255, 255, 255, 0.9);
    font-weight: 700;
    font-size: 1rem;
  }

  .corner-btn.cart-btn:hover,
  .corner-btn.settings-btn:hover {
    background: rgba(0, 0, 0, 1);
    border-color: rgba(255, 255, 255, 0.8);
    transform: scale(1.15);
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  }

  /* Heart button love states */
  .corner-btn.heart-btn:not(.loved) {
    color: rgba(255, 255, 255, 0.8);
  }

  .corner-btn.heart-btn.loved {
    color: #ff1744;
    font-size: 0.9rem; /* Slightly larger when loved */
  }

  .corner-btn.heart-btn.loved:hover {
    color: #ff4569;
    transform: scale(1.2);
  }

  /* Cart indicator badge */
  .cart-indicator {
    position: absolute;
    top: -0.25rem;
    right: -0.25rem;
    background: #22c55e;
    color: white;
    border-radius: 50%;
    min-width: 1rem;
    height: 1rem;
    padding: 0 0.125rem;
    font-size: 0.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    box-shadow: 0 2px 4px rgba(34, 197, 94, 0.3);
    line-height: 1;
  }

  /* Flip button - transparent background, floating white icon */
  .corner-btn.flip-btn {
    background: transparent;
    border: none;
    box-shadow: none;
  }

  .corner-btn.flip-btn:hover {
    background: transparent;
    transform: scale(1.1);
    box-shadow: none;
  }

  /* Flip icon animation */
  .flip-icon {
    transition: transform 0.3s ease;
    display: inline-block;
  }

  .flip-btn.flipped .flip-icon {
    transform: rotate(180deg);
  }

  /* UFO Tooltip System - Cyan, Fast, Local */
  .corner-tooltip {
    position: absolute;
    bottom: 2.5rem;
    right: 50%;
    transform: translateX(50%) translateY(0.25rem) scale(0.8);
    background: rgba(0, 0, 0, 0.85);
    color: #00d4ff; /* UFO cyan */
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.6rem;
    font-weight: 700;
    white-space: nowrap;
    opacity: 0;
    transition: all 0.15s ease-out;
    pointer-events: none;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(0, 212, 255, 0.3);
    box-shadow: 0 0 8px rgba(0, 212, 255, 0.2);
    z-index: 25;
    text-shadow: 0 0 4px rgba(0, 212, 255, 0.4);
    letter-spacing: 0.05em;
    text-transform: uppercase; /* TitleCase effect */
  }

  /* UFO tooltip hover states */
  .corner-btn:hover .corner-tooltip {
    opacity: 1;
    transform: translateX(50%) translateY(0) scale(1);
    transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .corner-btn:not(:hover) .corner-tooltip {
    opacity: 0;
    transform: translateX(50%) translateY(0.25rem) scale(0.8);
    transition: all 0.1s ease-in;
  }

  /* Accessibility: Focus states */
  .corner-btn:focus {
    outline: 2px solid #00d4ff;
    outline-offset: 2px;
  }

  .corner-btn:focus:not(:focus-visible) {
    outline: none;
  }

  /* Mobile touch optimization */
  @media (hover: none) and (pointer: coarse) {
    .corner-btn {
      width: 32px;
      height: 32px;
      font-size: 0.9rem;
    }
    
    .corner-tooltip {
      display: none; /* Hide tooltips on touch devices */
    }
  }
</style>