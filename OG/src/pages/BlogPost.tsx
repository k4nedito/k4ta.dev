import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getPostById } from '../utils/blogLoader';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = id ? getPostById(id) : null;

  if (!post) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="brand-border text-center py-6 sm:py-8">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">Post Not Found</h1>
          <Link to="/blog" className="button-like inline-block text-xs sm:text-sm">
            [ Back to Blog ]
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-4 sm:space-y-6">
      <Link to="/blog" className="inline-flex items-center gap-2 button-like text-xs sm:text-sm">
        <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
        [ Back to Blog ]
      </Link>

      <div className="brand-border">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-accent-blue">{post.title}</h1>
          <p className="text-xs sm:text-sm opacity-75">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        <div className="prose max-w-none text-text">
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className="text-2xl font-bold mb-3 mt-5 text-text">{children}</h1>,
              h2: ({ children }) => <h2 className="text-xl font-bold mb-3 mt-4 text-text">{children}</h2>,
              h3: ({ children }) => <h3 className="text-lg font-bold mb-2 mt-3 text-text">{children}</h3>,
              p: ({ children }) => <p className="mb-3 leading-relaxed text-sm text-text">{children}</p>,
              ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1 text-sm text-text">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1 text-sm text-text">{children}</ol>,
              li: ({ children }) => <li className="text-text text-sm">{children}</li>,
              strong: ({ children }) => <strong className="font-bold text-text">{children}</strong>,
              em: ({ children }) => <em className="italic text-text">{children}</em>,
              code: ({ inline, className, children, ...props }: any) => {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={tomorrow}
                    language={match[1]}
                    PreTag="div"
                    className="mb-4 text-xs border-2 border-border"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className="bg-background px-1.5 py-0.5 text-text font-mono text-xs border border-border" {...props}>
                    {children}
                  </code>
                );
              },
              img: ({ src, alt }) => (
                <img
                  src={src}
                  alt={alt}
                  className="max-w-full h-auto border-2 border-border mb-4"
                  loading="lazy"
                />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
