<script lang="ts">
  import '../app.css';
  import { colorTheme } from '$lib/stores/colorTheme';
  import { onMount } from 'svelte';
  
  // Initialize color theme system on mount
  onMount(() => {
    colorTheme.init();
  });
</script>

<slot />