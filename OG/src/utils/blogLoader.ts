export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

// This will be populated by importing markdown files
const blogPosts: Record<string, BlogPost> = {};

// Import all markdown files from the blog content directory
const blogModules = import.meta.glob('../content/blog/*.md', { 
  eager: true,
  as: 'raw'
});

// Parse frontmatter and content from markdown
function parseMd(content: string): { frontmatter: Record<string, string>; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, content };
  }

  const frontmatterLines = match[1].split('\n');
  const frontmatter: Record<string, string> = {};
  
  frontmatterLines.forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      frontmatter[key.trim()] = valueParts.join(':').trim();
    }
  });

  return {
    frontmatter,
    content: match[2].trim()
  };
}

// Process all blog markdown files
Object.entries(blogModules).forEach(([path, content]) => {
  const filename = path.split('/').pop()?.replace('.md', '') || '';
  const { frontmatter, content: mdContent } = parseMd(content as string);
  
  blogPosts[filename] = {
    id: filename,
    title: frontmatter.title || 'Untitled',
    date: frontmatter.date || new Date().toISOString().split('T')[0],
    excerpt: frontmatter.excerpt || '',
    content: mdContent
  };
});

export function getAllPosts(): BlogPost[] {
  return Object.values(blogPosts).sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    // First sort by date descending (newest first)
    if (dateA !== dateB) {
      return dateB - dateA;
    }

    // If dates are equal, sort by filename descending (higher numbers first)
    return b.id.localeCompare(a.id, undefined, { numeric: true, sensitivity: 'base' });
  });
}

export function getPostById(id: string): BlogPost | null {
  return blogPosts[id] || null;
}
