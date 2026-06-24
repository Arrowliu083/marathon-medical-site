'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import ArticleCard from '@/components/ArticleCard';
import { articles, type ArticleMeta } from '@/lib/articles';

interface ArticleContentData {
  title: string;
  author: string;
  authorRole: string;
  date: string;
  category: string;
  summary: string;
  tags: string[];
  body: string;
}

interface ArticleMessages {
  backToHome: string;
  publishedOn: string;
  author: string;
  category: string;
  readMore: string;
  relatedArticles: string;
}

interface ArticleContentProps {
  meta: ArticleMeta;
  content: ArticleContentData;
  messages: ArticleMessages;
}

export default function ArticleContent({ meta, content, messages: t }: ArticleContentProps) {
  const locale = useLocale();
  const isInterview = meta.category === 'interviews';
  const hasVideo = !!meta.bilibiliBvid;

  // For interviews with video: split body into "guest intro" + "key points"
  const { introBody, pointsBody } = useMemo(() => {
    if (!isInterview || !hasVideo) return { introBody: content.body, pointsBody: null };

    // Split at "## 访谈要点" or "## 核心观点" or "### "
    const splitPatterns = ['## 访谈要点', '## 核心观点'];
    let splitIndex = -1;
    let matchedPattern = '';

    for (const pattern of splitPatterns) {
      const idx = content.body.indexOf(pattern);
      if (idx !== -1) {
        splitIndex = idx;
        matchedPattern = pattern;
        break;
      }
    }

    if (splitIndex === -1) {
      // Try splitting before the first "### " heading
      const h3Match = content.body.match(/\n### /);
      if (h3Match && h3Match.index !== undefined && h3Match.index > 100) {
        return {
          introBody: content.body.substring(0, h3Match.index).trim(),
          pointsBody: content.body.substring(h3Match.index).trim(),
        };
      }
      return { introBody: content.body, pointsBody: null };
    }

    return {
      introBody: content.body.substring(0, splitIndex).trim(),
      pointsBody: matchedPattern + '\n\n' + content.body.substring(splitIndex + matchedPattern.length).trim(),
    };
  }, [content.body, isInterview, hasVideo]);

  const relatedArticles = articles
    .filter((a) => a.category === meta.category && a.slug !== meta.slug)
    .slice(0, 3);

  const categoryLabel =
    meta.category === 'standards'
      ? '标准解读'
      : meta.category === 'interviews'
        ? '专家访谈'
        : '行业动态';

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-8">
      {/* Back link */}
      <Link
        href={`/${locale}`}
        className="mono-label text-[12px] text-text-secondary hover:text-deep-link-blue transition-colors duration-150 inline-block mb-8"
      >
        {t.backToHome}
      </Link>

      {/* Meta anchor bar — defines the content width boundary */}
      <div className="flex items-start gap-3 mb-6 pb-6 border-b border-border">
        <div className="flex-shrink-0">
          <div className="text-[15px] font-bold text-text-primary">
            {content.author}
          </div>
          <div className="text-[12px] text-text-secondary">
            {content.authorRole}
          </div>
        </div>
        <div className="ml-auto flex-shrink-0 text-right">
          <div className="mono-label text-[10px] text-text-secondary">
            {t.publishedOn}
          </div>
          <div className="text-[12px] text-muted-text">
            {content.date}
          </div>
        </div>
      </div>

      {/* Kicker */}
      <div className="flex items-center gap-3 mb-4">
        <span className="pill-tag pill-tag--mint">
          {categoryLabel}
        </span>
        {content.tags && content.tags.map((tag: string) => (
          <span key={tag} className="mono-label text-[10px] text-text-secondary">
            #{tag.replace(/'/g, '')}
          </span>
        ))}
      </div>

      {/* Title — same left/right bounds as meta bar */}
      <h1 className="font-sans font-bold text-[clamp(2rem,5vw,4.75rem)] mb-8 text-text-primary leading-[1.08] tracking-[-0.01em]" style={{ textWrap: 'balance' }}>
        {content.title}
      </h1>

      {/* Cover image — only for non-interview articles */}
      {!isInterview && (
        <div className="w-full aspect-[16/9] rounded-card overflow-hidden mb-10 border border-border">
          <img
            src={meta.coverImage}
            alt={content.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content area — full width, same bounds as meta bar */}
      <div className="article-content-fullwidth">
        {/* For interviews: render guest intro first, then video, then key points */}
        {isInterview && hasVideo && introBody ? (
          <>
            <MarkdownRenderer content={introBody} />

            <div className="mt-8 mb-8">
              <h3 className="mono-label text-[12px] text-accent mb-3">
                {locale === 'zh' ? '访谈视频' : 'Interview Video'}
              </h3>
              <div
                className="relative w-full rounded-card overflow-hidden border border-border"
                style={{ paddingTop: '56.25%' }}
              >
                <iframe
                  src={`https://player.bilibili.com/player.html?bvid=${meta.bilibiliBvid}&page=1&autoplay=0`}
                  scrolling="no"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 'none' }}
                  title={content.title}
                />
              </div>
            </div>

            {pointsBody && <MarkdownRenderer content={pointsBody} />}
          </>
        ) : (
          <>
            {hasVideo && (
              <div className="mb-8">
                <h3 className="mono-label text-[12px] text-accent mb-3">
                  {locale === 'zh' ? '视频' : 'Video'}
                </h3>
                <div
                  className="relative w-full rounded-card overflow-hidden border border-border"
                  style={{ paddingTop: '56.25%' }}
                >
                  <iframe
                    src={`https://player.bilibili.com/player.html?bvid=${meta.bilibiliBvid}&page=1&autoplay=0`}
                    scrolling="no"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 'none' }}
                    title={content.title}
                  />
                </div>
              </div>
            )}

            <MarkdownRenderer content={content.body} />
          </>
        )}
      </div>

      {/* Article footer */}
      <div className="mt-12 pt-8 border-t border-border">
        <div className="flex flex-wrap gap-2">
          {content.tags && content.tags.map((tag: string) => (
            <span key={tag} className="pill-tag pill-tag--outline">
              {tag.replace(/'/g, '')}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
