import { getAllPosts } from '$lib/blog';

export function load() {
	return { latestPosts: getAllPosts().slice(0, 3) };
}
