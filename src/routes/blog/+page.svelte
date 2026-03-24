<script lang="ts">
	let { data } = $props();
</script>

<div class="space-y-6">
	<div>
		<h1 class="font-heading text-3xl font-bold mb-4" style="color: var(--accent)">[ Blog ]</h1>
		<p class="text-sm" style="color: var(--text-muted)">
			Thoughts, tutorials, and experiences from my journey in software development. Also some life stuff... Idk,
			mostly ment for future myself when i get eventual dementia.
		</p>
	</div>

	<div class="space-y-3">
		{#each data.posts as post}
			<a
				href="/blog/{post.id}"
				class="block p-4 transition-colors"
				style="border: 2px solid var(--border); color: var(--text)"
				onmouseenter={(e) => {
					const el = e.currentTarget as HTMLElement;
					el.style.backgroundColor = 'var(--surface)';
				}}
				onmouseleave={(e) => {
					const el = e.currentTarget as HTMLElement;
					el.style.backgroundColor = 'transparent';
				}}
			>
				<div class="flex justify-between items-start mb-1">
					<h2 class="font-heading text-lg font-bold">{post.title}</h2>
					<span class="font-mono text-xs whitespace-nowrap ml-4" style="color: var(--text-muted)">
						{new Date(post.date).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'short',
							day: 'numeric'
						})}
					</span>
				</div>
				<p class="text-sm" style="color: var(--text-muted)">{post.excerpt}</p>
			</a>
		{/each}
	</div>
</div>
