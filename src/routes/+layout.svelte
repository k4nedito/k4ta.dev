<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		const saved = localStorage.getItem('theme');
		if (saved === 'light') {
			document.documentElement.classList.add('light');
		} else if (!saved && window.matchMedia('(prefers-color-scheme: light)').matches) {
			document.documentElement.classList.add('light');
		}
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
