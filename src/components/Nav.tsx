'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

export default function Nav() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/category/standards`, label: t('standards') },
    { href: `/${locale}/category/interviews`, label: t('interviews') },
    { href: `/${locale}/about`, label: t('about') },
  ];

  const switchLocale = locale === 'zh' ? 'en' : 'zh';
  const switchPath = pathname.replace(`/${locale}`, `/${switchLocale}`);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-sm border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Logo — site name */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-150"
        >
          <span className="display-hero text-xl md:text-[22px] leading-none text-accent tracking-tight">
            MARATHON FIRSTAID
          </span>
          <span className="hidden md:inline font-sans font-bold text-[15px] text-text-primary">
            {locale === 'zh' ? '马拉松医疗保障标准及最佳实践' : 'Marathon Medical Standards & Best Practice'}
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`mono-label px-3 py-2 text-[12px] transition-colors duration-150 ${
                  isActive
                    ? 'text-accent'
                    : 'text-text-secondary hover:text-accent'
                }`}
                style={{
                  boxShadow: isActive
                    ? '0px -2px 0px 0px inset #f04e23'
                    : 'none',
                }}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Language switch */}
          <Link
            href={switchPath}
            className="mono-label px-3 py-2 text-[12px] text-text-secondary hover:text-accent transition-colors duration-150 ml-2 border-l border-border pl-4"
          >
            {t('language')}
          </Link>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-3">
          <Link
            href={switchPath}
            className="mono-label text-[11px] text-text-secondary hover:text-accent transition-colors duration-150"
          >
            {t('language')}
          </Link>
          <button className="mono-label text-[14px] text-text-primary" aria-label="Menu">
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}
