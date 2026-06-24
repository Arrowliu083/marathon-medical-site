'use client';

import StoryTile from './StoryTile';
import type { ArticleMeta } from '@/lib/articles';

interface StoryStreamProps {
  articles: ArticleMeta[];
}

export default function StoryStream({ articles }: StoryStreamProps) {
  return (
    <div className="relative">
      {/* Vertical timeline rail */}
      <div className="absolute left-[15px] top-2 bottom-2 w-px bg-accent/20" />

      <div className="flex flex-col gap-4">
        {articles.map((article, index) => (
          <div key={article.slug} className="flex gap-4">
            {/* Timeline node */}
            <div className="relative z-10 flex-shrink-0 mt-4">
              <div
                className="mono-label text-[11px] text-text-secondary whitespace-nowrap"
                style={{ letterSpacing: '0.11em' }}
              >
                {article.date.replace(/-/g, '.')}
              </div>
              <div
                className={`w-[9px] h-[9px] rounded-round border-2 mx-auto mt-2 ${
                  index === 0
                    ? 'bg-accent border-accent'
                    : 'bg-surface border-accent/30'
                }`}
              />
            </div>

            <div className="flex-1 min-w-0">
              <StoryTile
                article={article}
                variant={index === 0 ? 'highlight' : 'compact'}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
