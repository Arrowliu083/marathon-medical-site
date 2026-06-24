'use client';

import { useLocale } from 'next-intl';
import HeroFeature from '@/components/HeroFeature';
import StoryStream from '@/components/StoryStream';
import ArticleCard from '@/components/ArticleCard';
import { articles, getFeaturedArticles } from '@/lib/articles';

interface HomeMessages {
  heroTag: string;
  heroCTA: string;
  heroTitle: string;
  heroSubtitle: string;
  featuredStories: string;
  latestUpdates: string;
  keyData: string;
  stats: {
    standards: string;
    experts: string;
    survivalRate: string;
    events: string;
  };
}

export default function HomeContent({ messages: t }: { messages: HomeMessages }) {
  const locale = useLocale();

  // Featured article for Hero
  const heroArticle = articles.find((a) => a.featured && a.category === 'standards') || articles[0];

  // Featured stories (first 4 featured)
  const featuredArticles = getFeaturedArticles().filter((a) => a.slug !== heroArticle.slug).slice(0, 3);

  // All articles sorted by date for StoryStream
  const allArticles = [...articles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);

  // Rest of articles for grid
  const gridArticles = [...articles]
    .sort((a, b) => b.date.localeCompare(a.date))
    .filter((a) => !allArticles.slice(0, 4).find((fa) => fa.slug === a.slug))
    .slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 pt-8 pb-16">
        <HeroFeature article={heroArticle} />
      </div>

      {/* Main content: StoryStream + Featured Grid */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* StoryStream timeline */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <h2 className="mono-label text-[12px] text-accent mb-6">
              {t.latestUpdates}
            </h2>
            <StoryStream articles={allArticles} />
          </div>

          {/* Featured grid */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <h2 className="mono-label text-[12px] text-accent mb-6">
              {t.featuredStories}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} size="medium" />
              ))}
            </div>

            {gridArticles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {gridArticles.slice(0, 2).map((article) => (
                  <ArticleCard key={article.slug} article={article} size="small" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Key Data Bar */}
      <div className="border-t border-border bg-surface-muted">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-12">
          <h2 className="mono-label text-[12px] text-accent mb-8 text-center">
            {t.keyData}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="display-hero text-[clamp(2rem,4vw,3.813rem)] text-accent mb-2">
                2
              </div>
              <div className="mono-label text-[11px] text-text-secondary">
                {t.stats.standards}
              </div>
            </div>
            <div>
              <div className="display-hero text-[clamp(2rem,4vw,3.813rem)] text-accent mb-2">
                38
              </div>
              <div className="mono-label text-[11px] text-text-secondary">
                {t.stats.experts}
              </div>
            </div>
            <div>
              <div className="display-hero text-[clamp(2rem,4vw,3.813rem)] text-accent mb-2">
                92%
              </div>
              <div className="mono-label text-[11px] text-text-secondary">
                {t.stats.survivalRate}
              </div>
            </div>
            <div>
              <div className="display-hero text-[clamp(2rem,4vw,3.813rem)] text-accent mb-2">
                568
              </div>
              <div className="mono-label text-[11px] text-text-secondary">
                {t.stats.events}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
