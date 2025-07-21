<!-- 🔥 FUEL: FlipCard Test Arena - Gallery vs bAI -->
<script lang="ts">
  console.log('🔥 FlipCard test page loading...');
  
  import type { Component } from '$lib/types/bai-compatible.js';
  
  // Import bAI FlipCard only
  import FlipCard from '$lib/components/marketplace/FlipCard.svelte';
  console.log('✅ bAI FlipCard imported successfully');
  
  // Test component data
  const testComponent: Component = {
    id: 'test-flipcard-001',
    name: 'Advanced Payment Gateway',
    description: 'Professional payment processing component with Stripe integration, fraud detection, and multi-currency support.',
    consumer_tagline: 'Secure payments made simple',
    category: 'payment-processing',
    price_individual: 2900, // $29.00
    price_team: 9900, // $99.00 
    price_enterprise: 29900, // $299.00
    flip_card_color: 'linear-gradient(135deg, #22d3ee, #3b82f6)',
    tags: ['payment', 'stripe', 'security'],
    tech_stack: ['Svelte', 'TypeScript', 'Stripe API'],
    developer_features: [
      'Multi-currency support',
      'Fraud detection', 
      'PCI compliance',
      'Real-time validation'
    ],
    image: null,
    slug: 'advanced-payment-gateway'
  };
  
  let currentSize: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 = 5;
  let currentTheme: 'professional' | 'wallet' | 'neon' | 'gradient' | 'solid' = 'professional';
  
  console.log('✅ Test component created:', testComponent);
  console.log('🔍 Tags:', testComponent.tags);
</script>

<svelte:head>
  <title>🔥 bAI FlipCard Test Arena</title>
</svelte:head>

<div style="padding: 2rem; background: #1e293b; color: white; min-height: 100vh;">
  <header style="text-align: center; margin-bottom: 3rem;">
    <h1 style="font-size: 3rem; margin: 0; background: linear-gradient(135deg, #22d3ee, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
      🔥 bAI FlipCard Test Arena
    </h1>
    <p>Professional marketplace FlipCard with advanced features</p>
  </header>
  
  <!-- Size Controls -->
  <div style="display: flex; justify-content: center; margin-bottom: 2rem; gap: 0.5rem;">
    <label style="color: #22d3ee; margin-right: 1rem;">SIZE:</label>
    {#each [1,2,3,4,5,6,7,8,9] as size}
      <button 
        style="
          padding: 0.5rem 1rem; 
          border: 2px solid {currentSize === size ? '#22d3ee' : 'rgba(34, 211, 238, 0.3)'};
          background: {currentSize === size ? 'rgba(34, 211, 238, 0.2)' : 'rgba(34, 211, 238, 0.1)'};
          color: white; 
          border-radius: 0.5rem; 
          cursor: pointer;
        "
        on:click={() => currentSize = size}
      >
        {size}
      </button>
    {/each}
  </div>
  
  <!-- Single bAI FlipCard Display -->
  <div style="display: flex; justify-content: center; margin-bottom: 2rem;">
    <!-- bAI FlipCard Only -->
    <div style="background: rgba(255, 255, 255, 0.05); border-radius: 1rem; padding: 2rem; text-align: center; min-width: 500px;">
      <h2 style="color: #22d3ee;">🚀 bAI FlipCard</h2>
      <p style="opacity: 0.8; margin-bottom: 2rem;">Full marketplace implementation with advanced features</p>
      
      <div style="display: flex; justify-content: center; align-items: flex-start; min-height: 500px; overflow: visible; padding-top: 2rem;">
        <FlipCard 
          component={testComponent}
          size={currentSize}
          theme={currentTheme}
        />
      </div>
    </div>
  </div>
  
  <!-- Instructions -->
  <div style="background: rgba(255, 255, 255, 0.05); border-radius: 1rem; padding: 2rem;">
    <h2 style="text-align: center; color: #22d3ee; margin-bottom: 1rem;">🎮 Testing Guide</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
      <div style="background: rgba(0, 0, 0, 0.2); border-radius: 0.5rem; padding: 1rem;">
        <h3 style="color: #22d3ee; margin: 0 0 0.5rem;">1. SIZE Testing</h3>
        <p style="margin: 0; line-height: 1.5;">Try sizes 1-9. Notice SIZE-5 is baseline (333px).</p>
      </div>
      <div style="background: rgba(0, 0, 0, 0.2); border-radius: 0.5rem; padding: 1rem;">
        <h3 style="color: #22d3ee; margin: 0 0 0.5rem;">2. bAI Features (SIZE 4+)</h3>
        <p style="margin: 0; line-height: 1.5;"><strong>Corner Buttons:</strong> ⓘ settings, 🛒 cart, ♥ favorites, UFO flip</p>
      </div>
      <div style="background: rgba(0, 0, 0, 0.2); border-radius: 0.5rem; padding: 1rem;">
        <h3 style="color: #22d3ee; margin: 0 0 0.5rem;">3. Global Preferences</h3>
        <p style="margin: 0; line-height: 1.5;">Click ⓘ to toggle: palette, tags, toolbar, buy button</p>
      </div>
    </div>
  </div>
</div>
