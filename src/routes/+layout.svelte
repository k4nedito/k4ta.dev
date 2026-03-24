<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	let { children } = $props();

	onMount(() => {
		const saved = localStorage.getItem('theme');
		if (saved === 'light') {
			document.documentElement.classList.add('light');
		} else if (!saved && window.matchMedia('(prefers-color-scheme: light)').matches) {
			document.documentElement.classList.add('light');
		}
	});

	function toggleTheme() {
		const isLight = document.documentElement.classList.toggle('light');
		localStorage.setItem('theme', isLight ? 'light' : 'dark');
	}

	function isActive(href: string) {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}

	const links = [
		{ href: '/', label: 'home' },
		{ href: '/whoami', label: 'whoami' },
		{ href: '/blog', label: 'blog' },
		{ href: '/contact', label: 'contact' },
	];

	const isHome = $derived(page.url.pathname === '/');
</script>

<svelte:head>
	<title>k4tastropa</title>
	<meta name="description" content="my stuff." />
	<link rel="icon" href={favicon} />
	<link rel="canonical" href="https://k4ta.dev{page.url.pathname}" />
	<meta name="author" content="k4tastropa" />
	<meta name="theme-color" content="#282828" />

	<meta property="og:type" content="website" />
	<meta property="og:title" content="k4tastropa" />
	<meta property="og:description" content="my stuff." />
	<meta property="og:image" content="https://k4ta.dev/preview.png" />
	<meta property="og:url" content="https://k4ta.dev{page.url.pathname}" />
	<meta property="og:site_name" content="k4tastropa" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="k4tastropa" />
	<meta name="twitter:description" content="my stuff." />
	<meta name="twitter:image" content="https://k4ta.dev/preview.png" />
</svelte:head>

{#if isHome}
	{@render children()}
{:else}
	<div class="min-h-screen flex flex-col items-center px-6 pt-32">
		<header class="w-full max-w-3xl py-6">
			<nav class="flex justify-center gap-2 font-mono text-sm">
					{#each links as link}
						<a
							href={link.href}
							class="transition-colors"
							style="color: var({isActive(link.href) ? '--text' : '--accent'})"
						>[{link.label}]</a>
					{/each}
					<button
						onclick={toggleTheme}
						class="transition-colors cursor-pointer"
						style="color: var(--accent)"
						aria-label="Toggle color theme"
					>[theme]</button>
			</nav>
		</header>

		<main class="w-full max-w-3xl flex-1 py-12">
			{@render children()}
		</main>
	</div>
{/if}
