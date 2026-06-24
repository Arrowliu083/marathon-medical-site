import Link from 'next/link';
import { useLocale } from 'next-intl';
import type { ArticleMeta } from '@/lib/articles';

interface ArticleCardProps {
  article: ArticleMeta;
  size?: 'small' | 'medium';
}

export default function ArticleCard({ article, size = 'medium' }: ArticleCardProps) {
  const locale = useLocale();
  const isSmall = size === 'small';

  return (
    <Link href={`/${locale}/article/${article.slug}`} className="block group">
      <article className="card-hover rounded-card border border-border bg-surface transition-colors duration-150 hover:border-accent h-full flex flex-col overflow-hidden">
        {/* Cover image — 3:4 portrait for interviews, 16:9 for others */}
        <div className={`w-full overflow-hidden ${isSmall ? 'aspect-[3/4]' : article.category === 'interviews' ? 'aspect-[3/4]' : 'aspect-[16/9]'}`}>
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-contain bg-surface-muted"
            loading="lazy"
          />
        </div>

        <div className={`flex flex-col flex-1 ${isSmall ? 'p-4' : 'p-5 md:p-6'}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="mono-label text-[10px] text-accent">
              {article.category === 'standards'
                ? '标准解读'
                : article.category === 'interviews'
                  ? '专家访谈'
                  : '行业动态'}
            </span>
          </div>

          <h3
            className={`card-title font-sans font-bold leading-snug mb-2 text-text-primary group-hover:text-accent transition-colors duration-150 ${
              isSmall ? 'text-[16px]' : 'text-[18px] md:text-[20px]'
            }`}
          >
            {article.title}
          </h3>

          <p className="body-small line-clamp-2 flex-1">
            {locale === 'zh' ? article.summary : article.summaryEn}
          </p>

          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border-light">
            <span className="mono-label text-[10px] text-text-secondary">
              {article.author}
            </span>
            <span className="text-text-secondary opacity-30">·</span>
            <span className="mono-label text-[10px] text-text-secondary">
              {article.date}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
