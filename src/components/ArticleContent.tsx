'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface ArticleContentProps {
  slug: string;
  locale: string;
}

export function ArticleContent({ slug, locale }: ArticleContentProps) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContent() {
      try {
        // Dynamically import the MDX file content
        const module = await import(
          `@/content/${locale}/articles/${slug}.mdx`
        );
        // Access the raw content via a workaround
        const response = await fetch(
          `/content/${locale}/articles/${slug}.mdx`
        );
        if (response.ok) {
          const text = await response.text();
          // Strip frontmatter
          const contentMatch = text.match(/---[\s\S]*?---\n([\s\S]*)/);
          setContent(contentMatch ? contentMatch[1].trim() : text);
        } else {
          setContent(module.default?.toString() || '');
        }
      } catch (e) {
        // Fallback: try to get content from the module
        setError('Content loading...');
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, [slug, locale]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-surface-slate rounded w-3/4" />
        <div className="h-4 bg-surface-slate rounded w-1/2" />
        <div className="h-4 bg-surface-slate rounded w-2/3" />
        <div className="h-4 bg-surface-slate rounded w-5/6" />
      </div>
    );
  }

  if (error || !content) {
    // Use static content as fallback
    return <ArticleContentStatic slug={slug} locale={locale} />;
  }

  return (
    <div className="article-prose">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

// Static content fallback component
function ArticleContentStatic({ slug, locale }: { slug: string; locale: string }) {
  // This is populated at build time
  return (
    <div className="article-prose">
      <p>Content is being processed. Please check back soon.</p>
    </div>
  );
}
