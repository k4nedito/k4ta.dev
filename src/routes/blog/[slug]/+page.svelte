<script lang="ts">
	let { data } = $props();
</script>

<div class="space-y-6">
	<a
		href="/blog"
		class="inline-block font-mono text-sm transition-colors"
		style="color: var(--accent)"
	>
		&#8592; [ Back to Blog ]
	</a>

	<div class="p-4" style="border: 2px solid var(--border)">
		<div class="mb-6">
			<h1 class="font-heading text-3xl font-bold mb-2" style="color: var(--accent)">{data.post.title}</h1>
			<p class="font-mono text-xs" style="color: var(--text-muted)">
				{new Date(data.post.date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</p>
		</div>

		<div class="prose">
			{@html data.post.content}
		</div>
	</div>
</div>

<style>
	.prose :global(h1) {
		font-size: 1.5rem;
		font-weight: 700;
		margin-top: 1.25rem;
		margin-bottom: 0.75rem;
		color: var(--text);
	}
	.prose :global(h2) {
		font-size: 1.25rem;
		font-weight: 700;
		margin-top: 1rem;
		margin-bottom: 0.75rem;
		color: var(--text);
	}
	.prose :global(h3) {
		font-size: 1.125rem;
		font-weight: 700;
		margin-top: 0.75rem;
		margin-bottom: 0.5rem;
		color: var(--text);
	}
	.prose :global(p) {
		margin-bottom: 0.75rem;
		line-height: 1.7;
		font-size: 0.875rem;
		color: var(--text);
	}
	.prose :global(ul) {
		list-style: disc;
		padding-left: 1.5rem;
		margin-bottom: 0.75rem;
		font-size: 0.875rem;
		color: var(--text);
	}
	.prose :global(ol) {
		list-style: decimal;
		padding-left: 1.5rem;
		margin-bottom: 0.75rem;
		font-size: 0.875rem;
		color: var(--text);
	}
	.prose :global(li) {
		margin-bottom: 0.25rem;
		color: var(--text);
	}
	.prose :global(strong) {
		font-weight: 700;
		color: var(--text);
	}
	.prose :global(em) {
		font-style: italic;
		color: var(--text);
	}
	.prose :global(pre) {
		background-color: var(--surface);
		border: 2px solid var(--border);
		padding: 1rem;
		overflow-x: auto;
		margin-bottom: 1rem;
		font-size: 0.75rem;
		font-family: 'IBM Plex Mono', monospace;
	}
	.prose :global(code) {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.75rem;
	}
	.prose :global(:not(pre) > code) {
		background-color: var(--surface);
		padding: 0.125rem 0.375rem;
		border: 1px solid var(--border);
	}
	.prose :global(img) {
		max-width: 100%;
		height: auto;
		border: 2px solid var(--border);
		margin-bottom: 1rem;
	}
	.prose :global(hr) {
		border: none;
		border-top: 2px solid var(--border);
		margin: 1.5rem 0;
	}
	.prose :global(a) {
		color: var(--accent);
		text-decoration: underline;
	}
</style>
