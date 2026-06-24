import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import ArticleContent from './ArticleContent';
import { articles, getArticleBySlug } from '@/lib/articles';

interface ArticlePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ['zh', 'en']) {
    for (const article of articles) {
      params.push({ locale, slug: article.slug });
    }
  }
  return params;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'article' });
  const meta = getArticleBySlug(slug);

  if (!meta) {
    notFound();
  }

  // Load article content
  let content = null;
  try {
    const module = await import(`@/content/${locale}/articles/${slug}.ts`);
    content = {
      title: module.title?.replace(/'/g, '') || '',
      author: module.author?.replace(/'/g, '') || '',
      authorRole: module.authorRole?.replace(/'/g, '') || '',
      date: module.date?.replace(/'/g, '') || '',
      category: module.category?.replace(/'/g, '') || '',
      summary: module.summary?.replace(/'/g, '') || '',
      tags: module.tags || [],
      body: module.body || module.default || '',
    };
  } catch {
    notFound();
  }

  const messages = {
    backToHome: t('backToHome'),
    publishedOn: t('publishedOn'),
    author: t('author'),
    category: t('category'),
    readMore: t('readMore'),
    relatedArticles: t('relatedArticles'),
  };

  return <ArticleContent meta={meta} content={content!} messages={messages} />;
}
