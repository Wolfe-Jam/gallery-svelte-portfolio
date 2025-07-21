<script lang="ts">
  import { BAI_SIZES, getOptimalColumns } from '$lib/constants/sizing';
  
  interface Props {
    items: any[];
    size?: number;
    gap?: number;
    children?: any;
  }
  
  let { items = [], size = 4, gap = 16, children }: Props = $props();
  
  const columns = $derived(getOptimalColumns(size));
  const gridStyle = $derived(`
    display: grid;
    grid-template-columns: repeat(${columns}, 1fr);
    gap: ${gap}px;
  `);
</script>

<div class="universal-grid" style={gridStyle}>
  {#each items as item}
    {@render children?.(item)}
  {/each}
</div>

<style>
  .universal-grid {
    width: 100%;
    padding: 1rem;
  }
  
  @media (max-width: 768px) {
    .universal-grid {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) !important;
    }
  }
</style>