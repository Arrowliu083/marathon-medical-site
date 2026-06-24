'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <div className="font-sans font-bold text-[20px] text-text-primary mb-1 leading-tight">
              马拉松医疗保障标准及最佳实践
            </div>
            <p className="text-[11px] text-text-secondary tracking-[0.08em] uppercase">
              MARATHON FIRSTAID
            </p>
          </div>

          {/* Standards */}
          <div>
            <h4 className="mono-label text-[11px] text-accent mb-4">
              {t('standards')}
            </h4>
            <ul className="space-y-2">
              <li className="text-[13px] text-text-secondary">{t('standard1')}</li>
              <li className="text-[13px] text-text-secondary">{t('standard2')}</li>
            </ul>
            <h4 className="mono-label text-[11px] text-accent mt-6 mb-2">
              {t('publishedBy')}
            </h4>
            <ul className="space-y-1">
              <li className="text-[13px] text-text-secondary">{t('association1')}</li>
              <li className="text-[13px] text-text-secondary">{t('association2')}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mono-label text-[11px] text-accent mb-4">
              {t('contact')}
            </h4>
            <a
              href="mailto:Liaoyukun@sos919.com.cn"
              className="text-[13px] text-text-secondary hover:text-accent transition-colors duration-150"
            >
              {t('contactEmail')}
            </a>
          </div>

          {/* Support */}
          <div>
            <h4 className="mono-label text-[11px] text-accent mb-4">
              {t('supportedBy')}
            </h4>
            <ul className="space-y-1">
              <li className="text-[13px] text-text-secondary">{t('support1')}</li>
              <li className="text-[13px] text-text-secondary">{t('support2')}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border-light flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-text-secondary mono-label">
            {t('copyright')}
          </p>
          <p className="text-[11px] text-text-secondary">
            中国马拉松医疗保障首批行业标准
          </p>
        </div>
      </div>
    </footer>
  );
}
