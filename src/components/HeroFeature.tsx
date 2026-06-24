'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import type { ArticleMeta } from '@/lib/articles';

interface HeroFeatureProps {
  article: ArticleMeta;
}

export default function HeroFeature({ article }: HeroFeatureProps) {
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden rounded-feature border border-border bg-surface">
      {/* Cover image — portrait for interviews, landscape for others */}
      <div className={`w-full overflow-hidden ${article.category === 'interviews' ? 'aspect-[3/4] max-w-md mx-auto' : 'aspect-[16/9]'}`}>
        <img
          src={article.coverImage}
          alt={article.title}
          className={`w-full h-full ${article.category === 'interviews' ? 'object-contain bg-surface-muted' : 'object-cover'}`}
          loading="eager"
        />
      </div>

      {/* Content */}
      <div className="p-8 md:p-12 lg:p-16">
        {/* Kicker */}
        <div className="mono-label text-[12px] text-accent mb-4 tracking-wider">
          {t('heroTag')}
        </div>

        {/* Title */}
        <h1 className="font-sans font-bold text-[clamp(2.5rem,5vw,5.5rem)] mb-5 text-text-primary leading-[1.05] tracking-[-0.02em]">
          {article.title}
        </h1>

        {/* Subtitle */}
        <p className="text-[17px] leading-relaxed mb-8 text-text-secondary max-w-[55ch]">
          {locale === 'zh' ? article.summary : article.summaryEn}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-4 mb-8 flex-wrap">
          <span className="text-[14px] font-medium text-text-primary">
            {article.author}
          </span>
          <span className="text-text-secondary opacity-30">|</span>
          <span className="text-[14px] text-text-secondary">
            {article.date}
          </span>
          <span className="pill-tag pill-tag--accent">
            {article.category === 'standards'
              ? '标准解读'
              : article.category === 'interviews'
                ? '专家访谈'
                : '行业动态'}
          </span>
        </div>

        {/* CTA */}
        <Link
          href={`/${locale}/article/${article.slug}`}
          className="btn-primary"
        >
          {t('heroCTA')}
        </Link>
      </div>
    </section>
  );
}
