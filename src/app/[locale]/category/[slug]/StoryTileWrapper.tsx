import Link from 'next/link';
import type { ArticleMeta } from '@/lib/articles';

interface StoryTileWrapperProps {
  article: ArticleMeta;
  locale: string;
}

export default function StoryTileWrapper({ article, locale }: StoryTileWrapperProps) {
  const isZh = locale === 'zh';
  const categoryLabel =
    article.category === 'standards' ? (isZh ? '标准解读' : 'Standards')
    : article.category === 'interviews' ? (isZh ? '专家访谈' : 'Interviews')
    : (isZh ? '行业动态' : 'News');

  return (
    <Link href={`/${locale}/article/${article.slug}`} className="block group">
      <article className="card-hover rounded-card border border-white/10 hover:border-white/20 bg-canvas-black p-5 md:p-6 transition-colors duration-150">
        <div className="flex items-center gap-2 mb-3">
          <span className="mono-label text-[10px] text-jelly-mint">{categoryLabel}</span>
          <span className="mono-label text-[10px] text-secondary-text">{article.date}</span>
        </div>
        <h3 className="card-title font-sans font-bold text-[20px] md:text-[24px] leading-tight mb-2 text-hazard-white group-hover:text-deep-link-blue transition-colors duration-150">
          {article.title}
        </h3>
        <p className="text-[13px] leading-relaxed line-clamp-2 text-secondary-text">
          {isZh ? article.summary : article.summaryEn}
        </p>
        <div className="mono-label text-[10px] text-secondary-text mt-3">
          {article.author}
        </div>
      </article>
    </Link>
  );
}
