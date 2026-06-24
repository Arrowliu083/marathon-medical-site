import { getTranslations } from 'next-intl/server';
import AboutContent from './AboutContent';

export async function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }];
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'footer' });

  const messages = {
    standards: t('standards'),
    standard1: t('standard1'),
    standard2: t('standard2'),
    publishedBy: t('publishedBy'),
    association1: t('association1'),
    association2: t('association2'),
    contact: t('contact'),
    contactEmail: t('contactEmail'),
    supportedBy: t('supportedBy'),
    support1: t('support1'),
    support2: t('support2'),
    copyright: t('copyright'),
  };

  return <AboutContent messages={messages} />;
}
