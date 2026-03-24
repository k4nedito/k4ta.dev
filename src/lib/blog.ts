import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

export interface BlogPost {
	id: string;
	title: string;
	date: string;
	excerpt: string;
	content: string;
}

const BLOG_DIR = path.resolve('src/content/blog');

function parseFrontmatter(raw: string): { frontmatter: Record<string, string>; content: string } {
	const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
	if (!match) return { frontmatter: {}, content: raw };

	const frontmatter: Record<string, string> = {};
	for (const line of match[1].split('\n')) {
		const [key, ...rest] = line.split(':');
		if (key && rest.length) {
			frontmatter[key.trim()] = rest.join(':').trim();
		}
	}
	return { frontmatter, content: match[2].trim() };
}

export function getAllPosts(): Omit<BlogPost, 'content'>[] {
	const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));

	return files
		.map((file) => {
			const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
			const { frontmatter } = parseFrontmatter(raw);
			const id = file.replace('.md', '');
			return {
				id,
				title: frontmatter.title || 'Untitled',
				date: frontmatter.date || '',
				excerpt: frontmatter.excerpt || ''
			};
		})
		.sort((a, b) => {
			const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
			if (dateDiff !== 0) return dateDiff;
			return b.id.localeCompare(a.id, undefined, { numeric: true });
		});
}

export function getPost(id: string): BlogPost | null {
	const filePath = path.join(BLOG_DIR, `${id}.md`);
	if (!fs.existsSync(filePath)) return null;

	const raw = fs.readFileSync(filePath, 'utf-8');
	const { frontmatter, content } = parseFrontmatter(raw);

	return {
		id,
		title: frontmatter.title || 'Untitled',
		date: frontmatter.date || '',
		excerpt: frontmatter.excerpt || '',
		content: marked.parse(content) as string
	};
}
