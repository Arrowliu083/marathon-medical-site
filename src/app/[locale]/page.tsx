import { getTranslations } from 'next-intl/server';
import HomeContent from './HomeContent';

export async function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }];
}

export default async function HomePage() {
  const t = await getTranslations({ locale: 'zh', namespace: 'home' });

  const messages = {
    heroTag: t('heroTag'),
    heroCTA: t('heroCTA'),
    heroTitle: t('heroTitle'),
    heroSubtitle: t('heroSubtitle'),
    featuredStories: t('featuredStories'),
    latestUpdates: t('latestUpdates'),
    keyData: t('keyData'),
    stats: {
      standards: t('stats.standards'),
      experts: t('stats.experts'),
      survivalRate: t('stats.survivalRate'),
      events: t('stats.events'),
    },
  };

  return <HomeContent messages={messages} />;
}
