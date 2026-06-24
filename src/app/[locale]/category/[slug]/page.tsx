import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import CategoryContent from './CategoryContent';
import { articles } from '@/lib/articles';

interface CategoryPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const validCategories = ['standards', 'interviews'];

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ['zh', 'en']) {
    for (const slug of validCategories) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'category' });

  if (!validCategories.includes(slug)) {
    notFound();
  }

  const title = slug === 'standards' ? t('standards') : t('interviews');
  const categoryArticles = articles
    .filter((a) => a.category === slug)
    .sort((a, b) => b.date.localeCompare(a.date));

  return <CategoryContent title={title} slug={slug} articles={categoryArticles} />;
}
