<!-- 🏆 FlipCard.svelte - Svelte 5 Runes Masterpiece -->
<!-- 
  🎯 LEGENDARY SVELTE 5 PATTERNS:
  ✅ $state() for reactive state management
  ✅ $derived() for computed values  
  ✅ $effect() for side effects
  ✅ $props() for modern prop declarations
  ✅ Modern event handling without createEventDispatcher
  ✅ Performance-optimized with mathematical precision
  
  Built to showcase 5⭐ Svelte craftsmanship to the Svelte team!
-->
<script lang="ts">
  import { goto } from '$app/navigation';
  import { scale } from 'svelte/transition';
  import { elasticOut, cubicOut } from 'svelte/easing';
  import type { Component } from '$lib/types/bai-compatible.js';
  import { flipcardPreferences, flipcardPreferencesActions } from '$lib/stores/flipcardPreferences';
  import { BAI_SIZES, MASTER_SIZE, getImageBoxSize, getCornerOffset, getTopPadding, type SizeKey } from '$lib/constants/sizing.js';
  import CornerButtonSystem from '$lib/components/base/CornerButtonSystem.svelte';
  
  // Directional flip transitions - forward (→) and backward (←)
  function flipTransitionForward(node: Element, { duration = 800 }: { duration?: number } = {}) {
    return {
      duration,
      easing: cubicOut,
      css: (t: number) => {
        const isBackSide = node.classList.contains('flipcard-back');
        
        if (isBackSide) {
          // Back side: incoming from right (180° → 0°)
          const rotateY = 180 - (t * 180);
          return `
            transform: perspective(1200px) rotateY(${rotateY}deg);
            backface-visibility: hidden;
          `;
        } else {
          // Front side: outgoing to right (0° → 180°)
          const rotateY = t * 180;
          return `
            transform: perspective(1200px) rotateY(${rotateY}deg);
            backface-visibility: hidden;
          `;
        }
      }
    };
  }
  
  function flipTransitionBackward(node: Element, { duration = 800 }: { duration?: number } = {}) {
    return {
      duration,
      easing: cubicOut,
      css: (t: number) => {
        const isBackSide = node.classList.contains('flipcard-back');
        
        if (isBackSide) {
          // Back side: outgoing to left (0° → -180°, matching ← arrow)
          const rotateY = -(t * 180);
          return `
            transform: perspective(1200px) rotateY(${rotateY}deg);
            backface-visibility: hidden;
          `;
        } else {
          // Front side: incoming from left (-180° → 0°)
          const rotateY = -180 + (t * 180);
          return `
            transform: perspective(1200px) rotateY(${rotateY}deg);
            backface-visibility: hidden;
          `;
        }
      }
    };
  }
  
  // 🚀 SVELTE 5 RUNES: Universal FlipCard Props
  type Props = {
    component: Component;
    theme?: 'professional' | 'wallet' | 'neon' | 'gradient' | 'solid';
    displayOnly?: boolean;
    size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9; // Mathematical SIZE everywhere!
    iconType?: 'checkmark' | 'custom' | 'component';
    customIconSvg?: string;
    // 🎨 Universal Content System
    overlayImage?: string;     // ANY overlay (logo, watermark, badge, icon)
    showOverlay?: boolean;     // Toggle overlay on/off
    overlayPosition?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    // Reset control
    resetTrigger?: number;     // Increment to trigger reset to front view
    // Modern event callbacks
    onflip?: (detail: { side: 'front' | 'back' }) => void;
    onbuy?: (detail: { component: Component; tier: 'individual' | 'team' | 'enterprise' }) => void;
    'onadd-to-cart'?: (detail: { component: Component; count: number }) => void;
    'ontoggle-love'?: (detail: { component: Component; isLoved: boolean }) => void;
    'onview-size8'?: (detail: { component: Component }) => void;
  };
  
  let {
    component,
    theme = 'professional',
    displayOnly = false,
    size = 5,
    iconType = 'checkmark',
    customIconSvg,
    overlayImage,
    showOverlay = false,
    overlayPosition = 'center',
    resetTrigger = 0,
    onflip,
    onbuy,
    'onadd-to-cart': onAddToCart,
    'ontoggle-love': onToggleLove,
    'onview-size8': onViewSize8
  }: Props = $props();
  
  // 🚀 SVELTE 5 RUNES: Reactive State Management
  let showPreferencesOnBack = $state(false); // Show preferences instead of regular content
  let isFlipped = $state(false);
  let showTitleTooltip = $state(false);
  let cardElement = $state<HTMLDivElement>();
  
  // Handle VIEW SIZE-8 functionality
  function handleViewSize8() {
    if (onViewSize8) {
      onViewSize8({ component });
    }
  }
  
  
  // 🎮 4-CORNER BUTTON SYSTEM STATE
  let isLoved = $state(false);
  let cartItemAdded = $state(false);
  let cartCount = $state(0);
  
  // 🎯 4-CORNER BUTTON FUNCTIONS
  
  // TOP-LEFT: Settings/Preferences
  function openPreferences() {
    console.log('openPreferences called, current isFlipped:', isFlipped);
    showPreferencesOnBack = true;
    if (!isFlipped) {
      isFlipped = true; // Flip to back to show preferences
    }
  }
  
  // TOP-RIGHT: Add to Cart with modern event handling
  function addToCart(event: Event) {
    event.stopPropagation();
    cartItemAdded = true;
    cartCount++;
    
    // 🚀 SVELTE 5: Modern event callback pattern
    onAddToCart?.({ 
      component: component,
      count: cartCount 
    });
    
    // Visual feedback with cleanup
    setTimeout(() => {
      cartItemAdded = false;
    }, 2000);
  }
  
  // BOTTOM-LEFT: Love/Favorite with modern event handling
  function toggleLove(event: Event) {
    event.stopPropagation();
    isLoved = !isLoved;
    
    // 🚀 SVELTE 5: Modern event callback pattern
    onToggleLove?.({ 
      component: component,
      isLoved: isLoved 
    });
  }
  
  // BOTTOM-RIGHT: Flip Card with modern event handling
  function toggleFlip(event: Event) {
    event.stopPropagation();
    isFlipped = !isFlipped;
    showPreferencesOnBack = false; // Reset preferences view
    
    // Modern event callback pattern
    onflip?.({ side: isFlipped ? 'back' : 'front' });
  }
  
  // ✅ Using centralized SIZE system from /lib/constants/sizing.ts
  
  // CRITICAL PROPORTIONS WITH PADDING: 
  // - Card has 5% padding for framing (black border effect)
  // - Content area uses 2/3 gradient + 1/3 text proportions
  // - At SIZE-5: ~17px padding + 2/3 and 1/3 of remaining ~299px
  const IMAGE_BOX_RATIO = 2/3; // EXACT: 66.66% for gradient box
  
  // 🧠 SVELTE 5 RUNES: Smart text truncation with derived state
  let displayName = $derived(size === 1 ? 
    (component.name.includes(' ') ? component.name.split(' ')[0].substring(0, 4) : component.name.substring(0, 4)) :
    size === 2 ? 
    (component.name.includes(' ') ? component.name.split(' ')[0].substring(0, 6) : component.name.substring(0, 6)) :
    component.name
  );
  
  let displayTagline = $derived(size === 1 ? 
    '' : // No tagline for SIZE-1 (too small)
    size === 2 ?
    'Tool' : // Simple tagline for SIZE-2
    size <= 3 ? 
    (component.consumer_tagline && component.consumer_tagline.length > 10 ? 
      component.consumer_tagline.substring(0, 10) : 
      component.consumer_tagline || 'Tool') :
    component.consumer_tagline || 'Professional Component'
  );
  // 📏 SVELTE 5 RUNES: Mathematical precision with derived calculations
  let currentSize = $derived(isFlipped ? Math.max(size, 5) : size); // Back side minimum SIZE-5 for comfortable reading
  let cardWidth = $derived(BAI_SIZES[currentSize as SizeKey]);
  let cardHeight = $derived(BAI_SIZES[currentSize as SizeKey]);
  
  // 🎯 SVELTE 5 RUNES: Exact bAI calculations with mathematical precision
  let imageBoxSize = $derived(getImageBoxSize(currentSize as SizeKey)); // EXACT: 333 * 2/3 = 222px
  let topPadding = $derived(getTopPadding()); // Fixed 16px top padding (1rem)
  let sidePadding = $derived(Math.round(cardWidth * 0.05)); // 5% padding for framing
  let remainingHeight = $derived(cardHeight - imageBoxSize - topPadding); // Space left for text
  let textAreaHeight = $derived(Math.max(remainingHeight, 20)); // Text area with minimum height
  
  // 📱 SVELTE 5 RUNES: Responsive scaling with mathematical precision
  let cornerOffset = $derived(getCornerOffset(currentSize as SizeKey)); // Scale with card size, min 4px
  
  // Scale elements based on card size - optimized for readability at all sizes
  let titleFontSize = $derived(Math.max(8, Math.round(32 * cardWidth / MASTER_SIZE))); // Min 8px, scales to 32px at SIZE-5
  let taglineFontSize = $derived(Math.max(6, Math.round(18 * cardWidth / MASTER_SIZE))); // Min 6px, scales to 18px at SIZE-5
  let borderRadius = $derived(Math.round(16 * cardWidth / MASTER_SIZE));
  let imageBoxRadius = $derived(Math.round(12 * cardWidth / MASTER_SIZE));
  
  // Theme configurations
  const themes = {
    professional: {
      gradient: 'from-cyan-400 to-blue-500',
      cardBg: '#000000',
      textColor: '#ffffff'
    },
    wallet: {
      gradient: 'from-orange-400 to-red-500',
      cardBg: '#000000',
      textColor: '#ffffff'
    },
    neon: {
      gradient: 'from-purple-500 to-pink-500',
      cardBg: '#000000',
      textColor: '#ffffff'
    },
    gradient: {
      gradient: 'from-blue-400 to-cyan-500',
      cardBg: '#000000',
      textColor: '#ffffff'
    },
    solid: {
      gradient: 'from-gray-600 to-gray-800',
      cardBg: '#000000',
      textColor: '#ffffff'
    }
  };
  
  // Get theme configuration
  function getThemeForComponent() {
    if (component.flip_card_color) {
      // Handle custom gradient colors (from designer)
      const customGradient = component.flip_card_color;
      
      // Extract hex colors from gradient string
      const hexMatches = customGradient.match(/#[0-9a-f]{6}/gi) || [];
      if (hexMatches.length >= 2) {
        return {
          gradient: customGradient,
          gradientColors: hexMatches,
          cardBg: '#000000',
          textColor: '#ffffff'
        };
      }
      
      // Handle Tailwind gradient format like "from-cyan-400 to-blue-500"
      if (customGradient.includes('from-') && customGradient.includes('to-')) {
        // Convert Tailwind classes to CSS gradient
        const colorMap: Record<string, string> = {
          'cyan-400': '#22d3ee',
          'blue-500': '#3b82f6',
          'orange-400': '#fb923c',
          'red-500': '#ef4444',
          'purple-500': '#a855f7',
          'pink-500': '#ec4899'
        };
        
        const fromMatch = customGradient.match(/from-([a-z]+-\d+)/);
        const toMatch = customGradient.match(/to-([a-z]+-\d+)/);
        
        if (fromMatch && toMatch) {
          const fromColor = colorMap[fromMatch[1]] || '#22d3ee';
          const toColor = colorMap[toMatch[1]] || '#3b82f6';
          
          return {
            gradient: customGradient,
            gradientColors: [fromColor, toColor],
            cardBg: '#000000',
            textColor: '#ffffff'
          };
        }
      }
    }
    
    switch(component.category) {
      case 'payment-processing':
        return themes.wallet;
      case 'data-visualization':
        return themes.neon;
      case 'authentication':
        return themes.gradient;
      default:
        return themes[theme] || themes.professional;
    }
  }
  
  // 🎨 SVELTE 5 RUNES: Dynamic theme calculation
  let currentTheme = $derived(getThemeForComponent());
  
  // Icon SVGs
  const iconSvgs = {
    checkmark: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 12l2 2 4-4"></path>
        <circle cx="12" cy="12" r="10"></circle>
      </svg>
    `,
    component: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <rect x="7" y="7" width="3" height="3"></rect>
        <rect x="14" y="7" width="3" height="3"></rect>
        <rect x="7" y="14" width="3" height="3"></rect>
        <rect x="14" y="14" width="3" height="3"></rect>
      </svg>
    `,
    payment: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
      </svg>
    `,
    refresh: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
        <path d="M3 3v5h5"></path>
        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
        <path d="M21 21v-5h-5"></path>
      </svg>
    `
  };
  
  // Get appropriate icon
  function getComponentIcon(): string {
    if (customIconSvg) return customIconSvg;
    
    if (component.category === 'payment-processing') {
      return iconSvgs.payment;
    }
    
    switch (iconType) {
      case 'custom':
        return customIconSvg || iconSvgs.checkmark;
      case 'component':
        return iconSvgs.component;
      case 'checkmark':
      default:
        return iconSvgs.checkmark;
    }
  }
  
  // Calculate color contrast for better color selection
  function getColorContrast(color1: string, color2: string): number {
    // Convert hex to RGB and calculate relative luminance
    function getLuminance(hex: string): number {
      const rgb = parseInt(hex.replace('#', ''), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = rgb & 0xff;
      
      // Convert to relative luminance
      const rs = r / 255;
      const gs = g / 255;
      const bs = b / 255;
      
      const rLinear = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
      const gLinear = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
      const bLinear = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);
      
      return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
    }
    
    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  }
  
  // Extract colors in meaningful order: Background, Title, Best 3 from gradient
  function extractColors(gradient: string): string[] {
    const orderedColors = [];
    
    // 1. Background color of card (black in default example)
    orderedColors.push(currentTheme.cardBg);
    
    // 2. Title color (white in default example)  
    orderedColors.push(currentTheme.textColor);
    
    // 3-5. Extract best 3 colors from gradient using contrast analysis
    const gradientColors = [];
    
    // Extract colors from gradient
    if (currentTheme.gradientColors) {
      gradientColors.push(...currentTheme.gradientColors);
    } else {
      // Extract from gradient string
      const hexMatches = gradient.match(/#[0-9a-f]{6}/gi) || [];
      const matches = gradient.match(/(#[0-9a-f]{6}|[a-z]+-\d+)/gi) || [];
      
      const colorMap: Record<string, string> = {
        'cyan-400': '#22d3ee',
        'blue-500': '#3b82f6',
        'orange-400': '#fb923c',
        'red-500': '#ef4444',
        'purple-500': '#a855f7',
        'pink-500': '#ec4899'
      };
      
      // Add hex colors first
      gradientColors.push(...hexMatches);
      
      // Then add mapped colors
      for (const match of matches) {
        if (!match.startsWith('#') && colorMap[match]) {
          gradientColors.push(colorMap[match]);
        }
      }
    }
    
    // Generate variations and analyze contrast for best selection
    const candidateColors = [...gradientColors];
    
    // Add variations of gradient colors
    for (const baseColor of gradientColors) {
      candidateColors.push(adjustColor(baseColor, 40));   // Lighter
      candidateColors.push(adjustColor(baseColor, -40));  // Darker
      candidateColors.push(adjustColor(baseColor, 80));   // Much lighter
      candidateColors.push(adjustColor(baseColor, -80));  // Much darker
    }
    
    // Remove duplicates and colors too similar to background/title
    const uniqueColors = candidateColors.filter((color, index, self) => {
      return self.indexOf(color) === index &&
             color !== currentTheme.cardBg &&
             color !== currentTheme.textColor &&
             getColorContrast(color, currentTheme.cardBg) > 1.5; // Ensure some contrast
    });
    
    // Sort by contrast against background for best utility
    const bestColors = uniqueColors
      .map(color => ({
        color,
        contrast: getColorContrast(color, currentTheme.cardBg)
      }))
      .sort((a, b) => b.contrast - a.contrast) // Highest contrast first
      .slice(0, 3) // Take best 3
      .map(item => item.color);
    
    // Add the 3 best contrasting colors
    orderedColors.push(...bestColors);
    
    // Ensure we always have 5 colors
    while (orderedColors.length < 5) {
      orderedColors.push('#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'));
    }
    
    return orderedColors.slice(0, 5);
  }
  
  // Helper to adjust color brightness
  function adjustColor(hex: string, amount: number): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
    const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  }
  
  // 🌈 SVELTE 5 RUNES: Color intelligence and tag processing
  let extractedColors = $derived(extractColors(currentTheme.gradient || ''));
  let visibleTags = $derived(component.tags?.slice(0, 3).map(tag => `#${tag}`) || ['#component', '#svelte', '#pro']);
  
  // ✨ SVELTE 5 RUNES: Side effects and lifecycle management
  $effect(() => {
    // Performance optimization: Log size changes for analytics
    console.log(`FlipCard ${component.name} rendered at SIZE-${size} (${cardWidth}px)`);
  });
  
  $effect(() => {
    // Accessibility: Announce flip state changes to screen readers
    if (cardElement) {
      cardElement.setAttribute('aria-label', 
        `${component.name} card, currently showing ${isFlipped ? 'details' : 'preview'}`
      );
    }
  });
  
  $effect(() => {
    // Performance: Cleanup cart animation state
    if (cartItemAdded) {
      const timeoutId = setTimeout(() => cartItemAdded = false, 2000);
      return () => clearTimeout(timeoutId);
    }
  });

  $effect(() => {
    // Reset flip state when resetTrigger changes
    if (resetTrigger > 0) {
      isFlipped = false;
      showPreferencesOnBack = false;
    }
  });
  
  // 🔄 SVELTE 5: Modern flip function with event callback
  function handleFlip() {
    console.log('handleFlip called, current isFlipped:', isFlipped);
    isFlipped = !isFlipped;
    
    // Reset preferences view when flipping back to front
    if (!isFlipped) {
      showPreferencesOnBack = false;
    }
    
    // Modern event callback pattern
    onflip?.({ side: isFlipped ? 'back' : 'front' });
  }
  
  // 💳 SVELTE 5: Modern buy function with event callback
  function handleBuyNow(e: Event, tier: 'individual' | 'team' | 'enterprise') {
    e.stopPropagation();
    onbuy?.({ component, tier });
  }
  
  
  function handleDemo(e: Event) {
    e.stopPropagation();
    const demoSlug = component.slug || component.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    goto(`/marketplace/demo/${demoSlug}`);
  }
  
  function handleDetails(e: Event) {
    e.stopPropagation();
    const productSlug = component.slug || component.id;
    goto(`/marketplace/products/${productSlug}`);
  }
  
  function formatPrice(cents: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(cents / 100);
  }
  
</script>

<!-- 🎨 FLIPCARD WITH CORRECT LAYOUT -->
<div class="flipcard-container" style="width: {cardWidth}px;">
  
  <!-- Main FlipCard with Svelte Transitions -->
  <div 
    class="flipcard-wrapper"
    style="width: {cardWidth}px; height: {cardHeight}px;"
    bind:this={cardElement}
  >
    {#if isFlipped}
      <!-- Back Side - Visible when flipped -->
      <div 
        class="flipcard-side flipcard-back" 
        style="
          background-color: {currentTheme.cardBg};
          border-radius: {borderRadius}px;
          padding: {sidePadding}px;
        " 
        onclick={(e) => e.stopPropagation()}
        transition:flipTransitionForward={{ duration: 800 }}
      >
        <!-- 🎮 CORNER BUTTON SYSTEM (Back Side) - ONLY SIZE 4+ -->
        {#if !displayOnly}
          <CornerButtonSystem 
            size={size as SizeKey}
            {isLoved}
            {cartItemAdded}
            cartCount={cartCount}
            showTooltips={$flipcardPreferences.showTooltips}
            showFlip={false}
            on:settings={openPreferences}
            on:cart={addToCart}
            on:love={toggleLove}
          />
        {/if}
        
        <div class="flipcard-back-content" class:preferences-mode={showPreferencesOnBack}>
          {#if showPreferencesOnBack}
            <!-- BACK ARROW for preferences navigation - ONLY SIZE 4+ -->
            {#if size >= 4}
              <div class="preferences-back-arrow">
                <button 
                  class="back-arrow-btn" 
                  onclick={(e) => { 
                    e.stopPropagation();
                    showPreferencesOnBack = false; 
                    isFlipped = false; 
                  }}
                  title="Back to FlipCard"
                >
                  ←
                </button>
              </div>
            {/if}
            
            <!-- Live Status (at very top) -->
            <div class="live-status">
              <div class="pulse-dot"></div>
              <span class="tech-text">LIVE_SYNC >> all.flipcards.global()</span>
            </div>
            
            <!-- Compact Preferences Interface (No Title) -->
            <div class="preferences-sections">
              <!-- Tags Toggle (matches order below FlipCard) -->
              <div class="pref-section">
                <div class="pref-info">
                  <span class="pref-icon">#️⃣</span>
                  <span class="pref-label">Tags</span>
                </div>
                <div 
                  class="flip-toggle" 
                  class:checked={$flipcardPreferences.showTags}
                  onclick={() => flipcardPreferencesActions.toggle('showTags')}
                >
                  <span class="toggle-slider"></span>
                </div>
              </div>
              
              <!-- Color Palette Toggle -->
              <div class="pref-section">
                <div class="pref-info">
                  <span class="pref-icon">🎨</span>
                  <span class="pref-label">Color Palette</span>
                </div>
                <div 
                  class="flip-toggle" 
                  class:checked={$flipcardPreferences.showPalette}
                  onclick={() => flipcardPreferencesActions.toggle('showPalette')}
                >
                  <span class="toggle-slider"></span>
                </div>
              </div>
              
              <!-- Buy Button Toggle -->
              <div class="pref-section">
                <div class="pref-info">
                  <span class="pref-icon">💳</span>
                  <span class="pref-label">Buy Button</span>
                </div>
                <div 
                  class="flip-toggle" 
                  class:checked={$flipcardPreferences.showBuyButton}
                  onclick={() => flipcardPreferencesActions.toggle('showBuyButton')}
                >
                  <span class="toggle-slider"></span>
                </div>
              </div>
              
              <!-- Toolbar Toggle -->
              <div class="pref-section">
                <div class="pref-info">
                  <span class="pref-icon">🔧</span>
                  <span class="pref-label">Toolbar</span>
                </div>
                <div 
                  class="flip-toggle" 
                  class:checked={$flipcardPreferences.showToolbar}
                  onclick={() => flipcardPreferencesActions.toggle('showToolbar')}
                >
                  <span class="toggle-slider"></span>
                </div>
              </div>
              
              <!-- Tooltips Toggle -->
              <div class="pref-section">
                <div class="pref-info">
                  <span class="pref-icon">💬</span>
                  <span class="pref-label">Tooltips</span>
                </div>
                <div 
                  class="flip-toggle" 
                  class:checked={$flipcardPreferences.showTooltips}
                  onclick={() => flipcardPreferencesActions.toggle('showTooltips')}
                >
                  <span class="toggle-slider"></span>
                </div>
              </div>
            </div>
          {:else}
            <!-- Regular Component Information -->
            <h3 class="back-title" style="color: {currentTheme.textColor};">
              {displayName}
            </h3>
            
            <div class="back-sections">
              <!-- Overview Section -->
              <div class="back-section">
                <h4 class="section-title">📋 Overview</h4>
                <p class="section-content">
                  {component.description || 'Professional component for modern web applications.'}
                </p>
              </div>
              
              <!-- Technical Details -->
              <div class="back-section">
                <h4 class="section-title">📋 Technical Details</h4>
                <ul class="tech-list">
                  {#each component.tech_stack || [] as tech}
                    <li>{tech}</li>
                  {/each}
                </ul>
              </div>
              
              <!-- Features -->
              <div class="back-section">
                <h4 class="section-title">📋 Key Features</h4>
                <ul class="features-list">
                  {#each component.developer_features?.slice(0, 4) || [] as feature}
                    <li>{feature}</li>
                  {/each}
                </ul>
              </div>
              
              <!-- Action Buttons -->
              {#if !displayOnly}
                <div class="back-actions">
                  <button class="action-btn demo" onclick={handleDemo}>
                    👁️ View Demo
                  </button>
                  <button class="action-btn details" onclick={handleDetails}>
                    📄 Details
                  </button>
                </div>
              {/if}
            </div>
          {/if}
        </div>
        
        <!-- Flip UFO on Back Side (bottom right - for return navigation) - ONLY SIZE 4+ -->
        {#if !displayOnly && size >= 4}
          <div 
            class="flip-arrows-container" 
            style="bottom: {cornerOffset}px; right: {cornerOffset}px;"
            onclick={(e) => { e.stopPropagation(); handleFlip(); }}
            onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleFlip(); } }}
            role="button" 
            tabindex="0"
          >
            <div 
              class="flip-arrows" 
              title="FlipCard Back"
              transition:scale={{ duration: 400, easing: elasticOut }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 12h18"></path>
                <path d="M13 18l6-6-6-6"></path>
                <path d="M11 6l-6 6 6 6"></path>
              </svg>
            </div>
            
            <!-- FlipCard Tooltip -->
            {#if $flipcardPreferences.showTooltips}
              <div class="tardis-tooltip">
                FlipCard
              </div>
            {/if}
          </div>
        {/if}
      </div>
    {:else}
      <!-- Front Side - Visible when not flipped -->
      <div 
        class="flipcard-side flipcard-front" 
        style="
          background-color: {size <= 2 ? 'transparent' : currentTheme.cardBg};
          border-radius: {size <= 2 ? 0 : borderRadius}px;
          padding-top: {size <= 2 ? 0 : topPadding}px;
          padding-left: 0;
          padding-right: 0;
          padding-bottom: 0;
          display: flex;
          flex-direction: column;
        "
        transition:flipTransitionBackward={{ duration: 800 }}
      >
        <!-- 🎮 CORNER BUTTON SYSTEM (Front Side) - ONLY SIZE 4+ -->
        {#if !displayOnly}
          <CornerButtonSystem 
            size={size as SizeKey}
            {isLoved}
            {cartItemAdded}
            cartCount={cartCount}
            showTooltips={$flipcardPreferences.showTooltips}
            showFlip={false}
            isFlipped={isFlipped}
            on:settings={openPreferences}
            on:cart={addToCart}
            on:love={toggleLove}
            on:flip={toggleFlip}
          />
        {/if}
        
        <!-- Product Image Box - Real Photos First, Gradient Fallback, Universal Overlay Support + SlideCard -->
        <div 
          class="image-box" 
          style="
            width: {size <= 2 ? cardWidth : imageBoxSize}px;
            height: {size <= 2 ? cardHeight : imageBoxSize}px;
            border-radius: {size <= 2 ? borderRadius : imageBoxRadius}px;
            margin: 0 auto;
            overflow: hidden;
            position: relative;
            cursor: pointer;
          "
          title="VIEW SIZE-8"
          onclick={handleViewSize8}
        >
          {#if component.image || component.image_url || component.product_image || component.thumbnail_url}
            <!-- REAL PRODUCT PHOTO (e.g., Bella Canvas 3001 Tee) -->
            <img 
              src={component.image || component.image_url || component.product_image || component.thumbnail_url} 
              alt={component.name || 'Product Image'}
              class="product-photo"
              style="
                width: 100%;
                height: 100%;
                object-fit: cover;
              "
              onerror={(e) => {
                // Fallback to gradient on image load error
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling.style.display = 'flex';
              }}
            />
            <!-- Gradient Fallback (hidden by default) -->
            <div 
              class="gradient-fallback"
              style="
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, {currentTheme.gradientColors ? currentTheme.gradientColors.join(', ') : currentTheme.gradient.replace('from-', '').replace(' to-', ', ')});
                display: none;
                align-items: center;
                justify-content: center;
              "
            >
              <div 
                class="fallback-icon"
                style="
                  width: {Math.round(imageBoxSize * 0.4)}px;
                  height: {Math.round(imageBoxSize * 0.4)}px;
                  color: rgba(255, 255, 255, 0.8);
                "
              >
                {@html getComponentIcon()}
              </div>
            </div>
          {:else}
            <!-- Pure Gradient Fallback (when no image available) -->
            <div 
              class="gradient-fallback"
              style="
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, {currentTheme.gradientColors ? currentTheme.gradientColors.join(', ') : currentTheme.gradient.replace('from-', '').replace(' to-', ', ')});
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <div 
                class="fallback-icon"
                style="
                  width: {Math.round(imageBoxSize * 0.4)}px;
                  height: {Math.round(imageBoxSize * 0.4)}px;
                  color: rgba(255, 255, 255, 0.8);
                "
              >
                {@html getComponentIcon()}
              </div>
            </div>
          {/if}
          
          <!-- 🎨 UNIVERSAL OVERLAY SYSTEM - Any Image Content (Logo, Watermark, Badge, Icon) -->
          {#if showOverlay && overlayImage}
            <div 
              class="universal-overlay"
              style="
                position: absolute;
                {overlayPosition === 'center' ? 'top: 50%; left: 50%; transform: translate(-50%, -50%);' : ''}
                {overlayPosition === 'top-left' ? 'top: 8px; left: 8px;' : ''}
                {overlayPosition === 'top-right' ? 'top: 8px; right: 8px;' : ''}
                {overlayPosition === 'bottom-left' ? 'bottom: 8px; left: 8px;' : ''}
                {overlayPosition === 'bottom-right' ? 'bottom: 8px; right: 8px;' : ''}
                max-width: {Math.round(imageBoxSize * 0.6)}px;
                max-height: {Math.round(imageBoxSize * 0.6)}px;
                pointer-events: none;
                z-index: 10;
              "
            >
              <img 
                src={overlayImage} 
                alt="Overlay"
                class="overlay-image"
                style="
                  max-width: 100%;
                  max-height: 100%;
                  object-fit: contain;
                  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
                "
                onerror={(e) => {
                  // Hide overlay if image fails to load
                  e.currentTarget.parentElement.style.display = 'none';
                }}
              />
            </div>
          {/if}
          
        </div>
        
        <!-- Text Area with proper padding (1/3 of card height with smart minimums) + Click to Flip -->
        <!-- SIZE 1 & 2: Image-only mode - no text content -->
        {#if size > 2}
        <div class="text-content" 
          style="
            height: {Math.max(size === 1 ? 16 : size === 2 ? 20 : 24, textAreaHeight)}px;
            padding: 0 {Math.round(cardWidth * 0.08)}px;
          "
          onclick={!displayOnly && size >= 4 ? handleFlip : undefined}
          role={!displayOnly && size >= 4 ? "button" : undefined}
          tabindex={!displayOnly && size >= 4 ? "0" : undefined}
          onkeydown={!displayOnly && size >= 4 ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleFlip(); } } : undefined}
          title={!displayOnly && size >= 4 ? "Click to flip card" : undefined}
        >
          <h3 class="card-title" 
              style="
                color: {currentTheme.textColor};
                font-size: {Math.round(titleFontSize * 0.85)}px;
                font-family: {component.titleFont || 'Roboto'}, -apple-system, sans-serif;
                font-weight: {component.titleWeight || 600};
                margin-bottom: {size <= 2 && displayTagline ? '1px' : '0'};
              "
              onmouseenter={() => {
                if (component.name.length > 20) showTitleTooltip = true;
              }}
              onmouseleave={() => showTitleTooltip = false}
          >
            {displayName}
            
            <!-- Large Readability Tooltip -->
            {#if showTitleTooltip}
              <div class="title-readability-tooltip">
                {component.name}
              </div>
            {/if}
          </h3>
          {#if displayTagline}
            <p class="card-tagline" style="
              color: {currentTheme.textColor};
              font-size: {taglineFontSize}px;
              opacity: 0.9;
              font-family: {component.taglineFont || 'Roboto'}, -apple-system, sans-serif;
              font-weight: {component.taglineWeight || 500};
              margin: 0;
            ">
              {displayTagline}
            </p>
          {/if}
        </div>
        {/if}
        
        <!-- Flip UFO on Front Side (bottom right - for flip navigation) - ONLY SIZE 4+ -->
        {#if !displayOnly && size >= 4}
          <div 
            class="flip-arrows-container" 
            style="bottom: {cornerOffset}px; right: {cornerOffset}px;"
            onclick={(e) => { e.stopPropagation(); handleFlip(); }}
            onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleFlip(); } }}
            role="button" 
            tabindex="0"
          >
            <div 
              class="flip-arrows" 
              title="FlipCard Back"
              transition:scale={{ duration: 400, easing: elasticOut }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 12h18"></path>
                <path d="M13 18l6-6-6-6"></path>
                <path d="M11 6l-6 6 6 6"></path>
              </svg>
            </div>
            
            <!-- FlipCard Tooltip -->
            {#if $flipcardPreferences.showTooltips}
              <div class="tardis-tooltip">
                FlipCard
              </div>
            {/if}
          </div>
        {/if}
        
      </div>
    {/if}
  </div>
  
  <!-- Simple Tags - Directly Below Card -->
  {#if $flipcardPreferences.showTags && !displayOnly && size >= 4}
    <div class="simple-tags">
      {#each visibleTags as tag}
        <span class="simple-tag">{tag}</span>
      {/each}
    </div>
  {/if}
  
  <!-- Color Palette Component - ONLY SIZE 5+ -->
  {#if $flipcardPreferences.showPalette && !displayOnly && size >= 5}
    <div class="color-swatches-container">
      {#each extractedColors as color}
        <div class="color-swatch" style="background-color: {color}">
          {#if $flipcardPreferences.showTooltips}
            <div class="tardis-tooltip color-tooltip">{color.toUpperCase()}</div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
  
  <!-- ⚡️ ORIGINAL BUY BUTTON (Simple & Clean) - Hidden at SIZE-1,2,3 -->
  {#if $flipcardPreferences.showBuyButton && !displayOnly && size >= 4}
    <button 
      class="original-buy-btn" 
      onclick={(e) => handleBuyNow(e, 'individual')}
    >
      ⚡ BUY
    </button>
  {/if}
  
  <!-- Toolbar - ONLY SIZE 4+ (Bottom Position) -->
  {#if $flipcardPreferences.showToolbar && !displayOnly && size >= 4}
    <div class="toolbar">
      <button onclick={(e) => e.stopPropagation()}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          <path d="M12,11L16,15H13V19H11V15H8L12,11Z"/>
        </svg>
        {#if $flipcardPreferences.showTooltips}
          <div class="tardis-tooltip toolbar-tooltip">Download</div>
        {/if}
      </button>
      <button onclick={(e) => e.stopPropagation()}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z"/>
        </svg>
        {#if $flipcardPreferences.showTooltips}
          <div class="tardis-tooltip toolbar-tooltip">Share</div>
        {/if}
      </button>
      <button onclick={(e) => e.stopPropagation()}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z"/>
        </svg>
        {#if $flipcardPreferences.showTooltips}
          <div class="tardis-tooltip toolbar-tooltip">Link</div>
        {/if}
      </button>
      <button onclick={(e) => e.stopPropagation()}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"/>
        </svg>
        {#if $flipcardPreferences.showTooltips}
          <div class="tardis-tooltip toolbar-tooltip">View</div>
        {/if}
      </button>
    </div>
  {/if}
  
</div>

<style>
  .flipcard-container {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    gap: 8px; /* Consistent 8px spacing between all elements */
    isolation: isolate; /* Create new stacking context */
    align-items: center; /* Center all child elements */
  }
  
  .flipcard-wrapper {
    position: relative;
    cursor: pointer;
    perspective: 1200px;
    transform-style: preserve-3d;
    z-index: 1; /* Ensure card doesn't overlap components below */
    margin: 0 auto; /* Center the card */
  }
  
  .flipcard-side {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: inherit;
    backface-visibility: hidden;
    transform-origin: center center;
    transform-style: preserve-3d;
    box-sizing: border-box; /* Ensure consistent sizing */
    transition: background-color 0.3s ease, border-radius 0.3s ease, padding 0.3s ease; /* Smooth SIZE 2↔3 transitions */
  }
  
  /* 🎮 CORNER BUTTON SYSTEM - Now handled by CornerButtonSystem component */
  
  /* Flip Arrows (bottom right discovery element) */
  .flip-arrows-container {
    position: absolute;
    /* Position set by inline style to match cornerOffset */
    z-index: 5;
  }
  
  .flip-arrows {
    width: 1.25rem;
    height: 1.25rem;
    color: rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease;
    animation: flipHint 3s infinite;
    pointer-events: auto; /* Allow clicks to pass through to wrapper */
    cursor: pointer;
  }
  
  .flip-arrows svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
  }
  
  @keyframes flipHint {
    0%, 85%, 100% { 
      opacity: 0.8;
      transform: scale(1);
    }
    90%, 95% { 
      opacity: 1;
      transform: scale(1.1);
    }
  }
  
  /* TARDIS Tooltip - Minimal UFO Style */
  .tardis-tooltip {
    position: absolute;
    bottom: 2rem;
    right: -0.25rem;
    background: rgba(0, 0, 0, 0.85);
    color: #00d4ff;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.6rem;
    font-weight: 700;
    white-space: nowrap;
    opacity: 0;
    transform: translateY(0.25rem) scale(0.8);
    transition: all 0.15s ease-out;
    pointer-events: none;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(0, 212, 255, 0.3);
    box-shadow: 0 0 8px rgba(0, 212, 255, 0.2);
    z-index: 25;
    text-shadow: 0 0 4px rgba(0, 212, 255, 0.4);
    letter-spacing: 0.05em;
  }
  
  /* No arrow - clean minimal look */
  
  /* UFO hover triggers tooltip with quick poof effect */
  .flip-arrows-container:hover .tardis-tooltip {
    opacity: 1;
    transform: translateY(0) scale(1);
    transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  /* Quick vanish when hover ends */
  .flip-arrows-container:not(:hover) .tardis-tooltip {
    opacity: 0;
    transform: translateY(0.25rem) scale(0.8);
    transition: all 0.1s ease-in;
  }
  
  .flip-arrows-container:hover .flip-arrows {
    opacity: 1;
    transform: scale(1.15);
    animation: none;
    filter: drop-shadow(0 0 6px rgba(0, 212, 255, 0.3));
  }
  
  /* Corner Button Tooltips - Now handled by CornerButtonSystem component */
  
  /* Color Swatch Tooltips - Enhanced with Roboto Mono Bold */
  .color-tooltip {
    bottom: 3rem !important;
    left: 50% !important;
    right: auto !important;
    transform: translateX(-50%) translateY(0.25rem) scale(0.8) !important;
    /* Enhanced styling */
    background: rgba(0, 0, 0, 0.95) !important;
    color: #ffffff !important;
    font-family: 'Roboto Mono', 'Monaco', 'Consolas', monospace !important;
    font-weight: 700 !important;
    font-size: 0.8rem !important;
    padding: 0.5rem 0.75rem !important;
    border-radius: 0.375rem !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    letter-spacing: 0.025em !important;
  }
  
  
  .color-swatch:hover .color-tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1) !important;
    transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  .color-swatch:not(:hover) .color-tooltip {
    opacity: 0;
    transform: translateX(-50%) translateY(0.25rem) scale(0.8) !important;
    transition: all 0.1s ease-in;
  }
  
  /* Toolbar Button Tooltips */
  .toolbar-tooltip {
    bottom: 2.5rem !important;
    left: 50% !important;
    right: auto !important;
    transform: translateX(-50%) translateY(0.25rem) scale(0.8) !important;
  }
  
  .toolbar button {
    position: relative; /* Need this for tooltip positioning */
  }
  
  .toolbar button:hover .toolbar-tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1) !important;
    transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  .toolbar button:not(:hover) .toolbar-tooltip {
    opacity: 0;
    transform: translateX(-50%) translateY(0.25rem) scale(0.8) !important;
    transition: all 0.1s ease-in;
  }
  
  /* Product Image Box - Real Photos Priority + SlideCard Click */
  .image-box {
    flex-shrink: 0;
    display: block;
    position: relative;
    background: var(--color-bg-secondary); /* Subtle background while image loads */
    transition: width 0.3s ease, height 0.3s ease, border-radius 0.3s ease; /* Smooth SIZE 2↔3 dimension transitions */
  }
  
  /* Make image box clickable for SlideCard */
  .image-box[role="button"] {
    cursor: pointer;
  }
  
  .image-box[role="button"]:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  .product-photo {
    transition: transform 0.2s ease;
    border-radius: inherit;
  }
  
  .product-photo:hover {
    transform: scale(1.02);
  }
  
  .gradient-fallback {
    border-radius: inherit;
  }
  
  .fallback-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.8;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }
  
  .fallback-icon svg {
    width: 100%;
    height: 100%;
  }
  
  /* 🎴 SlideCard Diagonal Arrow Indicator ↘️ */
  .slide-arrow-indicator {
    position: absolute;
    bottom: 8px;
    right: 8px;
    font-size: 1.5rem;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: scale(0.8);
    animation: slideArrowPulse 2s ease-in-out infinite;
    transition: all 0.3s ease;
    pointer-events: none;
    z-index: 15;
    backdrop-filter: blur(4px);
    border: 2px solid rgba(255, 255, 255, 0.3);
  }
  
  .image-box:hover .slide-arrow-indicator {
    opacity: 1;
    transform: scale(1);
    animation: none;
  }
  
  @keyframes slideArrowPulse {
    0%, 100% { 
      opacity: 0.7;
      transform: scale(0.9);
    }
    50% { 
      opacity: 1;
      transform: scale(1.1);
    }
  }
  
  /* Text Content Below Gradient - FULL WIDTH + Clickable */
  .text-content {
    text-align: center;
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0; /* Remove horizontal padding for full width */
    min-height: 0; /* Allow shrinking */
    overflow: hidden; /* Prevent text overflow from breaking layout */
    transition: all 0.2s ease; /* Smooth hover effects */
  }
  
  /* Make text area feel clickable when interactive */
  .text-content[role="button"] {
    cursor: pointer;
    border-radius: 4px; /* Subtle rounding for click area */
  }
  
  .text-content[role="button"]:hover {
    background: rgba(255, 255, 255, 0.05); /* Subtle hover background */
    transform: translateY(-1px); /* Slight lift on hover */
  }
  
  .text-content[role="button"]:active {
    transform: translateY(0); /* Return to normal on click */
  }
  
  .card-title {
    font-weight: 700; /* Bolder for prominence */
    margin: 0; /* Margin controlled inline based on size */
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.0; /* Tighter line height for small cards */
    text-align: center;
    letter-spacing: 0.02em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; /* Prevent text wrapping that causes cutoff */
    position: relative; /* For tooltip positioning */
    cursor: default; /* Normal cursor by default */
  }
  
  .card-title:hover {
    cursor: default; /* Normal cursor - no question mark */
  }

  /* Large Readability Tooltip - Black background, white text */
  .title-readability-tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-8px);
    background: rgba(0, 0, 0, 0.95);
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    white-space: normal;
    word-wrap: break-word;
    max-width: 200px;
    text-align: center;
    z-index: 30;
    pointer-events: none;
    
    /* Smooth appearance */
    opacity: 0;
    animation: tooltipFadeIn 0.2s ease-out forwards;
    
    /* Drop shadow for readability */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    
    /* Arrow pointing down */
    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 5px solid transparent;
      border-top-color: rgba(0, 0, 0, 0.95);
    }
  }

  @keyframes tooltipFadeIn {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(-8px);
    }
  }
  
  .card-tagline {
    font-weight: 400; /* Lighter weight for contrast */
    margin: 0;
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.1; /* Tighter line height for small cards */
    text-align: center;
    opacity: 0.85;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; /* Prevent text wrapping that causes cutoff */
    cursor: default; /* Normal cursor to match title */
  }
  
  /* Back Arrow for Preferences Navigation */
  .preferences-back-arrow {
    position: absolute;
    top: 4px;
    left: 4px;
    z-index: 20;
  }

  .back-arrow-btn {
    width: 28px;
    height: 28px;
    border: none;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .back-arrow-btn:hover {
    background: rgba(0, 0, 0, 1);
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  }

  /* Back Side Styles - FULL WIDTH */
  .flipcard-back-content {
    height: 100%;
    overflow-y: overlay; /* Use overlay scrollbar to prevent width changes */
    color: white;
    padding: 0; /* Remove any padding for full width */
  }
  
  /* Fallback for browsers that don't support overlay */
  @supports not (overflow-y: overlay) {
    .flipcard-back-content {
      overflow-y: auto;
      /* Add negative margin to compensate for scrollbar */
      margin-right: -15px;
      padding-right: 15px;
    }
  }
  
  /* Special case: No scroll for preferences interface only */
  .flipcard-back-content.preferences-mode {
    overflow: hidden;
  }
  
  /* Dark Scrollbars - Thin to minimize layout shift */
  .flipcard-back-content::-webkit-scrollbar {
    width: 4px; /* Thinner scrollbar */
  }
  
  .flipcard-back-content::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  
  .flipcard-back-content::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
    transition: all 0.2s;
  }
  
  .flipcard-back-content::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  
  /* Firefox scrollbar styling */
  .flipcard-back-content {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1);
  }
  
  .back-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 1rem;
    text-align: center;
  }
  
  .back-sections {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .back-section {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    padding: 0.75rem;
  }
  
  .section-title {
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    color: white;
  }
  
  .section-content {
    font-size: 0.875rem;
    line-height: 1.5;
    margin: 0;
    color: rgba(255, 255, 255, 0.9);
  }
  
  .tech-list,
  .features-list {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.9);
  }
  
  .tech-list li,
  .features-list li {
    padding: 0.25rem 0;
  }
  
  .tech-list li::before {
    content: '🔧 ';
  }
  
  .features-list li::before {
    content: '✓ ';
  }
  
  .back-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  
  .action-btn {
    flex: 1;
    padding: 0.5rem;
    border: none;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
  
  .action-btn:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  /* Component Styles */
  .color-swatches-container {
    display: flex;
    gap: 0.375rem;
    justify-content: center;
    align-items: center;
    padding: 0; /* Remove extra padding - use container gap */
  }
  
  .color-swatch {
    width: 3.125rem;  /* 5:4 ratio width (2.5rem × 5/4) */
    height: 2.5rem;   /* Same height as ❤️ button */
    border-radius: 0.375rem;
    transition: all 0.2s ease;
    border: 1px solid rgba(0, 0, 0, 0.1); /* Subtle dark outline for light colors */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative; /* For tooltip positioning */
  }
  
  .color-swatch:hover {
    transform: translateY(-1px) scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    border-color: rgba(0, 0, 0, 0.2); /* Slightly stronger outline on hover */
  }
  
  /* Simple Tags - Clean Text Only */
  .simple-tags {
    display: flex;
    gap: 0.5rem;
    padding: 0; /* Remove extra padding - use container gap */
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .simple-tag {
    color: var(--color-text-secondary);
    font-size: 0.75rem;
    font-weight: 500;
    font-family: 'Inter', -apple-system, sans-serif;
    transition: color 0.2s ease;
  }
  
  .simple-tag:hover {
    color: #475569;
  }
  
  .toolbar {
    display: flex;
    gap: 0.5rem;
    padding: 0; /* Remove extra padding - use container gap */
    background: transparent;
    justify-content: center;
    align-items: center;
  }
  
  .toolbar button {
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;
    padding: 0.125rem;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 0.125rem;
  }
  
  .toolbar button svg {
    width: 100%;
    height: 100%;
    color: #71717a;
    stroke-width: 2;
    filter: drop-shadow(0 1px 1px rgba(0,0,0,0.1));
  }
  
  .toolbar button:hover svg {
    color: var(--color-text);
    transform: scale(1.05);
  }
  
  /* ⚡️ ORIGINAL BUY BUTTON (Simple & Clean) */
  .original-buy-btn {
    width: 100px; /* Reduced width for SIZE-4 */
    padding: 0.5rem 1rem; /* Reduced padding for SIZE-4 */
    background: var(--color-action);
    color: white;
    border: none;
    border-radius: 1.25rem;
    font-size: 0.875rem; /* Smaller font for SIZE-4 */
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    margin: 0.5rem 0 0 0; /* 0.5rem top margin for breathing room */
  }

  .original-buy-btn:hover {
    background: var(--color-action-hover);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .original-buy-btn:active {
    transform: translateY(0);
  }

  /* Dark mode support for other components */
  
  :global(.dark) .simple-tag {
    color: #94a3b8;
  }
  
  :global(.dark) .simple-tag:hover {
    color: #cbd5e1;
  }
  
  :global(.dark) .favorite-btn {
    background: #1f2937;
    border-color: #374151;
  }
  
  :global(.dark) .favorite-btn:hover {
    border-color: #ef4444;
    background: #7f1d1d;
  }
  
  /* Responsive adjustments */
  @media (max-width: 640px) {
    .pricing-tiers {
      flex-direction: column;
    }
    
    .price-btn {
      width: 100%;
    }
  }
  
  /* Preferences Interface Styles */
  .preferences-sections {
    display: flex;
    flex-direction: column;
    gap: 0.5rem; /* Reduced gap for tighter fit */
    padding: 0.5rem 0;
    flex: 1; /* Take remaining space after live-status */
    justify-content: space-evenly; /* Evenly distribute sections */
  }
  
  .pref-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.75rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0.375rem;
    transition: all 0.2s;
  }
  
  .pref-section:hover {
    background: rgba(255, 255, 255, 0.15);
  }
  
  .pref-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .pref-icon {
    font-size: 1rem;
    width: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .pref-label {
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.8rem;
    font-weight: 500;
  }
  
  /* FlipCard Toggle Switch */
  .flip-toggle {
    position: relative;
    display: inline-block;
    width: 2.25rem;
    height: 1.125rem;
    cursor: pointer;
  }
  
  .toggle-slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 1.125rem;
    transition: 0.3s;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .toggle-slider:before {
    position: absolute;
    content: "";
    height: 0.875rem;
    width: 0.875rem;
    left: 0.125rem;
    bottom: 0.125rem;
    background: white;
    border-radius: 50%;
    transition: 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .flip-toggle.checked .toggle-slider {
    background: rgba(59, 130, 246, 0.8);
    border-color: rgba(59, 130, 246, 0.6);
  }
  
  .flip-toggle.checked .toggle-slider:before {
    transform: translateX(1.125rem);
  }
  
  .toggle-slider:hover {
    background: rgba(255, 255, 255, 0.4);
  }
  
  .flip-toggle.checked .toggle-slider:hover {
    background: rgba(59, 130, 246, 0.9);
  }
  
  /* Live Status */
  .live-status {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.375rem;
    margin-bottom: 0.5rem; /* Space below instead of above */
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.8);
    flex-shrink: 0; /* Don't shrink */
  }
  
  .tech-text {
    font-family: 'Roboto Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-weight: 500;
    letter-spacing: 0.025em;
    color: #10b981;
    text-shadow: 0 0 8px rgba(16, 185, 129, 0.3);
  }
  
  .pulse-dot {
    width: 5px;
    height: 5px;
    background: #10b981;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { 
      opacity: 1;
      transform: scale(1);
    }
    50% { 
      opacity: 0.7;
      transform: scale(1.2);
    }
  }
  
  /* 🎴 SLIDECARD EXPANSION STYLES */
  .slidecard-expanded {
    overflow: visible !important;
  }
  
  .slidecard-details-panel {
    position: absolute;
    top: 0;
    right: -300px;
    width: 280px;
    height: 100%;
    background: linear-gradient(135deg, var(--color-industrial-dark) 0%, var(--color-industrial-blue) 100%);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    animation: slideInRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border: 1px solid rgba(34, 211, 238, 0.2);
  }
  
  .details-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(34, 211, 238, 0.2);
  }
  
  .details-header h3 {
    color: #22d3ee;
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }
  
  .close-slidecard {
    background: none;
    border: none;
    color: #94a3b8;
    font-size: 20px;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s ease;
  }
  
  .close-slidecard:hover {
    background: rgba(34, 211, 238, 0.1);
    color: #22d3ee;
  }
  
  .details-content .tagline {
    color: #cbd5e1;
    font-size: 14px;
    margin-bottom: 16px;
    line-height: 1.4;
  }
  
  .price-tier {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 20px;
  }
  
  .price-tier .price {
    color: #22d3ee;
    font-size: 24px;
    font-weight: 700;
  }
  
  .price-tier .tier {
    color: #94a3b8;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .features-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .feature {
    color: #e2e8f0;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .slidecard-bottom-panel {
    position: absolute;
    bottom: -150px;
    left: 0;
    width: 100%;
    height: 130px;
    background: linear-gradient(135deg, var(--color-industrial-dark) 0%, var(--color-industrial-blue) 100%);
    border-radius: 12px;
    animation: slideInBottom 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border: 1px solid rgba(34, 211, 238, 0.2);
    overflow: hidden;
  }
  
  .bottom-tabs {
    display: flex;
    border-bottom: 1px solid rgba(34, 211, 238, 0.2);
  }
  
  .tab {
    background: none;
    border: none;
    color: #94a3b8;
    padding: 12px 20px;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .tab.active {
    color: #22d3ee;
    background: rgba(34, 211, 238, 0.1);
  }
  
  .tab:hover {
    color: #22d3ee;
  }
  
  .bottom-content {
    padding: 16px;
  }
  
  .color-gallery {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  
  .color-variant {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .color-variant:hover {
    transform: scale(1.1);
    border-color: #22d3ee;
    box-shadow: 0 4px 8px rgba(34, 211, 238, 0.3);
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideInBottom {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>