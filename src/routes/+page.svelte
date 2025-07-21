<script lang="ts">
    import Header from '$lib/components/layout/Header.svelte';
    import Footer from '$lib/components/layout/Footer.svelte';
    import Sidebar from '$lib/components/layout/Sidebar.svelte';
    import Modal from '$lib/components/base/Modal.svelte';
    import FlipCard from '$lib/components/marketplace/FlipCard.svelte';
    import UniversalGridSystem from '$lib/components/marketplace/UniversalGridSystem.svelte';
    import { demoProducts } from '$lib/data/demo-products';
    
    let sidebarOpen = $state(false);
    let modalOpen = $state(false);
    let selectedSize = $state(4);
    
    function handleCardClick(productId: string) {
        console.log('Product clicked:', productId);
        // Demo interaction
    }
    
    function handleViewSize8(productId: string) {
        selectedSize = 8;
        console.log('View SIZE-8 for:', productId);
    }
</script>

<Header onmenu-click={() => sidebarOpen = true} />

<Sidebar
    bind:open={sidebarOpen}
    links={[
        { href: '/', label: 'Gallery' },
        { href: '/components', label: 'Components' },
        { href: '/documentation', label: 'Docs' }
    ]}
/>

<main class="main-content">
    <div class="content-wrapper">
        <h1 class="main-title">Gallery Svelte Portfolio</h1>
        <p class="subtitle">Professional UI Components for E-commerce</p>
        
        <div class="size-controls">
            <label>Grid Size: {selectedSize}</label>
            <input type="range" min="1" max="9" bind:value={selectedSize} />
        </div>
        
        <UniversalGridSystem
            items={demoProducts}
            size={selectedSize}
            let:item
        >
            <FlipCard
                product={item}
                size={selectedSize}
                showPrice={true}
                onclick={() => handleCardClick(item.id)}
                onview-size8={() => handleViewSize8(item.id)}
            />
        </UniversalGridSystem>
    </div>
</main>

<Footer />

<style>
    .size-controls {
        margin: 2rem 0;
        padding: 1rem;
        background: var(--color-surface);
        border-radius: 8px;
    }
</style>
