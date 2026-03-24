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

	const phrases = [
		'building full stack apps',
		'tinkering with linux',
		'shipping on the blockchain',
		'engineering backends',
		'automating infrastructure',
		'aviation nerd',
	];

	let displayed = $state('');
	let cursorVisible = $state(true);

	onMount(() => {
		let phraseIndex = 0;
		let charIndex = 0;
		let deleting = false;
		const typeSpeed = 80;
		const deleteSpeed = 40;
		const pauseAfterType = 2000;
		const pauseAfterDelete = 400;

		function tick() {
			const current = phrases[phraseIndex];

			if (!deleting) {
				charIndex++;
				displayed = current.slice(0, charIndex);
				if (charIndex === current.length) {
					setTimeout(() => { deleting = true; tick(); }, pauseAfterType);
					return;
				}
				setTimeout(tick, typeSpeed);
			} else {
				charIndex--;
				displayed = current.slice(0, charIndex);
				if (charIndex === 0) {
					deleting = false;
					phraseIndex = (phraseIndex + 1) % phrases.length;
					setTimeout(tick, pauseAfterDelete);
					return;
				}
				setTimeout(tick, deleteSpeed);
			}
		}

		tick();

		const cursorInterval = setInterval(() => { cursorVisible = !cursorVisible; }, 530);
		return () => clearInterval(cursorInterval);
	});

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

{#snippet identity()}
	<div class="space-y-1">
		<p class="font-mono text-sm" style="color: var(--text-muted)">Hi,</p>
		<h1 class="font-heading text-4xl font-bold" style="color: var(--text)">k4tastropa here.</h1>
		<p class="text-lg font-mono" style="color: var(--text-muted)">
			{displayed}<span
				class="inline-block w-[2px] h-[1.1em] align-middle ml-[2px] translate-y-[1px]"
				style="background-color: var(--accent)"
				class:opacity-0={!cursorVisible}
			></span>
		</p>
	</div>

	<nav class="flex gap-2 font-mono text-sm">
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
{/snippet}

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

{#if isHome}
	<!-- Home: exact original layout -->
	<section class="min-h-screen flex items-center justify-center px-6 py-16">
		<div class="max-w-5xl w-full flex flex-col-reverse min-[1067px]:flex-row items-center gap-12 min-[1067px]:gap-16">
			<div class="flex-1 space-y-8">
				{@render identity()}
				{@render children()}
			</div>

			<div class="flex-shrink-0">
				<img
					src="/preview.png"
					alt="k4tastropa"
					class="w-70 min-[1067px]:w-[40rem]"
					style="border: 3px solid var(--border)"
				/>
			</div>
		</div>
	</section>
{:else}
	<!-- Subpages -->
	<section class="min-h-screen flex items-center justify-center px-6 py-16">
		<div class="max-w-5xl w-full flex flex-col-reverse min-[1067px]:flex-row items-center gap-12 min-[1067px]:gap-16">
			<div class="flex-1 space-y-8">
				{@render identity()}

				<!-- Desktop: show latest posts below nav -->
				<div class="hidden min-[1067px]:block space-y-4">
					<p class="font-mono text-sm" style="color: var(--text-muted)">Latest:</p>

					<a href="/blog/05" class="block group">
						<h3 class="font-heading text-lg font-semibold transition-colors" style="color: var(--text)">You will never be human enough</h3>
						<p class="text-sm" style="color: var(--text-muted)">Yap sesh about LLM's and AGI</p>
						<p class="font-mono text-xs" style="color: var(--accent)">2026-02-02</p>
					</a>

					<a href="/blog/04" class="block group">
						<h3 class="font-heading text-lg font-semibold transition-colors" style="color: var(--text)">New year</h3>
						<p class="text-sm" style="color: var(--text-muted)">I am in fact still active</p>
						<p class="font-mono text-xs" style="color: var(--accent)">2026-01-02</p>
					</a>

					<a href="/blog/03" class="block group">
						<h3 class="font-heading text-lg font-semibold transition-colors" style="color: var(--text)">How does React work</h3>
						<p class="text-sm" style="color: var(--text-muted)">I finally understood it, gotta document</p>
						<p class="font-mono text-xs" style="color: var(--accent)">2025-10-31</p>
					</a>
				</div>

				<!-- Mobile: page content goes here (where latest would be) -->
				<div class="min-[1067px]:hidden">
					{@render children()}
				</div>
			</div>

			<div class="flex-shrink-0">
				<!-- Mobile: still show image -->
				<img
					src="/preview.png"
					alt="k4tastropa"
					class="w-70 min-[1067px]:hidden"
					style="border: 3px solid var(--border)"
				/>
				<!-- Desktop: page content replaces image -->
				<div class="hidden min-[1067px]:block w-[40rem]">
					{@render children()}
				</div>
			</div>
		</div>
	</section>
{/if}
