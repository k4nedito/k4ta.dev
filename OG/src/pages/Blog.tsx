import { Link } from 'react-router-dom';
import { getAllPosts } from '../utils/blogLoader';

export default function Blog() {
  const blogPosts = getAllPosts();
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-4 sm:space-y-6">
      <div className="brand-border">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-accent-blue">[ Blog ]</h1>
        <p className="mb-4 sm:mb-6 opacity-90 text-sm sm:text-base">
          Thoughts, tutorials, and experiences from my journey in software development. Also some life stuff... Idk, 
          mostly ment for future myself when i get eventual dementia.
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {blogPosts.length === 0 ? (
          <div className="brand-border text-center py-6 sm:py-8">
            <p className="opacity-75 text-sm sm:text-base">No posts yet. Check back soon!</p>
          </div>
        ) : (
          blogPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="block brand-border hover:bg-accent-blue hover:text-white transition-colors duration-200"
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg sm:text-xl font-bold">{post.title}</h2>
                <span className="text-xs sm:text-sm opacity-75 whitespace-nowrap ml-4">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <p className="opacity-90 text-sm sm:text-base">{post.excerpt}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
