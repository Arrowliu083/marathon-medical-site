'use client';

import ArticleCard from '@/components/ArticleCard';
import type { ArticleMeta } from '@/lib/articles';

interface CategoryContentProps {
  title: string;
  slug: string;
  articles: ArticleMeta[];
}

export default function CategoryContent({ title, slug, articles }: CategoryContentProps) {
  const description =
    slug === 'standards'
      ? '深入解读T/CADERM 8001-2021和T/CADERM 8002-2021两部马拉松医疗保障标准的核心内容与实践应用。'
      : '聆听标准起草专家、医疗保障一线从业者的真知灼见与实战经验分享。';

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-8">
      {/* Category header */}
      <div className="mb-12">
        <div className="mono-label text-[12px] text-accent mb-3">
          {title}
        </div>
        <h1 className="display-title text-[clamp(2rem,5vw,4.75rem)] mb-4 max-w-3xl">
          {title}
        </h1>
        <p className="body-large max-w-2xl">{description}</p>
      </div>

      {/* Article grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} size="medium" />
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-20">
          <p className="text-secondary-text mono-label text-[14px]">
            暂无文章
          </p>
        </div>
      )}
    </div>
  );
}
