<!-- Simple test to debug FlipCard -->
<script lang="ts">
  console.log('Test page loading...');
  
  // Test basic functionality
  let testMessage = 'Basic script is working';
  console.log('✅ Test page script executed');
</script>

<svelte:head>
  <title>Debug Test</title>
</svelte:head>

<h1>Debug Test Page</h1>
<p>Check the browser console for import errors.</p>
<p>If you see this text, the page is loading correctly.</p>
<p>Test message: {testMessage}</p>
