import Link from 'next/link';
import { useLocale } from 'next-intl';
import type { ArticleMeta } from '@/lib/articles';

interface StoryTileProps {
  article: ArticleMeta;
  variant?: 'default' | 'compact' | 'highlight';
}

export default function StoryTile({ article, variant = 'default' }: StoryTileProps) {
  const locale = useLocale();
  const isHighlight = variant === 'highlight';
  const isCompact = variant === 'compact';

  const categoryLabel =
    article.category === 'standards'
      ? '标准解读'
      : article.category === 'interviews'
        ? '专家访谈'
        : '行业动态';

  return (
    <Link href={`/${locale}/article/${article.slug}`} className="block group">
      <article
        className={`card-hover rounded-card border transition-colors duration-150 overflow-hidden ${
          isHighlight
            ? 'bg-accent border-accent'
            : 'bg-surface border-border hover:border-accent'
        }`}
      >
        {!isCompact && (
          <div className={`w-full overflow-hidden ${article.category === 'interviews' ? 'aspect-[3/4]' : 'aspect-[16/9]'}`}>
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-contain bg-surface-muted"
              loading="lazy"
            />
          </div>
        )}

        <div className={isCompact ? 'p-4' : isHighlight ? 'p-6 md:p-8' : 'p-5 md:p-6'}>
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`mono-label text-[10px] ${
                isHighlight ? 'text-white/70' : 'text-accent'
              }`}
            >
              {categoryLabel}
            </span>
            <span
              className={`mono-label text-[10px] ${
                isHighlight ? 'text-white/50' : 'text-text-secondary'
              }`}
            >
              {article.date}
            </span>
          </div>

          <h3
            className={`card-title font-sans font-bold text-[clamp(1rem,2.5vw,1.5rem)] leading-snug mb-2 transition-colors duration-150 ${
              isHighlight
                ? 'text-white group-hover:text-white'
                : 'text-text-primary group-hover:text-accent'
            }`}
          >
            {article.title}
          </h3>

          <p
            className={`body-small line-clamp-2 ${
              isHighlight ? 'text-white/70' : ''
            }`}
          >
            {locale === 'zh' ? article.summary : article.summaryEn}
          </p>

          <div
            className={`mono-label text-[10px] mt-3 ${
              isHighlight ? 'text-white/50' : 'text-text-secondary'
            }`}
          >
            {article.author}
          </div>
        </div>
      </article>
    </Link>
  );
}
