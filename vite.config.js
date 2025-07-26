import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 5173,
		strictPort: false
	},
	preview: {
		port: 5173,
		strictPort: false
	},
	esbuild: {
		// Remove all console statements in production builds
		drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : []
	}
});