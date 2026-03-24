import { marked } from 'marked';

export interface BlogPost {
	id: string;
	title: string;
	date: string;
	excerpt: string;
	content: string;
}

function parseFrontmatter(raw: string): { frontmatter: Record<string, string>; body: string } {
	const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
	if (!match) return { frontmatter: {}, body: raw };

	const frontmatter: Record<string, string> = {};
	for (const line of match[1].split('\n')) {
		const [key, ...rest] = line.split(':');
		if (key && rest.length) {
			frontmatter[key.trim()] = rest.join(':').trim();
		}
	}
	return { frontmatter, body: match[2].trim() };
}

const modules = import.meta.glob('/src/content/blog/*.md', { eager: true, query: '?raw', import: 'default' });

function loadPosts() {
	const posts: Record<string, { id: string; title: string; date: string; excerpt: string; body: string }> = {};

	for (const [path, raw] of Object.entries(modules)) {
		const id = path.split('/').pop()!.replace('.md', '');
		const { frontmatter, body } = parseFrontmatter(raw as string);
		posts[id] = {
			id,
			title: frontmatter.title || 'Untitled',
			date: frontmatter.date || '',
			excerpt: frontmatter.excerpt || '',
			body
		};
	}

	return posts;
}

const posts = loadPosts();

export function getAllPosts(): Omit<BlogPost, 'content'>[] {
	return Object.values(posts)
		.map(({ body: _, ...rest }) => rest)
		.sort((a, b) => {
			const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
			if (dateDiff !== 0) return dateDiff;
			return b.id.localeCompare(a.id, undefined, { numeric: true });
		});
}

export function getPost(id: string): BlogPost | null {
	const post = posts[id];
	if (!post) return null;

	return {
		id: post.id,
		title: post.title,
		date: post.date,
		excerpt: post.excerpt,
		content: marked.parse(post.body) as string
	};
}
