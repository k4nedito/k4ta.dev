<script lang="ts">
	import { onMount } from 'svelte';

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
</script>

<section class="min-h-screen flex items-center justify-center px-6 py-16">
	<div class="max-w-5xl w-full flex flex-col-reverse min-[1067px]:flex-row items-center gap-12 min-[1067px]:gap-16">
		<!-- Left: Content -->
		<div class="flex-1 space-y-8">
			<div class="space-y-1">
				<p class="text-text-muted font-mono text-sm">Hi,</p>
				<h1 class="font-heading text-4xl font-bold text-text">k4tastropa here.</h1>
				<p class="text-text-muted text-lg font-mono">
					{displayed}<span class="inline-block w-[2px] h-[1.1em] bg-accent align-middle ml-[2px] translate-y-[1px]" class:opacity-0={!cursorVisible}></span>
				</p>
			</div>

			<nav class="flex gap-4 font-mono text-sm">
				<a href="/home" class="text-accent hover:underline">[home]</a>
				<a href="/whoami" class="text-accent hover:underline">[whoami]</a>
				<a href="/blog" class="text-accent hover:underline">[blog]</a>
				<a href="/contact" class="text-accent hover:underline">[contact]</a>
			</nav>

			<div class="space-y-4">
				<p class="text-text-muted font-mono text-sm">Latest:</p>

				<a href="/blog/05" class="block group">
					<h3 class="font-heading text-lg font-semibold text-text group-hover:text-accent transition-colors">You will never be human enough</h3>
					<p class="text-text-muted text-sm">Yap sesh about LLM's and AGI</p>
					<p class="text-text-muted font-mono text-xs">2026-02-02</p>
				</a>

				<a href="/blog/04" class="block group">
					<h3 class="font-heading text-lg font-semibold text-text group-hover:text-accent transition-colors">New year</h3>
					<p class="text-text-muted text-sm">I am in fact still active</p>
					<p class="text-text-muted font-mono text-xs">2026-01-02</p>
				</a>

				<a href="/blog/03" class="block group">
					<h3 class="font-heading text-lg font-semibold text-text group-hover:text-accent transition-colors">How does React work</h3>
					<p class="text-text-muted text-sm">I finally understood it, gotta document</p>
					<p class="text-text-muted font-mono text-xs">2025-10-31</p>
				</a>
			</div>
		</div>

		<!-- Right: Image -->
		<div class="flex-shrink-0">
			<img
				src="/preview.png"
				alt="k4tastropa"
				class="w-70 min-[1067px]:w-[40rem] border-3 border-border"
			/>
		</div>
	</div>
</section>
